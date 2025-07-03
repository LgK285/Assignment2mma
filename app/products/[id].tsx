import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { fetchProductById } from '../../api/products';
import { useCart } from '../../hooks/useCart';
import { Colors } from '../../constants/Colors';
import { useWishlist } from '../../hooks/useWishlist';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isLoved = product ? isInWishlist(product.id) : false;
  const cartItem = product ? cartItems.find(item => item.id === product.id) : null;

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProductById(Number(id));
      setProduct(data);
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error || 'Product not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProduct}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Product added to cart!');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: product.title,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => toggleWishlist(product.id)}
              style={styles.wishlistButton}
            >
              <Text style={styles.wishlistIcon}>
                {isLoved ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          {product.stock > 0 ? (
            <View style={styles.stockInfo}>
              <Text style={styles.inStock}>In Stock</Text>
              <Text style={styles.stockCount}>({product.stock} available)</Text>
            </View>
          ) : (
            <Text style={styles.outOfStock}>Out of Stock</Text>
          )}

          {cartItem && (
            <Text style={styles.inCart}>
              {cartItem.quantity} in cart
            </Text>
          )}

          <TouchableOpacity
            style={[styles.addToCartButton, product.stock === 0 && styles.disabledButton]}
            onPress={handleAddToCart}
            disabled={product.stock === 0}
          >
            <Text style={styles.addToCartText}>
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: Colors.light.tint,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inStock: {
    color: 'green',
    fontWeight: '600',
    marginRight: 8,
  },
  stockCount: {
    color: '#666',
  },
  outOfStock: {
    color: 'red',
    fontWeight: '600',
    marginBottom: 8,
  },
  inCart: {
    color: Colors.light.tint,
    fontWeight: '600',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  wishlistButton: {
    padding: 8,
    marginRight: 8,
  },
  wishlistIcon: {
    fontSize: 24,
  },
});
