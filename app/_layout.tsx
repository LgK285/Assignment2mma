import { Slot } from 'expo-router';
import { CartProvider } from '../components/context/CartContext';
import { WishlistProvider } from '../components/context/WishlistContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderProvider } from '../components/context/OrderContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <CartProvider>
          <WishlistProvider>
            <Slot />
          </WishlistProvider>
        </CartProvider>
      </OrderProvider>
    </SafeAreaProvider>
  );
}
