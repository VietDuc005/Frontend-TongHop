import { apiCall } from "./api";

/**
 * Service quản lý Hóa đơn - kết nối với backend (Spring Boot)
 * Đường dẫn gốc: /api/hoadon
 */
export const invoiceService = {
  // 🧾 Lấy tất cả hóa đơn (phân trang, sắp xếp)
  async getAll(page = 0, size = 20, sortBy = "ngayLapHoaDon", sortDirection = "DESC") {
    const response = await apiCall(
      `/api/hoadon/hienThiDanhSach?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );

    // ✅ Chuẩn hóa cấu trúc trả về theo Swagger thực tế
    if (response?.data?.data?.content) return response.data.data.content;
    if (response?.data?.content) return response.data.content;
    if (response?.content) return response.content;
    return [];
  },

  // 📜 Lấy hóa đơn theo ID
  async getById(maHoaDon) {
    return await apiCall(`/api/hoadon/${maHoaDon}`, { method: "GET" });
  },

  // 💳 Cập nhật trạng thái hóa đơn (đã/ chưa thanh toán)
  async updateStatus(maHoaDon, trangThai) {
    return await apiCall(
      `/api/hoadon/${maHoaDon}/trangThai?trangThai=${encodeURIComponent(trangThai)}`,
      { method: "PATCH" }
    );
  },

  // 💰 Cập nhật kiểu thanh toán (Tiền mặt/Thẻ/Chuyển khoản)
  async updatePaymentType(maHoaDon, kieuThanhToan) {
    return await apiCall(
      `/api/hoadon/${maHoaDon}/kieuThanhToan?kieuThanhToan=${encodeURIComponent(kieuThanhToan)}`,
      { method: "PATCH" }
    );
  },

  // 🔍 Tìm kiếm hóa đơn
  async search({ trangThai = "", maPhieu = "", kieuThanhToan = "" }) {
    const params = new URLSearchParams({
      trangThai,
      maPhieu,
      kieuThanhToan,
    }).toString();

    return await apiCall(`/api/hoadon/timKiem?${params}`, { method: "GET" });
  },
};
