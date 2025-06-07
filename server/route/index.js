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
}

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


//user routes
router.get('/users', isAuthenticated, userController.getAllUsers);
router.get('/users/:id', isAuthenticated, userController.getUserById);
router.post('/users', isAuthenticated, userController.addNewUser);
router.put('/users/:id', isAuthenticated, userController.updateUserById);
router.delete('/users/:id', isAuthenticated, userController.deleteUserById);


//item routes
router.get('/items', isAuthenticated, itemController.getAllItems);
router.get('/items/:id', isAuthenticated, itemController.getItemsById);
router.post('/items', isAuthenticated, itemController.addNewItem);
router.put('/items/:id', isAuthenticated, itemController.updateItemById);
router.delete('/items/:id', isAuthenticated, itemController.deleteItemById);


//public routes
router.get('/doc-link', (req, res) => {
    res.json({documentation: 'https://itemstore-api-docs.com/api-docs'});
});


module.exports = router;
