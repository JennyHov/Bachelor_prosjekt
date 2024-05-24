import { setCountdown, getCountdown } from '../Controllers/countdown.controller';
import Countdown from '../models/countdown.model';

// mocking av Countdown model schemaen
jest.mock('../models/countdown.model');

describe('Countdown Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('setCountdown', () => {
    it('should update an existing countdown', async () => {
      const req = { body: { endTime: new Date('2024-07-31T23:59:59.000Z') } };
      const res = mockResponse();
      const mockCountdown = { endTime: req.body.endTime, save: jest.fn() };
      
      Countdown.findOne.mockResolvedValue(mockCountdown);

      await setCountdown(req, res);
      expect(mockCountdown.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCountdown);
    });

    it('should create a new countdown when none exists', async () => {
      const req = { body: { endTime: new Date('2024-06-31T23:59:59.000Z') } };
      const res = mockResponse();

      Countdown.findOne.mockResolvedValue(null);
      Countdown.create.mockResolvedValue({ endTime: req.body.endTime });

      await setCountdown(req, res);
      expect(Countdown.create).toHaveBeenCalledWith({ endTime: req.body.endTime });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ endTime: req.body.endTime });
    });

    it('should handle errors', async () => {
      const req = { body: { endTime: new Date('2024-01-31T23:59:59.000Z') } };
      const res = mockResponse();
      const error = new Error("Database error");

      Countdown.findOne.mockRejectedValue(error);

      await setCountdown(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to set countdown", error });
    });
  });

  describe('getCountdown', () => {
    it('should retrieve the countdown', async () => {
      const req = {};
      const res = mockResponse();
      const expectedCountdown = { endTime: new Date('2024-12-31T23:59:59.000Z') };

      Countdown.findOne.mockResolvedValue(expectedCountdown);

      await getCountdown(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedCountdown);
    });

    it('should handle errors during retrieval', async () => {
      const req = {};
      const res = mockResponse();
      const error = new Error("Database error");

      Countdown.findOne.mockRejectedValue(error);

      await getCountdown(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to get countdown", error });
    });
  });
});
