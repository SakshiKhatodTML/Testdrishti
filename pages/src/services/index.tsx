import axios from "axios";

interface QuerySchema {
  [key: string]: string;
}

export interface HttpServiceSchema {
  httpGet: (path: string, query: QuerySchema) => Promise<any>;
  httpDelete: (path: string, query: QuerySchema, payload: any) => Promise<any>;
  httpPost: (path: string, query: QuerySchema, payload: any) => Promise<any>;
  httpPut: (path: string, query: QuerySchema, payload: any) => Promise<any>;
}




const handleErrorResp = (err: any) => {
  return err.response && err.response.data
    ? Promise.reject(err.response.data)
    : Promise.reject(err);
};

/**
 * This function makes a HTTP GET request using the args provided
 * @param {string} path the path to the microservice endpoint
 * @param {QuerySchema} query optional query containing params in keyvalue pairs
 * @returns {Promise} promise containing response data or errors
 */
export const httpGet = async (url: string, query = {},config={}) => {
  try{
     return await axios.get(url, config)
  }
  catch(err){
    return handleErrorResp(err);
  }
};

/**
 * This function makes a HTTP POST request using the args provided
 * @param {string} path the path to the microservice endpoint
 * @param {QuerySchema} query optional query containing params in keyvalue pairs
 * @param {QuerySchema} payload optional body containing the request payload
 * @returns {Promise} promise containing response data or errors
 */
export const httpPost = async (url: string, query = {}, payload = {}, config={}) => {
  return axios
    .post(url, payload, config)
    .then(response => response.data)
    .catch(err => handleErrorResp(err));
};
