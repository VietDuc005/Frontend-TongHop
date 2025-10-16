import { apiCall } from './api';

export const mechanicService = {
  getAll: () => apiCall('/mechanics'),
  getById: (id) => apiCall(`/mechanics/${id}`),
  create: (data) => apiCall('/mechanics', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/mechanics/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/mechanics/${id}`, {
    method: 'DELETE',
  }),
};