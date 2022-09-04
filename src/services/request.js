// Axios Imports
import axios from 'axios';

const sanitizeResponse = (response) => {
  if (response.status === 200 || response.status === 201) {
    return {
      status: response.status,
      data: typeof response.data !== 'undefined' ? response.data : response,
    };
  } else {
    return { status: response.status, data: response.data };
  }
};

const sanitizeError = (error) => {
  if (error.response.status === 422)
    return {
      status: error.response.status,
      data: error,
    };
  else if (error.response.status === 500)
    return {
      status: error.response.status,
      data: error,
    };
  else return { status: error.response.status, data: error };
};

export const fetchWrapper = async (method, url, body, params) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
      params,
    });
    return sanitizeResponse(response);
  } catch (e) {
    console.warn('http error ', e);
    return sanitizeError(e);
  }
};
