import { Category } from "../interfaces/Category";

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};
type State = {
  categories: Category[];
};
const categoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category: Category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category: Category) => category._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default categoryReducer;
