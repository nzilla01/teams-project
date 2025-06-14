require('dotenv').config(); // get the env file

const mongoose = require('mongoose');
const Admin = require('../server/modules/admins'); //get the collection

jest.setTimeout(30000); // 20 seconds timeout

describe('Admin Collection Tests (Mongoose)', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URIS;
    if (!uri) throw new Error('Missing MONGO_URI env variable');

    await mongoose.connect(uri);
  }, 15000); // extend timeout for connection

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should insert a new admin into the Admin collection', async () => {
    const mockAdmin = {
      username: 'ruth',
      email: 'ruth@gmail.com',
      passwordHash: '123456',
      role: 'admin',
    };

    await Admin.create(mockAdmin);

    const foundAdmin = await Admin.findOne({ email: 'ruth@gmail.com' });

    expect(foundAdmin.username).toBe('ruth');
    expect(foundAdmin.email).toBe('ruth@gmail.com');
  });
});