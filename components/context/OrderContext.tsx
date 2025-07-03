import React, { createContext, useReducer, ReactNode } from 'react';

export type Order = {
  id: string;
  items: any[];
  total: number;
  createdAt: string;
};

type OrderState = {
  orders: Order[];
};

type OrderAction =
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: OrderState = {
  orders: [],
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    default:
      return state;
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
