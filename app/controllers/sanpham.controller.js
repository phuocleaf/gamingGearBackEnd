const ApiError = require("../api-error");
const SanPhamService = require("../services/sanpham.service");
const AnhSanPhamService = require("../services/anhsanpham.service");
const MongoDB = require("../utils/mongodb.util");
const path = require('path');

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const sanphamService = new SanPhamService(MongoDB.client);
        const idSanPham = await sanphamService.create(req.body);
        const anhsanphamService = new AnhSanPhamService(MongoDB.client);
        const imagePaths = req.files ? req.files.map(file => path.basename(file.path)) : [];
        for (let i = 0; i < imagePaths.length; i++) {
            await anhsanphamService.create(idSanPham, imagePaths[i]);
        }
        return res.send({"success": true, "id": idSanPham});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.getAnhSanPham = async (req, res, next) => {
    try {
        const anhsanphamService = new AnhSanPhamService(MongoDB.client);
        const documents = await anhsanphamService.getProductImages(req.params.id);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching the images")
        );
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const sanphamService = new SanPhamService(MongoDB.client);
        const documents = await sanphamService.getAll();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching the products")
        );
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const sanphamService = new SanPhamService(MongoDB.client);
        const document = await sanphamService.delete(req.params.id);
        const anhsanphamService = new AnhSanPhamService(MongoDB.client);
        await anhsanphamService.deleteProductPhoto(req.params.id);
        if (!document)
            return next(new ApiError(404, "Product not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting the product")
        );
    }
};

exports.getProductWithId = async (req, res, next) => {
    try {
        const sanphamService = new SanPhamService(MongoDB.client);
        const document = await sanphamService.getOne(req.params.id);
        if (!document)
            return next(new ApiError(404, "Product not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching the product")
        );
    }
};

exports.updateProduct = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const sanphamService = new SanPhamService(MongoDB.client);
        const document = await sanphamService.update(req.params.id, req.body);
        const anhsanphamService = new AnhSanPhamService(MongoDB.client);
        if(req.files && Array.isArray(req.files)){
            const imagePaths = req.files.map(file => path.basename(file.path));
            for (let i = 0; i < imagePaths.length; i++) {
                await anhsanphamService.create(req.params.id, imagePaths[i]);
            }
        }
        if (req.body.deletedImages) {
            const deletedImages = JSON.parse(req.body.deletedImages);
            for (let i = 0; i < deletedImages.length; i++) {
                await anhsanphamService.deletePhoto(deletedImages[i]);
            }
        }

        if (!document)
            return next(new ApiError(404, "Product not found"));

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the product")
        );
    }
};