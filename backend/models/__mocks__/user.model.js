const mockUser = jest.fn();
mockUser.find = jest.fn();
mockUser.findById = jest.fn();
mockUser.findByIdAndUpdate = jest.fn();
mockUser.findByIdAndDelete = jest.fn(); 
mockUser.create = jest.fn();
mockUser.deleteMany = jest.fn();
mockUser.insertMany = jest.fn();
mockUser.create = jest.fn().mockImplementation((userData) => Promise.resolve(userData));


export default mockUser;
