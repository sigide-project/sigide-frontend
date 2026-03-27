import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useItem } from '@/hooks';
import { pageVariants, DURATION, EASE, SPRING } from '@/utils/animations';
import { buildShareMessage } from '@/utils';
import {
  ImageGallery,
  ItemDetails,
  OwnerSidebar,
  ItemDetailLoadingState,
  ItemDetailErrorState,
} from '@/components/itemDetail';
import { PageContainer, BackButton, ContentWrapper, MainContent } from './ItemDetailPage.styled';

const MotionPageContainer = motion.create(PageContainer);
const MotionBackButton = motion.create(BackButton);
const MotionContentWrapper = motion.create(ContentWrapper);

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useItem(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleShare = async () => {
    const title = item?.title || 'Lost & Found Item';
    const url = window.location.href;
    const fullMessage = buildShareMessage({
      title: item?.title,
      description: item?.description,
      url,
    });

    if (navigator.share) {
      try {
        await navigator.share({ title, text: fullMessage, url });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(fullMessage);
    }
  };

  if (isLoading) {
    return (
      <MotionPageContainer
        maxWidth="lg"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        <MotionBackButton
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={SPRING.gentle}
        >
          Go Back
        </MotionBackButton>
        <ItemDetailLoadingState />
      </MotionPageContainer>
    );
  }

  if (error || !item) {
    return (
      <MotionPageContainer
        maxWidth="lg"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        <MotionBackButton
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={SPRING.gentle}
        >
          Go Back
        </MotionBackButton>
        <ItemDetailErrorState />
      </MotionPageContainer>
    );
  }

  return (
    <MotionPageContainer
      maxWidth="lg"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <MotionBackButton
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={SPRING.gentle}
      >
        Go Back
      </MotionBackButton>

      <MotionContentWrapper variants={contentVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <MainContent>
            <ImageGallery
              imageUrls={item.image_urls || []}
              selectedIndex={selectedImageIndex}
              onSelectImage={setSelectedImageIndex}
            />
            <ItemDetails item={item} />
          </MainContent>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box>
            <OwnerSidebar item={item} onShare={handleShare} />
          </Box>
        </motion.div>
      </MotionContentWrapper>
    </MotionPageContainer>
  );
}

export default ItemDetailPage;
