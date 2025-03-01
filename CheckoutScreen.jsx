import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    Alert.alert(
      "Checkout successful",
      "",
      [
        { text: "OK", onPress: () => { clearCart(); navigation.navigate('Home'); } }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkoutItem}>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  checkoutItem: { marginBottom: 15 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});

export default CheckoutScreen;
