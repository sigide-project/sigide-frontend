import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import type { Address } from '@/types';
import { AddressDialog } from '../AddressDialog';
import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  AddressGrid,
  AddressCard,
  AddressCardHeader,
  AddressLabel,
  AddressContent,
  AddressLine,
  DefaultBadge,
  EmptyAddressState,
} from './AddressSection.styled';

interface AddressSectionProps {
  addresses: Address[];
  isLoading: boolean;
  onAddAddress: (data: any) => Promise<void>;
  onUpdateAddress: (id: string, data: any) => Promise<void>;
  onDeleteAddress: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
}

const getLabelIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('home')) return <HomeIcon />;
  if (lowerLabel.includes('work') || lowerLabel.includes('office')) return <WorkIcon />;
  return <LocationOnIcon />;
};

export function AddressSection({
  addresses,
  isLoading,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefault,
}: AddressSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement; address: Address } | null>(null);

  const handleOpenDialog = (address?: Address) => {
    setEditingAddress(address || null);
    setDialogOpen(true);
    setMenuAnchor(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = async (data: any) => {
    if (editingAddress) {
      await onUpdateAddress(editingAddress.id, data);
    } else {
      await onAddAddress(data);
    }
    handleCloseDialog();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, address: Address) => {
    setMenuAnchor({ el: event.currentTarget, address });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSetDefault = async () => {
    if (menuAnchor?.address) {
      await onSetDefault(menuAnchor.address.id);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (menuAnchor?.address) {
      await onDeleteAddress(menuAnchor.address.id);
    }
    handleMenuClose();
  };

  if (isLoading) {
    return (
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <LocationOnIcon />
            Saved Addresses
          </SectionTitle>
        </SectionHeader>
        <AddressGrid>
          {[1, 2].map((i) => (
            <Skeleton key={i} variant="rounded" height={140} />
          ))}
        </AddressGrid>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <SectionHeader>
        <SectionTitle>
          <LocationOnIcon />
          Saved Addresses
        </SectionTitle>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Address
        </Button>
      </SectionHeader>

      {addresses.length === 0 ? (
        <EmptyAddressState>
          <LocationOnIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No addresses saved yet
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
            Add your home or work address for quick access
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Add Your First Address
          </Button>
        </EmptyAddressState>
      ) : (
        <AddressGrid>
          {addresses.map((address) => (
            <AddressCard key={address.id}>
              <AddressCardHeader>
                <AddressLabel>
                  {getLabelIcon(address.label)}
                  <span>{address.label}</span>
                  {address.is_default && (
                    <DefaultBadge>
                      <StarIcon sx={{ fontSize: 12 }} />
                      Default
                    </DefaultBadge>
                  )}
                </AddressLabel>
                <IconButton size="small" onClick={(e) => handleMenuOpen(e, address)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </AddressCardHeader>
              <AddressContent>
                <AddressLine>{address.address_line1}</AddressLine>
                {address.address_line2 && <AddressLine>{address.address_line2}</AddressLine>}
                <AddressLine>
                  {address.city}, {address.state} {address.postal_code}
                </AddressLine>
                <AddressLine>{address.country}</AddressLine>
              </AddressContent>
            </AddressCard>
          ))}
        </AddressGrid>
      )}

      <Menu
        anchorEl={menuAnchor?.el}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleOpenDialog(menuAnchor?.address)}>Edit</MenuItem>
        {!menuAnchor?.address.is_default && (
          <MenuItem onClick={handleSetDefault}>Set as Default</MenuItem>
        )}
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

      <AddressDialog
        open={dialogOpen}
        address={editingAddress}
        onClose={handleCloseDialog}
        onSave={handleSaveAddress}
      />
    </SectionCard>
  );
}

export default AddressSection;
