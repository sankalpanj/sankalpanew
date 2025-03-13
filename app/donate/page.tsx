import Footer from "@/components/footer";
import Header from "@/components/header";
import { PaymentForm } from "@/components/payment-form";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ pId: string; t: string } | null>;
}) {
  const pId = (await searchParams)?.pId;
  const payType = (await searchParams)?.t;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative">
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
        </div>

        {/* Donation Options */}
        <div className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              <PaymentForm payType={payType} pId={pId} />

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
        </div>
      </main>

      <Footer />
    </div>
  );
}
