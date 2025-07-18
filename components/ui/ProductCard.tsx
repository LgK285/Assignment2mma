import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ product, onPress }: any) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const loved = isInWishlist(product.id);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.imageWrap} onPress={onPress}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleWishlist(product.id)}>
          <Text style={styles.wishlist}>{loved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addCartBtn} onPress={() => addToCart(product)}>
          <Text style={styles.addCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    alignItems: 'center',
    padding: 12,
    minWidth: 160,
    maxWidth: '48%',
  },
  imageWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  info: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  wishlist: {
    fontSize: 22,
    marginRight: 8,
  },
  addCartBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
