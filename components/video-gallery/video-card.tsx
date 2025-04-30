"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Play } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface VideoCardProps {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
}

export default function VideoCard({ id, title, description, date, thumbnail }: VideoCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-video">
            <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {date}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
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
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {date}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
