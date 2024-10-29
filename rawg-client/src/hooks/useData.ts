import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

interface Response<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setIsLoading(true);

      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

      apiClient
        .get<Response<T>>(cleanEndpoint, { 
          ...requestConfig,
          signal: controller.signal 
        })
        .then((response) => {
          console.log('Success response:', response);
          setData(response.data.results);
          setError("");  // Clear any previous errors
        })
        .catch((error) => {
          if (error.name === 'CanceledError') return;
          
          console.error('Error details:', {
            message: error.message,
            endpoint: cleanEndpoint,
            fullUrl: `${apiClient.defaults.baseURL}/${cleanEndpoint}`,
            status: error.response?.status
          });
          setError(error.message);
        })
        .finally(() => setIsLoading(false));

      return () => controller.abort();
    },
    dependencies ? [...dependencies] : []
  );

  return { data, error, isLoading };
};

export default useData;
