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

  // testingtilfeller
  describe('getAllUsers', () => {
    it('should return all users without passwords', async () => {
      // Prepare data as it should appear after `.select('-password')`
      const mockUsers = [
        { _id: '1', fullName: 'User One', email: 'user1@example.com', role: 'user' },
        { _id: '2', fullName: 'User Two', email: 'user2@example.com', role: 'admin' }
      ];

      // mocking for find metoden og for å simulere mongoose find
      User.find = jest.fn().mockReturnValue({
        // ment for å simulere .select() 
        select: jest.fn().mockResolvedValue(mockUsers) 
      });

      // kall på funksjonen 
      await getAllUsers(mockReq, mockRes, mockNext);

      // sjekke at responsen er som ventet
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
      // forventer en find metode som er kalt
      expect(User.find).toHaveBeenCalled(); 
      // husk at det ikke skal være med passord, den unnlates
      expect(User.find().select).toHaveBeenCalledWith('-password'); // Ensures .select was called with '-password'
    });
  });
  describe('updateUserRole', () => {
    it('should update the role of a user and exclude the password from the result', async () => {
      // forespørselsdata er sendt
      mockReq.body = { userId: 'jakobId', role: 'admin' };

      // kall for updatere rollen til bruker
      await updateUserRole(mockReq, mockRes, mockNext);

      // sjekke at findByIdAndUpdate er som ventet
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('jakobId', { role: 'admin' }, { new: true });

      // finner ut om .select(  er kalt uten passord
      expect(User.findByIdAndUpdate().select).toHaveBeenCalledWith('-password');

      // sikre at responsen inneholder forventet data
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
      // antagelse at profile er korrekt mocket? så det gjelder å kun mocke findByIdAndDelete  metoden for naa
      Profile.findByIdAndDelete.mockResolvedValue({ _id: 'someProfileId' });
  
      //setter opp en forespørsel med paramter tilpasset med forventet logikk fra server
      mockReq.params.profileId = 'someProfileId';
  
      // kaller på funksjonen
      await deleteCollaborateProfile(mockReq, mockRes, mockNext);
  
      // forventer en status metode som er en sukess/200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // går utifra at den rette sukess meldingen returnerer
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Profile deleted successfully' });
  
      // sjekker at findByIdAndDelete var kalt på med rett id
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
