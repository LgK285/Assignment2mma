import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/ui/CartItem';
import PriceSummary from '../../components/ui/PriceSummary';

export default function CartScreen() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    total,
    itemCount,
  } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeFromCart(item.id)}
            onUpdateQuantity={(q) => updateQuantity(item.id, q)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      {cartItems.length > 0 && (
        <PriceSummary total={total} itemCount={itemCount} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
