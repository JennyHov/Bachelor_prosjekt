const mockProfile = jest.fn();
mockProfile.find = jest.fn();
mockProfile.findById = jest.fn();
mockProfile.findByIdAndUpdate = jest.fn();
mockProfile.findByIdAndDelete = jest.fn(); 
mockProfile.create = jest.fn();
mockProfile.deleteMany = jest.fn();
mockProfile.insertMany = jest.fn();

export default mockProfile;
