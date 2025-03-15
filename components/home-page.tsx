import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Clock,
  CloudDownload,
  HourglassIcon,
  TreePalmIcon,
  TreesIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import Header from "./header";
import UpcomingEventsMarquee from "./upcoming-events-marquee";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <UpcomingEventsMarquee />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[600px]">
            <Image
              src="/images/banner_b.jpg?height=600&width=1200"
              alt="Children smiling"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Making Efforts for a Better Future
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl">
              Join us in our mission to empower communities and transform lives
              through sustainable development and compassionate action.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/donate">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Donate Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Sankalpa, our mission is to serve the community and protect
                  our environment. We are a passionate group of individuals who
                  believe in the power of collective action. Our initiatives are
                  designed to promote biodiversity, reduce plastic usage, and
                  create a better world for all.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  We've been working alongside local communities to address
                  their most pressing needs and build lasting solutions.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/sankalpa_logo.png?height=400&width=600"
                  alt="Community project"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <TreePalmIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">350</h3>
                <p className="text-muted-foreground">Planted Trees</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <CloudDownload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">315.00</h3>
                <p className="text-muted-foreground">
                  Tonnes of CO2 being offset
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <TreesIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">1</h3>
                <p className="text-muted-foreground">Country reforested</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <HourglassIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">43.75</h3>
                <p className="text-muted-foreground">Working hours created</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We focus on sustainable development through these key program
                areas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="relative h-60">
                  <Image
                    src="/images/5kRun/5KRun_1.jpg?height=300&width=400"
                    alt="Education program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Community 5K Run</h3>
                  <p className="text-muted-foreground mb-4">
                    Join us for a morning of fitness, friendship, and
                    environmental action. Whether you run, walk, or cheer from
                    the sidelines, every step counts toward a greener future!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-60">
                  <Image
                    src="/images/foodDrive/FoodDrive2022_01.jpg?height=300&width=400"
                    alt="Healthcare program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Food Drive</h3>
                  <p className="text-muted-foreground mb-4">
                    Improving access to essential healthcare services and
                    promoting community health and wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-60">
                  <Image
                    src="/images/preservation_work/Preservework2025_05.JPG?height=100&width=400"
                    alt="Economic empowerment program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Preservation work</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    As an environmentally conscious non-profit, we take pride in
                    preserving our community through tree plantations and the
                    removal of invasive plants. Our efforts help restore natural
                    habitats, promote biodiversity, and ensure a greener future.
                    Together, we can make a lasting impact—one tree at a time!
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href={"/events"}>
                <Button className="flex items-center gap-2 mx-auto">
                  View All Programs <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join us at our upcoming events and be part of our mission
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <Card className="overflow-hidden max-w-lg">
                <div className="relative h-56">
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                    MAR 29
                  </div>
                  <Image
                    src="/images/annual_meeting_banner.png?height=200&width=400"
                    alt="Charity Gala"
                    fill
                    className="object-cover bg-muted-foreground/100"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>TDB</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Annual General Meeting
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-4">
                    Our Annual General Meeting (AGM) is a key event where
                    members come together to reflect on our achievements,
                    discuss future initiatives, and strengthen our mission.
                    It&apos;s an opportunity to review financials, elect
                    leadership, and engage in meaningful conversations about our
                    community impact. Join us as we celebrate progress and shape
                    the path ahead!
                  </p>
                  <Link href="/events?t=uc">
                    <Button variant="outline" className="w-full">
                      Register Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden max-w-lg">
                <div className="relative h-56">
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                    MAY 17
                  </div>
                  <Image
                    src="/images/run_event_banner.jpg?height=200&width=400"
                    alt="Fundraising Run"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>8:00 AM - 12:00 PM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    5K Run / 2K Walk in collaboration with Township
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-4">
                    Sankalpa, in collaboration with Plainsboro Township, is
                    excited to host the **3rd Annual 5K Run/2K Walk on May 17,
                    2025, at Plainsboro Community Park! With record-breaking
                    participation over the last two years, this event continues
                    to grow, bringing together runners, walkers, families, and
                    community members for a meaningful cause.
                  </p>
                  <Link href="/events?t=uc">
                    <Button variant="outline" className="w-full">
                      Register Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/events">
                <Button className="flex items-center gap-2 mx-auto">
                  View All Events <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
              Stories of Sankalpa
            </h2>

            <Tabs defaultValue="story1" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story1">Maria's Story</TabsTrigger>
                <TabsTrigger value="story2">John's Journey</TabsTrigger>
                <TabsTrigger value="story3">Community Impact</TabsTrigger>
              </TabsList>
              <TabsContent value="story1" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Maria's story"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Maria's Story</h3>
                    <p className="text-muted-foreground mb-4">
                      "The education program changed my life. I was able to
                      complete my schooling and now I'm the first person in my
                      family to attend university. I'm studying to become a
                      teacher so I can give back to my community."
                    </p>
                    <p className="font-medium">
                      Maria, Education Program Beneficiary
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="story2" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="John's journey"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">John's Journey</h3>
                    <p className="text-muted-foreground mb-4">
                      "The microfinance program helped me start my small
                      business. Now I can provide for my family and even employ
                      two people from my village. This opportunity has
                      transformed not just my life but our entire community."
                    </p>
                    <p className="font-medium">
                      John, Economic Empowerment Program Participant
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="story3" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Community impact"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Community Impact</h3>
                    <p className="text-muted-foreground mb-4">
                      "Our village now has clean water access thanks to the
                      infrastructure project. Children are healthier, women
                      spend less time collecting water, and we've seen a
                      decrease in waterborne diseases. It's made a tremendous
                      difference."
                    </p>
                    <p className="font-medium">
                      Village Elder, Clean Water Initiative
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section> */}

        {/* Newsletter */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our newsletter to receive updates on our work,
                impact stories, and ways to get involved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Your Email Address"
                  type="email"
                  className="sm:flex-1"
                />
                <Link href="/subscription">
                  <Button>Subscribe</Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
