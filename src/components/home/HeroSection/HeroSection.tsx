import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  heroContainerVariants,
  heroBadgeVariants,
  heroTitleVariants,
  heroSubtitleVariants,
  heroCTAVariants,
  floatVariants,
  pulseVariants,
  SPRING,
} from '@/utils/animations';
import {
  HeroSection as HeroSectionContainer,
  HeroBackground,
  FloatingOrb,
  FloatingShape,
  HeroContent,
  Badge,
  HeroTitle,
  HeroSubtitle,
  CTAContainer,
  PrimaryButton,
  SecondaryButton,
} from './HeroSection.styled';

const MotionBadge = motion.create(Badge);
const MotionHeroTitle = motion.create(HeroTitle);
const MotionHeroSubtitle = motion.create(HeroSubtitle);
const MotionCTAContainer = motion.create(CTAContainer);
const MotionPrimaryButton = motion.create(PrimaryButton);
const MotionSecondaryButton = motion.create(SecondaryButton);
const MotionFloatingOrb = motion.create(FloatingOrb);
const MotionFloatingShape = motion.create(FloatingShape);

export function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/feed');
  };

  const handleReportLost = () => {
    navigate('/feed');
  };

  const handleReportFound = () => {
    navigate('/feed');
  };

  return (
    <HeroSectionContainer>
      <HeroBackground />

      <MotionFloatingOrb
        size={400}
        top="-10%"
        left="-5%"
        delay={0}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
      <MotionFloatingOrb
        size={300}
        bottom="10%"
        right="-5%"
        delay={1}
        color="linear-gradient(135deg, #D946EF 0%, #F0ABFC 100%)"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      />
      <MotionFloatingOrb
        size={200}
        top="60%"
        left="10%"
        delay={2}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
      />

      <MotionFloatingShape
        size={60}
        top="15%"
        right="15%"
        delay={0}
        variant="square"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />
      <MotionFloatingShape
        size={40}
        top="25%"
        left="20%"
        delay={1}
        variant="circle"
        animate={{
          y: [-8, 8, -8],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      <MotionFloatingShape
        size={50}
        bottom="25%"
        right="20%"
        delay={2}
        variant="square"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      />
      <MotionFloatingShape
        size={35}
        bottom="35%"
        left="15%"
        delay={3}
        variant="circle"
        animate={{
          y: [-6, 6, -6],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1.5,
        }}
      />
      <MotionFloatingShape
        size={45}
        top="45%"
        right="8%"
        delay={4}
        variant="square"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
      />

      <motion.div
        variants={heroContainerVariants}
        initial="initial"
        animate="animate"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <HeroContent as={motion.div}>
          <MotionBadge variants={heroBadgeVariants}>
            <AutoAwesomeIcon />
            Trusted by thousands of users
          </MotionBadge>

          <MotionHeroTitle variant="h1" variants={heroTitleVariants}>
            Lost Something?
            <br />
            <span>We'll Help You Find It</span>
          </MotionHeroTitle>

          <MotionHeroSubtitle variants={heroSubtitleVariants}>
            Sigide connects people who've lost items with those who've found them. Our
            community-powered platform makes reuniting with your belongings simple, secure, and
            stress-free.
          </MotionHeroSubtitle>

          <MotionCTAContainer variants={heroCTAVariants}>
            <MotionPrimaryButton
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleGetStarted}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING.gentle}
            >
              Get Started
            </MotionPrimaryButton>
            <MotionSecondaryButton
              variant="outlined"
              size="large"
              startIcon={<ReportProblemIcon />}
              onClick={handleReportLost}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING.gentle}
            >
              Report Lost Item
            </MotionSecondaryButton>
            <MotionSecondaryButton
              variant="outlined"
              size="large"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={handleReportFound}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING.gentle}
            >
              Report Found Item
            </MotionSecondaryButton>
          </MotionCTAContainer>
        </HeroContent>
      </motion.div>
    </HeroSectionContainer>
  );
}

export default HeroSection;
