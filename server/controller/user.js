const adminController = require('../modules/admin'); // adjust path if needed

const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminController.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        const adminData = await adminController.findById(adminId);
        if (!adminData) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(adminData);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addNewAdmin = async (req, res) => {
    const newAdmin = new adminController(req.body);
    try {
        const savedAdmin = await newAdmin.save();
        if (!savedAdmin) {
            return res.status(400).json({ message: 'Error saving admin' });
        }
        res.status(201).json(savedAdmin);
        console.log('New admin added:', savedAdmin);
    } catch (error) {
        console.error('Error adding new admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        const updatedAdmin = await adminController.findByIdAndUpdate(
            adminId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(updatedAdmin);
        console.log('Admin updated:', updatedAdmin);
    } catch (error) {
        console.error('Error updating admin by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        const deletedAdmin = await adminController.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
        console.log('Admin deleted:', deletedAdmin);
    } catch (error) {
        console.error('Error deleting admin by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdminById
};
