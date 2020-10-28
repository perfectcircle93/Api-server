const express = require('express');
const router = express.Router();
//const db = require('../db');
//const { v4: uuidv4 } = require('uuid');
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getById);
router.post('/seats', SeatController.postNew);
router.put('/seats/:id', SeatController.edit);
router.delete('/seats/:id', SeatController.deleteById);

module.exports = router 