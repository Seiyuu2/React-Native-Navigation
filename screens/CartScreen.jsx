import React, { useContext } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, setCartItems } = useContext(CartContext);

  const increaseQuantity = (item) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCartItems(
      cartItems
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            const newQuantity = cartItem.quantity - 1;
            return newQuantity > 0 ? { ...cartItem, quantity: newQuantity } : null;
          }
          return cartItem;
        })
        .filter((item) => item !== null)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.productText}>
              {item.name} - ${item.price} x {item.quantity}
            </Text>
            <View style={styles.buttonsContainer}>
              <Button title="+" onPress={() => increaseQuantity(item)} />
              <Button title="-" onPress={() => decreaseQuantity(item)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Your cart is empty</Text>}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  productText: { fontSize: 16 },
  buttonsContainer: { flexDirection: 'row', alignItems: 'center' },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: { color: '#fff', fontSize: 16 },
});
