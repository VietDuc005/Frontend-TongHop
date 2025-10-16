export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  MECHANIC: 'MECHANIC',
};

export const REPAIR_STATUS = {
  PENDING: 'Chờ xử lý',
  IN_PROGRESS: 'Đang sửa',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Hủy',
};

export const PAYMENT_STATUS = {
  PAID: 'Đã thanh toán',
  UNPAID: 'Chưa thanh toán',
  PARTIAL: 'Thanh toán một phần',
};