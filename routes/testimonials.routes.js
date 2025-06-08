const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials/random', (req, res) => {
  const index = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[index];
  res.json(randomTestimonial);
});

router.get('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonial = db.testimonials.find(item => item.id === id);

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

router.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    const newTestimonial = {
      id: uuidv4(),
      author,
      text
    };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Missing data' });
  }
});

router.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  const testimonial = db.testimonials.find(item => item.id === id);

  if (testimonial) {
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

router.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.testimonials.findIndex(item => item.id === id);

  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

module.exports = router;
