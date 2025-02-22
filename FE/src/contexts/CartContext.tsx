import React, { createContext, useReducer, ReactNode } from "react";
import { Product } from "../interfaces/Product";
import cartReducer from "../reducers/cartReducer";
import instance from "../api";

export type CartContextType = {
  state: {
    products: { product: Product; quantity: number }[];
    totalPrice: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  addToCart: (productId: string, quantity: number) => void;
  getCart: () => void;
  checkout: () => void;
  removeFromCart: (productId: string) => void;
};

const initialState = {
  products: [],
  totalPrice: 0,
};

const CartContext = createContext({} as CartContextType);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = async (productId: string, quantity: number) => {
    const res = await instance.post("/cart", { productId, quantity });
    res.data.success &&
      dispatch({
        type: "ADD_TO_CART",
        payload: { productId, quantity },
      });
  };
  const getCart = async () => {
    const res = await instance.get("/cart");
    dispatch({ type: "SET_CART", payload: res.data });
  };
  const checkout = async () => {
    const res = await instance.post("/cart/checkout");
    dispatch({ type: "CHECKOUT", payload: res.data });
  };

  const removeFromCart = async (productId: string) => {
    const res = await instance.delete(`/cart/${productId}`);
    res.data.success &&
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, getCart, checkout, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
