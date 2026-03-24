import ImageIcon from '@mui/icons-material/Image';
import { ImageGalleryContainer, MainImage, ThumbnailStrip, Thumbnail } from './ImageGallery.styled';

interface ImageGalleryProps {
  imageUrls: string[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
}

export function ImageGallery({ imageUrls, selectedIndex, onSelectImage }: ImageGalleryProps) {
  const hasImages = imageUrls && imageUrls.length > 0;
  const currentImage = hasImages ? imageUrls[selectedIndex] : null;

  return (
    <ImageGalleryContainer elevation={0}>
      <MainImage imageUrl={currentImage || undefined}>{!currentImage && <ImageIcon />}</MainImage>
      {hasImages && imageUrls.length > 1 && (
        <ThumbnailStrip>
          {imageUrls.map((url, index) => (
            <Thumbnail
              key={index}
              imageUrl={url}
              isActive={index === selectedIndex}
              onClick={() => onSelectImage(index)}
            />
          ))}
        </ThumbnailStrip>
      )}
    </ImageGalleryContainer>
  );
}

export default ImageGallery;
