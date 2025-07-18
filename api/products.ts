
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = async (
  limit = 10,
  skip = 0,
  search = '',
  sortByPrice: 'asc' | 'desc' | '' = ''
): Promise<Product[]> => {
  const url = `${BASE_URL}`;
  const response = await axios.get(url);
  let products: Product[] = response.data;
  if (search) {
    products = products.filter((item: Product) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (sortByPrice === 'asc') {
    products = products.sort((a, b) => b.price - a.price);
  } else if (sortByPrice === 'desc') {
    products = products.sort((a, b) => a.price - b.price);
  }
  // Ensure each product matches the required structure
  return products.slice(skip, skip + limit).map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating,
  }));
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  const product: Product = response.data;
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating,
  };
};
