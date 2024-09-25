const express = require('express');
const cors = require('cors');

const phanloaiRouter = require('./app/routes/phanloai.route');
const nhacungcapRouter = require('./app/routes/nhacungcap.route');
const nhanvienRouter = require('./app/routes/nhanvien.route');
const nguoigiaohangRouter = require('./app/routes/nguoigiaohang.route');
const sanphamRouter = require('./app/routes/sanpham.route');

const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(
  {extended: true}
));


app.get('/', (req, res) => {
  res.json({message: 'welcome to gaming gear store'});
});

app.use('/api/hinhanh', express.static('uploads'));

app.use('/api/phanloai', phanloaiRouter);
app.use('/api/nhacungcap', nhacungcapRouter);
app.use('/api/nhanvien', nhanvienRouter);
app.use('/api/nguoigiaohang', nguoigiaohangRouter);
app.use('/api/sanpham', sanphamRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, 'Resource Not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
