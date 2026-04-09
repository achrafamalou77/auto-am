import { getVehicles } from '@/utils/supabaseClient';
import HeroSection from '@/components/HeroSection/HeroSection';
import InventoryGrid from '@/components/InventoryGrid/InventoryGrid';
import PopularMakes from '@/components/PopularMakes/PopularMakes';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import OurTeam from '@/components/OurTeam/OurTeam';

export default async function Home() {
  const vehicles = await getVehicles();

  return (
    <main>
      <HeroSection />
      <InventoryGrid vehicles={vehicles.slice(0, 5)} />
      <PopularMakes vehicles={vehicles} />
      <WhyChooseUs />
      <OurTeam />
    </main>
  );
}
