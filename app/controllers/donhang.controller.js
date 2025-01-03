const e = require("express");
const ApiError = require("../api-error");
const DonHangService = require("../services/donhang.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body)
        return next(new ApiError(400, "Body can not be empty"));

    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.create(req.body);
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
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getOne(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getWithUserId = async (req, res, next) => {
    if (!req.params.id)
        return next(new ApiError(400, "Id can not be empty"));

    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getWithUserId(req.params.id, req.params.status);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.updateStatus = async (req, res, next) => {
    if (!req.params.id)
        return next(new ApiError(400, "Id can not be empty"));

    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.updateStatus(req.params.id, req.params.status);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.updateNguoiGiaoHangDonHang = async (req, res, next) => {
    if (!req.params.id)
        return next(new ApiError(400, "Id can not be empty"));

    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.updateNguoiGiaoHangDonHang(req.params.id, req.body.nguoiGiaoHangId, req.body.nguoiGiaoHangName);  
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getAll();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getSanPhamBanChayTrongThang = async (req, res, next) => {
    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getSanPhamBanChayTrongThang(req.params.thang, req.params.nam);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getTongDonTrongThang = async (req, res, next) => {
    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getTongDonTrongThang(req.params.thang, req.params.nam);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}

exports.getTongDoanhThuTrongThang = async (req, res, next) => {
    try {
        const donhangservice = new DonHangService(MongoDB.client);
        const document = await donhangservice.getTongDoanhThuTrongThang(req.params.thang, req.params.nam);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating")
        );
    }
}
