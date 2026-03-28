import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuthStore } from '@/store';
import {
  useMyItems,
  useUpdateProfile,
  useDeleteItem,
  useCurrentUser,
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
  useSavedItems,
  useUnsaveItem,
  MY_ITEMS_QUERY_KEY,
} from '@/hooks';
import { AddItemDialog } from '@/components';
import type { Item, UpdateUserData, CreateAddressData, UpdateAddressData } from '@/types';
import {
  ProfileHeader,
  EditProfileForm,
  MyItemsSection,
  DeleteItemDialog,
  AddressSection,
  SettingsSection,
  PersonalInfoSection,
  SavedItemsSection,
} from '@/components/profile';
import {
  PageContainer,
  ContentWrapper,
  MainContent,
  Sidebar,
  TabPanel,
} from './ProfilePage.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <TabPanel role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </TabPanel>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user: storeUser, logout } = useAuthStore();
  const { data: fetchedUser, isLoading: isLoadingUser } = useCurrentUser();
  const user = fetchedUser ?? storeUser;
  const {
    items,
    isLoading: isLoadingItems,
    isError: isItemsError,
    error: itemsError,
  } = useMyItems();
  const { updateProfile, isPending: isUpdatingProfile, error: updateError } = useUpdateProfile();
  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteItem();

  // Address hooks
  const { addresses, isLoading: isLoadingAddresses } = useAddresses();
  const { createAddress } = useCreateAddress();
  const { updateAddress } = useUpdateAddress();
  const { deleteAddress } = useDeleteAddress();
  const { setDefaultAddress } = useSetDefaultAddress();

  // Saved items hooks
  const {
    data: savedItemsData,
    isLoading: isLoadingSavedItems,
    isError: isSavedItemsError,
    error: savedItemsError,
  } = useSavedItems();
  const { mutateAsync: unsaveItem } = useUnsaveItem();

  const [activeTab, setActiveTab] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editDialogItem, setEditDialogItem] = useState<Item | null>(null);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode) {
      setProfileError(null);
    }
  }, [isEditMode]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditClick = useCallback(() => {
    setIsEditMode(true);
    setProfileError(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditMode(false);
    setProfileError(null);
  }, []);

  const onProfileSubmit = async (data: UpdateUserData) => {
    setProfileError(null);
    try {
      updateProfile(data);
      setIsEditMode(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      setProfileError(errorMessage);
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    try {
      updateProfile({ avatar_url: url });
    } catch (error) {
      console.error('Failed to update avatar:', error);
    }
  };

  const handleEditItem = useCallback((item: Item) => {
    setEditDialogItem(item);
  }, []);

  const handleDeleteClick = useCallback((item: Item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await deleteItem(itemToDelete.id);
      queryClient.invalidateQueries({ queryKey: [MY_ITEMS_QUERY_KEY] });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  }, []);

  const handleAddItemDialogClose = useCallback(() => {
    setAddItemDialogOpen(false);
    setEditDialogItem(null);
  }, []);

  // Address handlers
  const handleAddAddress = async (data: CreateAddressData) => {
    await createAddress(data);
  };

  const handleUpdateAddress = async (id: string, data: UpdateAddressData) => {
    await updateAddress({ id, data });
  };

  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id);
  };

  const handleSetDefaultAddress = async (id: string) => {
    await setDefaultAddress(id);
  };

  const handleRemoveSavedItem = async (itemId: string) => {
    await unsaveItem(itemId);
  };

  const handleOpenPasswordDialog = useCallback(() => {
    setActiveTab(2);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageContainer>
      <ProfileHeader
        user={user}
        isLoading={isLoadingUser}
        itemsCount={items?.length || 0}
        onEditClick={handleEditClick}
        onAvatarUpdate={handleAvatarUpdate}
      />

      {isEditMode ? (
        <Box sx={{ maxWidth: 600, mx: 'auto', px: 3 }}>
          <EditProfileForm
            user={user}
            isUpdating={isUpdatingProfile}
            error={updateError}
            profileError={profileError}
            onSubmit={onProfileSubmit}
            onCancel={handleCancelEdit}
          />
        </Box>
      ) : (
        <ContentWrapper>
          <MainContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="My Items" />
                <Tab label="Saved Items" />
                <Tab label="Personal Info" />
                <Tab label="Addresses" />
              </Tabs>
            </Box>

            <CustomTabPanel value={activeTab} index={0}>
              <MyItemsSection
                items={items}
                isLoading={isLoadingItems}
                isError={isItemsError}
                error={itemsError}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteClick}
                onAddItem={() => setAddItemDialogOpen(true)}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={1}>
              <SavedItemsSection
                items={savedItemsData?.items || []}
                isLoading={isLoadingSavedItems}
                isError={isSavedItemsError}
                error={savedItemsError}
                onRemoveItem={handleRemoveSavedItem}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={2}>
              <PersonalInfoSection
                user={user}
                isLoading={isLoadingUser}
                onUpdateProfile={updateProfile}
                isUpdating={isUpdatingProfile}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={3}>
              <AddressSection
                addresses={addresses}
                isLoading={isLoadingAddresses}
                onAddAddress={handleAddAddress}
                onUpdateAddress={handleUpdateAddress}
                onDeleteAddress={handleDeleteAddress}
                onSetDefault={handleSetDefaultAddress}
              />
            </CustomTabPanel>
          </MainContent>

          <Sidebar>
            <SettingsSection
              onLogout={handleLogout}
              onOpenPasswordDialog={handleOpenPasswordDialog}
            />
          </Sidebar>
        </ContentWrapper>
      )}

      <AddItemDialog
        open={addItemDialogOpen || Boolean(editDialogItem)}
        onClose={handleAddItemDialogClose}
        item={editDialogItem || undefined}
      />

      <DeleteItemDialog
        open={deleteDialogOpen}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </PageContainer>
  );
}

export default ProfilePage;
