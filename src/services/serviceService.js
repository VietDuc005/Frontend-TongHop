import { apiCall } from "./api";

export const serviceService = {
  // 🧾 Lấy tất cả dịch vụ
  async getAll(page = 0, size = 50, sortBy = "maDichVu", sortDirection = "ASC") {
    const response = await apiCall(
      `/api/dichvu/hienThiDanhSach?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );
    return response;
  },

  // ➕ Thêm mới dịch vụ
  async create(newData) {
    return await apiCall(`/api/dichvu/them`, {
      method: "POST",
      body: JSON.stringify(newData),
    });
  },

  // ✏️ Cập nhật dịch vụ
  async update(maDichVu, updatedData) {
    return await apiCall(`/api/dichvu/${maDichVu}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  },

  // ❌ Xóa dịch vụ
  async remove(maDichVu) {
    return await apiCall(`/api/dichvu/${maDichVu}`, { method: "DELETE" });
  },
};
