import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import type { Item } from '@/types';
import { useToggleSaveItem, useSavedItemIds } from '@/hooks';
import { useAuthStore } from '@/store';
import { formatDateTime, getInitials } from '@/utils';
import {
  SidebarCard,
  OwnerSection,
  OwnerAvatar,
  OwnerName,
  OwnerLabel,
  ContactButton,
  SecondaryButton,
  ActionButtonsContainer,
  ShareButton,
  DateInfo,
  DateRow,
  DateLabel,
  DateValue,
} from './OwnerSidebar.styled';

interface OwnerSidebarProps {
  item: Item;
  onShare: () => void;
}

export function OwnerSidebar({ item, onShare }: OwnerSidebarProps) {
  const navigate = useNavigate();
  const { owner, createdAt } = item;
  const { isAuthenticated } = useAuthStore();

  const { data: savedIds = [] } = useSavedItemIds();
  const isSaved = isAuthenticated ? savedIds.includes(item.id) : false;
  const { toggleSave, isPending: isSaveLoading } = useToggleSaveItem();

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleSave(item.id, isSaved);
  };

  const ownerInitials = getInitials(owner?.name);

  const handleOwnerClick = () => {
    if (owner?.username) {
      navigate(`/user/${owner.username}`);
    }
  };

  return (
    <SidebarCard elevation={0}>
      <OwnerSection
        onClick={handleOwnerClick}
        sx={{
          cursor: owner?.username ? 'pointer' : 'default',
          '&:hover': owner?.username
            ? {
                backgroundColor: 'action.hover',
                borderRadius: 1,
              }
            : {},
          transition: 'background-color 0.2s',
          padding: 1,
          margin: 1,
        }}
      >
        <OwnerAvatar src={owner?.avatar_url || undefined}>
          {!owner?.avatar_url && ownerInitials}
        </OwnerAvatar>
        <Box>
          <OwnerLabel>Posted by</OwnerLabel>
          <OwnerName
            sx={{
              '&:hover': owner?.username
                ? {
                    textDecoration: 'underline',
                  }
                : {},
            }}
          >
            {owner?.name || 'Anonymous'}
          </OwnerName>
        </Box>
      </OwnerSection>

      <ActionButtonsContainer>
        <ContactButton variant="contained" fullWidth size="large">
          Contact Owner
        </ContactButton>
        <SecondaryButton
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleSaveClick}
          disabled={isSaveLoading}
          sx={{
            ...(isSaved && {
              borderColor: 'primary.main',
              backgroundColor: 'primary.50',
              '&:hover': {
                backgroundColor: 'primary.100',
                borderColor: 'primary.main',
              },
            }),
          }}
        >
          {isSaveLoading ? (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          ) : isSaved ? (
            <BookmarkIcon sx={{ mr: 1 }} color="primary" />
          ) : (
            <BookmarkBorderIcon sx={{ mr: 1 }} />
          )}
          {isSaved ? 'Saved' : 'Save Item'}
        </SecondaryButton>
        <ShareButton variant="text" fullWidth onClick={onShare}>
          <ShareIcon />
          Share
        </ShareButton>
      </ActionButtonsContainer>

      {createdAt && (
        <DateInfo>
          <DateRow>
            <DateLabel>Posted on</DateLabel>
            <DateValue>{formatDateTime(createdAt)}</DateValue>
          </DateRow>
        </DateInfo>
      )}
    </SidebarCard>
  );
}

export default OwnerSidebar;
