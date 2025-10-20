import { apiCall } from "./api";

export const customerService = {
  // Lấy tất cả khách hàng
  getAll: async (page = 0, size = 10, sortBy = "maKhachHang", sortDirection = "ASC") => {
    const response = await apiCall(
      `/api/khachhang?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );
    return response; // 🔥 Giữ nguyên vì có thể có "content"
  },

  // Thêm khách hàng mới
  async create(newData) {
    return await apiCall(`/api/khachhang/them`, {
      method: "POST",
      body: JSON.stringify(newData),
    });
  },

  // Xóa khách hàng
  async remove(maKhachHang) {
    return await apiCall(`/api/khachhang/${maKhachHang}`, {
      method: "DELETE",
    });
  },

  // Cập nhật khách hàng
  async update(maKhachHang, updatedData) {
    return await apiCall(`/api/khachhang/${maKhachHang}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  },
};
