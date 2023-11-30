import http from '../helpers/http-common';

const getAll = () => {
  return http.get('/periods');
};

export default {
  getAll,
};