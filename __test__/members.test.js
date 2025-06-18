const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Member = require('../server/modules/members');

dotenv.config();
jest.setTimeout(20000); // Optional: Increase timeout if needed

describe('Member Collection Tests (Mongoose)', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URIS;
    if (!uri) throw new Error('Missing MONGO_URI env variable');
    await mongoose.connect(uri);
    //  dbName:'test'
  });

  // afterAll(async () => {
  //   await mongoose.connection.dropDatabase();
  //   await mongoose.connection.close();
  // });

  it('should insert a new member into the Member collection', async () => {
    const newMember = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      phone: '1234567890',
      address: '123 Test Street'
    };

    const savedMember = await Member.create(newMember);

    expect(savedMember.firstName).toBe('Test');
    expect(savedMember.lastName).toBe('User');
    expect(savedMember.email).toBe('testuser@example.com');
    expect(savedMember.phone).toBe('1234567890');
    expect(savedMember.address).toBe('123 Test Street');
    expect(savedMember.membershipStatus).toBe('active'); // default value
    expect(savedMember.joinDate).toBeInstanceOf(Date);
  });

  it('should fail if required fields are missing', async () => {
    try {
      await Member.create({ email: 'invalid@example.com' }); // Missing firstName & lastName
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.name).toBe('ValidationError');
      expect(err.errors.firstName).toBeDefined();
      expect(err.errors.lastName).toBeDefined();
    }
  });
});
