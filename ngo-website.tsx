import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NGOWebsite() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HopeFoundation</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Programs
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Get Involved
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              News
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Login
            </Button>
            <Button size="sm" className="hidden md:flex">
              Donate Now
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[600px]">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Children smiling"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Creating Hope for a Better Tomorrow
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl">
              Join us in our mission to empower communities and transform lives through sustainable development and
              compassionate action.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
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
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At HopeFoundation, we believe in creating sustainable change through community-driven initiatives. Our
                  mission is to empower vulnerable communities to overcome poverty and injustice.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  For over 20 years, we've been working alongside local communities to address their most pressing needs
                  and build lasting solutions.
                </p>
                <Button className="flex items-center gap-2">
                  About Our Work <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Community project"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">50K+</h3>
                <p className="text-muted-foreground">Lives Impacted</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">25</h3>
                <p className="text-muted-foreground">Countries Served</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">20+</h3>
                <p className="text-muted-foreground">Years of Service</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Programs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We focus on sustainable development through these key program areas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Education program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Education</h3>
                  <p className="text-muted-foreground mb-4">
                    Providing quality education and learning opportunities for children and adults in underserved
                    communities.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Healthcare program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Healthcare</h3>
                  <p className="text-muted-foreground mb-4">
                    Improving access to essential healthcare services and promoting community health and wellbeing.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Economic empowerment program"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Economic Empowerment</h3>
                  <p className="text-muted-foreground mb-4">
                    Creating sustainable livelihoods through skills training, microfinance, and entrepreneurship
                    support.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button className="flex items-center gap-2 mx-auto">
                View All Programs <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">Stories of Hope</h2>

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
                      "The education program changed my life. I was able to complete my schooling and now I'm the first
                      person in my family to attend university. I'm studying to become a teacher so I can give back to
                      my community."
                    </p>
                    <p className="font-medium">Maria, Education Program Beneficiary</p>
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
                      "The microfinance program helped me start my small business. Now I can provide for my family and
                      even employ two people from my village. This opportunity has transformed not just my life but our
                      entire community."
                    </p>
                    <p className="font-medium">John, Economic Empowerment Program Participant</p>
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
                      "Our village now has clean water access thanks to the infrastructure project. Children are
                      healthier, women spend less time collecting water, and we've seen a decrease in waterborne
                      diseases. It's made a tremendous difference."
                    </p>
                    <p className="font-medium">Village Elder, Clean Water Initiative</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Make a Difference Today</h2>
                <p className="text-lg mb-6">
                  Your donation helps us continue our vital work in communities around the world. Every contribution, no
                  matter the size, makes a meaningful impact.
                </p>
                <p className="text-lg mb-8">
                  90% of all donations go directly to our programs, ensuring your generosity reaches those who need it
                  most.
                </p>
              </div>

              <Card className="bg-white text-foreground">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-center">Donate Now</h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Button variant="outline" className="w-full">
                      $25
                    </Button>
                    <Button variant="outline" className="w-full">
                      $50
                    </Button>
                    <Button variant="outline" className="w-full">
                      $100
                    </Button>
                    <Button variant="outline" className="w-full">
                      $250
                    </Button>
                    <Button variant="outline" className="w-full">
                      $500
                    </Button>
                    <Button variant="outline" className="w-full">
                      Other
                    </Button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number (Optional)" type="tel" />
                  </div>

                  <Button className="w-full">Donate Securely</Button>

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>All donations are tax-deductible.</p>
                    <p>Secure payment processing.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* News & Events */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">News & Events</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with our latest news, events, and stories from the field
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="News article"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">June 15, 2023</div>
                  <h3 className="text-xl font-bold mb-2">New Clean Water Initiative Launches in Rural Communities</h3>
                  <p className="text-muted-foreground mb-4">
                    Our new initiative aims to provide clean water access to over 10,000 people in remote villages.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Event announcement"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">July 8, 2023</div>
                  <h3 className="text-xl font-bold mb-2">Annual Charity Gala: Hope for Tomorrow</h3>
                  <p className="text-muted-foreground mb-4">
                    Join us for our annual fundraising gala featuring special guests and inspiring stories from the
                    field.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Program update"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">August 22, 2023</div>
                  <h3 className="text-xl font-bold mb-2">Education Program Celebrates 1,000 Graduates</h3>
                  <p className="text-muted-foreground mb-4">
                    Our education initiative reaches a milestone with 1,000 students completing their education.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                View All News & Events <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Stay Connected</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our newsletter to receive updates on our work, impact stories, and ways to get involved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Your Email Address" type="email" className="sm:flex-1" />
                <Button>Subscribe</Button>
              </div>

              <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Contact Us</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions or want to learn more about our work? We'd love to hear from you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">123 Hope Street, Cityville, Country, 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@hopefoundation.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
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
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input id="first-name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="last-name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" rows={5} />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HopeFoundation</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Creating sustainable change and empowering communities since 2003.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Get Involved
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6">Programs</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Economic Empowerment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Clean Water
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Emergency Relief
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Environmental Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">123 Hope Street, Cityville, Country, 12345</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">info@hopefoundation.org</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} HopeFoundation. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

