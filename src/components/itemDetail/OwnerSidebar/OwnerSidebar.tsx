import { useState } from 'react';
import { Box, CircularProgress, Typography, Chip } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatIcon from '@mui/icons-material/Chat';
import type { Item } from '@/types';
import { useToggleSaveItem, useSavedItemIds, useMyClaims } from '@/hooks';
import { useAuthStore } from '@/store';
import { formatDateTime, getInitials } from '@/utils';
import { ClaimSubmitDialog } from '@/components/ClaimSubmitDialog';
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
  const { isAuthenticated, user: currentUser } = useAuthStore();
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);

  const { data: savedIds = [] } = useSavedItemIds();
  const isSaved = isAuthenticated ? savedIds.includes(item.id) : false;
  const { toggleSave, isPending: isSaveLoading } = useToggleSaveItem();

  const { data: myClaims } = useMyClaims();
  const existingClaim = myClaims?.find((c) => c.item_id === item.id);

  const isOwner = isAuthenticated && currentUser?.id === item.user_id;
  const isItemOpen = item.status === 'open';
  const isItemClaimedOrResolved = item.status === 'claimed' || item.status === 'resolved';

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

  const handleMessageOwner = () => {
    if (existingClaim) {
      navigate(`/messages/${existingClaim.id}`);
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
        {!isAuthenticated ? (
          <Typography variant="body2" sx={{ textAlign: 'center', py: 1 }}>
            <Link to="/login" style={{ color: 'inherit' }}>
              Sign in to contact the owner
            </Link>
          </Typography>
        ) : isItemClaimedOrResolved ? (
          <Chip
            label={item.status === 'claimed' ? 'Item Claimed' : 'Item Resolved'}
            color={item.status === 'claimed' ? 'warning' : 'default'}
            sx={{ alignSelf: 'center' }}
          />
        ) : (
          <>
            {existingClaim ? (
              <ContactButton
                variant="contained"
                fullWidth
                size="large"
                onClick={handleMessageOwner}
                startIcon={<ChatIcon />}
              >
                Message Owner
              </ContactButton>
            ) : (
              !isOwner &&
              isItemOpen && (
                <ContactButton
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setClaimDialogOpen(true)}
                >
                  I Found This
                </ContactButton>
              )
            )}
          </>
        )}

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

      <ClaimSubmitDialog
        open={claimDialogOpen}
        onClose={() => setClaimDialogOpen(false)}
        item={{
          id: item.id,
          title: item.title,
          type: item.type,
          owner: owner ? { name: owner.name } : undefined,
        }}
      />
    </SidebarCard>
  );
}

export default OwnerSidebar;
