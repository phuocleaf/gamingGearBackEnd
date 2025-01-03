const express = require('express');
const khachhang = require('../controllers/khachhang.controller');
const router = express.Router();

// router.route('/') // localhost:3000/api/nhanvien
//     .get(khachhang.getAll) 

router.route('/:id') // localhost:3000/api/nhanvien/:id
    //.delete(khachhang.delete)
    //.put(khachhang.update)
    .get(khachhang.getOne);

router.route('/dangnhap') 
    .post(khachhang.dangnhap);


router.route('/dangky') 
    .post(khachhang.create);




module.exports = router;