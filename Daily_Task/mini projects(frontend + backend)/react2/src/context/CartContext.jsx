import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (cart.find((ele) => ele.id == product.id)) {
      let newCartArray = [];

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == product.id) {
          cart[i].quantity += 1;
          newCartArray.push(cart[i]);
        } else {
          newCartArray.push(cart[i]);
        }
      }

      setCart(newCartArray);


    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Product added to Cart",{
        position:"top-center",
        autoclose:1000,
        progress:false
      })
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    toast.success("Product remove from Cart",{
        position:"top-center",
        autoclose:1000,
        progress:false
      })
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};