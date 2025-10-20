import React, { useState, useEffect } from "react";

/**
 * Props:
 * - initialData (object | null): Dữ liệu ban đầu để sửa. Nếu là null, form sẽ ở chế độ "Thêm mới".
 * - onSave (function): Hàm được gọi khi người dùng nhấn nút "Lưu", truyền vào dữ liệu của form.
 * - onClose (function): Hàm được gọi khi người dùng muốn đóng modal.
 */
const ServiceFormModal = ({ initialData, onSave, onClose }) => {
  // State để quản lý dữ liệu trong các ô input của form
  const [formData, setFormData] = useState({
    tenLoai: "",
    moTa: "",
  });

  // State để quản lý lỗi validation (nếu cần)
  const [errors, setErrors] = useState({});

  // Sử dụng useEffect để điền dữ liệu vào form khi `initialData` thay đổi (khi mở modal ở chế độ sửa)
  useEffect(() => {
    if (initialData) {
      // Chế độ sửa: Lấy dữ liệu từ `initialData`
      setFormData({
        tenLoai: initialData.tenLoai || "",
        moTa: initialData.moTa || "",
      });
    } else {
      // Chế độ thêm mới: Reset form
      setFormData({
        tenLoai: "",
        moTa: "",
      });
    }
  }, [initialData]); // Effect này sẽ chạy lại mỗi khi `initialData` thay đổi

  // Hàm xử lý khi giá trị của input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm kiểm tra dữ liệu form trước khi lưu
  const validate = () => {
    const newErrors = {};
    if (!formData.tenLoai.trim()) {
      newErrors.tenLoai = "Tên loại dịch vụ không được để trống.";
    }
    setErrors(newErrors);
    // Nếu không có lỗi, `Object.keys(newErrors)` sẽ là một mảng rỗng
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang
    if (validate()) {
      // Nếu dữ liệu hợp lệ, gọi hàm onSave đã được truyền từ component cha
      onSave(formData);
    }
  };

  return (
    // Lớp phủ (overlay) cho toàn màn hình
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} // Cho phép đóng modal khi click ra ngoài
    >
      {/* Container của modal, ngăn sự kiện click lan ra ngoài */}
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header của Modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Chỉnh sửa Loại Dịch vụ" : "Thêm Loại Dịch vụ mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input cho Tên loại dịch vụ */}
          <div className="mb-4">
            <label
              htmlFor="tenLoai"
              className="block text-gray-700 font-semibold mb-2"
            >
              Tên loại dịch vụ
            </label>
            <input
              type="text"
              id="tenLoai"
              name="tenLoai"
              value={formData.tenLoai}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.tenLoai ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`}
              placeholder="Ví dụ: Bảo dưỡng định kỳ"
            />
            {errors.tenLoai && <p className="text-red-500 text-sm mt-1">{errors.tenLoai}</p>}
          </div>

          {/* Input cho Mô tả */}
          <div className="mb-6">
            <label
              htmlFor="moTa"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mô tả
            </label>
            <textarea
              id="moTa"
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Nhập mô tả chi tiết cho loại dịch vụ..."
            ></textarea>
          </div>

          {/* Các nút bấm */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              {initialData ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormModal;