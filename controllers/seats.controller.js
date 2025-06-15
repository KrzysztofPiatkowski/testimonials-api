const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.post = async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const isTaken = await Seat.exists({ day, seat });

    if (isTaken) {
      return res.status(409).json({ message: 'The slot is already taken...' });
    }

    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();

    req.io.emit('seatsUpdated');
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const seatToUpdate = await Seat.findById(req.params.id);

    if (!seatToUpdate) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    seatToUpdate.day = day;
    seatToUpdate.seat = seat;
    seatToUpdate.client = client;
    seatToUpdate.email = email;

    await seatToUpdate.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);

    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    await Seat.deleteOne({ _id: req.params.id });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
