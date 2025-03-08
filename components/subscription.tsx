import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Bell, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "./header"
import Footer from "./footer"

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=1200"
              alt="Stay connected"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Stay Connected</h1>
            <p className="mt-6 max-w-2xl text-lg">
              Subscribe to our newsletter and updates to stay informed about our work and impact
            </p>
          </div>
        </section>

        {/* Subscription Form */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Subscribe to Our Updates</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join our community of supporters and stay informed about our projects, events, and impact stories.
                  We'll keep you updated on how your support is making a difference.
                </p>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Your Information</h3>

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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Communication Preferences</h3>

                    <div className="space-y-2">
                      <Label>Email Frequency</Label>
                      <RadioGroup defaultValue="monthly">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly">Weekly Updates</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly Newsletter</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quarterly" id="quarterly" />
                          <Label htmlFor="quarterly">Quarterly Digest</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>I'm interested in (select all that apply):</Label>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="programs" />
                        <label
                          htmlFor="programs"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Program Updates
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="events" />
                        <label
                          htmlFor="events"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Events and Volunteer Opportunities
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="stories" />
                        <label
                          htmlFor="stories"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Impact Stories
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="fundraising" />
                        <label
                          htmlFor="fundraising"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Fundraising Campaigns
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        privacy policy
                      </Link>{" "}
                      and consent to receiving emails
                    </label>
                  </div>

                  <Button size="lg">Subscribe Now</Button>

                  <p className="text-sm text-muted-foreground">
                    You can unsubscribe at any time by clicking the link in the footer of our emails.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Why Subscribe?</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Stay Informed</h4>
                          <p className="text-sm text-muted-foreground">
                            Get the latest updates on our programs and impact
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Event Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Be the first to know about upcoming events and opportunities
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Exclusive Content</h4>
                          <p className="text-sm text-muted-foreground">
                            Access to stories and updates not shared elsewhere
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Community Connection</h4>
                          <p className="text-sm text-muted-foreground">
                            Feel connected to our global community of supporters
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Newsletter example"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">What Our Subscribers Say</h3>
                  <div className="space-y-4">
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "The monthly newsletter keeps me connected to the cause and inspired by the stories of impact.
                      It's a highlight in my inbox!"
                    </blockquote>
                    <p className="text-sm font-medium">— Sarah T., Monthly Donor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

