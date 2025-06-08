const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
app.use('/api', testimonialsRoutes);

const concertsRoutes = require('./routes/concerts.routes');
app.use('/api', concertsRoutes);

const seatsRoutes = require('./routes/seats.routes');
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
