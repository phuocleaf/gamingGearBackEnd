const { ObjectId } = require("mongodb");

class PhanLoaiService {
    constructor(client) {
        this.PhanLoai = client.db().collection("phanloai");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCategoryData(payload) {
        const phanloai = {
            name: payload.name,
        };
        // Remove undefined fields
        Object.keys(phanloai).forEach(
            (key) => phanloai[key] === undefined && delete phanloai[key]
        );
        return phanloai;
    }

    async create(payload) {
        const phanloai = this.extractCategoryData(payload);
        phanloai.created_at = new Date().toLocaleString();
        phanloai.updated_at = new Date().toLocaleString();

        await this.PhanLoai.insertOne(phanloai);
        return {
            "success": true,
        };
    }

    async getAll() {
        return await this.PhanLoai.find().toArray();
    }

    async delete(id) {
        return await this.PhanLoai.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const phanloai = this.extractCategoryData(payload);
        phanloai.updated_at = new Date().toLocaleString();

        return await this.PhanLoai.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: phanloai }
        );
    }

    async getOne(id) {
        return await this.PhanLoai.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}

module.exports = PhanLoaiService;