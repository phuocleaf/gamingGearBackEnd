const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
class PhieuNhapService {
    constructor(client) {
        this.PhieuNhap = client.db().collection("phieunhap");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractPhieuNhapData(payload) {
        const phieunhap = {
            nhacungcapId: ObjectId.isValid(payload.nhacungcapId) ? new ObjectId(payload.nhacungcapId) : null,
            note : payload.note,
            totalPrice : payload.totalPrice,
            stockInDate : payload.stockInDate,
            confirmationDate : payload.confirmationDate,
            products: Array.isArray(payload.products) ? payload.products.map(product => ({
                productId: ObjectId.isValid(product.productId) ? new ObjectId(product.productId) : null,
                quantity: product.quantity,
                costPrice: product.costPrice,
            })) : []
        };
        // Remove undefined fields
        Object.keys(phieunhap).forEach(
            (key) => phieunhap[key] === undefined && delete phieunhap[key]
        );
        return phieunhap;
    }

    async create(payload) {
        const phieunhap = this.extractPhieuNhapData(payload);
        phieunhap.created_at = new Date().toLocaleString();
        phieunhap.updated_at = new Date().toLocaleString();

        phieunhap.products.forEach(product => {
            product.created_at = new Date().toLocaleString();
            product.updated_at = new Date().toLocaleString();
        });
        await this.PhieuNhap.insertOne(phieunhap);
        return {
            "success": true,
        };
    }

    async getAll() { 
        return await this.PhieuNhap.aggregate([
            {
                $lookup: {
                    from: 'nhacungcap',
                    localField: 'nhacungcapId',
                    foreignField: '_id',
                    as: 'nhacungcap'
                }
            }
        ]).toArray();
    }
            
    async getOne(id) {
        return await this.PhieuNhap.aggregate([
            {
                $match: {
                    _id: ObjectId.isValid(id) ? new ObjectId(id) : null
                }
            },
            {
                $lookup: {
                    from: 'nhacungcap',
                    localField: 'nhacungcapId',
                    foreignField: '_id',
                    as: 'nhacungcap'
                }
            }
        ]).toArray();
    }
   
}

module.exports = PhieuNhapService;