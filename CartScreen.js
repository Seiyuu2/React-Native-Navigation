// CartScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - PHP{item.price} x {item.quantity} = PHP{item.totalPrice}
      </Text>
      <View style={styles.buttonContainer}>
        <Button color="#b22222" title="+" onPress={() => updateQuantity(item.id, 1)} />
        <Button color="#b22222" title="-" onPress={() => updateQuantity(item.id, -1)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList 
          data={cartItems} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.id} 
        />
      )}
      <Button color="#b22222" title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
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
    marginBottom: 10, 
    color: '#fff' 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: 100 
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});
