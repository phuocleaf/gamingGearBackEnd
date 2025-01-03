const { ObjectId } = require("mongodb");

class DiaChiService {
    constructor(client) {
        this.DiaChi = client.db().collection("diachi");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractDiaChiData(payload) {
        const diachi = {
            khachHangId: ObjectId.isValid(payload.khachHangId) ? new ObjectId(payload.khachHangId) : null,
            desc: payload.desc,
        };
        // Remove undefined fields
        Object.keys(diachi).forEach(
            (key) => diachi[key] === undefined && delete diachi[key]
        );
        return diachi;
    }

    async create(payload) {
        const diachi = this.extractDiaChiData(payload);
        diachi.created_at = new Date().toLocaleString();
        diachi.updated_at = new Date().toLocaleString();

        await this.DiaChi.insertOne(diachi);
        return {
            "success": true,
        };
    }

    async getAll() {
        return await this.DiaChi.find().toArray();
    }

    async delete(id) {
        return await this.DiaChi.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const diachi = this.extractDiaChiData(payload);
        diachi.updated_at = new Date().toLocaleString();

        return await this.DiaChi.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: diachi }
        );
    }

    async getDiaChiWithUserId(id) {
        return await this.DiaChi.find({ khachHangId: ObjectId.isValid(id) ? new ObjectId(id) : null }).toArray();
    }
}

module.exports = DiaChiService;