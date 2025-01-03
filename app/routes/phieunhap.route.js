const express = require('express');
const phieunhap = require('../controllers/phieunhap.controller');
const router = express.Router();

router.route('/') // localhost:3000/api/phieunhap
    .get(phieunhap.getAll) 
    .post(phieunhap.create);

router.route('/:id') // localhost:3000/api/phanloai/:id
    // .delete(phanloai.delete)
    // .put(phanloai.update)
    .get(phieunhap.getOne);

module.exports = router;