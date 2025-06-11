const Member = require('../modules/members'); // adjust the path if needed

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add new member
const addNewMember = async (req, res) => {
  const newMember = new Member(req.body);
  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
    console.log("Member Added:", savedMember);
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update member by ID
const updateMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete member by ID
const deleteMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
    console.log("Member deleted:", deletedMember);
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  addNewMember,
  updateMemberById,
  deleteMemberById
};
