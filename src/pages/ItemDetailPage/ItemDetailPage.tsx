import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useItem } from '@/hooks';
import {
  ImageGallery,
  ItemDetails,
  OwnerSidebar,
  ItemDetailLoadingState,
  ItemDetailErrorState,
} from '@/components/itemDetail';
import { PageContainer, BackButton, ContentWrapper, MainContent } from './ItemDetailPage.styled';

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: item?.title || 'Lost & Found Item',
          text: item?.description || 'Check out this item on Sigide',
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <PageContainer maxWidth="lg">
        <BackButton startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Go Back
        </BackButton>
        <ItemDetailLoadingState />
      </PageContainer>
    );
  }

  if (error || !item) {
    return (
      <PageContainer maxWidth="lg">
        <BackButton startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Go Back
        </BackButton>
        <ItemDetailErrorState />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">
      <BackButton startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
        Go Back
      </BackButton>

      <ContentWrapper>
        <MainContent>
          <ImageGallery
            imageUrls={item.image_urls || []}
            selectedIndex={selectedImageIndex}
            onSelectImage={setSelectedImageIndex}
          />
          <ItemDetails item={item} />
        </MainContent>

        <Box>
          <OwnerSidebar item={item} onShare={handleShare} />
        </Box>
      </ContentWrapper>
    </PageContainer>
  );
}

export default ItemDetailPage;
