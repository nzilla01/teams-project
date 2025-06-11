const express = require('express');
const router = express.Router();
const itemController = require('../controller/items');
const userController = require('../controller/user');
const membersController = require('../controller/members');
const lendingController = require('../controller/lending');
const passPort = require('passport');

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user === undefined) {
        console.log('User is NOT authenticated');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('User is authenticated', req.session.user);
    next();
}

// Authentication routes
router.get('/login', passPort.authenticate('github'));

// GitHub logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User logged out successfully');
            res.redirect('/');
        });
    });
});

// Admin routes
router.get('/admins', isAuthenticated, userController.getAllAdmins);
router.get('/admins/:id', isAuthenticated, userController.getAdminById);
router.post('/admins', isAuthenticated, userController.addNewAdmin);
router.put('/admins/:id', isAuthenticated, userController.updateAdminById);
router.delete('/admins/:id', isAuthenticated, userController.deleteAdminById);

// Book routes
router.get('/books', isAuthenticated, itemController.getAllBooks);
router.get('/books/:id', isAuthenticated, itemController.getBookById);
router.post('/books', isAuthenticated, itemController.addNewBook);
router.put('/books/:id', isAuthenticated, itemController.updateBookById);
router.delete('/books/:id', isAuthenticated, itemController.deleteBookById);

// Member routes
router.get('/members', isAuthenticated, membersController.getAllMembers);
router.get('/members/:id', isAuthenticated, membersController.getMemberById);
router.post('/members', isAuthenticated, membersController.addNewMember);
router.put('/members/:id', isAuthenticated, membersController.updateMemberById);
router.delete('/members/:id', isAuthenticated, membersController.deleteMemberById);

// Lending record routes
router.get('/lending-records', isAuthenticated, lendingController.getAllRecord);
router.get('/lending-records/:id', isAuthenticated, lendingController.getRecordById);
router.post('/lending-records', isAuthenticated, lendingController.addNewRecord);
router.put('/lending-records/:id', isAuthenticated, lendingController.updateRecordById);
router.delete('/lending-records/:id', isAuthenticated, lendingController.deleteRecordById);

// Public documentation route
router.get('/doc-link', (req, res) => {
    res.json({ documentation: 'https://itemstore-api-docs.com/api-docs' });
});

module.exports = router;
