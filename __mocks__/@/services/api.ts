const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

export const api = {
  get: mockGet,
  post: mockPost,
  patch: mockPatch,
  delete: mockDelete,
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

export const itemsApi = {
  getItems: jest.fn(),
  getMyItems: jest.fn(),
  getItem: jest.fn(),
  createItem: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
  uploadPhoto: jest.fn(),
};

export const claimsApi = {
  getClaims: jest.fn(),
  getClaim: jest.fn(),
  createClaim: jest.fn(),
  updateClaimStatus: jest.fn(),
};

export const messagesApi = {
  getMessages: jest.fn(),
  sendMessage: jest.fn(),
};

export const authApi = {
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getMe: jest.fn(),
  getMeWithToken: jest.fn(),
};

export const usersApi = {
  updateMe: jest.fn(),
  changePassword: jest.fn(),
  hasPassword: jest.fn(),
  setPassword: jest.fn(),
  getPublicProfile: jest.fn(),
  checkUsernameAvailability: jest.fn(),
};

export const uploadsApi = {
  uploadImage: jest.fn(),
  deleteImage: jest.fn(),
};

export const addressesApi = {
  getAddresses: jest.fn(),
  getAddress: jest.fn(),
  createAddress: jest.fn(),
  updateAddress: jest.fn(),
  deleteAddress: jest.fn(),
  setDefaultAddress: jest.fn(),
};

export const savedItemsApi = {
  getSavedItems: jest.fn(),
  getSavedItemIds: jest.fn(),
  checkSaved: jest.fn(),
  saveItem: jest.fn(),
  unsaveItem: jest.fn(),
};

export default api;
