import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  FooterContainer,
  FooterContent,
  BrandSection,
  LogoContainer,
  LogoIcon,
  LogoLetter,
  LogoText,
  BrandDescription,
  SocialLinks,
  SocialLink,
  FooterSection,
  SectionTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  Copyright,
  LegalLinks,
  LegalLink,
  HeartIcon,
  GradientAccent,
} from './Footer.styled';

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <BrandSection>
          <LogoContainer onClick={handleLogoClick}>
            <LogoIcon className="footer-logo-icon">
              <LogoLetter>S</LogoLetter>
            </LogoIcon>
            <LogoText>Sigide</LogoText>
          </LogoContainer>
          <BrandDescription>
            Reuniting people with their lost belongings through the power of community. Every item
            has a story waiting to continue.
          </BrandDescription>
          <SocialLinks>
            <SocialLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </SocialLink>
          </SocialLinks>
        </BrandSection>

        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <FooterLinks>
            <FooterLink onClick={() => handleNavigation('/')}>
              Home
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/feed')}>
              Browse Items
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/profile')}>
              My Profile
              <ArrowForwardIcon />
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Resources</SectionTitle>
          <FooterLinks>
            <FooterLink onClick={() => handleNavigation('/how-it-works')}>
              How It Works
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/safety-tips')}>
              Safety Tips
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/faq')}>
              FAQ
              <ArrowForwardIcon />
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Support</SectionTitle>
          <FooterLinks>
            <FooterLink onClick={() => handleNavigation('/contact')}>
              Contact Us
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/report-issue')}>
              Report an Issue
              <ArrowForwardIcon />
            </FooterLink>
            <FooterLink onClick={() => handleNavigation('/feedback')}>
              Feedback
              <ArrowForwardIcon />
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {currentYear} Sigide. Made with{' '}
          <HeartIcon>
            <FavoriteIcon sx={{ fontSize: '0.875rem', verticalAlign: 'middle' }} />
          </HeartIcon>{' '}
          for the community.
        </Copyright>
        <LegalLinks>
          <LegalLink onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</LegalLink>
          <LegalLink onClick={() => handleNavigation('/terms-of-service')}>
            Terms of Service
          </LegalLink>
          <LegalLink onClick={() => handleNavigation('/cookie-policy')}>Cookie Policy</LegalLink>
        </LegalLinks>
      </FooterBottom>

      <GradientAccent />
    </FooterContainer>
  );
}

export default Footer;
