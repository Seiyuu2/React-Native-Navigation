import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './CartContext.js';
import HomeScreen from './HomeScreen.js';
import CartScreen from './CartScreen.js';
import CheckoutScreen from './CheckoutScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
