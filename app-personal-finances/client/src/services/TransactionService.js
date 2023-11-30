import http from '../helpers/http-common';

const getByPeriods = (period) => {
  return http.get(`/?period=${period}`);
};

const create = (formData) => {
  return http.post('/', formData);
};

const update = (formData, id) => {
  return http.put('/' + id, formData);
};

const remove = (id) => {
  return http.delete('/' + id);
};

export default {
  getByPeriods,
  create,
  update,
  remove,
};