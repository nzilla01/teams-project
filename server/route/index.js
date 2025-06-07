const express = require('express');
const router = express.Router();
const itemController = require('../controller/items');
const userController = require('../controller/user');
const passPort = require('passport');

//authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user === undefined ) {
        console.log('User is authenticated');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
    console.log('User is authenticated', req.session.user);
}a

//authentication routes
router.get('/login', passPort.authenticate('github'))

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


//admin routes
router.get('/admins', isAuthenticated, userController.getAllAdmins);
router.get('/admins/:id', isAuthenticated, userController.getAdminById);    
router.post('/admins', isAuthenticated, userController.addNewAdmin);
router.put('/admins/:id', isAuthenticated, userController.updateAdminById);
router.delete('/admins/:id', isAuthenticated, userController.deleteAdminById);


//books routes
router.get('/books', isAuthenticated, itemController.getAllBooks);
router.get('/books/:id', isAuthenticated, itemController.getBookById);  
router.post('/books', isAuthenticated, itemController.addNewBook);
router.put('/books/:id', isAuthenticated, itemController.updateBookById);
router.delete('/books/:id', isAuthenticated, itemController.deleteBookById);

//public routes
router.get('/doc-link', (req, res) => {
    res.json({documentation: 'https://itemstore-api-docs.com/api-docs'});
});


module.exports = router;
