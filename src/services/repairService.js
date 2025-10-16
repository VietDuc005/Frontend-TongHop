import { apiCall } from './api';

export const repairService = {
  getAll: () => apiCall('/repairs'),
  getById: (id) => apiCall(`/repairs/${id}`),
  create: (data) => apiCall('/repairs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/repairs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/repairs/${id}`, {
    method: 'DELETE',
  }),
};