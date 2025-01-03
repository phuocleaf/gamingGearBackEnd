const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
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

    async getProductsWithImage() {
        return await this.SanPham.aggregate([
            {
                $lookup: {
                    from: "anhsanpham",
                    localField: "_id",
                    foreignField: "idSanPham",
                    as: "images"
                }
            },
            {
                $lookup: {
                    from: "phanloai",
                    localField: "phanloaiId",
                    foreignField: "_id",
                    as: "phanloai"
                }
            }
        ]).toArray();
    }
    
    
    async updateproductquantity(id, payload, quantity) {
        const sanpham = this.extractSanPhamData(payload);
        sanpham.updated_at = new Date().toLocaleString();
        sanpham.quantity = quantity;
        const result = await this.SanPham.updateOne(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: sanpham }
        );
    
        console.log(`Update Result: ${JSON.stringify(result)}`); // Log kết quả cập nhật
        console.log(`Modified Count: ${result.modifiedCount}`); // Log số bản ghi đã thay đổi
    
        // Kiểm tra xem có bản ghi nào đã được cập nhật không
        if (result.modifiedCount === 0) {
            return { success: false }; // Nếu không có bản ghi nào được cập nhật
        }
        return { success: true };
    }
    
    

}

module.exports = SanPhamService;