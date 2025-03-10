// CheckoutScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    // Show the modal popup instead of Alert.alert
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    clearCart();
    navigation.navigate('Home');
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Checkout successful</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b22222',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#b22222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
