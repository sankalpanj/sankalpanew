import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoCard from "./video-card";

// Sample video data - in a real app, this would come from an API or CMS
const videos = [
  {
    id: "nUaQ6JVQ0Ds", // YouTube video ID
    title: "Plainsboro's Annual 5K Run and 2K Walk",
    description:
      "Highlights from our Annual 5K Run/2K Walk event  at Plainsboro Community Park, featuring special guests and inspiring stories.",
    thumbnail:
      "https://img.youtube.com/vi/nUaQ6JVQ0Ds/hqdefault.jpg?height=300&width=600",
    category: "community",
    date: "April 17, 2025",
  },
];

export default function VideoGrid() {
  return (
    <Tabs defaultValue="all" className="w-full py-8">
      <TabsList className="w-full justify-start overflow-hidden overflow-x-auto py-2">
        <TabsTrigger value="all">All Videos</TabsTrigger>
        <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
        <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        <TabsTrigger value="education">Educational</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              id={video.id}
              title={video.title}
              description={video.description}
              date={video.date}
              thumbnail={video.thumbnail}
            />
          ))}
        </div>
      </TabsContent>

      {["fundraising", "volunteer", "education", "community"].map(
        (category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .filter((video) => video.category === category)
                .map((video, index) => {
                  console.log("category video: ", video);
                  return (
                    <VideoCard
                      key={index}
                      id={video.id}
                      title={video.title}
                      description={video.description}
                      date={video.date}
                      thumbnail={video.thumbnail}
                    />
                  );
                })}
            </div>
          </TabsContent>
        )
      )}
    </Tabs>
  );
}
