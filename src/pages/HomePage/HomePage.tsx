import { motion } from 'framer-motion';
import { PageContainer } from './HomePage.styled';
import { Footer } from '@/components/Footer';
import { PublicNavbar } from '@/components/PublicNavbar';
import { HeroSection, StatsSection, FeaturesSection, CTASection } from '@/components/home';
import { pageVariants } from '@/utils/animations';

const MotionPageContainer = motion.create(PageContainer);

export function HomePage() {
  return (
    <MotionPageContainer initial="initial" animate="enter" exit="exit" variants={pageVariants}>
      <PublicNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </MotionPageContainer>
  );
}

export default HomePage;
