const express = require('express');
const nhacungcap = require('../controllers/nhacungcap.controller');
const router = express.Router();

router.route('/') // localhost:3000/api/nhacungcap
    .get(nhacungcap.getAll) 
    .post(nhacungcap.create);

router.route('/:id') // localhost:3000/api/nhacungcap/:id
    .delete(nhacungcap.delete)
    .put(nhacungcap.update)
    .get(nhacungcap.getOne);
module.exports = router;