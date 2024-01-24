import FeaturedTours from "@/components/shared/FeaturedTours";
import Hero from "@/components/shared/Hero";

export default function Home() {
  return (
    <main className="flex flex-col pb-11">
      <Hero />
      <FeaturedTours />
    </main>
  );
}
