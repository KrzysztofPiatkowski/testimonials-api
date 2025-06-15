const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const testimonialsController = require('../controllers/testimonials.controller');

router.get('/', testimonialsController.getAll);

router.get('/random', testimonialsController.getRandom);

router.get('/:id', testimonialsController.getId);

router.post('/', testimonialsController.post);

router.put('/:id', testimonialsController.put);

router.delete('/:id', testimonialsController.delete);

module.exports = router;
