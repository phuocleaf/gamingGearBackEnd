const express = require('express');
const donhang = require('../controllers/donhang.controller');

const router = express.Router();

router.route('/') // localhost:3000/api/phanloai 
    .post(donhang.create)
    .get(donhang.getAll)

router.route('/:id') 
    // .delete(diachi.delete)
    // .put(diachi.update)
    .get(donhang.getOne)
    .put(donhang.updateNguoiGiaoHangDonHang)
    
router.route('/update/:id/:status')  //
    .put(donhang.updateStatus)

router.route('/user/:id/:status') 
    .get(donhang.getWithUserId)

// tổng đơn trong tháng
router.route('/tongdontrongthang/:thang/:nam')
    .get(donhang.getTongDonTrongThang)
    
router.route('/sanphambanchaytrongthang/:thang/:nam')
    .get(donhang.getSanPhamBanChayTrongThang)

router.route('/tongdoanhthutrongthang/:thang/:nam')
    .get(donhang.getTongDoanhThuTrongThang)

module.exports = router;