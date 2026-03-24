import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer, ErrorIcon, BrowseButton } from './ItemDetailErrorState.styled';

export function ItemDetailErrorState() {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorIcon>
        <ErrorOutlineIcon />
      </ErrorIcon>
      <Typography variant="h5" fontWeight={700} color="text.primary">
        Item Not Found
      </Typography>
      <Typography color="text.secondary" maxWidth={400}>
        The item you're looking for doesn't exist or has been removed. It may have been reunited
        with its owner!
      </Typography>
      <BrowseButton variant="contained" onClick={() => navigate('/')}>
        Browse All Items
      </BrowseButton>
    </ErrorContainer>
  );
}

export default ItemDetailErrorState;
