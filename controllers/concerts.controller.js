const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getId = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ message: 'Concert not found' });
    }
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      return res.status(404).json({ message: 'Concert not found' });
    }

    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;

    await concert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if (!concert) {
      return res.status(404).json({ message: 'Concert not found' });
    }

    await Concert.deleteOne({ _id: req.params.id });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
