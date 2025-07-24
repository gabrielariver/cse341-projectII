const express = require('express');
const { initDb } = require('./data/books');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const swaggerSetup = require('./swagger');
require('dotenv').config();

// session
const session = require('express-session');
const passport = require('passport');
require('./services/passport');
const authRoutes = require('./routes/auth');

const app = express(); 
const port = process.env.PORT || 3000; 

// middlewares
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoutes);
swaggerSetup(app);
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);

// mongodb conection
initDb((err) => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server on http://localhost:${port}`));
});
