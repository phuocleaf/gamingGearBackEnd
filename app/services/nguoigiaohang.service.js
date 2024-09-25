const { ObjectId } = require("mongodb");

class NguoiGiaoHangService {
    constructor(client) {
        this.NguoiGiaoHang = client.db().collection("nguoigiaohang");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractNguoiGiaoHangData(payload) {
        const nguoigiaohang = {
            name: payload.name,
            email: payload.email,
            dateOfBirth: payload.dateOfBirth,
            sex: payload.sex,
            phone: payload.phone,
        };
        // Remove undefined fields
        Object.keys(nguoigiaohang).forEach(
            (key) => nguoigiaohang[key] === undefined && delete nguoigiaohang[key]
        );
        return nguoigiaohang;
    }

    async create(payload) {
        const nguoigiaohang = this.extractNguoiGiaoHangData(payload);
        nguoigiaohang.created_at = new Date().toLocaleString();
        nguoigiaohang.updated_at = new Date().toLocaleString();

        return await this.NguoiGiaoHang.insertOne(nguoigiaohang);
    }

    async getAll() {
        return await this.NguoiGiaoHang.find().toArray();
    }

    async delete(id) {
        return await this.NguoiGiaoHang.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const nguoigiaohang = this.extractNguoiGiaoHangData(payload);
        nguoigiaohang.updated_at = new Date().toLocaleString();

        return await this.NguoiGiaoHang.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: nguoigiaohang }
        );
    }

    async getOne(id) {
        return await this.NguoiGiaoHang.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}

module.exports = NguoiGiaoHangService;