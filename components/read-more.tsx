import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EVENTS, EventSchema } from "@/lib/constants";
import fs from "fs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import path from "path";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: keyof EventSchema;
}

function getImagesFromDirectory(directoryName: string) {
  const publicDir = path.join(process.cwd(), "public", "images", directoryName);
  console.log(process.cwd());
  console.log(publicDir);
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];

  const files = fs.readdirSync(publicDir);

  const images = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  console.log(images);

  return images.map((image) => `images/${directoryName}/${image}`);
}

export function ReadMoreButton({ eventName, ...props }: Props) {
  const { description, link, linkText, title } = EVENTS[eventName];

  const images = getImagesFromDirectory("5kRun");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className={`p-0 ${props} mb-2`}>
          Read more
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-3xl lg:max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-5 h-full">
          {/* Image Section - Takes up 2/5 of the space on medium screens and above */}
          <div className="hidden md:block md:col-span-2 bg-muted h-full">
            <img
              src="/images/5kRun/logo.png?height=600&width=400"
              alt="Product showcase"
              className="w-full h-full object-contain px-5"
            />
          </div>

          {/* Content Section - Takes up 3/5 of the space on medium screens and above */}
          <div className="p-6 md:col-span-3">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="mb-2">
                  Upcoming ~ MAR 17, 2025
                </Badge>
              </div>
              <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
              {/* <DialogDescription>
                Transform your living space with sustainable technology
              </DialogDescription> */}
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[40vh] md:h-[45vh] mt-4 pr-4">
                <TabsContent value="overview" className="space-y-4 mt-2">
                  <div className="md:hidden mb-4">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Product showcase"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  {description.map((item, index) => (
                    <p key={index} className="text-muted-foreground">{item}</p>
                  ))}
                </TabsContent>

                <TabsContent value="features" className="space-y-4 mt-2">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Energy Monitoring:</strong> Real-time tracking
                        of energy consumption with detailed analytics and
                        suggestions for optimization.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Smart Lighting:</strong> Adaptive lighting that
                        adjusts based on natural light levels and occupancy.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Climate Control:</strong> Zone-based temperature
                        management that optimizes for comfort and efficiency.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Water Conservation:</strong> Smart irrigation
                        and water usage monitoring to prevent waste.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Solar Integration:</strong> Seamless connection
                        with existing or new solar panel installations.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Voice Control:</strong> Natural language
                        processing for intuitive control of all connected
                        systems.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Mobile App:</strong> Comprehensive control and
                        monitoring from anywhere via our secure mobile
                        application.
                      </span>
                    </li>
                  </ul>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-4 mt-2">
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <img
                        src={img}
                        key={index}
                        alt="5krun-img"
                        className="w-full h-full border rounded-md shadow-md object-cover"
                      />
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <DialogFooter className="mt-6">
              {link && (
                <Link href={link} target="_blank">
                  <Button className="sm:flex-1">{linkText}</Button>
                </Link>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
