import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const initialState = [];
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart" ||  "[]"));
    if (cartData) {
      setCartItems(cartData);

    }

 
  }, []);

  useEffect(() => {
    if (cartItems !== initialState) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
     
    }
  }, [cartItems]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("totalPrice" ||  "0"));
    if (cartData) {
      setTotalPrice(cartData);

    }

 
  }, []);

  useEffect(() => {
    if (totalPrice !== initialState) {
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
     
    }
  }, [totalPrice]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("totalquantity" ||  "0"));
    if (cartData) {
      setTotalQuantity(cartData);

    }

 
  }, []);

  useEffect(() => {
    if (totalPrice !== initialState) {
      localStorage.setItem("totalquantity", JSON.stringify(totalQuantity));
     
    }
  }, [totalQuantity]);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updateCartItem = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updateCartItem);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to cart`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const InQty = () => {
    setQty((deqQty) => deqQty + 1);
  };
  const DeQty = () => {
    setQty((deqQty) => {
      if (deqQty - 1 < 1) return 1;

      return deqQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        onAdd,
        DeQty,
        InQty,
        toggleCartItemQuanitity,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
