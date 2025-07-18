const { getDatabase } = require('../data/books');
const { ObjectId } = require('mongodb');

const getAllAuthors = async (req, res) => {
  try {
    const db = getDatabase();
    const authors = await db.collection('authors').find().toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authors', error: err });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const author = await db.collection('authors').findOne({ _id: new ObjectId(id) });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching author', error: err });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, birthYear, nationality, awards, active } = req.body;

    if (!name || !birthYear) {
      return res.status(400).json({ message: 'Name and birthYear are required' });
    }

    const db = getDatabase();
    const result = await db.collection('authors').insertOne({
      name,
      birthYear,
      nationality,
      awards,
      active
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating author', error: err });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;
    const { name, birthYear, nationality, awards, active } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('authors').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, birthYear, nationality, awards, active } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating author', error: err });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const db = getDatabase();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting author', error: err });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
