// server/src/controllers/bugController.js
import Bug from '../models/Bug.js';

// @desc    Get all bugs
export const getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

// @desc    Create a new bug
export const createBug = async (req, res) => {
  const { title, description, reportedBy } = req.body;
  if (!title || !description || !reportedBy) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const bug = new Bug({ title, description, reportedBy });
  const savedBug = await bug.save();
  res.status(201).json(savedBug);
};

// @desc    Update a bug
export const updateBug = async (req, res) => {
  const { id } = req.params;
  const bug = await Bug.findById(id);
  if (!bug) return res.status(404).json({ message: 'Bug not found' });

  const updates = req.body;
  Object.assign(bug, updates);
  const updatedBug = await bug.save();
  res.json(updatedBug);
};

// @desc    Delete a bug
export const deleteBug = async (req, res) => {
  const { id } = req.params;
  const bug = await Bug.findById(id);
  if (!bug) return res.status(404).json({ message: 'Bug not found' });

  await bug.remove();
  res.json({ message: 'Bug deleted successfully' });
};
