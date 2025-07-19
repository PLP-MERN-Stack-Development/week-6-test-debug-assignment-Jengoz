import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../server.js';
import User from '../../src/models/User.js';
import Post from '../../src/models/Post.js';
import jwt from 'jsonwebtoken';

let server;
let userId;
let token;
let postId;

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
  await mongoose.connect(mongoUri);

  const user = await User.create({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
  });

  userId = user._id;
  token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  const post = await Post.create({
    title: 'Test Post',
    content: 'This is a test post content',
    author: userId,
    category: new mongoose.Types.ObjectId(),
    slug: 'test-post',
  });

  postId = post._id;
  server = app.listen(0);
});

afterAll(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await mongoose.connection.close();
  server.close();
});

describe('POST /api/posts', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).post('/api/posts').send({});
    expect(res.statusCode).toBe(401);
  });

  it('should create a post with valid data and token', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Another Post',
        content: 'Content for the new post',
        category: new mongoose.Types.ObjectId().toString(),
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Another Post');
  });
});

describe('GET /api/posts', () => {
  it('should retrieve all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/posts/:id', () => {
  it('should retrieve a post by ID', async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', postId.toString());
  });

  it('should return 404 for non-existing post', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/posts/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /api/posts/:id', () => {
  it('should update a post with valid token', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Title');
  });

  it('should return 401 if token is missing', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .send({ title: 'Attempted Update' });

    expect(res.statusCode).toBe(401);
  });
});

describe('DELETE /api/posts/:id', () => {
  it('should delete a post with valid token', async () => {
    const post = await Post.create({
      title: 'Delete Me',
      content: 'To be deleted',
      author: userId,
      category: new mongoose.Types.ObjectId(),
      slug: 'delete-me',
    });

    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it('should return 401 if deleting without token', async () => {
    const post = await Post.create({
      title: 'Should Fail',
      content: 'Unauthorized deletion',
      author: userId,
      category: new mongoose.Types.ObjectId(),
      slug: 'unauth-delete',
    });

    const res = await request(app).delete(`/api/posts/${post._id}`);
    expect(res.statusCode).toBe(401);
  });
});
