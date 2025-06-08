const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/seats', (req, res) => {
  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const seat = db.seats.find(item => item.id === id);

  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

router.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    const newSeat = {
      id: uuidv4(),
      day,
      seat,
      client,
      email,
    };
    db.seats.push(newSeat);
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Missing data' });
  }
});

router.put('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;

  const seatToUpdate = db.seats.find(item => item.id === id);

  if (seatToUpdate) {
    seatToUpdate.day = day;
    seatToUpdate.seat = seat;
    seatToUpdate.client = client;
    seatToUpdate.email = email;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

router.delete('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.seats.findIndex(item => item.id === id);

  if (index !== -1) {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

module.exports = router;
