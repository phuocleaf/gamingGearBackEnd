const ApiError = require("../api-error");
const PhieuNhapService = require("../services/phieunhap.service");
const SanphamService = require("../services/sanpham.service");
const MongoDB = require("../utils/mongodb.util");
const path = require('path');

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const sanphamService = new SanphamService(MongoDB.client);

        // Tạo phiếu nhập trước
        const result = await phieunhapService.create(req.body);
        
        const products = req.body.products;

        // Cập nhật số lượng cho từng sản phẩm
        for (const product of products) {
            // Lấy sản phẩm từ cơ sở dữ liệu
            const sanpham = await sanphamService.getOne(product.productId);
            if (!sanpham) {
                return next(new ApiError(404, "Không tìm thấy sản phẩm"));
            }
           // console.log(sanpham.quantity);
            // Cập nhật số lượng
            sanpham.quantity += product.quantity; // Tăng số lượng
            //console.log(sanpham.quantity);
            const updateResult = await sanphamService.updateproductquantity(product.productId, sanpham, sanpham.quantity);
            
            // Kiểm tra kết quả cập nhật
            if (!updateResult.success) {
                return next(new ApiError(500, "Không thể cập nhật số lượng sản phẩm"));
            }
        }

        // Gửi phản hồi thành công
        res.send(result);
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const result = await phieunhapService.getAll();
        res.send(result);
    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const result = await phieunhapService.getOne(req.params.id);
        res.send(result);
    } catch (error) {
        next(error);
    }
}
