const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const seatsController = require('../controllers/seats.controller');

router.get('/', seatsController.getAll);

router.get('/:id', seatsController.getId);

router.post('/', seatsController.post);

router.put('/:id', seatsController.put);

router.delete('/:id', seatsController.delete);

module.exports = router;
