const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

let uri = '';

async function connectDB() {
  if(process.env.NODE_ENV === 'production') uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-wufx8.azure.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
  else if(process.env.NODE_ENV === 'test') {
    const fakeDB = new MongoMemoryServer();
    uri = await fakeDB.getConnectionString();
  }
  else uri = 'mongodb://localhost:27017/NewWaveDB';

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));
}

connectDB();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

const io = socket(server);

io.on('connection', () => {
  console.log('New socket!')
});
