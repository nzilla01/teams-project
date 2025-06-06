 const userController = require('../modules/users');

 const getAllUsers = async (req, res) => {
     try {
         const users = await userController.find();
         res.status(200).json(users);
     } catch (error) {
         console.error('Error fetching users:', error);
         res.status(500).json({ message: 'Internal server error' });
     }
 }  

    const getUserById = async (req, res) => {
        const userId = req.params.id;
        try {
            const userData = await userController.findById(userId);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(userData);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    const addNewUser = async (req, res) => {
        const newUser = new userController(req.body);
        try {
            const savedUser = await newUser.save();
            if (!savedUser) {
                return res.status(400).json({ message: 'Error saving user' });
            }
            res.status(201).json(savedUser);
            console.log('New user added:', savedUser);
        } catch (error) {
            console.error('Error adding new user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    const updateUserById = async (req, res) => {
        const userId = req.params.id;
        try {
            const updatedUser = await userController.findByIdAndUpdate(
                userId,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
            console.log('User updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    const deleteUserById = async (req, res) => {
        const userId = req.params.id;
        try {
            const deletedUser = await userController.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
            console.log('User deleted:', deletedUser);
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

module.exports = {
    getAllUsers,    
    getUserById,
    addNewUser,
    updateUserById,
    deleteUserById
};