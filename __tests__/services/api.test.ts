import {
  itemsApi,
  claimsApi,
  messagesApi,
  authApi,
  usersApi,
  uploadsApi,
  addressesApi,
  savedItemsApi,
  api,
} from '@/services/api';

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('itemsApi', () => {
    it('should have getItems method', () => {
      expect(itemsApi.getItems).toBeDefined();
    });

    it('should have getMyItems method', () => {
      expect(itemsApi.getMyItems).toBeDefined();
    });

    it('should have getItem method', () => {
      expect(itemsApi.getItem).toBeDefined();
    });

    it('should have createItem method', () => {
      expect(itemsApi.createItem).toBeDefined();
    });

    it('should have updateItem method', () => {
      expect(itemsApi.updateItem).toBeDefined();
    });

    it('should have deleteItem method', () => {
      expect(itemsApi.deleteItem).toBeDefined();
    });

    it('should have uploadPhoto method', () => {
      expect(itemsApi.uploadPhoto).toBeDefined();
    });
  });

  describe('claimsApi', () => {
    it('should have submitClaim method', () => {
      expect(claimsApi.submitClaim).toBeDefined();
    });

    it('should have getMyClaims method', () => {
      expect(claimsApi.getMyClaims).toBeDefined();
    });

    it('should have getClaimsOnMyItems method', () => {
      expect(claimsApi.getClaimsOnMyItems).toBeDefined();
    });

    it('should have getClaim method', () => {
      expect(claimsApi.getClaim).toBeDefined();
    });

    it('should have acceptClaim method', () => {
      expect(claimsApi.acceptClaim).toBeDefined();
    });

    it('should have rejectClaim method', () => {
      expect(claimsApi.rejectClaim).toBeDefined();
    });

    it('should have resolveClaim method', () => {
      expect(claimsApi.resolveClaim).toBeDefined();
    });
  });

  describe('messagesApi', () => {
    it('should have getMessages method', () => {
      expect(messagesApi.getMessages).toBeDefined();
    });

    it('should have sendMessage method', () => {
      expect(messagesApi.sendMessage).toBeDefined();
    });
  });

  describe('authApi', () => {
    it('should have login method', () => {
      expect(authApi.login).toBeDefined();
    });

    it('should have register method', () => {
      expect(authApi.register).toBeDefined();
    });

    it('should have logout method', () => {
      expect(authApi.logout).toBeDefined();
    });

    it('should have getMe method', () => {
      expect(authApi.getMe).toBeDefined();
    });

    it('should have getMeWithToken method', () => {
      expect(authApi.getMeWithToken).toBeDefined();
    });
  });

  describe('usersApi', () => {
    it('should have updateMe method', () => {
      expect(usersApi.updateMe).toBeDefined();
    });

    it('should have changePassword method', () => {
      expect(usersApi.changePassword).toBeDefined();
    });

    it('should have hasPassword method', () => {
      expect(usersApi.hasPassword).toBeDefined();
    });

    it('should have setPassword method', () => {
      expect(usersApi.setPassword).toBeDefined();
    });

    it('should have getPublicProfile method', () => {
      expect(usersApi.getPublicProfile).toBeDefined();
    });

    it('should have checkUsernameAvailability method', () => {
      expect(usersApi.checkUsernameAvailability).toBeDefined();
    });
  });

  describe('uploadsApi', () => {
    it('should have uploadImage method', () => {
      expect(uploadsApi.uploadImage).toBeDefined();
    });

    it('should have deleteImage method', () => {
      expect(uploadsApi.deleteImage).toBeDefined();
    });
  });

  describe('addressesApi', () => {
    it('should have getAddresses method', () => {
      expect(addressesApi.getAddresses).toBeDefined();
    });

    it('should have getAddress method', () => {
      expect(addressesApi.getAddress).toBeDefined();
    });

    it('should have createAddress method', () => {
      expect(addressesApi.createAddress).toBeDefined();
    });

    it('should have updateAddress method', () => {
      expect(addressesApi.updateAddress).toBeDefined();
    });

    it('should have deleteAddress method', () => {
      expect(addressesApi.deleteAddress).toBeDefined();
    });

    it('should have setDefaultAddress method', () => {
      expect(addressesApi.setDefaultAddress).toBeDefined();
    });
  });

  describe('savedItemsApi', () => {
    it('should have getSavedItems method', () => {
      expect(savedItemsApi.getSavedItems).toBeDefined();
    });

    it('should have getSavedItemIds method', () => {
      expect(savedItemsApi.getSavedItemIds).toBeDefined();
    });

    it('should have checkSaved method', () => {
      expect(savedItemsApi.checkSaved).toBeDefined();
    });

    it('should have saveItem method', () => {
      expect(savedItemsApi.saveItem).toBeDefined();
    });

    it('should have unsaveItem method', () => {
      expect(savedItemsApi.unsaveItem).toBeDefined();
    });
  });

  describe('api instance', () => {
    it('should be defined', () => {
      expect(api).toBeDefined();
    });

    it('should have get method', () => {
      expect(api.get).toBeDefined();
    });

    it('should have post method', () => {
      expect(api.post).toBeDefined();
    });

    it('should have patch method', () => {
      expect(api.patch).toBeDefined();
    });

    it('should have delete method', () => {
      expect(api.delete).toBeDefined();
    });
  });
});
