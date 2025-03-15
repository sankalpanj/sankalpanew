import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReadMoreButton } from "@/components/read-more";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EVENTS } from "@/lib/constants";
import { Clock, Filter, MapPin, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ t: string }>;
}) {
  const t = (await searchParams).t;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[500px]">
            <Image
              src="/images/events-banner.jpg?height=300&width=1200"
              alt="Events and gatherings"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Events & Activities
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              Join us at our upcoming events and be part of our mission to
              create positive change
            </p>
          </div>
        </section>

        {/* Event Search & Filter */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-9" />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button>Find Events</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-8">
          <div className="container">
            <Tabs
              defaultValue={t === "uc" ? "upcoming" : "all"}
              className="w-full"
            >
              <TabsList className="w-full justify-start overflow-hidden py-2">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="education">Educational</TabsTrigger>
                <TabsTrigger value="virtual">Virtual</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6">
                  <h2 className="text-2xl font-bold">All Events</h2>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          DEC 2023
                        </div>
                        <Image
                          src="/images/foodDrive/FoodDrive2022_01.jpg?height=200&width=400"
                          alt="Charity Gala"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>120 attended</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Community Food Drive
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>7:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Our community food drive is a powerful initiative that
                          brings neighbors together to support those in need.
                        </p>
                        <ReadMoreButton eventName="foodDrive" />
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          DEC 2024
                        </div>
                        <Image
                          src="/images/toyDrive/ToyDrive2024.jpg?height=200&width=400"
                          alt="Volunteer Day"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>45 attended</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Toy Drive</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>9:00 AM - 2:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-3 break-words">
                          Like every year, Sankalpa proudly hosted its annual
                          Toy Drive, spreading joy and hope to children in need.
                          During this special holiday season, we invite our
                          wonderful community to come together and make a
                          difference. By donating new, unwrapped toys, you can
                          bring happiness to a child who deserves to feel
                          special and cherished. With the support of generous
                          neighbors and kind-hearted individuals, we continue to
                          brighten the season for countless children—because
                          every child deserves the magic of play!
                        </p>
                        <ReadMoreButton eventName="toyDrive" />
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          MAY 2025
                        </div>
                        <Image
                          src="/images/5kRun/5KRun_2.jpeg?height=200&width=400"
                          alt="Fundraising Run"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>200 attended</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">5K Run/ Walk</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>8:00 AM - 12:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          Sankalpa, in collaboration with Plainsboro Township,
                          is excited to host the **3rd Annual 5K Run/2K Walk on
                          May 17, 2025, at Plainsboro Community Park! With
                          record-breaking participation over the last two years,
                          this event continues to grow, bringing together
                          runners, walkers, families, and community members for
                          a meaningful cause.
                        </p>
                        <ReadMoreButton
                          eventName="fiveKRun"
                          className="flex w-full justify-end mb-2"
                        />
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          JUL 2024
                        </div>
                        <Image
                          src="/images/Picnic/Picnic2025_21.JPG?height=200&width=400"
                          alt="Virtual Workshop"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>75 attended</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Picnic 2024</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>6:00 PM - 7:30 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-3 break-words">
                          What better way to enjoy the sunshine than a Summer
                          Picnic with Purpose? Sankalpa organizes a day of fun,
                          friendship, and environmental action! Meet fellow
                          environmental enthusiasts and strengthen our
                          community. Learn how you can contribute to
                          sustainability efforts and become a part of our
                          organization. Bring your friends, share delicious
                          food, and participate in eco-friendly activities that
                          support our cause.Experience the beauty we strive to
                          protect while engaging in meaningful discussions about
                          our initiatives. Whether you're already involved or
                          just curious, this is a great opportunity to relax,
                          connect, and make an impact. Come for the picnic, stay
                          for the mission—because together, we can create a
                          greener, more sustainable future!
                        </p>
                        <ReadMoreButton eventName="Picnic" />
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          OCT 2025
                        </div>
                        <Image
                          src="/images/fallSales/FallSale2025_01.JPG?height=200&width=400"
                          alt="Educational Seminar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>50 attending</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Fall Sales</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>10:00 AM - 3:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        {/* <p className="text-muted-foreground mb-4">
                          Join experts for discussions on sustainable
                          development goals and global challenges.
                        </p>
                        <Button className="w-full">Register Now</Button> */}
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          NOV 2024
                        </div>
                        <Image
                          src="/images/halloween/HalloWeen2025_02.JPG?height=200&width=400"
                          alt="Community Festival"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>300 attending</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Halloween</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>11:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro, NJ</span>
                          </div>
                        </div>
                        {/* <p className="text-muted-foreground mb-4">
                          Celebrate diversity with food, music, art, and
                          performances from around the world.
                        </p>
                        <Button className="w-full">Register Now</Button> */}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid gap-6">
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          MAY 17, 2025
                        </div>
                        <Image
                          src="/images/5kRun/logo.png?height=100&width=200"
                          alt="5KRun"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>120 attending</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Join Us for the 3rd Annual 5K Run / 2K Walk –
                          Supporting a Greener Future!
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>7:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro Community Park, New Jersey</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground line-clamp-3 break-words">
                          Sankalpa, in collaboration with Plainsboro Township,
                          is excited to host the **3rd Annual 5K Run/2K Walk on
                          May 17, 2025, at Plainsboro Community Park! With
                          record-breaking participation over the last two years,
                          this event continues to grow, bringing together
                          runners, walkers, families, and community members for
                          a meaningful cause.
                        </p>
                        <ReadMoreButton
                          eventName="fiveKRun"
                          className="flex w-full justify-end mb-2"
                        />
                        <Link
                          href={EVENTS["fiveKRun"].link ?? ""}
                          target="_blank"
                        >
                          <Button className="w-full">Register Now</Button>
                        </Link>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden">
                      <div className="relative h-56">
                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 z-10 rounded-br-lg font-medium">
                          MAR 29, 2025
                        </div>
                        <Image
                          src="/images/annual_meeting_banner.png?height=100&width=200"
                          alt="5KRun"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge>Community</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>120 attending</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Annual General Meeting
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>7:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>Plainsboro Community Park, New Jersey</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground line-clamp-5 break-words">
                          Our Annual General Meeting (AGM) is a key event where
                          members come together to reflect on our achievements,
                          discuss future initiatives, and strengthen our
                          mission. It&apos;s an opportunity to review
                          financials, elect leadership, and engage in meaningful
                          conversations about our community impact. Join us as
                          we celebrate progress and shape the path ahead!
                        </p>
                      </CardContent>
                      <CardFooter className="w-full">
                        <Link
                          href={EVENTS["fiveKRun"].link ?? ""}
                          target="_blank"
                          className="w-full"
                        >
                          <Button className="w-full">Register Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Other tab contents would be similar but filtered by category */}
              <TabsContent value="fundraising" className="mt-6">
                <div className="grid gap-6">
                  <h2 className="text-2xl font-bold">Fundraising Events</h2>
                  {/* Filtered events would go here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Host an Event */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Host Your Own Event
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Want to organize your own fundraiser or awareness event? We
                  provide resources and support to help you make a difference in
                  your community.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  From birthday fundraisers to community service days, your
                  creativity can help advance our mission.
                </p>
                <Button className="flex items-center gap-2">Get Started</Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Host an event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Event Calendar</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">View our upcoming events by date</p>
            </div>

            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square border rounded-md flex flex-col items-center justify-start p-1">
                    <span className="text-right w-full">{(i % 31) + 1}</span>
                    {i === 14 && (
                      <div className="w-full mt-1 px-1 py-0.5 bg-primary/10 text-primary text-xs rounded truncate">
                        Charity Gala
                      </div>
                    )}
                    {i === 22 && (
                      <div className="w-full mt-1 px-1 py-0.5 bg-primary/10 text-primary text-xs rounded truncate">
                        Volunteer Day
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">Download Event Calendar</Button>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
