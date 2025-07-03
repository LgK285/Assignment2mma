import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (
  limit = 10,
  skip = 0,
  search = ''
): Promise<any> => {
  const url = search
    ? `${BASE_URL}/search?q=${search}`
    : `${BASE_URL}?limit=${limit}&skip=${skip}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
