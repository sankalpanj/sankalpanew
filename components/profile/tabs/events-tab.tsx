"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import { format } from "date-fns"

// Sample event data
const upcomingEvents = [
  {
    id: 1,
    title: "Annual Biodiversity Conference",
    date: new Date(2025, 4, 15),
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, New York",
    description: "Join us for our annual conference on biodiversity conservation and sustainable practices.",
    status: "Registered",
    type: "Conference",
  },
  {
    id: 2,
    title: "Community Garden Volunteer Day",
    date: new Date(2025, 3, 22),
    time: "10:00 AM - 2:00 PM",
    location: "Community Garden, Brooklyn",
    description: "Help us maintain and expand our community garden. Tools and refreshments provided.",
    status: "Registered",
    type: "Volunteer",
  },
  {
    id: 3,
    title: "Wildlife Photography Workshop",
    date: new Date(2025, 3, 30),
    time: "1:00 PM - 4:00 PM",
    location: "Central Park, New York",
    description: "Learn wildlife photography techniques from professional photographers.",
    status: "Waitlisted",
    type: "Workshop",
  },
]

const pastEvents = [
  {
    id: 4,
    title: "Coastal Cleanup Initiative",
    date: new Date(2025, 2, 12),
    time: "8:00 AM - 12:00 PM",
    location: "Brighton Beach, New York",
    description: "Join our coastal cleanup initiative to help preserve marine ecosystems.",
    status: "Attended",
    type: "Volunteer",
  },
  {
    id: 5,
    title: "Sustainable Living Seminar",
    date: new Date(2025, 1, 25),
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Manhattan",
    description: "Learn practical tips for sustainable living in an urban environment.",
    status: "Attended",
    type: "Seminar",
  },
  {
    id: 6,
    title: "Biodiversity Fundraising Gala",
    date: new Date(2025, 0, 15),
    time: "7:00 PM - 10:00 PM",
    location: "Grand Hotel, New York",
    description: "Annual fundraising gala to support biodiversity conservation projects.",
    status: "Attended",
    type: "Fundraiser",
  },
  {
    id: 7,
    title: "Winter Bird Watching Tour",
    date: new Date(2024, 11, 8),
    time: "7:00 AM - 10:00 AM",
    location: "Prospect Park, Brooklyn",
    description: "Guided bird watching tour focusing on winter migratory species.",
    status: "Missed",
    type: "Tour",
  },
]

export default function EventsTab() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"list" | "calendar">("list")

  const viewEventDetails = (event: any) => {
    setSelectedEvent(event)
    setIsDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Registered":
        return <Badge className="bg-green-500">Registered</Badge>
      case "Waitlisted":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Waitlisted
          </Badge>
        )
      case "Attended":
        return <Badge variant="secondary">Attended</Badge>
      case "Missed":
        return <Badge variant="destructive">Missed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Conference":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-400"
          >
            {type}
          </Badge>
        )
      case "Volunteer":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-400"
          >
            {type}
          </Badge>
        )
      case "Workshop":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-400"
          >
            {type}
          </Badge>
        )
      case "Seminar":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-400"
          >
            {type}
          </Badge>
        )
      case "Fundraiser":
        return (
          <Badge
            variant="outline"
            className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-400"
          >
            {type}
          </Badge>
        )
      case "Tour":
        return (
          <Badge
            variant="outline"
            className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 border-cyan-400"
          >
            {type}
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get events for the selected date in calendar view
  const getEventsForDate = (date: Date) => {
    const allEvents = [...upcomingEvents, ...pastEvents]
    return allEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const selectedDateEvents = date ? getEventsForDate(date) : []

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">View your upcoming and past events</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>
            List View
          </Button>
          <Button variant={view === "calendar" ? "default" : "outline"} onClick={() => setView("calendar")}>
            Calendar
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onViewDetails={viewEventDetails} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} onViewDetails={viewEventDetails} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Events for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}</CardTitle>
              <CardDescription>
                {selectedDateEvents.length === 0
                  ? "No events scheduled for this date"
                  : `${selectedDateEvents.length} event(s) scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-start p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {getStatusBadge(event.status)}
                        {getTypeBadge(event.type)}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => viewEventDetails(event)}>
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>Complete information about this event</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                <div className="flex gap-2 mt-2">
                  {getStatusBadge(selectedEvent.status)}
                  {getTypeBadge(selectedEvent.type)}
                </div>
              </div>
              <div className="grid grid-cols-[16px_1fr] gap-x-2 gap-y-3 items-start">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p>{format(selectedEvent.date, "MMMM d, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                </div>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p>{selectedEvent.location}</p>
                <Users className="h-4 w-4 text-muted-foreground" />
                <p>Open to all members</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                {selectedEvent.status === "Registered" && <Button variant="destructive">Cancel Registration</Button>}
                {selectedEvent.status === "Waitlisted" && <Button variant="destructive">Leave Waitlist</Button>}
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Event Page
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface EventCardProps {
  event: {
    id: number
    title: string
    date: Date
    time: string
    location: string
    description: string
    status: string
    type: string
  }
  onViewDetails: (event: any) => void
}

function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{format(event.date, "MMMM d, yyyy")}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge(event.status)}
            {getTypeBadge(event.type)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <p className="line-clamp-2 text-muted-foreground mt-2">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(event)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Registered":
      return <Badge className="bg-green-500">Registered</Badge>
    case "Waitlisted":
      return (
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
          Waitlisted
        </Badge>
      )
    case "Attended":
      return <Badge variant="secondary">Attended</Badge>
    case "Missed":
      return <Badge variant="destructive">Missed</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "Conference":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-400"
        >
          {type}
        </Badge>
      )
    case "Volunteer":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-400"
        >
          {type}
        </Badge>
      )
    case "Workshop":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-400"
        >
          {type}
        </Badge>
      )
    case "Seminar":
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-400"
        >
          {type}
        </Badge>
      )
    case "Fundraiser":
      return (
        <Badge
          variant="outline"
          className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-400"
        >
          {type}
        </Badge>
      )
    case "Tour":
      return (
        <Badge
          variant="outline"
          className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 border-cyan-400"
        >
          {type}
        </Badge>
      )
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

