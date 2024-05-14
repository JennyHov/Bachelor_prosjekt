import { getAllUsers, updateUserRole, deleteUser, getAllCollaborateProfiles, deleteCollaborateProfile, updateCollaborateProfile } from '../Controllers/admin.controller';
import User from '../models/user.model';
import Profile from '../models/profile.model';

jest.mock('../models/user.model');
jest.mock('../models/profile.model');

describe('AdminController Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
    const findByIdAndUpdateMock = {
        select: jest.fn().mockResolvedValue({
          _id: 'jakobId',
          fullName: 'Jakob Ingebrigtsen',
          email: 'JakobIngebrigtsen@online.no',
          role: 'admin'
        })
      };
      User.findByIdAndUpdate.mockImplementation(() => findByIdAndUpdateMock);
    User.findByIdAndUpdate.mockClear();
    


    User.mockClear();
    Profile.mockClear();
  });

  // Test cases
  describe('getAllUsers', () => {
    it('should return all users without passwords', async () => {
      // Prepare data as it should appear after `.select('-password')`
      const mockUsers = [
        { _id: '1', fullName: 'User One', email: 'user1@example.com', role: 'user' },
        { _id: '2', fullName: 'User Two', email: 'user2@example.com', role: 'admin' }
      ];

      // Mock the find method to simulate mongoose find
      User.find = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers) // simulate the .select() chain
      });

      // Call the actual function under test
      await getAllUsers(mockReq, mockRes, mockNext);

      // Check that the response was as expected
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
      expect(User.find).toHaveBeenCalled(); // Ensures find was called
      expect(User.find().select).toHaveBeenCalledWith('-password'); // Ensures .select was called with '-password'
    });
  });
  describe('updateUserRole', () => {
    it('should update the role of a user and exclude the password from the result', async () => {
      // Prepare request data
      mockReq.body = { userId: 'jakobId', role: 'admin' };

      // Call the function under test
      await updateUserRole(mockReq, mockRes, mockNext);

      // Verify that findByIdAndUpdate was called correctly
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('jakobId', { role: 'admin' }, { new: true });

      // Check that .select() was called with '-password'
      expect(User.findByIdAndUpdate().select).toHaveBeenCalledWith('-password');

      // Ensure the response contains the expected data
      expect(mockRes.json).toHaveBeenCalledWith({
        _id: 'jakobId',
        fullName: 'Jakob Ingebrigtsen',
        email: 'JakobIngebrigtsen@online.no',
        role: 'admin'
      });
    });
  });
  

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      User.findByIdAndDelete.mockResolvedValue({ _id: 'someId' });

      mockReq.params.userId = 'someId';
      await deleteUser(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });
  });

  describe('getAllCollaborateProfiles', () => {
    it('should return all profiles', async () => {
      const mockProfiles = [
        { fullName: 'Profile One', description: 'Profile Description One' },
        { fullName: 'JakobIngebrigtsen@online.no', description: 'Middle- and long-distance runner' }
      ];
      Profile.find.mockResolvedValue(mockProfiles);

      await getAllCollaborateProfiles(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(mockProfiles);
      expect(Profile.find).toHaveBeenCalled();
    });
  });

  describe('deleteCollaborateProfile', () => {
    it('should delete a profile', async () => {
      // Assuming Profile is correctly mocked above, we mock the findByIdAndDelete method here
      Profile.findByIdAndDelete.mockResolvedValue({ _id: 'someProfileId' });
  
      // Setting up request parameters to match the controller logic
      mockReq.params.profileId = 'someProfileId';
  
      // Call the function under test
      await deleteCollaborateProfile(mockReq, mockRes, mockNext);
  
      // Expect the status method to be called with 200 indicating successful deletion
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Verify that the correct success message is returned
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Profile deleted successfully' });
  
      // Check if findByIdAndDelete was called with the correct profile ID
      expect(Profile.findByIdAndDelete).toHaveBeenCalledWith('someProfileId');
    });
  });
  
  
  describe('updateCollaborateProfile', () => {
    it('should update a profile', async () => {
      const updatedProfile = { _id: 'someProfileId', fullName: 'Profile Updated', description: 'Updated Description' };
      Profile.findByIdAndUpdate.mockResolvedValue(updatedProfile);

      mockReq.params.profileId = 'someProfileId';
      mockReq.body = { description: 'Updated Description' };
      await updateCollaborateProfile(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(updatedProfile);
    });
  });
});
