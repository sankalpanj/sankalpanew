"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MemberRegistrationPage from "@/components/membership-form";
import { RenderPlans } from "@/components/render-plans";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MEMBERS } from "@/lib/constants";
import { Award, Star, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MembersPage() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative h-[400px]">
            <Image
              src="/images/members_banner.jpg?height=300&width=1200"
              alt="Members community"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Join Our Community
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              Become a member and be part of our mission to create lasting
              change
            </p>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Membership Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our community of changemakers and enjoy exclusive benefits
                while supporting our mission
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Access</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with like-minded individuals committed to making a
                    difference in the world.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Exclusive Events</h3>
                  <p className="text-muted-foreground mb-4">
                    Gain access to member-only events, workshops, and networking
                    opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Recognition</h3>
                  <p className="text-muted-foreground mb-4">
                    Be recognized for your support and contribution to our
                    mission and programs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Membership Levels */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Membership Levels
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the membership level that's right for you
              </p>
            </div>

            <RenderPlans />
          </div>
        </section>

        {/* Member Stories */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Meet our Members
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full h-full gap-5 place-items-center py-4 my-2">
              {MEMBERS.map(({ imageSrc, name, designation }, idx) => {
                return (
                  <Card
                    className="hover:shadow-xl transition-all duration-300 ease-linear delay-0 w-full"
                    key={idx}
                  >
                    <CardContent className="hover:shadow-lg transition-all duration-300 ease-linear delay-0 p-5">
                      <div className="flex w-full h-full items-center justify-center">
                        <div className="flex w-full gap-5 items-center">
                          <div className="w-36 object-fill rounded-full border shadow-md overflow-hidden ring-4 ring-green-500">
                            <Image
                              src={imageSrc}
                              width={150}
                              height={100}
                              alt={`mem_${name}`}
                              className="rounded-full aspect-square object-cover"
                            />
                          </div>
                          <div className="flex flex-col h-full w-full py-2">
                            <p className="text-lg text-muted-foreground font-semibold max-w-md truncate text-ellipsis">
                              {name}
                            </p>
                            <p className="text-sm text-[#696a6b]">
                              {designation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Join Now CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community today and be part of our mission to create
              lasting change around the world.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setOpenForm(true);
              }}
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Become a Member Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MemberRegistrationPage
        open={openForm}
        close={() => {
          setOpenForm(false);
        }}
      />
    </div>
  );
}
