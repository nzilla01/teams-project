const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('../server/modules/books'); // Adjust path based on your project

jest.setTimeout(30000); 

describe('Book Collection Tests (Mongoose)', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri); // Clean, modern connect
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // optional cleanup
    await mongoose.connection.close();
  });

  it('should insert a new book into the Book collection', async () => {
    const mockBook = {
      title: 'The JavaScript Mastery',
      author: 'Nsikak Okon',
      ISBN: '1234567890123',
      genre: 'Programming',
      publishedYear: 2024,
      copiesAvailable: 5,
      totalCopies: 10
    };

    await Book.create(mockBook);

    const foundBook = await Book.findOne({ ISBN: '1234567890123' });

    expect(foundBook.title).toBe('The JavaScript Mastery');
    expect(foundBook.author).toBe('Nsikak Okon');
    expect(foundBook.genre).toBe('Programming');
  });
});
