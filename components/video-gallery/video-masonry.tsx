"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Calendar, Play } from "lucide-react"
import Image from "next/image"

// Sample video data - in a real app, this would come from an API or CMS
const videos = [
  {
    id: "dQw4w9WgXcQ", // YouTube video ID
    title: "Annual Charity Gala 2023",
    description: "Highlights from our annual fundraising event featuring special guests and inspiring stories.",
    date: "June 15, 2023",
    duration: "5:42",
    thumbnail: "/placeholder.svg?height=200&width=360",
    height: 200, // For masonry layout
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Community Volunteer Day",
    description: "Our volunteers came together to make a difference in the local community through various projects.",
    date: "July 8, 2023",
    duration: "4:18",
    thumbnail: "/placeholder.svg?height=300&width=360",
    height: 300,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Hope 5K Run/Walk Event",
    description: "Hundreds of participants joined our annual 5K to raise funds for clean water initiatives.",
    date: "August 22, 2023",
    duration: "6:24",
    thumbnail: "/placeholder.svg?height=250&width=360",
    height: 250,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Educational Workshop Series",
    description: "Our education team conducted workshops to empower youth with essential skills and knowledge.",
    date: "September 5, 2023",
    duration: "8:15",
    thumbnail: "/placeholder.svg?height=180&width=360",
    height: 180,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Healthcare Outreach Program",
    description:
      "Medical professionals volunteered their time to provide healthcare services to underserved communities.",
    date: "October 12, 2023",
    duration: "7:36",
    thumbnail: "/placeholder.svg?height=220&width=360",
    height: 220,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Cultural Exchange Festival",
    description: "A celebration of diversity featuring food, music, art, and performances from around the world.",
    date: "November 18, 2023",
    duration: "9:51",
    thumbnail: "/placeholder.svg?height=280&width=360",
    height: 280,
  },
]

export default function VideoMasonry() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {videos.map((video, index) => (
          <div key={index} className="break-inside-avoid cursor-pointer group" onClick={() => setSelectedVideo(video)}>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                width={360}
                height={video.height}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="font-bold text-white text-lg">{video.title}</h3>
                <div className="flex items-center text-xs text-white/80 mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {video.date}
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
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
                <p className="text-muted-foreground mt-2">{selectedVideo.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedVideo.date}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
