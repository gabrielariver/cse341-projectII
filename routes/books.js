const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const ensureAuth = require('../middleware/ensureAuth');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', ensureAuth, booksController.createBook);
router.put('/:id', ensureAuth, booksController.updateBook);
router.delete('/:id', ensureAuth, booksController.deleteBook);

module.exports = router;
