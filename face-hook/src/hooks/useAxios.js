import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    //add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authTokens = auth?.authTokens;
        if (authTokens) {
          config.headers.Authorization = `Bearer ${authTokens}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // eslint-disable-next-line no-useless-catch
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            console.log(`New token: ${token}`);
            setAuth((auth) => {
              return { ...auth, authTokens: token };
            });

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.authTokens, auth?.refreshToken, setAuth]);

  return { api };
};

export default useAxios;
