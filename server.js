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
const oauthRoutes = require('./routes/oauth');

const app = express(); 
const port = process.env.PORT || 3000; 

// middlewares
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        
    sameSite: 'none'        
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', oauthRoutes);
swaggerSetup(app);
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);

// route after login
app.get('/', (req, res) => {
  res.send(`
    <h2>You are successfully logged in with GitHub!</h2>
    <p>Access the <a href="/api-docs">Swagger UI</a> to test the API.</p>
    <p><a href="/auth/logout">Log out</a></p>
  `);
});

// mongodb conection
initDb((err) => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server on http://localhost:${port}`));
});
