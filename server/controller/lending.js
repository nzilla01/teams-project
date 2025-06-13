const LendingRecord = require('../modules/lending-records');

// GET all lending records
const getAllRecord = async (req, res) => {
  try {
    const lendbook = await LendingRecord.find()
      .populate('member')
      .populate('book');
    res.status(200).json(lendbook);
  } catch (error) {
    console.error("Error fetching lending records:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET single record by ID
const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await LendingRecord.findById(id)
      .populate('member')
      .populate('book');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching record by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST create new record
const addNewRecord = async (req, res) => {
  try {
    const { memberId, bookId, borrowDate, dueDate, returnDate, status } = req.body;

    const newRecord = new LendingRecord({
      member: memberId,
      book: bookId,
      borrowDate,
      dueDate,
      returnDate,
      status
    });

    const saveRecord = await newRecord.save();
    const populated = await LendingRecord.findById(saveRecord._id)
      .populate('member')
      .populate('book');

    res.status(201).json(populated);
    console.log('Record Added:', populated);
  } catch (error) {
    console.error('Error adding new record:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update record
const updateRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecord = await LendingRecord.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('member').populate('book');

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE record
const deleteRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRecord = await LendingRecord.findByIdAndDelete(id);
    if (!deleteRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
    console.log('Record deleted:', deleteRecord);
  } catch (error) {
    console.error('Error deleting record:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllRecord,
  getRecordById,
  addNewRecord,
  updateRecordById,
  deleteRecordById
};
