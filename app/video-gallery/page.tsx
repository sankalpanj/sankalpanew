import Footer from "@/components/footer";
import Header from "@/components/header";
import VideoGrid from "@/components/video-gallery/video-grid";

export default function VideoGalleryHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <VideoGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
