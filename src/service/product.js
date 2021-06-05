import axios from 'axios';
import { API_END_POINT_URL } from '../util';

export const getProductListApi = () => {
  return axios.get(`${API_END_POINT_URL}api/products`);
};

export const addProductApi = payload => axios.post(`${API_END_POINT_URL}api/products`, payload);

export const updateProductApi =( id,payload )=>
  axios.put(`${API_END_POINT_URL}api/products/${id}`, payload);

export const deleteProductApi = id => axios.delete(`${API_END_POINT_URL}api/products/${id}`);

