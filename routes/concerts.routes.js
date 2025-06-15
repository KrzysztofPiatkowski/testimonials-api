const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const concertsController = require('../controllers/concerts.controller');

router.get('/', concertsController.getAll);

router.get('/:id', concertsController.getId);

router.post('/', concertsController.post);

router.put('/:id', concertsController.put);

router.delete('/:id', concertsController.delete);

module.exports = router;
