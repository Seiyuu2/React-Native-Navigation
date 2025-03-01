import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, totalPrice: product.price }];
      }
    });
  };

  const updateQuantity = (productId, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null; // Remove item if quantity goes to 0
            return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
