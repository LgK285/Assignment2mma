import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { fetchProducts } from '../../api/products';
import ProductCard from '../../components/ui/ProductCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useCart } from '../../hooks/useCart';
import { Ionicons } from '@expo/vector-icons';

export default function ProductListScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [sortByPrice, setSortByPrice] = useState<'asc' | 'desc' | ''>('');
  const router = useRouter();
  const { itemCount } = useCart();

  const LIMIT = 10;

  const loadProducts = async (refresh = false) => {
    if (loading || (!refresh && !hasMore)) return;

    try {
      setLoading(true);
      setError('');

      const data = await fetchProducts(LIMIT, refresh ? 0 : skip, search, sortByPrice);
      const newProducts = data || [];
      console.log('Fetched products:', newProducts);

      if (refresh) {
        setProducts(newProducts);
        setSkip(LIMIT);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setSkip((prev) => prev + LIMIT);
      }

      setHasMore(newProducts.length === LIMIT);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(true);
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [search, sortByPrice]);

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onPress={() => router.push(`/products/${item.id}`)}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {search
            ? 'No products found matching your search'
            : 'No products available'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shopHeader}>
        <Text style={styles.shopTitle}>ECommerce Shop</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.cartCount}>{itemCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Lọc theo giá:</Text>
        <TouchableOpacity
          style={[styles.filterBtn, sortByPrice === 'asc' && styles.filterBtnActive]}
          onPress={() => setSortByPrice(sortByPrice === 'asc' ? '' : 'asc')}
        >
          <Text style={styles.filterText}>Tăng dần</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, sortByPrice === 'desc' && styles.filterBtnActive]}
          onPress={() => setSortByPrice(sortByPrice === 'desc' ? '' : 'desc')}
        >
          <Text style={styles.filterText}>Giảm dần</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          onEndReached={() => loadProducts(false)}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  shopHeader: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 4,
    elevation: 4,
  },
  shopTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  cartButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 4,
  },
  cartCount: {
    backgroundColor: Colors.light.tint,
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    position: 'absolute',
    right: -8,
    top: -8,
    fontSize: 12,
    overflow: 'hidden',
  },
  list: {
    padding: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 15,
    marginRight: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: Colors.light.tint,
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
});
