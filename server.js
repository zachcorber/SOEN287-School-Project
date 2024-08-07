const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 6724; // Port is last 4 digits of my student ID number

app.set('view engine', 'ejs');

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
);

// Set up sessions for logging in
app.use(session({
  secret: 'zachskey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Importing all the static files into the server (css, js, images) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { loggedIn: req.session.username });
});

app.get('/browse', (req, res) => {
  res.render('browse', { loggedIn: req.session.username });
});

app.get('/login', (req, res) => {
  res.render('login', { loggedIn: req.session.username, success: true });
});

app.get('/find', (req, res) => {
  res.render('find', { loggedIn: req.session.username });
});

app.get('/cat', (req, res) => {
  res.render('cat', { loggedIn: req.session.username });
});

app.get('/dog', (req, res) => {
  res.render('dog', { loggedIn: req.session.username });
});

app.get('/giveaway', (req, res) => {
  if (!req.session.username) {
    res.redirect('/login');
    return;
  }
  res.render('giveaway', { loggedIn: req.session.username });
});

app.get('/contact', (req, res) => {
  res.render('contact', { loggedIn: req.session.username });
});

app.get('/register', (req, res) => {
  res.render('register', { loggedIn: req.session.username, success: null });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { loggedIn: req.session.username });
});

// Handle user registration
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading login file');
    }
    const users = data.split('\n').map((line) => line.split(':')[0]);

    if (users.includes(username)) {
      return res.render('register', { loggedIn: req.session.username, success: false });
    } else {
      fs.appendFile('login.txt', `${username}:${password}\n`, (err) => {
        if (err) {
          return res.status(500).send('Error saving new user');
        }
        res.render('register', { loggedIn: req.session.username, success: true });
      });
    }
  });
});

// Handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading login file');
    }
    const lines = data.split('\n');
    let authenticated = false;

    for (let line of lines) {
      const [storedUsername, storedPassword] = line.split(':');
      if (storedUsername === username && storedPassword === password) {
        authenticated = true;
        break;
      }
    }

    if (authenticated) {
      req.session.username = username;
      console.log('Login successful');
      res.redirect('/giveaway');
    } else {
      res.render('login', { loggedIn: req.session.username, success: false });
      console.log('Login failed');

    }
  });
});

// Handle pet entry form submission
app.post('/giveaway-pet', (req, res) => {
  const { pet_type, breed, age_preference, gender_preference } = req.body;
  const username = req.session.username;

  if (!username) {
    return res.redirect('/login');
  }

  fs.readFile('available_pets.txt', 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).send('Server error');
    }

    let id = 1;
    if (data) {
      const lines = data.trim().split('\n').filter(line => line.trim() !== '');
      if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        const lastId = parseInt(lastLine.split(':')[0], 10);
        if (!isNaN(lastId)) {
          id = lastId + 1;
        } else {
          console.error('Error parsing lastId:', lastLine);
        }
      }
    }

    const newPetEntry = `${id}:${username}:${pet_type}:${breed}:${age_preference}:${gender_preference}\n`;
    fs.appendFile('available_pets.txt', newPetEntry, (err) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      console.log('Pet entry submitted successfully');
      res.redirect('/');
    });
  });
});

// Logout of session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    console.log("Logout successful");
    res.redirect('/');
  });
});

app.post('/find_pet', (req, res) => {
  const { pet_type, breed, age_preference, gender_preference } = req.body;
  res.redirect('/browse');
});

app.get('/profile', (req, res) => {
  const username = req.session.username;
  if (username) {
    res.send(`Welcome, ${username}!`);
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});