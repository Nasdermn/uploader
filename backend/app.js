require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { PORT, MONGODBADDRESS } = process.env;
const router = require('./routes/upload');

mongoose.connect(MONGODBADDRESS);
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
