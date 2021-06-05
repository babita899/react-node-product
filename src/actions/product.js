import * as actionType from './actionsType';
import * as services from '../service/product';


export const getProductList = (cb) => dispatch => {
  return services
    .getProductListApi()
    .then(response => {
        dispatch({
          type: actionType.PRODUCT_LIST,
          payload: response
		});
		cb && cb(true);
    })
    .catch(error => {
		console.log(error);
    });
};

export const addProduct = (payload) => dispatch => {
  return services
    .addProductApi(payload)
    .then(response => {
      dispatch({
        type: actionType.ADD_PRODUCT,
        payload: response
      });
      return true
    })
    .catch(error => {
		console.log(error);
		return false
    });
};


export const updateProduct = (id,payload) => dispatch => {
  return services
    .updateProductApi(id,payload)
    .then(response => {
      dispatch({
        type: actionType.UPDATE_PRODUCT,
        payload: response
      });
     return true
    })
	  .catch(error => { console.log(error); return false  } );
};


export const deleteProduct = (productId, cb) => dispatch => {
  return services
    .deleteProductApi(productId)
    .then(() => {
      dispatch({
        type: actionType.DELETE_PRODUCT,
        payload: productId
      });
      cb && cb(true);
    })
	  .catch(error => {
		console.log(error)
    });
};

export const resetStore = () => dispatch => {
  localStorage.clear();
  dispatch({ type: 'SIGN_OUT' });
};

