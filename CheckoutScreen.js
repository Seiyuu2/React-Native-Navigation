// CheckoutScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Checkout successful',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - PHP{item.price} x {item.quantity} = PHP{item.totalPrice}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={cartItems} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
      />
      <Text style={styles.totalText}>Total: PHP{totalPrice}</Text>
      <Button color="#b22222" title="Checkout" onPress={handleCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#1a1a1a'
  },
  itemContainer: { 
    marginBottom: 15, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#b22222', 
    borderRadius: 8,
    backgroundColor: '#2a2a2a'
  },
  itemText: { 
    fontSize: 16, 
    color: '#fff' 
  },
  totalText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 20, 
    color: '#fff', 
    textAlign: 'center' 
  },
});
