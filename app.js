const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport configuration
require('./config/passport')(passport);

// DB configuration
const dbConfig = require('./config/keys').MongoURI

// Connect to MongoDB
mongoose.connect(dbConfig, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// EJS
app.use(expresslayouts);
app.set('view engine', 'ejs');

// Body parsing
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Gloabl variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));