import { Product } from "../interfaces/Product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type State = {
  products: CartItem[];
  totalPrice: number;
};

type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: { productId: string; quantity: number };
    }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "SET_CART"; payload: { products: CartItem[]; totalPrice: number } }
  | { type: "CHECKOUT"; payload: { products: CartItem[]; totalPrice: number } };

const cartReducer = (state: State, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.product._id !== action.payload.productId
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.product._id !== action.payload.productId
        ),
      };

    case "SET_CART":
      return {
        ...state,
        products: action.payload.products,
        totalPrice: action.payload.totalPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;
