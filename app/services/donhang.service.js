const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
class DonHangService {
    constructor(client) {
        this.DonHang = client.db().collection("donhang");
    }

     async create(payload) {
        try{
            payload.created_at = new Date();
            payload.updated_at = new Date();
            payload.status = "Chờ xác nhận";
            payload.nguoiGiaoHangId = "";
            payload.nguoiGiaoHangName = "";
            const result = await this.DonHang.insertOne(payload);
    
            return {
                "success": true,
            };
        }
        catch(err){
            return {
                "success": false,
            };
        }
    }


    async getOne(id) { 
        return await this.DonHang.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async getWithUserId(id, status) {
        return await this.DonHang.find({ userId: id, status: status }).toArray();
    }
    
    /** 
* Paste one or more documents here
*/
// {
//     "cartList": [
//       {
//         "amount": 2,
//         "sanPham": {
//           "_id": "66fa8ab1695ea5469e044b5a",
//           "costPrice": "230000",
//           "created_at": "30/09/2024, 6:25:37 pm",
//           "description": "chuot choi game gia nhap mon",
//           "images": [
//             {
//               "_id": "66fa8ab1695ea5469e044b5b",
//               "created_at": "30/09/2024, 6:25:37 pm",
//               "idSanPham": "66fa8ab1695ea5469e044b5a",
//               "path": "1727695537229-r1se1.webp",
//               "updated_at": "30/09/2024, 6:25:37 pm"
//             },
//             {
//               "_id": "66fa8ab1695ea5469e044b5c",
//               "created_at": "30/09/2024, 6:25:37 pm",
//               "idSanPham": "66fa8ab1695ea5469e044b5a",
//               "path": "1727695537230-r1se2.webp",
//               "updated_at": "30/09/2024, 6:25:37 pm"
//             },
//             {
//               "_id": "66fa8ab1695ea5469e044b5d",
//               "created_at": "30/09/2024, 6:25:37 pm",
//               "idSanPham": "66fa8ab1695ea5469e044b5a",
//               "path": "1727695537230-r1se3.webp",
//               "updated_at": "30/09/2024, 6:25:37 pm"
//             },
//             {
//               "_id": "66fa8ab1695ea5469e044b5e",
//               "created_at": "30/09/2024, 6:25:37 pm",
//               "idSanPham": "66fa8ab1695ea5469e044b5a",
//               "path": "1727695537230-r1se4.webp",
//               "updated_at": "30/09/2024, 6:25:37 pm"
//             },
//             {
//               "_id": "66fa8ab1695ea5469e044b5f",
//               "created_at": "30/09/2024, 6:25:37 pm",
//               "idSanPham": "66fa8ab1695ea5469e044b5a",
//               "path": "1727695537230-r1se5.webp",
//               "updated_at": "30/09/2024, 6:25:37 pm"
//             }
//           ],
//           "name": "VXE R1 SE",
//           "phanloai": [
//             {
//               "_id": "66f6468b7ca83c09598b877d",
//               "created_at": "27/09/2024, 12:45:47 pm",
//               "name": "Chuột",
//               "updated_at": "27/09/2024, 12:45:47 pm"
//             }
//           ],
//           "phanloaiId": "66f6468b7ca83c09598b877d",
//           "quantity": 84,
//           "salePrice": "380000",
//           "updated_at": "18/10/2024, 8:42:53 am"
//         }
//       },
//       {
//         "amount": 2,
//         "sanPham": {
//           "_id": "6711c38a7f3042d7aa5676c8",
//           "costPrice": "120000",
//           "created_at": "18/10/2024, 9:10:18 am",
//           "description": "Pad chuột kính speed có lớp phủ chống ẩm, phù hợp chơi các tựa game moba và phiêu lưu",
//           "images": [
//             {
//               "_id": "6711c38a7f3042d7aa5676c9",
//               "created_at": "18/10/2024, 9:10:18 am",
//               "idSanPham": "6711c38a7f3042d7aa5676c8",
//               "path": "1729217418280-atom1.webp",
//               "updated_at": "18/10/2024, 9:10:18 am"
//             },
//             {
//               "_id": "6711c38a7f3042d7aa5676ca",
//               "created_at": "18/10/2024, 9:10:18 am",
//               "idSanPham": "6711c38a7f3042d7aa5676c8",
//               "path": "1729217418280-atom2.webp",
//               "updated_at": "18/10/2024, 9:10:18 am"
//             },
//             {
//               "_id": "6711c38a7f3042d7aa5676cb",
//               "created_at": "18/10/2024, 9:10:18 am",
//               "idSanPham": "6711c38a7f3042d7aa5676c8",
//               "path": "1729217418281-atom3.webp",
//               "updated_at": "18/10/2024, 9:10:18 am"
//             },
//             {
//               "_id": "6711c38a7f3042d7aa5676cc",
//               "created_at": "18/10/2024, 9:10:18 am",
//               "idSanPham": "6711c38a7f3042d7aa5676c8",
//               "path": "1729217418284-atom4.webp",
//               "updated_at": "18/10/2024, 9:10:18 am"
//             }
//           ],
//           "name": "Pad chuột Atom Speed",
//           "phanloai": [
//             {
//               "_id": "66f0ce5a0d4f3dae9d76e823",
//               "created_at": "23/09/2024, 9:11:38 am",
//               "name": "Pad chuột",
//               "updated_at": "23/09/2024, 9:11:38 am"
//             }
//           ],
//           "phanloaiId": "66f0ce5a0d4f3dae9d76e823",
//           "quantity": 31,
//           "salePrice": "250000",
//           "updated_at": "18/10/2024, 9:13:03 am"
//         }
//       }
//     ],
//     "total": 1260000,
//     "userAddress": {
//       "_id": "672ebb4b9bb323f1665becb7",
//       "created_at": "09/11/2024, 8:30:51 am",
//       "desc": "Mang Thít, Vĩnh Long",
//       "khachHangId": "672c8f9dfe747d3fd1e37211",
//       "updated_at": "09/11/2024, 8:47:29 am"
//     },
//     "userId": "672c8f9dfe747d3fd1e37211",
//     "userName": "Nguyen Tan Phuoc",
//     "userNote": "giao gap",
//     "userPhone": "0329361062",
//     "created_at": "14/11/2024, 4:19:49 pm",
//     "updated_at": "14/11/2024, 4:19:49 pm",
//     "status": "Chờ xác nhận"
//      "nguoiGiaoHangId": "",
//      "nguoiGiaoHangName": ""
//   }


    // updateStatus and update product quantity
    async updateStatus(id, status) {
        try {
            const document = await this.DonHang.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
            if (status == "Đang xử lý") {
                for (let i = 0; i < document.cartList.length; i++) {
                    const sanPham = await MongoDB.client.db().collection("sanpham").findOne({ _id: ObjectId.isValid(document.cartList[i].sanPham._id) ? new ObjectId(document.cartList[i].sanPham._id) : null });
                    const quantity = sanPham.quantity - document.cartList[i].amount;
                    await MongoDB.client.db().collection("sanpham").updateOne({ _id: ObjectId.isValid(sanPham._id) ? new ObjectId(sanPham._id) : null }, { $set: { quantity: quantity } });
                }
            } else if (status == "Đã hủy" && document.status != "Chờ xác nhận") {
                for (let i = 0; i < document.cartList.length; i++) {
                    const sanPham = await MongoDB.client.db().collection("sanpham").findOne({ _id: ObjectId.isValid(document.cartList[i].sanPham._id) ? new ObjectId(document.cartList[i].sanPham._id) : null });
                    const quantity = sanPham.quantity + document.cartList[i].amount;
                    await MongoDB.client.db().collection("sanpham").updateOne({ _id: ObjectId.isValid(sanPham._id) ? new ObjectId(sanPham._id) : null }, { $set: { quantity: quantity } });
                }
            }

            var updated_at = new Date();

            //await this.DonHang.findOneAndUpdate({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }, { $set: { status: status } });
            await this.DonHang.findOneAndUpdate({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }, { $set: { status: status, updated_at: updated_at } });
            return {
                "success": true,
            }
        } catch (error) {
            return {
                "success": false,
            };
        }
    }

    async updateNguoiGiaoHangDonHang(id, nguoiGiaoHangId, nguoiGiaoHangName) {
        try {
            await this.DonHang.findOneAndUpdate({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }, { $set: { nguoiGiaoHangId: nguoiGiaoHangId, nguoiGiaoHangName: nguoiGiaoHangName } });
            return {
                "success": true,
            }
        } catch (error) {
            return {
                "success": false,
            };
        }
    }

    // sort by date and status
    async getAll() {
        return await this.DonHang.find().sort({ created_at: -1 }).toArray();
    }

    
 

    async getSanPhamBanChayTrongThang(thang, nam) {
        // Xác định ngày bắt đầu và kết thúc của tháng
        const start = new Date(nam, thang - 1, 1);
        const end = new Date(nam, thang, 0);

        // Lấy các đơn hàng trong tháng
        const donHangs = await this.DonHang.find({
            created_at: { $gte: start, $lt: end },
            status: "Đã giao"
        }).toArray();

        const productSales = new Map();

        // Tính toán số lượng bán của từng sản phẩm
        donHangs.forEach((donHang) => {
            donHang.cartList.forEach((item) => {
                const productId = item.sanPham._id;
                const productName = item.sanPham.name;

                if (!productSales.has(productId)) {
                    productSales.set(productId, { name: productName, amount: 0 });
                }
                productSales.get(productId).amount += item.amount;
            });
        });

        // Chuyển đổi Map thành mảng, sắp xếp theo số lượng bán giảm dần
        const sortedProducts = Array.from(productSales.entries())
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => b.amount - a.amount);
        //trả về tối đa 10 sản phẩm bán chạy nhất
        return sortedProducts.slice(0, 10);
    }


    async getTongDonTrongThang(thang, nam) {
        // Xác định ngày bắt đầu và kết thúc của tháng
        const start = new Date(nam, thang - 1, 1);
        const end = new Date(nam, thang, 0);

        // Lấy các đơn hàng trong tháng
        const donHangs = await this.DonHang.find({
            created_at: { $gte: start, $lt: end },
            status: "Đã giao"
        }).toArray();

        //đếm số đơn hàng trong tháng
        return {
            "tongdon": donHangs.length
        };
    }

    async getTongDoanhThuTrongThang(thang, nam) {
        // Xác định ngày bắt đầu và kết thúc của tháng
        const start = new Date(nam, thang - 1, 1);
        const end = new Date(nam, thang, 0);

        // Lấy các đơn hàng trong tháng
        const donHangs = await this.DonHang.find({
            created_at: { $gte: start, $lt: end },
            status: "Đã giao"
        }).toArray();

        //tính tổng doanh thu trong tháng
        let tongDoanhThu = 0;
        donHangs.forEach((donHang) => {
            tongDoanhThu += donHang.total;
        });

        return {
            "tongdoanhthu": tongDoanhThu
        };
    }
    
}

module.exports = DonHangService;