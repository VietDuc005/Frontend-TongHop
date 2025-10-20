import { apiCall } from "./api";

export const vehicleService = {
  // Lấy tất cả xe (có thể phân trang)
  getAll: async (page = 0, size = 10, sortBy = "maXe", sortDirection = "ASC") => {
    const response = await apiCall(
      `/api/xe/hienThiDanhSach?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );
    return response; // 🔥 JSON có thể chứa "content"
  },

  // Thêm xe mới
  async create(newData) {
    return await apiCall(`/api/xe/them`, {
      method: "POST",
      body: JSON.stringify(newData),
    });
  },

  // Xóa xe
  async remove(maXe) {
    return await apiCall(`/api/xe/${maXe}`, {
      method: "DELETE",
    });
  },

  // Cập nhật xe
  async update(maXe, updatedData) {
    return await apiCall(`/api/xe/${maXe}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  },
};
