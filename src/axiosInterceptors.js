import axios from 'axios';

const tokenHandling = errorResponse => {
  if (errorResponse && errorResponse.response && errorResponse.response.data) {
    let errorData = errorResponse.response.data;
    if (errorData.message === 'MISSING_TOKEN') {
    } else if (errorData.message === 'EXPIRED_ACCESS_TOKEN') {
    } else if (
      errorData.errors &&
      typeof errorData.errors === 'object' &&
      errorData.errors.length
    ) {
      let errorObject = errorData.errors[0];
      let errorMessage = errorObject.messages ? errorObject.messages : errorObject.message;
      return { message: errorMessage };
    } else {
      return errorData;
    }
  } else {
    return { message: 'CONNECTION_LOST' };
  }
};

/**
 * Function to handle interceptor
 */
export const setupInterceptors = () => {
  axios.interceptors.request.use(reqConfig => {
    let storageToken = localStorage.getItem('userTokenTime');
    let access_token = storageToken ? storageToken : '';
    if (access_token) {
      reqConfig.headers.Authorization = `Bearer ${access_token}` ;
    }
    return reqConfig;
  });

  axios.interceptors.response.use(
    response => {
      if (response && response.data) {
        return response.data;
      } else {
        return response.data.message;
      }
    },
    error => Promise.reject(tokenHandling(error))
  );
};
