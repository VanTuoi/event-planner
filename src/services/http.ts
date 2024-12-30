/* eslint-disable no-underscore-dangle */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ApiResponse } from "~/types/api-response";

const getJWT = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (e) {
        console.error("Error reading token:", e);
        return null;
    }
};

const getRefreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        return refreshToken;
    } catch (e) {
        console.error("Error reading refresh token:", e);
        return null;
    }
};

const saveToken = async (token: string, refreshToken: string) => {
    try {
        await AsyncStorage.setItem("token", token);
        if (refreshToken) {
            await AsyncStorage.setItem("refreshToken", refreshToken);
        }
    } catch (e) {
        console.error("Error saving tokens:", e);
    }
};

const customAxios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000
});

customAxios.interceptors.request.use(
    async (config) => {
        const token = await getJWT();
        if (token) {
            const newConfig = { ...config };
            newConfig.headers.Authorization = `Bearer ${token}`;
            return newConfig;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            const apiError: ApiResponse<null> = {
                statusCode: 401,
                statusText: "Unauthorized",
                data: null
            };
            return Promise.reject(apiError);
        }
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await getRefreshToken();
                if (!refreshToken) {
                    console.error("No refresh token available.");
                    return Promise.reject(error);
                }

                const { data } = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`, {
                    refreshToken
                });

                const { token: newToken, refreshToken: newRefreshToken } = data;

                await saveToken(newToken, newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return customAxios(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                console.log("Redirecting to login...");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default customAxios;
