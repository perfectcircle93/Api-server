const express = require('express');
const router = express.Router();
//const db = require('../db');
//const { v4: uuidv4 } = require('uuid');
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);
router.get('/testimonials/:id', TestimonialsController.getById);
router.post('/testimonials', TestimonialsController.postNew);
router.put('/testimonials/:id', TestimonialsController.edit);
router.delete('/testimonials/:id', TestimonialsController.deleteById);

module.exports = router 