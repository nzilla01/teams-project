const Book = require('../modules/books');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new book
const addNewBook = async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        if (!savedBook) {
            return res.status(400).json({ message: 'Error saving book' });
        }
        res.status(201).json(savedBook);
        console.log('New book added:', savedBook);
    } catch (error) {
        console.error('Error adding new book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update book by ID
const updateBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
        console.log('Book updated:', updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete book by ID
const deleteBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
        console.log('Book deleted:', deletedBook);
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export controller
module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBookById,
    deleteBookById
};
