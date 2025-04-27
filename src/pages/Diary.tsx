
import Navbar from "@/components/Navbar";
import EmotionalDiary from "@/components/EmotionalDiary";

const Diary = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Emotional Diary</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Track your moods and feelings over time. Bloomie will help you identify patterns and provide insights to improve your emotional wellbeing.
          </p>
          <EmotionalDiary />
        </div>
      </main>
    </div>
  );
};

export default Diary;
