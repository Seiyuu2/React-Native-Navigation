import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="+" onPress={() => incrementQuantity(item.id)} />
              <Button title="-" onPress={() => decrementQuantity(item.id)} />
            </View>
          </View>
        )}
      />
      <Button title="Go to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  cartItem: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsContainer: { flexDirection: 'row' },
});

export default CartScreen;
