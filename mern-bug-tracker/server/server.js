import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bugRoutes from './src/routes/bugRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bugs', bugRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bugtracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
}

export default app; // Export app for testing
