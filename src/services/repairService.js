// src/services/repairService.js
import { apiCall } from "./api";

export const repairService = {
  // 🧾 Lấy tất cả phiếu sửa chữa
  async getAll(page = 0, size = 10, sortBy = "ngayLap", sortDirection = "DESC") {
    const response = await apiCall(
      `/api/phieusuachua/hienthiDanhSach?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );

    // ✅ Trường hợp response có cấu trúc { success, message, data: { content: [...] } }
    if (response?.data?.content) {
      return response.data.content;
    }
    return response; // fallback
  },

  // ➕ Tạo phiếu sửa chữa mới
  async create(newData) {
    return await apiCall(`/api/phieusuachua/them`, {
      method: "POST",
      body: JSON.stringify(newData),
    });
  },

  // ✏️ Cập nhật trạng thái phiếu sửa chữa (PATCH)
  async updateStatus(maPhieu, trangThaiMoi) {
    // ✅ Backend yêu cầu PATCH + RequestParam
    return await apiCall(
      `/api/phieusuachua/${maPhieu}/capNhatTrangThai?trangThai=${encodeURIComponent(trangThaiMoi)}`,
      { method: "PATCH" }
    );
  },

  // 📜 Lấy hóa đơn theo mã phiếu
  async getInvoice(maPhieu) {
    return await apiCall(`/api/phieusuachua/${maPhieu}/layHoaDon`, {
      method: "GET",
    });
  },

  // 🔍 Tìm kiếm phiếu sửa chữa
  async search({ trangThai = "", bienSo = "", maTho = "" }) {
    const params = new URLSearchParams({
      trangThai,
      bienSo,
      maTho,
    }).toString();

    return await apiCall(`/api/phieusuachua/timKiem?${params}`, {
      method: "GET",
    });
  },
};
