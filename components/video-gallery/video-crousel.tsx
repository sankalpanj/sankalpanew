"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Sample featured videos - in a real app, this would come from an API or CMS
const featuredVideos = [
  {
    id: "nUaQ6JVQ0Ds", // YouTube video ID
    title: "Plainsboro's Annual 5K Run and 2K Walk",
    description:
      "Highlights from our Annual 5K Run/2K Walk event  at Plainsboro Community Park, featuring special guests and inspiring stories.",
    thumbnail: "https://img.youtube.com/vi/nUaQ6JVQ0Ds/hqdefault.jpg?height=300&width=600",
  },
];

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredVideos.map((video, index) => (
            <div
              key={index}
              className="flex-none w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-12px)] snap-start mx-8"
            >
              <Card
                className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10 hidden md:flex"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10 hidden md:flex"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedVideo && (
            <>
              <div className="relative pt-[56.25%] bg-black">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
                <p className="text-muted-foreground mt-2">
                  {selectedVideo.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
