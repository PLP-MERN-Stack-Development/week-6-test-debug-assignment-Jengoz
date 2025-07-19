// server/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bugRoutes from './src/routes/bugRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bug Tracker API is running');
});

app.use('/api/bugs', bugRoutes);

export default app;
