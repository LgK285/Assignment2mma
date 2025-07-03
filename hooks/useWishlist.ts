import { useContext } from 'react';
import { WishlistContext } from '../components/context/WishlistContext';

export const useWishlist = () => {
  return useContext(WishlistContext);
};
