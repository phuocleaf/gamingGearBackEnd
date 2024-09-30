const { ObjectId } = require("mongodb");

class SanPhamService {
    constructor(client) {
        this.SanPham = client.db().collection("sanpham");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractSanPhamData(payload) {
        const sanpham = {
            name: payload.name,
            costPrice: payload.costPrice,
            salePrice: payload.salePrice,
            description: payload.description,
            //phanloaiId: payload.phanloaiId
            phanloaiId: ObjectId.isValid(payload.phanloaiId) ? new ObjectId(payload.phanloaiId) : null
        };
        // Remove undefined fields
        Object.keys(sanpham).forEach(
            (key) => sanpham[key] === undefined && delete sanpham[key]
        );
        return sanpham;
    }

    async create(payload) {
        const sanpham = this.extractSanPhamData(payload);
        sanpham.quantity = 0;
        sanpham.created_at = new Date().toLocaleString();
        sanpham.updated_at = new Date().toLocaleString();

        const result = await this.SanPham.insertOne(sanpham);
        // return _id of the inserted document
        return result.insertedId;
    }

    async getAll() {
        return await this.SanPham.find().toArray();
    }

    async delete(id) {
        return await this.SanPham.deleteOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async getOne(id) {
        return await this.SanPham.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async update(id, payload) {
        const sanpham = this.extractSanPhamData(payload);
        sanpham.updated_at = new Date().toLocaleString();
        return await this.SanPham.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: sanpham }
        );
    }
}

module.exports = SanPhamService;