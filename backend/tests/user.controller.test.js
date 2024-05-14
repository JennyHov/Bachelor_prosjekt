import { updateBasicInfo, updatePassword, deleteUser } from '../Controllers/user.controller';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('../utils/error', () => ({
  errorHandler: jest.fn((statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }),
}));

describe('User Controller Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      user: { id: '123' },
      params: { id: '123' },
      body: {}
    };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  describe('updateBasicInfo', () => {
    it('should allow a user to update their profile', async () => {
      mockReq.body = { fullName: 'Alan Walker', email: 'AlanWalker@online.com' };
      User.findByIdAndUpdate.mockResolvedValue({
        _doc: {
          fullName: 'Alan Walker',
          email: 'AlanWalker@online.com',
          password: 'music2024'
        }
      });

      await updateBasicInfo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        fullName: 'Alan Walker',
        email: 'AlanWalker@online.com'
      });
    });

    it('should return an error if user tries to update another user\'s profile', async () => {
      mockReq.params.id = 'incorrect_id';

      await updateBasicInfo(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      expect(errorHandler).toHaveBeenCalledWith(401, 'You can update only your account!');
    });
  });

  describe('updatePassword', () => {
    it('should update the user password when valid', async () => {
      mockReq.body = { newPassword: 'Abcd1234!' };
      bcryptjs.genSaltSync.mockReturnValue('salt');
      bcryptjs.hashSync.mockReturnValue('hashedNewPassword');

      await updatePassword(mockReq, mockRes, mockNext);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        '123', 
        { $set: { password: 'hashedNewPassword' } },
        { new: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Password updated successfully." });
    });
  });

  describe('deleteUser', () => {
    it('should delete the user account', async () => {
      await deleteUser(mockReq, mockRes, mockNext);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith('User has been deleted...');
    });
  });
});
