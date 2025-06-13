require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('../server/modules/members');
const Book = require('../server/modules/books');
const LendingRecord = require('../server/modules/lending-records');

jest.setTimeout(30000); 

describe('LendingRecord Collection Tests (Mongoose)', () => {
  let testMember, testBook;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await LendingRecord.deleteMany({});
    await Member.deleteMany({});
    await Book.deleteMany({});
    await mongoose.connection.close();
  });

  it('should insert a new lending record into the LendingRecord collection', async () => {
    // Create and save a member
    testMember = new Member({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '1234646464',
      membershipStatus: 'active',
      joinDate: new Date()
    });
    await testMember.save();

    // Create and save a book
    testBook = new Book({
      title: 'Sample Book',
      author: 'John Smith',
      genre: 'Fiction',
      publishedYear: 2020,
      copiesAvailable: 3,
      ISBN: '123456789016',
      totalCopies: 5
    });
    await testBook.save();

    // Create and save a lending record
    const record = new LendingRecord({
      member: testMember._id,
      book: testBook._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'borrowed',
      returnDate : new Date()
    });
    await record.save();

    // Populate and assert
    const found = await LendingRecord.findById(record._id)
      .populate('member')
      .populate('book');

    expect(found).not.toBeNull();
    expect(found.member.firstName).toBe('Jane');
    expect(found.book.title).toBe('Sample Book');
    expect(found.status).toBe('borrowed');
  });
});
