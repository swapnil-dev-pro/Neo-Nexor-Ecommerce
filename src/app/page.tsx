import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { NewArrivals } from "@/components/NewArrivals";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-white">
        <CategoryStrip />
      </div>
      <FeaturedProducts />
      <div className="bg-white">
        <NewArrivals />
      </div>
      <Newsletter />
    </main>
  );
}