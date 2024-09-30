const { ObjectId } = require("mongodb");

class AnhSanPhamService {
    constructor(client) {
        this.AnhSanPham = client.db().collection("anhsanpham");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractAnhSanPhamData(idSanPham, path) {
        const anhsanpham = {
            idSanPham: new ObjectId(idSanPham),
            path: path,
        };
        // Remove undefined fields
        Object.keys(anhsanpham).forEach(
            (key) => anhsanpham[key] === undefined && delete anhsanpham[key]
        );
        return anhsanpham;
    }

    async create(idSanPham, path) {
        const anhsanpham = this.extractAnhSanPhamData(idSanPham, path);
        anhsanpham.created_at = new Date().toLocaleString();
        anhsanpham.updated_at = new Date().toLocaleString();
        await this.AnhSanPham.insertOne(anhsanpham);
    }

    async getProductImages(idSanPham) {
        return await this.AnhSanPham.find({ idSanPham: new ObjectId(idSanPham) }).toArray();
    }

    async deleteProductPhoto(id) {
        // Delete all images of the product
        await this.AnhSanPham.deleteMany({ idSanPham: new ObjectId(id) });
    }

    async deletePhoto(id) {
        // Delete one image
        await this.AnhSanPham.deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = AnhSanPhamService;