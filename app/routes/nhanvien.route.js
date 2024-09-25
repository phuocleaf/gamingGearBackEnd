const express = require('express');
const nhanvien = require('../controllers/nhanvien.controller');
const router = express.Router();

router.route('/') // localhost:3000/api/nhanvien
    .get(nhanvien.getAll) 
    .post(nhanvien.create);

router.route('/:id') // localhost:3000/api/nhanvien/:id
    .delete(nhanvien.delete)
    .put(nhanvien.update)
    .get(nhanvien.getOne);

router.route('/dangnhap') // localhost:3000/api/nhanvien/dangnhap
    .post(nhanvien.dangnhap);

module.exports = router;