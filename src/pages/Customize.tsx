
import Navbar from "@/components/Navbar";
import AvatarCustomizer from "@/components/AvatarCustomizer";

const Customize = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Customize Bloomie</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Make Bloomie truly yours by customizing how your AI friend looks and feels.
          </p>
          <div className="bg-card rounded-xl shadow-sm border">
            <AvatarCustomizer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
