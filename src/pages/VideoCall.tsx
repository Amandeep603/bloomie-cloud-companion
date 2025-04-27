
import Navbar from "@/components/Navbar";
import VideoCallComponent from "@/components/VideoCall";

const VideoCallPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Video Call</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Have face-to-face conversations with Bloomie through our animated avatar technology.
          </p>
          <div className="bg-card rounded-xl shadow-sm border p-6 h-[500px]">
            <VideoCallComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoCallPage;
