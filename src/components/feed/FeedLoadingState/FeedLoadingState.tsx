import { CircularProgress } from '@mui/material';
import { LoadingContainer, LoadingText } from './FeedLoadingState.styled';

export function FeedLoadingState() {
  return (
    <LoadingContainer>
      <CircularProgress size={48} />
      <LoadingText>Finding items near you...</LoadingText>
    </LoadingContainer>
  );
}

export default FeedLoadingState;
