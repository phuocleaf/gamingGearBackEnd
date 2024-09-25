const { ObjectId } = require("mongodb");

class NhaCungCapService {
    constructor(client) {
        this.NhaCungCap = client.db().collection("nhacungcap");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractNhaCungCapData(payload) {
        const nhacungcap = {
            name: payload.name,
            phoneNumber: payload.phoneNumber,
            address: payload.address,
            email: payload.email,
        };
        // Remove undefined fields
        Object.keys(nhacungcap).forEach(
            (key) => nhacungcap[key] === undefined && delete nhacungcap[key]
        );
        return nhacungcap;
    }

    async create(payload) {
        const nhacungcap = this.extractNhaCungCapData(payload);
        nhacungcap.created_at = new Date().toLocaleString();
        nhacungcap.updated_at = new Date().toLocaleString();

        return await this.NhaCungCap.insertOne(nhacungcap);
    }

    async getAll() {
        return await this.NhaCungCap.find().toArray();
    }

    async delete(id) {
        return await this.NhaCungCap.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const nhacungcap = this.extractNhaCungCapData(payload);
        nhacungcap.updated_at = new Date().toLocaleString();

        return await this.NhaCungCap.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: nhacungcap }
        );
    }

    async getOne(id) {
        return await this.NhaCungCap.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
}

module.exports = NhaCungCapService;