const ApiError = require("../api-error");
const PhanLoaiService = require("../services/phanloai.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Name can not be empty"));

    try {
        const phanloaiService = new PhanLoaiService(MongoDB.client);
        const document = await phanloaiService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the category")
        );
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const phanloaiService = new PhanLoaiService(MongoDB.client);
        const documents = await phanloaiService.getAll();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching the categories")
        );
    }
}

exports.delete = async (req, res, next) => {
    // kiểm tra sản phẩm thuộc danh mục này
    try {
        const phanloaiService = new PhanLoaiService(MongoDB.client);
        const document = await phanloaiService.delete(req.params.id);
        console.log(document);
        if (!document)  // Kiểm tra document null thay vì document.value
            return next(new ApiError(404, "Category not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting the category")
        );
    }
};  

exports.update = async (req, res, next) => {
    if (!req.body?.name)
        return next(new ApiError(400, "Name can not be empty"));

    try {
        const phanloaiService = new PhanLoaiService(MongoDB.client);
        const document = await phanloaiService.update(req.params.id, req.body);
        if (!document)
            return next(new ApiError(404, "Category not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the category")
        );
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const phanloaiService = new PhanLoaiService(MongoDB.client);
        const document = await phanloaiService.getOne(req.params.id);
        if (!document)
            return next(new ApiError(404, "not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching")
        );
    }
}