const ApiError = require("../api-error");
const KhachHangService = require("../services/khachhang.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const khachhangservice = new KhachHangService(MongoDB.client);
        const document = await khachhangservice.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.dangnhap = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const khachhangservice = new KhachHangService(MongoDB.client);
        const document = await khachhangservice.dangnhap(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getOne = async (req, res, next) => {
    if (!req.params.id)
        return next(new ApiError(400, "Id can not be empty"));

    try {
        const khachhangservice = new KhachHangService(MongoDB.client);
        const document = await khachhangservice.getOne(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}