import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DURATION, EASE, SPRING, viewportOnce } from '@/utils/animations';
import {
  CTASection as CTASectionContainer,
  CTACard,
  CTATitle,
  CTADescription,
  CTAWhiteButton,
  DecorativeRing,
} from './CTASection.styled';

const MotionCTACard = motion.create(CTACard);
const MotionCTAWhiteButton = motion.create(CTAWhiteButton);

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export function CTASection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/feed');
  };

  return (
    <CTASectionContainer>
      <MotionCTACard
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <DecorativeRing size={200} top="-50px" right="-50px" />
        <DecorativeRing size={150} top="60%" right="80%" />

        <CTATitle variant="h2">Ready to Reunite with What Matters?</CTATitle>
        <CTADescription>
          Join our community today and start connecting with people who can help you find your lost
          items or return found belongings to their owners.
        </CTADescription>
        <MotionCTAWhiteButton
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={handleGetStarted}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING.gentle}
        >
          Browse Lost & Found Items
        </MotionCTAWhiteButton>
      </MotionCTACard>
    </CTASectionContainer>
  );
}

export default CTASection;
