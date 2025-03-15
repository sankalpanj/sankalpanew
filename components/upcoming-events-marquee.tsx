"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function EventTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animate the ticker
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const animateTicker = () => {
      if (!scrollElement) return;

      if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      } else {
        scrollElement.scrollLeft += 1;
      }
    };

    const animation = setInterval(animateTicker, 30);
    return () => clearInterval(animation);
  }, []);

  const events = [
    "Annual General Meeting: March 17, 2025",
    "5K Run / 2K Walk in collaboration with Township: May 17, 2025",
  ];

  // Duplicate events to create seamless loop
  const tickerItems = [...events, ...events];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 font-bold flex items-center gap-2 border-r border-primary-foreground/20">
          <Calendar className="h-4 w-4" />
          <span className="hidden md:block">UPCOMING EVENTS</span>
        </div>

        <div
          ref={scrollRef}
          className="overflow-hidden whitespace-nowrap flex-1 flex items-center"
          style={{ scrollBehavior: "smooth" }}
        >
          {tickerItems.map((event, index) => (
            <Link
              key={index}
              href="/events?t=uc"
              className="inline-block px-6 hover:underline"
            >
              {event}
            </Link>
          ))}
        </div>

        <div className="flex-shrink-0 px-4 font-bold border-l border-primary-foreground/20">
          <Link href="/events?t=uc" className="hover:underline">
            VIEW ALL
          </Link>
        </div>
      </div>
    </div>
  );
}
