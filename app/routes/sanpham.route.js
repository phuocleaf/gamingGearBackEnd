const express = require('express');
const sanpham = require('../controllers/sanpham.controller')

const multer = require('multer');
const { route } = require('./nhanvien.route');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })


router.route('/') // localhost:3000/api/sanpham
  .post(upload.array('images', 5), sanpham.create)
  .get(sanpham.getProducts);

// router.route('/:id') // localhost:3000/api/sanpham/:id
//     .get(product.getProductWithId)
//     .put(product.updateProduct)
//     .delete(product.deleteProduct);
router.route('/anhsanpham/:id') // localhost:3000/api/sanpham/anhsanpham/:id
    .get(sanpham.getAnhSanPham);

router.route('/:id') // localhost:3000/api/sanpham/:id
  .delete(sanpham.deleteProduct)
  .get(sanpham.getProductWithId)

module.exports = router;