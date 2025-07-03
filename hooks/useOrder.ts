import { useContext } from 'react';
import OrderContext from '../components/context/OrderContext';

export const useOrder = () => {
  const { state, dispatch } = useContext(OrderContext);

  const addOrder = (order: any) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  return {
    orders: state.orders,
    addOrder,
  };
};
