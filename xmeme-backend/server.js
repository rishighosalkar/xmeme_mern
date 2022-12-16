const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const cloud_uri = process.env.ATLAS_URI;
//const uri = "mongodb://localhost:27017/users";
mongoose.connect(cloud_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
console.log('connected to cloud');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/memes');
app.use('/memes', usersRouter);
 
app.listen(port, () => 
    console.log('Server is running on port:', port)
);