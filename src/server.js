import express from 'express';
import cors from 'cors';
import path from 'path';
import url from 'url';

// Set __dirname variable
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Create express app
const app = express();

// Set port
const port = 3000;

// Set up static middleware
app.use(express.static(path.join(__dirname, ''), { extensions: ['html', 'js'] }));

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

// 404 not found page
app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/404.html'));
});

// Catch-all wildcard redirection to 404 page
app.get('*', (req, res) => {
  res.redirect('/404');
});

// Start listening to requests
app.listen(port, () => console.log(`Server listening on port ${port}.`));
