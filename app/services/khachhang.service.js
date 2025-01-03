const { ObjectId } = require("mongodb");

class KhachHangService {
    constructor(client) {
        this.KhachHang = client.db().collection("khachhang");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractKhachHangData(payload) {
        const khachhang = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            dateOfBirth: payload.dateOfBirth,
            sex: payload.sex,
            phone: payload.phone,
        };
        // Remove undefined fields
        Object.keys(khachhang).forEach(
            (key) => khachhang[key] === undefined && delete khachhang[key]
        );
        return khachhang;
    }

    async create(payload) {
        const khachhang = this.extractKhachHangData(payload);
        khachhang.active = true;
        khachhang.created_at = new Date().toLocaleString();
        khachhang.updated_at = new Date().toLocaleString();

        const user = await this.KhachHang.findOne({ email: payload.email });

        if(user) {
            return {dangky: false};
        }

        await this.KhachHang.insertOne(khachhang);

        return {dangky: true};
    }

    async getAll() {
        return await this.KhachHang.find().toArray();
    }

    async delete(id) {
        return await this.KhachHang.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const khachhang = this.extractKhachHangData(payload);
        khachhang.updated_at = new Date().toLocaleString();

        return await this.KhachHang.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: khachhang }
        );
    }

    async dangnhap(payload) {
        var khachhang = await this.KhachHang.findOne({ email: payload.email, password: payload.password });
        if(khachhang) {
            return {dangnhap: true, id: khachhang._id, active: khachhang.active, name: khachhang.name};
        } else {
            return {dangnhap: false, id: null, active: null, name: null};
        }
    }

    async getOne(id) {
        return await this.KhachHang.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}

module.exports = KhachHangService;