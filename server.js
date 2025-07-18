const express = require('express');
const { initDb } = require('./data/books');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors'); 
const swaggerSetup = require('./swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
swaggerSetup(app);
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes); 

initDb((err) => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server on http://localhost:${port}`));
});
