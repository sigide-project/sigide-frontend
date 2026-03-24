import { useState } from 'react';
import { Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  FAQList,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  ExpandIcon,
} from './FAQPage.styled';

const faqs = [
  {
    question: 'How do I report a lost item?',
    answer:
      'To report a lost item, sign in to your account and click on "Report Lost Item". Fill in the details including a description, photos, location where you lost it, and any reward you\'re offering. The more details you provide, the better chance of finding your item.',
  },
  {
    question: 'How do I report a found item?',
    answer:
      'If you\'ve found an item, click on "Report Found Item" and provide as much detail as possible without revealing identifying information that only the owner would know. This helps verify legitimate claims.',
  },
  {
    question: 'Is Sigide free to use?',
    answer:
      'Yes! Sigide is completely free for all users. We believe in building a community where everyone can help each other find lost belongings without any barriers.',
  },
  {
    question: 'How do I verify ownership of an item?',
    answer:
      'When someone claims an item, ask them specific questions that only the true owner would know - like unique marks, contents, or circumstances of loss. You can also request proof of purchase or photos.',
  },
  {
    question: 'What should I do if I find a suspicious listing?',
    answer:
      'If you encounter a suspicious listing or user, please report it immediately using the "Report" button on the listing or contact our support team. We take all reports seriously and investigate promptly.',
  },
  {
    question: 'How do rewards work?',
    answer:
      'Rewards are optional and set by the person who lost the item. If you find an item with a reward, you can claim it after the owner verifies your find. Payment arrangements are made between the parties.',
  },
  {
    question: 'Can I edit or delete my listing?',
    answer:
      'Yes, you can edit or delete your listings at any time from your profile page. We recommend updating the status when an item is found or no longer relevant.',
  },
  {
    question: 'How do I contact the person who found/lost an item?',
    answer:
      "Once you find a potential match, use our secure in-app messaging system to contact the other party. This keeps your personal contact information private until you're ready to share it.",
  },
];

export function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Frequently Asked Questions</HeroTitle>
          <HeroSubtitle>Find answers to common questions about using Sigide</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="md">
          <FAQList>
            {faqs.map((faq, index) => (
              <FAQItem key={index} expanded={expandedIndex === index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <ExpandIcon expanded={expandedIndex === index}>
                    <ExpandMoreIcon />
                  </ExpandIcon>
                </FAQQuestion>
                <FAQAnswer expanded={expandedIndex === index}>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default FAQPage;
