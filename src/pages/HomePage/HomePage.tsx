import { PageContainer } from './HomePage.styled';
import { Footer } from '@/components/Footer';
import { PublicNavbar } from '@/components/PublicNavbar';
import { HeroSection, StatsSection, FeaturesSection, CTASection } from '@/components/home';

export function HomePage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </PageContainer>
  );
}

export default HomePage;
