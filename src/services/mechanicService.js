// src/services/mechanicService.js

import { apiCall } from "./api";

// ✨ SỬA LẠI ĐÂY: Bỏ tiền tố "/tho"
const API_BASE_URL = "/api/tho"; 

export const mechanicService = {
  /**
   * Lấy danh sách tất cả thợ (có phân trang)
   */
  getAll: async (page = 0, size = 10, sortBy = "maTho", sortDirection = "ASC") => {
    const response = await apiCall(
      `${API_BASE_URL}/hienThiDanhSach?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      { method: "GET" }
    );
    return response;
  },

  /**
   * Thêm một thợ mới
   * @param {object} mechanicData - Dữ liệu của thợ mới
   */
  async create(mechanicData) {
    return await apiCall(`${API_BASE_URL}/them`, {
      method: "POST",
      body: JSON.stringify(mechanicData),
    });
  },

  /**
   * Xóa một thợ
   * @param {string|number} id - ID của thợ cần xóa
   */
  async remove(id) {
    return await apiCall(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Cập nhật thông tin một thợ
   * @param {string|number} id - ID của thợ cần cập nhật
   * @param {object} updatedData - Dữ liệu mới
   */
  async update(id, updatedData) {
    return await apiCall(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  },
};