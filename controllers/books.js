const { getDatabase } = require('../data/books');
const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
  try {
    const db = getDatabase();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err });
  }
};

const getBookById = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, year, pages, language, available } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const db = getDatabase();
    const result = await db.collection('books').insertOne({
      title,
      author,
      genre,
      year,
      pages,
      language,
      available,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err });
  }
};

const updateBook = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;
    const { title, author, genre, year, pages, language, available } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, author, genre, year, pages, language, available } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err });
  }
};

const deleteBook = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
