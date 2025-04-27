
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">About Bloomie</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Bloomie is an AI companion designed to support your emotional wellbeing through friendly conversations and daily check-ins.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                We believe that everyone deserves a friendly ear and emotional support, whenever they need it. 
                Bloomie aims to be that supportive presence - available 24/7, judgment-free, and tailored to your unique personality.
              </p>
              <p>
                Our mission is to help people feel less alone, provide a safe space to express their feelings, 
                and guide them toward positive emotional growth.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">How Bloomie Works</h2>
              <p className="mb-4">
                Bloomie uses advanced AI technology to have natural, empathetic conversations with users. 
                The more you interact with Bloomie, the better it understands your personality, preferences, and needs.
              </p>
              <p>
                Everything you share with Bloomie is kept private and secure. Your conversations help Bloomie learn how to 
                support you better, but your personal data is never shared with third parties.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Empathy</strong> - We believe in the power of being heard and understood.</li>
                <li><strong>Accessibility</strong> - Emotional support should be available to everyone, anywhere, anytime.</li>
                <li><strong>Growth</strong> - We're committed to helping users develop emotional intelligence and resilience.</li>
                <li><strong>Privacy</strong> - Your conversations with Bloomie are private and secure.</li>
                <li><strong>Authenticity</strong> - While Bloomie is AI, we strive for genuine, meaningful interactions.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
