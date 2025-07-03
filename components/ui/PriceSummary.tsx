import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useOrder } from '../../hooks/useOrder';
import { useCart } from '../../hooks/useCart';

type PriceSummaryProps = {
  total: number;
  itemCount: number;
};

export default function PriceSummary({ total, itemCount }: PriceSummaryProps) {
  const router = useRouter();
  const { addOrder } = useOrder();
  const { cartItems, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    addOrder({
      id: Date.now().toString(),
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    });
    clearCart();
    router.replace('/checkout-success');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Items:</Text>
        <Text style={styles.value}>{itemCount}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal:</Text>
        <Text style={styles.value}>${total.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Shipping:</Text>
        <Text style={styles.value}>Free</Text>
      </View>
      
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>
          Proceed to Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
