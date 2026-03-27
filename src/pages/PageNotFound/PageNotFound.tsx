import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import { pageVariants, SPRING, EASE, DURATION } from '@/utils/animations';
import logoTransparent from '@/assets/logo_transparent.png';
import {
  PageContainer,
  BackgroundOrb,
  Particle,
  ContentWrapper,
  GlitchWrapper,
  GlitchText,
  GlitchOverlay,
  ScanlineOverlay,
  Subtitle,
  Description,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  GlassCard,
  CompassWrapper,
} from './PageNotFound.styled';

const MotionPageContainer = motion.create(PageContainer);
const MotionContentWrapper = motion.create(ContentWrapper);
const MotionGlassCard = motion.create(GlassCard);
const MotionCompassWrapper = motion.create(CompassWrapper);
const MotionGlitchWrapper = motion.create(GlitchWrapper);
const MotionSubtitle = motion.create(Subtitle);
const MotionDescription = motion.create(Description);
const MotionButtonGroup = motion.create(ButtonGroup);

const orbs = [
  { size: 400, top: '10%', left: '15%', delay: 0 },
  { size: 300, top: '60%', left: '70%', delay: 2 },
  { size: 250, top: '30%', left: '80%', delay: 4 },
  { size: 350, top: '70%', left: '5%', delay: 1 },
];

const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 7.5}%`,
  size: 3 + Math.random() * 4,
  delay: i * 0.8,
  duration: 8 + Math.random() * 6,
}));

const compassVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 15, -15, 10, -10, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut' as const,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const childFade = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
};

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <MotionPageContainer
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      data-testid="page-not-found"
    >
      {orbs.map((orb, i) => (
        <BackgroundOrb key={i} {...orb} />
      ))}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <MotionContentWrapper
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
        }}
      >
        <MotionGlassCard
          variants={childFade}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.01 }}
          transition={SPRING.gentle}
        >
          <ScanlineOverlay />

          <MotionCompassWrapper variants={compassVariants} initial="initial" animate="animate">
            <img
              src={logoTransparent}
              alt="Sigide logo"
              style={{ width: '56px', height: '56px', objectFit: 'contain' }}
            />
          </MotionCompassWrapper>

          <MotionGlitchWrapper variants={childFade}>
            <GlitchText aria-hidden="true">404</GlitchText>
            <GlitchOverlay aria-hidden="true">404</GlitchOverlay>
          </MotionGlitchWrapper>

          <MotionSubtitle variants={childFade}>Oops! You&apos;re off the map</MotionSubtitle>

          <MotionDescription variants={childFade}>
            The page you&apos;re looking for has wandered off into the void. Let&apos;s get you back
            on track.
          </MotionDescription>

          <MotionButtonGroup variants={childFade}>
            <PrimaryButton
              onClick={() => navigate('/')}
              startIcon={<HomeRoundedIcon />}
              data-testid="home-link"
            >
              Go Home
            </PrimaryButton>
            <SecondaryButton
              onClick={() => navigate('/feed')}
              startIcon={<DynamicFeedRoundedIcon />}
              data-testid="feed-link"
            >
              Browse Feed
            </SecondaryButton>
          </MotionButtonGroup>
        </MotionGlassCard>
      </MotionContentWrapper>
    </MotionPageContainer>
  );
}

export default PageNotFound;
