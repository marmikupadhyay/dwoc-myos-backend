const express = require('express');
const app = express();
const morgan = require('morgan');
const UserRoutes = require('./api/routes/UserRoutes');
const SheetRoutes = require('./api/routes/SheetRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(morgan('dev'));

mongoose.connect(process.env.DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.raw());
app.use(express.json());

let db = mongoose.connection;

db.once('open', () => {
	console.log('Connected To Database');
});

db.on('error', (err) => {
	console.log(err);
});

// CORS Middle Ware for DEV
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use('/api/user', UserRoutes);
app.use('/api/sheet', SheetRoutes);
app.use((req, res, next) => {
	res.status(404).json({ message: 'Enter Correct Route' });
});
module.exports = app;
