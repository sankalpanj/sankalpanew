import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, CreditCard, DollarSign } from "lucide-react";
import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[400px]">
            <Image
              src="/images/donation_banner.webp?height=200&width=1200"
              alt="Donation impact"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Make a Difference Today
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl">
              Your generosity can transform lives and communities around the
              world
            </p>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                  Your Donation Matters
                </h2>

                <Tabs defaultValue="one-time" className="mb-12">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="one-time">
                      One-time Donation
                    </TabsTrigger>
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
                      <h3 className="text-xl font-bold mb-4">
                        Select Monthly Amount
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-12">
                          $10/mo
                        </Button>
                        <Button variant="outline" className="h-12">
                          $25/mo
                        </Button>
                        <Button variant="outline" className="h-12">
                          $50/mo
                        </Button>
                        <Button variant="outline" className="h-12">
                          $100/mo
                        </Button>
                        <Button variant="outline" className="h-12">
                          $200/mo
                        </Button>
                        <Button variant="outline" className="h-12">
                          Other
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Monthly donations provide sustainable support for our
                        ongoing programs
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold mb-4">
                        Custom Monthly Amount
                      </h3>
                      <div className="flex">
                        <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-muted text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <Input
                          type="number"
                          placeholder="Enter monthly amount"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Donor Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input id="zip" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <h3 className="text-xl font-bold">Payment Information</h3>

                  <RadioGroup defaultValue="credit-card">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" /> Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <Button className="w-full" size="lg">
                    Complete Donation
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Your donation is tax-deductible to the extent allowed by
                    law.
                    <br />
                    All transactions are secure and encrypted.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Your Impact</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">$25</h4>
                          <p className="text-sm text-muted-foreground">
                            Provides clean water for a family for a month
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">$50</h4>
                          <p className="text-sm text-muted-foreground">
                            Supplies educational materials for 10 children
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">$100</h4>
                          <p className="text-sm text-muted-foreground">
                            Funds a microloan for a small business entrepreneur
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">$250</h4>
                          <p className="text-sm text-muted-foreground">
                            Provides healthcare services for a rural community
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Donation Transparency
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Programs</span>
                          <span>80%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Administration</span>
                          <span>10%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[10%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fundraising</span>
                          <span>10%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[10%]" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      We're committed to transparency. 80% of all donations
                      directly fund our programs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
