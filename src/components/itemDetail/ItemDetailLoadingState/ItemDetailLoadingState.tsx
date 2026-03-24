import { CircularProgress, Typography } from '@mui/material';
import { LoadingContainer } from './ItemDetailLoadingState.styled';

export function ItemDetailLoadingState() {
  return (
    <LoadingContainer>
      <CircularProgress size={48} />
      <Typography color="text.secondary" fontWeight={500}>
        Loading item details...
      </Typography>
    </LoadingContainer>
  );
}

export default ItemDetailLoadingState;
