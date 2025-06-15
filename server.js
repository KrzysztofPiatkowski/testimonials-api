const express = require('express');
const path = require('path');
const app = express();

const connectDB = require('./db');
connectDB();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('🧩 New socket connected:', socket.id);
});

// ścieżki API
const testimonialsRoutes = require('./routes/testimonials.routes');
app.use('/api/testimonials', testimonialsRoutes);

const concertsRoutes = require('./routes/concerts.routes');
app.use('/api/concerts', concertsRoutes);

const seatsRoutes = require('./routes/seats.routes');
app.use('/api/seats', seatsRoutes);

// statyczne pliki klienta
app.use(express.static(path.join(__dirname, '/client/build')));

// fallback dla Reacta (tylko dla nie-API)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// 404 dla reszty
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});


http.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

io.on('connection', (socket) => {
  console.log('Nowy socket!');
});
