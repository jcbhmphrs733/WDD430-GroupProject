import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center sm:items-start max-w-4xl mx-auto">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl heading-primary text-text-500 mb-2">
          Welcome to Handcrafted Haven!
        </h1>
        <p className="text-lg sm:text-xl text-text-400 max-w-2xl text-center sm:text-left">
          Explore what others have crafted and share your own creations with our community of passionate makers and artisans.
        </p>

        <div className="text-center flex gap-4 items-center flex-col sm:flex-row">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Explore
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Become a Creator
          </Button>
        </div>
      </main>
    </div>
  );
}
