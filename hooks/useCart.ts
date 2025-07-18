import { useContext } from 'react';
import CartContext from '../components/context/CartContext';

export const useCart = () => {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = (product: any) => {
    // Đảm bảo có thumbnail cho CartItem
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.image || product.thumbnail,
      quantity: 1,
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
};
