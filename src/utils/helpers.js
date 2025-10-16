export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

export const getStatusColor = (status) => {
  const colors = {
    'Hoàn thành': 'bg-green-100 text-green-800',
    'Đang sửa': 'bg-blue-100 text-blue-800',
    'Chờ xử lý': 'bg-yellow-100 text-yellow-800',
    'Đã thanh toán': 'bg-green-100 text-green-800',
    'Chưa thanh toán': 'bg-red-100 text-red-800',
    'VIP': 'bg-yellow-100 text-yellow-800',
    'Thường': 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};