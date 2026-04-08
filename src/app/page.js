import { getVehicles } from '@/utils/supabaseClient';
import HeroSection from '@/components/HeroSection/HeroSection';
import InventoryGrid from '@/components/InventoryGrid/InventoryGrid';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import OurTeam from '@/components/OurTeam/OurTeam';

export default async function Home() {
  const vehicles = await getVehicles();

  return (
    <main>
      <HeroSection />
      <InventoryGrid vehicles={vehicles.slice(0, 5)} />
      <WhyChooseUs />
      <OurTeam />
    </main>
  );
}
