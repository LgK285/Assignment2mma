import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useWishlist } from '../../hooks/useWishlist';

export default function ProductCard({ product, onPress }: any) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const loved = isInWishlist(product.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleWishlist(product.id)}>
        <Text style={{ fontSize: 22, marginRight: 10 }}>
          {loved ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: 'green',
    marginTop: 5,
  },
});
