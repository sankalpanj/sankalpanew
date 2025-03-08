"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/images/sankalpa_logo.png?heigh=5px&width=5px"}
              alt="brand-logo"
              height={30}
              width={30}
              style={{ filter: "contrast(1.2)" }}
            />
            <span className="text-xl font-bold">Sankalpa</span>
          </Link>
        </div>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-background md:bg-transparent p-4 md:p-0 border-b md:border-0 z-50`}
        >
          <Link
            href="/events"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Events
          </Link>
          <Link
            href="/members"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Members
          </Link>
          <Link
            href="/contact-us"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in" className="hidden md:block">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: { width: 40, height: 40 } },
              }}
            />
          </SignedIn>
          <Link href="/donate" className="hidden md:block">
            <Button size="sm">Donate Now</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
