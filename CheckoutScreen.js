import React, { useContext } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout successful', '', [
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
    <View style={styles.product}>
      <Text>
        {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${totalPrice}</Text>
          <Button title="Checkout" onPress={handleCheckout} />
        </>
      )}
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
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
