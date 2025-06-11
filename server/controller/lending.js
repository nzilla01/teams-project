const LendingRecord = require('../modules/lending-records');

// Get all lending records
const getAllRecord = async (req, res) => {
  try {
    const lendbook = await LendingRecord.find();
    res.status(200).json(lendbook);
  } catch (error) {
    console.error("Error fetching lending records:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get lending record by ID
const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await LendingRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching record by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add new lending record
const addNewRecord = async (req, res) => {
  const newRecord = new LendingRecord(req.body);
  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log('Record Added:', saveRecord);
  } catch (error) {
    console.error('Error adding new record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update lending record by ID
const updateRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecord = await LendingRecord.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete lending record by ID
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
    console.error('Error deleting record:', error);
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
