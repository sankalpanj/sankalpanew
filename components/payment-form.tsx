"use client";

import { CARD_ELEMENT_OPTIONS } from "@/lib/constants";
import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc/client";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, DollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

interface Props {
  payType?: string;
  pId?: string;
}

const formSchema = z
  .object({
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    email: z.string().email().min(1, "Enter email"),
    phone: z.string().max(10, "Cannot be more than 10 character").nullable(),
    address: z.string().min(1, "Enter address"),
    city: z.string().min(1, "Enter city name"),
    state: z.string().min(1, "Enter state name"),
    zip: z
      .string()
      .min(1, "Enter zip code")
      .max(5, "Cannot be more than 5 numbers"),
    payType: z.enum(["card", "paypal"]),
    agreeToTerms: z.boolean().default(false),
    cardValuesComplete: z.boolean().default(false),
  })
  .refine(({ zip }) => {
    if (zip.length === 0) {
      return "Enter zip code";
    } else if (zip.length > 5) {
      return "Cannot be more than 5 numbers";
    }
    return true;
  });

function PaymentForm({ pId, payType }: Props) {
  const plans = useStore((state) => state.subscriptionPlans);
  const [planPId, setPlanPId] = useState(pId ?? "");
  const [isCustomAmt, setIsCustomAmt] = useState(false);
  const [cardDetailsComplete, setCardDetailsComplete] = useState(true);
  const { user } = useUser();
  const elements = useElements();
  const stripe = useStripe();

  const { mutateAsync: createCustomer, isLoading: creatingCustomer } =
    trpc.createCustomer.useMutation();
  const { mutateAsync: createSubscription, isLoading: creatingSubscription } =
    trpc.createSubscription.useMutation();

  const planDetails = useMemo(() => {
    if (!plans || planPId) return null;

    return plans.data[0].items.data.filter((plan) => plan.id === planPId)[0];
  }, [plans, planPId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.emailAddresses[0].emailAddress,
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      payType: "card",
      agreeToTerms: false,
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    if (!elements || !stripe || !user) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setCardDetailsComplete(false);
      return;
    }

    const { firstName, lastName, email, address, city, zip, state } = values;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
        email: email,
      },
    });

    if (error) {
      toast.error(
        error.code === "card_declined"
          ? "Card Declined"
          : "Something went wrong",
        {
          description: error.message,
          closeButton: true,
        }
      );
      return;
    }

    const { code, data } = await createCustomer({
      firstName,
      lastName,
      email,
      addressLine1: address,
      city,
      country: "USA",
      paymentMethodId: paymentMethod.id,
      postalCode: zip,
      state,
      userId: user.id,
    });

    if (code === "FAILED") {
      toast.error("Payment error", {
        description: "Failed to process the payment. Please try again later.",
      });
      return;
    }

    const { code: csCode, data: csData } = await createSubscription({
      currency: "usd",
      customerId: data.id,
      paymentMethodId: paymentMethod.id,
      priceId: planDetails?.price.id as string,
      userId: user.id,
    });

    if (csCode === "SUCCESS") {
      toast.success("Payment success", {
        description: "You have successfully subscribed",
      });
    } else {
      
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
        Your Donation Matters
      </h2>

      <Tabs
        defaultValue={payType && payType === "m" ? "monthly" : "one-time"}
        className="mb-12"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="one-time">One-time Donation</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Giving</TabsTrigger>
        </TabsList>

        <TabsContent value="one-time" className="mt-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Select Amount</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-12 font-semibold text-lg">
                $ 60
              </Button>
              <Button variant="outline" className="h-12 font-semibold text-lg">
                $ 80
              </Button>
              <Button variant="outline" className="h-12 font-semibold text-lg">
                $ 100
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Custom Amount</h3>
            <div className="flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-muted text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                className="rounded-l-none"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Select Monthly Amount</h3>
            <div className="grid grid-cols-3 gap-4">
              {plans &&
                plans.data[0].items.data.map((plan) => (
                  <Button
                    key={plan.plan.id}
                    variant="outline"
                    onClick={() => {
                      setPlanPId(plan.plan.id);
                      setIsCustomAmt(false);
                    }}
                    className={`h-12 text-lg ${
                      plan.plan.id === planPId &&
                      "bg-primary text-white font-semibold text-lg hover:bg-primary hover:text-white"
                    }`}
                  >
                    ${plan.price.unit_amount}/ mo
                  </Button>
                ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Monthly donations provide sustainable support for our ongoing
              programs
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Donor Information</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          onVolumeChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                return (
                  <FormItem className="mt-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Zip</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="mt-8 space-y-6">
              <FormField
                control={form.control}
                name="payType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        <h3 className="text-xl font-bold">
                          Payment Information
                        </h3>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="credit-card" />
                            <Label
                              htmlFor="credit-card"
                              className="flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" /> Credit/Debit
                              Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {form.getValues().payType === "card" && (
                <div className="space-y-4 border rounded-md p-4">
                  <CardElement
                    options={{
                      ...CARD_ELEMENT_OPTIONS,
                      hidePostalCode: true,
                    }}
                    id="card-element"
                  />
                  {!cardDetailsComplete && (
                    <small className="text-destructive">
                      Enter card details
                    </small>
                  )}
                </div>
              )}

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the terms and conditions
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={!form.getValues().agreeToTerms}
              >
                Complete Donation
              </Button>

              <p className="text-sm text-muted-foreground">
                The amount will be charged immediately to your selected payment
                method upon subscribing. This is a recurring charge based on
                your subscription plan.
              </p>
              <p className="text-sm text-muted-foreground text-center">
                All transactions are secure and encrypted.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export { PaymentForm };
