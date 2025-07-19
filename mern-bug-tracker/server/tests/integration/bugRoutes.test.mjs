import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server.js';
import Bug from '../../src/models/Bug.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 20000); // Extended timeout

afterAll(async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe('Bug API Integration', () => {
  it('should fetch all bugs', async () => {
    await Bug.create([
      { title: 'Bug 1', description: 'Bug 1 desc', priority: 'High' },
      { title: 'Bug 2', description: 'Bug 2 desc', priority: 'Low' },
    ]);

    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
