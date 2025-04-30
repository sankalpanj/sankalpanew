"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

interface FeaturedVideoProps {
  id: string
  title: string
  description: string
  thumbnail: string
}

export default function FeaturedVideo({ id, title, description, thumbnail }: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative rounded-lg overflow-hidden">
      {!isPlaying ? (
        <>
          <div className="relative aspect-video md:aspect-[16/9] w-full">
            <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{title}</h2>
              <p className="text-white/90 mb-6 max-w-2xl">{description}</p>
              <Button onClick={() => setIsPlaying(true)} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Play className="h-5 w-5 fill-current" />
                Watch Video
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="relative pt-[56.25%] bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      )}
    </div>
  )
}
