// CheckoutScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Checkout successful', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>
        {item.name} - ${item.price} x {item.quantity} = ${item.totalPrice}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={cartItems} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemContainer: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginVertical: 20 },
});
