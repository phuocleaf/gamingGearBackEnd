const express = require('express');
const nguoigiaohang = require('../controllers/nguoigiaohang.controller');
const router = express.Router();

router.route('/') // localhost:3000/api/nguoigiaohang
    .get(nguoigiaohang.getAll) 
    .post(nguoigiaohang.create);

router.route('/:id') // localhost:3000/api/nguoigiaohang/:id
    .delete(nguoigiaohang.delete)
    .put(nguoigiaohang.update)
    .get(nguoigiaohang.getOne);
module.exports = router;