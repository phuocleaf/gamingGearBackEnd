const express = require('express');
const phanloai = require('../controllers/phanloai.controller');

const router = express.Router();

router.route('/') // localhost:3000/api/phanloai
    .get(phanloai.getAll) 
    .post(phanloai.create);

router.route('/:id') // localhost:3000/api/phanloai/:id
    .delete(phanloai.delete)
    .put(phanloai.update)
    .get(phanloai.getOne);

module.exports = router;