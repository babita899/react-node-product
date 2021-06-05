import {
  PRODUCT_LIST,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/actionsType';


const products = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST:
      return payload;
    case ADD_PRODUCT:
      return [...state, payload];
    case UPDATE_PRODUCT:
      return state.map(product => {
        if (product.id === payload.id) {
          return { ...product, ...payload };
        }
        return product;
      });
    case DELETE_PRODUCT:
      return state.filter(product => {
        return product.id !== payload;
      });
    default:
      return state;
  }
};

export default products;