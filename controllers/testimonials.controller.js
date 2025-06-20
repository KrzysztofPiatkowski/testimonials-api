const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getId = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  const author = sanitize(req.body.author);
  const text = sanitize(req.body.text);

  if (!author || !text) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  const author = sanitize(req.body.author);
  const text = sanitize(req.body.text);

  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.author = author;
    testimonial.text = text;
    await testimonial.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};