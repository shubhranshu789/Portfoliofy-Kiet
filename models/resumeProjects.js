// models/User.js (or any relevant model file)
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  points: [String], // Array of points for each project
});

const resumeProjectSchema = new mongoose.Schema({
  name: String,
  email: String,
  projects: [projectSchema], // Array of projects
});

const resumeProject = mongoose.model('resumeProject', resumeProjectSchema);

module.exports = resumeProject;
