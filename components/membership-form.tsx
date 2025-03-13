"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    email: z.string().email().min(1, "Enter email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    cpassword: z.string().min(1, "Enter confirm password"),
    agreeToTerms: z.boolean(),
    gender: z.enum([
      "male",
      "female",
      "non-binary",
      "others",
      "prefer-not-to-say",
    ]),
    occupation: z.string().nullable(),
  })
  .refine(({ cpassword, password }) => {
    if (cpassword !== password) {
      return "Passwords don't match";
    }
    return true;
  });

interface Props {
  open: boolean;
  close: VoidFunction;
}

export default function MemberRegistrationPage({ open, close }: Props) {
  const {
    signUp,
    isLoaded: isSignUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();

  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      cpassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      agreeToTerms: false,
      gender: "male",
      occupation: "",
    },
  });

  const { mutateAsync: addMember, isLoading: addingMember } =
    trpc.addMember.useMutation();
  const { mutateAsync: handleSignUp, isLoading: signingUp } = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
    }: z.infer<typeof signUpFormSchema>) => {
      if (!isSignUpLoaded) throw Error("SIGNUP_NOT_LOADED");
      return await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
    },
    onSuccess: async (data) => {
      if (isSignUpLoaded) {
        const { createdSessionId } = data;
        await setSignUpActive({ session: createdSessionId });
        try {
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
          setShowOtpVerification(true);
          toast.success("An email with OTP has been sent to your email");
        } catch (err) {
          toast.error("Failed to sent otp. Try again later");
        }
      }
    },
    onError: (error) => {
      toast.error((error as any)["errors"][0].longMessage);
    },
  });

  async function handleVerifyOtp() {
    if (!isSignUpLoaded) {
      toast.info("Something went wrong. Please try again");
      return;
    }

    try {
      const verificationRes = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (verificationRes.status === "complete") {
        const { firstName, lastName, email } = signUpForm.getValues();
        if (verificationRes.createdUserId) {
          await addMember({
            payload: {
              address: "",
              anniversary: "",
              city: "",
              createdAt: new Date().toISOString(),
              dateOfBirth: "",
              email,
              id: verificationRes.createdUserId,
              name: `${firstName} ${lastName}`,
              spouseDateOfBirth: "",
              spouseEmail: "",
              spouseName: "",
              spouseTelephone: "",
              state: "",
              telephone: "",
              zip: "",
              membershipStartDate: "",
              membershipEndDate: "",
              amount: 0,
              status: "pending",
              paymentDate: "",
              stripeCustomerId: "",
              stripeSubscriptionId: "",
              stripePlanId: "",
              stripeProductId: "",
            },
          });
          await signUp.reload();
          setSignUpSuccess(true);

          close();
        }
      }
    } catch (err) {
      console.log("email_verfication_error: ", err);
      toast.error("Email verification failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={close} modal={true}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="font-semibold">
          Member Registration
        </DialogHeader>
        <div className="flex flex-col h-auto w-full">
          <main className="flex-1">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit((values) => {
                  handleSignUp({ ...values });
                })}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Firstname</FormLabel>
                          <FormControl>
                            <Input placeholder="eg. Jhon" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="lastName"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Lastname</FormLabel>
                          <FormControl>
                            <Input placeholder="eg. Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  name="email"
                  control={signUpForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="password"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter passowrd" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="cpassword"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter confirm passowrd"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="gender"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="non-binary">
                                    Non binary
                                  </SelectItem>
                                  <SelectItem value="others">Others</SelectItem>
                                  <SelectItem value="prefer-not-to-say">
                                    Prefer not to say
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="occupation"
                    control={signUpForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg. Architect"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={signUpForm.control}
                    name="agreeToTerms"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I agree to the{" "}
                                <Link
                                  href="#"
                                  className="text-primary hover:underline"
                                >
                                  terms and conditions
                                </Link>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button
                  className="w-full mb-4"
                  type="submit"
                  disabled={!signUpForm.getValues().agreeToTerms}
                  loading={signingUp}
                >
                  Create Account
                </Button>
              </form>
            </Form>
            {showOtpVerification && !signUpSuccess && (
              <Card>
                <CardHeader>
                  <CardTitle>Verify OTP</CardTitle>
                  <CardDescription>
                    Enter the otp sent to your email address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col h-full w-full max-w-lg items-center justify-center gap-3">
                    <Label htmlFor="otp" className="text-left">
                      Enter OTP
                    </Label>
                    <InputOTP
                      maxLength={6}
                      id="otp"
                      onChange={(value) => {
                        setOtp(value);
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <div id="clerk-captcha" />
                  </div>
                  <CardFooter>
                    <Button
                      className="w-full mt-8"
                      disabled={otp.length !== 6}
                      onClick={handleVerifyOtp}
                      loading={addingMember}
                    >
                      Verify
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            )}
            {signUpSuccess && (
              <Card>
                <CardContent>
                  <div className="flex flex-col h-full w-full space-y-5 items-center justify-center py-24">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="13.25 13.25 37.5 37.5"
                      enable-background="new 0 0 64 64"
                      width={80}
                      height={80}
                    >
                      <g>
                        <g></g>

                        <circle
                          fill="#61EF36FF"
                          stroke="#61EF36FF"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          cx="32"
                          cy="32"
                          r="17.5"
                        />
                      </g>
                      <g>
                        <polyline
                          fill="none"
                          stroke="#FFFFFFFF"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          points="   21.5,32 28.5,39 42.5,25  "
                        />
                      </g>
                    </svg>
                    <p className="text-2xl font-semibold text-secondary/50">
                      Registration successful
                    </p>
                    <CardDescription>
                      You will be automatically redirected to the homepage
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
