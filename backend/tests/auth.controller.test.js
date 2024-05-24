import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; 


describe('Auth Controller Tests', () => {
  let mongod;
  let request;

  beforeAll(async () => {
    // setter opp en in memory server med mongodb 
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
    await mongoose.connection.close();
    if (mongod) await mongod.stop();
  });

  afterEach(async () => {
    // fjerner kolleksjonene i datbasen 
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('POST /signup', () => {
    it('should create a new user and return 201', async () => {
      const userData = {
        fullName: 'Ola Hansen2',
        email: 'OlaHansen2@oslomet.no',
        password: 'Abcd1234'
      };

      const response = await request.post('/api/auth/signup').send(userData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
    });
  });
  describe('POST /signup', () => {
    it('should create a new user for Karine Ottestad and return 201', async () => {
      const userData = {
        fullName: 'Karine Ottestad',
        email: 'karine.ottestad@oslomet.no',
        password: 'StrongPass123'
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



  describe('POST /signup', () => {
    it('should create a new user for Ella Solberg and return 201', async () => {
      const userData = {
        fullName: 'Ella Ottervik',
        email: 'ella.Ottervik@online.no',
        password: 'sikkerhetErViktig123'
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