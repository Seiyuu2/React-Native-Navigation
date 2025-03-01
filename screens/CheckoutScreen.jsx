import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, setCartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout successful', '', [
      {
        text: 'OK',
        onPress: () => {
          setCartItems([]);
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkoutItem}>
            <Text style={styles.productText}>
              {item.name} - ${item.price} x {item.quantity}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No items to checkout</Text>}
      />
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  checkoutItem: { marginVertical: 8 },
  productText: { fontSize: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  checkoutButton: {
    backgroundColor: 'purple',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: { color: '#fff', fontSize: 16 },
});
