const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const ensureAuth = require('../middleware/ensureAuth');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', ensureAuth, authorsController.createAuthor);
router.put('/:id', ensureAuth, authorsController.updateAuthor);
router.delete('/:id', ensureAuth, authorsController.deleteAuthor);

module.exports = router;
