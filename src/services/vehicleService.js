import { apiCall } from './api';

export const vehicleService = {
  getAll: () => apiCall('/vehicles'),
  getById: (id) => apiCall(`/vehicles/${id}`),
  create: (data) => apiCall('/vehicles', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/vehicles/${id}`, {
    method: 'DELETE',
  }),
};
