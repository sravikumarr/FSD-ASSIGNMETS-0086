import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  /**
   * Add a product to the cart.
   * If it already exists, increases quantity.
   * Throws if quantity would exceed stock.
   */
  const addToCart = (product, quantity = 1) => {
    if (quantity < 1) throw new Error('Quantity must be at least 1.');

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          throw new Error(`Only ${product.stock} unit${product.stock === 1 ? '' : 's'} available.`);
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }

      if (quantity > product.stock) {
        throw new Error(`Only ${product.stock} unit${product.stock === 1 ? '' : 's'} available.`);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  /** Remove a product from the cart entirely. */
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * Update quantity for an item.
   * If newQuantity <= 0, removes the item.
   * Throws if newQuantity exceeds stock.
   */
  const updateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (newQuantity > stock) {
      throw new Error(`Only ${stock} unit${stock === 1 ? '' : 's'} available.`);
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /** Clear all items from the cart. */
  const clearCart = () => setCartItems([]);

  /** Total price of all items, computed dynamically. */
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /** Total number of units across all items. */
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
