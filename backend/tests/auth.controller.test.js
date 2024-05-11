import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; // Import bcryptjs here


describe('Auth Controller Tests', () => {
  let mongod;
  let request;

  beforeAll(async () => {
    // Setup a new memory server for MongoDB if not connected
    if (mongoose.connection.readyState === 0) {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      process.env.MONGO_URI = uri;
      process.env.JWT_SECRET = 'adssadadsaf234342rfraef53wDD23Dd3ff2224d3D2F24Gg43sc332RF2FEWf43wfew3f3Fre3FF3';
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    request = supertest(app);
  });

  afterAll(async () => {
    // Avoid using dropDatabase in environments where permissions are restricted
    await mongoose.connection.close();
    if (mongod) await mongod.stop();
  });

  afterEach(async () => {
    // Clear all collections instead of dropping the database
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('POST /signup', () => {
    it('should create a new user and return 201', async () => {
      const userData = {
        fullName: 'Ola Hansen',
        email: 'OlaHansen@oslomet.no',
        password: 'Abcd1234'
      };

      const response = await request.post('/api/auth/signup').send(userData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
    });
  });

  describe('POST /signup', () => {
    it('should create a new user and return 201', async () => {
      const userData = {
        fullName: 'Petter Stordalen',
        email: 'petter@example.com',
        password: 'securePassword123'
      };

      const response = await request.post('/api/auth/signup').send(userData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
    });
  });

  



  describe('GET /signOut', () => {
    it('should sign out a user', async () => {
      const response = await request.get('/api/auth/signOut');
      expect(response.status).toBe(200);
      expect(response.body).toBe('Signout success!');
    });
  });

  

  describe('POST /signin', () => {
    it('should authenticate a user and return 200', async () => {
      // Ensure user exists
      const user = new User({
        fullName: 'Petter Stordalen',
        email: 'petter@example.com',
        password: bcryptjs.hashSync('securePassword123', 10) // Hashed password
      });
      await user.save();
  
      const loginData = {
        email: 'petter@example.com',
        password: 'securePassword123'
      };
  
      const response = await request.post('/api/auth/signin').send(loginData);
      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([expect.stringContaining('sefio_token')]));
        });
    });

    describe('POST /google', () => {
        beforeEach(async () => {
          await new User({
            fullName: 'Petter Google',
            email: 'googleuser@example.com',
            password: bcryptjs.hashSync('googleUserPass123', 10),
            profileImage: 'https://img.url/googleuser.jpg',
            role: 'user'
          }).save();
        });
      
        it('should handle Google sign-in or sign-up and return a token', async () => {
          const googleData = {
            email: 'googleuser@example.com',
            name: 'Petter Google',
            photo: 'https://img.url/googleuser.jpg'
          };
          const response = await request.post('/api/auth/google').send(googleData);
          expect(response.status).toBe(200);
          expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([expect.stringContaining('sefio_token')]));
        });
      });
      

});
