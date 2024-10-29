/*import axios from 'axios';

const apiClient = axios.create({
  //for the public api:"https://api.rawg.io/api/",
  baseURL: import.meta.env.VITE_API_URL,
    params: {
      key: import.meta.env.VITE_API_KEY
  }
});


export default apiClient;*/

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // This will be proxied through Vite
});

apiClient.interceptors.request.use((config) => {
  config.params = {
    key: '02e543fdfe9a4eb99559454284ca0f3c',
    ...config.params
  };
  
  console.log('Making request to:', `${config.baseURL}${config.url}`, 'with params:', config.params);
  return config;
});

export default apiClient;