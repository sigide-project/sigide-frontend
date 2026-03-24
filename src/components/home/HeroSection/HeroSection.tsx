import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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

      <FloatingOrb size={400} top="-10%" left="-5%" delay={0} />
      <FloatingOrb
        size={300}
        bottom="10%"
        right="-5%"
        delay={1}
        color="linear-gradient(135deg, #D946EF 0%, #F0ABFC 100%)"
      />
      <FloatingOrb size={200} top="60%" left="10%" delay={2} />

      <FloatingShape size={60} top="15%" right="15%" delay={0} variant="square" />
      <FloatingShape size={40} top="25%" left="20%" delay={1} variant="circle" />
      <FloatingShape size={50} bottom="25%" right="20%" delay={2} variant="square" />
      <FloatingShape size={35} bottom="35%" left="15%" delay={3} variant="circle" />
      <FloatingShape size={45} top="45%" right="8%" delay={4} variant="square" />

      <HeroContent>
        <Badge>
          <AutoAwesomeIcon />
          Trusted by thousands of users
        </Badge>

        <HeroTitle variant="h1">
          Lost Something?
          <br />
          <span>We'll Help You Find It</span>
        </HeroTitle>

        <HeroSubtitle>
          Sigide connects people who've lost items with those who've found them. Our
          community-powered platform makes reuniting with your belongings simple, secure, and
          stress-free.
        </HeroSubtitle>

        <CTAContainer>
          <PrimaryButton
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleGetStarted}
          >
            Get Started
          </PrimaryButton>
          <SecondaryButton
            variant="outlined"
            size="large"
            startIcon={<ReportProblemIcon />}
            onClick={handleReportLost}
          >
            Report Lost Item
          </SecondaryButton>
          <SecondaryButton
            variant="outlined"
            size="large"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleReportFound}
          >
            Report Found Item
          </SecondaryButton>
        </CTAContainer>
      </HeroContent>
    </HeroSectionContainer>
  );
}

export default HeroSection;
