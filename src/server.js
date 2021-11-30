// Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create express app
const app = express();

// Set port
const port = 3000;

// Set up static middleware
app.use(express.static(path.join(__dirname, '')));

// Enable CORS and pre-flight checks for all routes
app.use(cors());
app.options('*', cors());

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/home.html'));
});

// Sign in page
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/signin.html'));
});

// Sign up page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/signup.html'));
});

// Settings page
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/settings.html'));
});

// Profile page
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/profile.html'));
});

// View post page
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/view-post.html'));
});

// New post page
app.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/new-post.html'));
});

// Start listening to requests
app.listen(port, () => console.log(`Server listening on port ${port}.`));
