const express = require('express');
const diachi = require('../controllers/diachi.controller');

const router = express.Router();

router.route('/') // localhost:3000/api/phanloai 
    .post(diachi.create);

router.route('/:id') 
    .delete(diachi.delete)
    .put(diachi.update)
    .get(diachi.getDiaChiWithId);

module.exports = router;