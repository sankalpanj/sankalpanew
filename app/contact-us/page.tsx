"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Footer from "../../components/footer";
import Header from "../../components/header";

const formSchema = z.object({
  firstName: z.string().min(1, "Enter first name"),
  lastName: z.string().min(1, "Enter last name"),
  email: z.string().email("Enter a valid email").min(1, "Enter your email"),
  phone: z
    .string()
    .max(10, "Phone number must not exceed 10 characters")
    .optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Enter your message"),
  userType: z.enum(["individual", "organization", "media", "other"]),
});

export default function ContactUsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      userType: "individual",
    },
  });

  const { mutateAsync: sendContactMail, isLoading: sendingMail } =
    trpc.sendContactMail.useMutation();

  const { mutateAsync: addContactRecord, isLoading: addingRecord } =
    trpc.addContact.useMutation({
      onError: () => {
        toast.error("Send message failed", {
          description:
            "Something went wrong while sending the message. Please try again later.",
        });
      },
      onSuccess: (data) => {
        if (data.code === "SUCCESS") {
          toast.success("Message Sent", {
            description:
              "Your message has been sent successfully. We will get back to you soon.",
          });
        } else {
          toast.error("Send message failed", {
            description:
              "Something went wrong while sending the message. Please try again later.",
          });
        }
      },
      onSettled: () => {
        form.reset();
      },
    });

  async function handleContact(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, message, phone, subject } = values;
    const { code, reason, data } = await sendContactMail({
      firstName,
      lastName,
      email,
      message,
      phone: phone ?? null,
      subject: subject ?? null,
    });

    if (code === "FAILED") {
      toast.error("Failed to send", {
        description: reason,
      });
      return;
    }

    await addContactRecord({
      payload: {
        ...values,
        phone: values.phone ?? "",
        subject: values.subject ?? "",
      },
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[500px]">
            <Image
              src="/images/contact-us.avif?height=300&width=1200"
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              We&apos;d love to hear from you. Reach out with questions,
              feedback, or to learn more about our work.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions or want to learn more about our work? We&apos;d
                  love to hear from you. Our team is here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        Plainsboro, NJ, USA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        info@sankalpausa.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">
                        +1 732-421-4042/ 267-886-4559
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="bg-muted p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="bg-muted p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="bg-muted p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="bg-muted p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Office location map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit(handleContact)}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg. Jhon" />
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
                                  <Input {...field} placeholder="eg. Doe" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  placeholder="eg. test@example.com"
                                />
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
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="eg. 123456789" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="userType"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>I am a</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  {...field}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  orientation="horizontal"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="individual"
                                      id="individual"
                                    />
                                    <Label htmlFor="individual">
                                      Individual
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="organization"
                                      id="organization"
                                    />
                                    <Label htmlFor="organization">
                                      Organization
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="media" id="media" />
                                    <Label htmlFor="media">Media</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="other" id="other" />
                                    <Label htmlFor="other">Other</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="eg. Inquiry about services"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="eg. Inquiry about services"
                                  className="resize-none"
                                  rows={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <Button
                        className="w-full"
                        type="submit"
                        loading={addingRecord}
                      >
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our organization and work
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    How can I donate to your organization?
                  </h3>
                  <p className="text-muted-foreground">
                    You can donate online through our secure donation page, by
                    mail, or by phone. We accept one-time and recurring
                    donations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    How is my donation used?
                  </h3>
                  <p className="text-muted-foreground">
                    80% of donations directly fund our programs, with 10% for
                    administration and 10% for fundraising efforts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Can I volunteer with your organization?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! We have various volunteer opportunities both locally
                    and internationally. Check our Events page or contact us for
                    current opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    Are donations tax-deductible?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we are a registered 501(c)(3) nonprofit organization,
                    and all donations are tax-deductible to the extent allowed
                    by law.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    How can my company partner with you?
                  </h3>
                  <p className="text-muted-foreground">
                    We offer corporate partnership opportunities including
                    sponsorships, matching gifts, and employee volunteer
                    programs. Contact us to discuss options.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Where do you work?</h3>
                  <p className="text-muted-foreground">
                    We currently operate programs in 25 countries across Africa,
                    Asia, and Latin America, focusing on areas with the greatest
                    need.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don&apos;t see your question here?
              </p>
              <Button>Contact Us</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
