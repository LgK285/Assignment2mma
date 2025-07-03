import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutSuccessScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color="#4BB543" style={styles.icon} />
      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.subtitle}>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/products')}>
        <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4BB543',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
