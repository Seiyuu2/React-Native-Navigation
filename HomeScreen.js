// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { CartContext } from './CartContext';

// Sample product data with MTG-inspired names and images
const products = [
  { id: '1', name: 'Sol Ring', price: 100, image: 'https://api.scryfall.com/cards/cm2/217?format=image&version=normal' },
  { id: '2', name: 'Arcane Signet', price: 150, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=476049&type=card' },
  { id: '3', name: 'Wheel of Fortune', price: 2200, image: 'https://www.mtgassist.com/card_scans/me4/Wheel-of-Fortune.jpg' },
  { id: '4', name: 'Black Lotus', price: 1000, image: 'https://cdn1.mtggoldfish.com/images/h/Black-Lotus-VMA-672.jpg' },
  { id: '5', name: 'Mox Sapphire', price: 500, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=633&type=card' },
  { id: '6', name: 'Time Walk', price: 750, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=728&type=card' },
];

export default function HomeScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productText}>{item.name} - PHP{item.price}</Text>
        <Button color="#b22222" title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={products} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
      />
      <View style={styles.cartButton}>
        <Button color="#b22222" title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#1a1a1a' 
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b22222',
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 4,
  },
  productDetails: {
    flex: 1,
  },
  productText: { 
    fontSize: 16, 
    color: '#fff', 
    marginBottom: 10 
  },
  cartButton: {
    marginTop: 20,
  },
});
