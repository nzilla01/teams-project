require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('../server/modules/members');
const Book = require('../server/modules/books');
const LendingRecord = require('../server/modules/lending-records');

jest.setTimeout(30000);

describe('LendingRecord Collection Tests (Mongoose)', () => {
  let testMember, testBook;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URIS);
  });

  afterAll(async () => {
    // await mongoose.connection.db.dropDatabase(); // Ensures test DB is wiped, not your production DB
    await mongoose.connection.close();
  });

  it('should insert a new lending record into the LendingRecord collection', async () => {
    // Create and save a test member
    testMember = await new Member({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      membershipStartDate: new Date()
    }).save();

    // Create and save a test book
    testBook = await new Book({
      title: 'Sample Book',
      author: 'John Smith',
      genre: 'Fiction',
      publishedYear: 2020,
      copiesAvailable: 3,
      ISBN: '123456789016',
      totalCopies: 5
    }).save();

    // Create and save a lending record
    const record = await new LendingRecord({
      member: testMember._id,
      book: testBook._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returnDate: new Date(),
      status: 'borrowed'
    }).save();

    // Find and populate the record
    const found = await LendingRecord.findById(record._id)
      .populate('members')
      .populate('books');

    // Debug log (optional)
    console.log('Found lending record:', found);

    // Assertions
    expect(found).not.toBeNull();
    expect(found.member).not.toBeNull();
    expect(found.book).not.toBeNull();
    expect(found.member.firstName).toBe('Jane');
    expect(found.book.title).toBe('Sample Book');
    expect(found.status).toBe('borrowed');
  });
});
