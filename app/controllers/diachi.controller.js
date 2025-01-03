const ApiError = require("../api-error");
const DiaChiService = require("../services/diachi.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Name can not be empty"));

    try {
        const diaChiService = new DiaChiService(MongoDB.client);
        const document = await diaChiService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the category")
        );
    }
};



exports.delete = async (req, res, next) => {
    // kiểm tra sản phẩm thuộc danh mục này
    try {
        const diaChiService = new DiaChiService(MongoDB.client);
        const document = await diaChiService.delete(req.params.id);
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
    try {
        const diaChiService = new DiaChiService(MongoDB.client);
        const document = await diaChiService.update(req.params.id, req.body);
        if (!document)
            return next(new ApiError(404, "Category not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the category")
        );
    }
};

exports.getDiaChiWithId = async (req, res, next) => {
    try {
        const diaChiService = new DiaChiService(MongoDB.client);
        const document = await diaChiService.getDiaChiWithUserId(req.params.id);
        if (!document)
            return next(new ApiError(404, "not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while fetching")
        );
    }
}