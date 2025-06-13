require('dotenv').config(); 
const express = require('express');
const connectDB = require('./server/config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middlewares
app
    .use(bodyParser.json())

    .use(session({
        secret: 'james1:5',
        resave: false,
        saveUninitialized: true
    }))

    .use(passport.initialize())

    .use(passport.session())

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
        next();
    })

    // .use(cors({ methods: 'GET, POST, DELETE, OPTIONS, PATCH', origin: '*' }))
    
    .use(express.urlencoded({ extended: true }));
 
// Passport config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Authentication routes
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Welcome ${req.session.user.username}` : 'Unauthorized user. Login to access.');
});


app.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { withCredentials: true }
}));

// App routes
app.use('/', require('./server/route/index'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});

module.exports = app;