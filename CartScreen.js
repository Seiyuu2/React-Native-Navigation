// CartScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - ${item.price} x {item.quantity} = ${item.totalPrice}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
        <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList data={cartItems} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemContainer: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc' },
  itemText: { fontSize: 16, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 100 },
});
