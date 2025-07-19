// server/src/models/Bug.js
import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Bug title is required'],
    },
    description: {
      type: String,
      required: [true, 'Bug description is required'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
    },
    reportedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bug = mongoose.model('Bug', bugSchema);
export default Bug;
