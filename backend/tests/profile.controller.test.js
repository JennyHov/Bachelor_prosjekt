import { getProfileByUserId, deleteUserProfile } from '../Controllers/profile.controller';
import Profile from '../models/profile.model';

jest.mock('../models/profile.model', () => {
    const originalModule = jest.requireActual('../models/profile.model');
  
    return {
      __esModule: true,
      default: {
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndDelete: jest.fn(),
        // fyller opp
        populate: jest.fn().mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue([
            { fullName: 'Trine Skei Grande', profileImage: 'CoolTrineSkeiGrande', user: { profileImage: 'LeserMyePaaFjellet' } },
            { fullName: 'Jo Nesbø', profileImage: 'forfatterkjendis2024', user: { profileImage: 'CoolGuyWithGlasses' } }
          ])
        }))
      }
    };
  });
  
  describe('ProfileController Tests', () => {
    let mockReq, mockRes, mockNext;
  
    beforeEach(() => {
      mockReq = { params: {}, body: {}, user: { id: 'abcd1234' }, query: {} };
      mockRes = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis()
      };
      mockNext = jest.fn();
    });

  
  describe('getProfileByUserId', () => {
    it('try to fetch and return a profile by user ID', async () => {
      const profile = { fullName: 'Ola Hansen' };
      Profile.findOne.mockResolvedValue(profile);

      mockReq.params.userId = 'abcd1234';
      await getProfileByUserId(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(profile);
      expect(Profile.findOne).toHaveBeenCalledWith({ user: 'abcd1234' });
    });

    it('this will return 404 if no profile found', async () => {
      Profile.findOne.mockResolvedValue(null);

      mockReq.params.userId = 'dcba4321';
      await getProfileByUserId(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Profile not found" });
    });
  });

  describe('deleteUserProfile', () => {
    it('this should delete the user profile', async () => {
      Profile.findOneAndDelete.mockResolvedValue({});

      mockReq.params.userId = 'abcd1234';
      await deleteUserProfile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Profile deleted successfully.' });
    });

    it('this should return 404 if the profile to delete is not found', async () => {
      Profile.findOneAndDelete.mockResolvedValue(null);

      mockReq.params.userId = 'abcd1234';
      await deleteUserProfile(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Profile not found' });
    });

        
  });
});
