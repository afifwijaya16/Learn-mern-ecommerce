const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

// app
const app = express();

// database
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log('Database Connection error', err));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// route middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running in PORT ${port}`));
