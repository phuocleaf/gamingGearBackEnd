const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection("nhanvien");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractNhanVienData(payload) {
        const nhanvien = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            dateOfBirth: payload.dateOfBirth,
            sex: payload.sex,
            phone: payload.phone,
            role: payload.role,
        };
        // Remove undefined fields
        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {
        const nhanvien = this.extractNhanVienData(payload);
        nhanvien.created_at = new Date().toLocaleString();
        nhanvien.updated_at = new Date().toLocaleString();

        return await this.NhanVien.insertOne(nhanvien);
    }

    async getAll() {
        return await this.NhanVien.find().toArray();
    }

    async delete(id) {
        return await this.NhanVien.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const nhanvien = this.extractNhanVienData(payload);
        nhanvien.updated_at = new Date().toLocaleString();

        return await this.NhanVien.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: nhanvien }
        );
    }

    async dangnhap(payload) {
        var nhanvien = await this.NhanVien.findOne({ email: payload.email, password: payload.password });
        if(nhanvien) {
            return {dangnhap: true, id: nhanvien._id, role: nhanvien.role};
        } else {
            return {dangnhap: false, id: null, role: null};
        }
    }

    async getOne(id) {
        return await this.NhanVien.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}

module.exports = NhanVienService;