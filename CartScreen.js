import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Text>
        {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => increaseQuantity(item.id)} />
        <Button title="-" onPress={() => decreaseQuantity(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      <Button title="Go to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  product: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: 100,
    justifyContent: 'space-between',
  },
});
