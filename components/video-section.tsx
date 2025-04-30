import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoCarousel from "./video-gallery/video-crousel";

export default function VideoGalleryPage() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Event Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Watch videos from our past events and see the impact we're making
              together
            </p>
          </div>
          <Link href="/video-gallery">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Videos
            </Button>
          </Link>
        </div>

        <VideoCarousel />

        <div className="text-center mt-12">
          <Link href="/video-gallery">
            <Button className="flex items-center gap-2 mx-auto">
              Explore Video Gallery <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
