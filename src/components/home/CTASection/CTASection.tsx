import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  CTASection as CTASectionContainer,
  CTACard,
  CTATitle,
  CTADescription,
  CTAWhiteButton,
  DecorativeRing,
} from './CTASection.styled';

export function CTASection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/feed');
  };

  return (
    <CTASectionContainer>
      <CTACard>
        <DecorativeRing size={200} top="-50px" right="-50px" />
        <DecorativeRing size={150} top="60%" right="80%" />

        <CTATitle variant="h2">Ready to Reunite with What Matters?</CTATitle>
        <CTADescription>
          Join our community today and start connecting with people who can help you find your lost
          items or return found belongings to their owners.
        </CTADescription>
        <CTAWhiteButton
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={handleGetStarted}
        >
          Browse Lost & Found Items
        </CTAWhiteButton>
      </CTACard>
    </CTASectionContainer>
  );
}

export default CTASection;
