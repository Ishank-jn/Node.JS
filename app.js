const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

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

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));