import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import customAxios from "~/services/http";
import { useAuthStore } from "~/store";
import { ApiResponse } from "~/types/api-response";
import { User } from "~/types/user";

export interface LoginSuccessData {
    user: User;
}

export interface LoginErrorData {
    message: string;
}

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (
        email: string,
        password: string
    ): Promise<ApiResponse<LoginSuccessData | LoginErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await customAxios.post<ApiResponse<LoginSuccessData>>("/users/login", { email, password });

            if (response.data.statusCode === 200 && response.data.data.user) {
                login(response.data.data.user);
                AsyncStorage.setItem("token", response.data.data.user.token);
                AsyncStorage.setItem("refreshToken", response.data.data.user.refreshToken);
            }

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiResponse<LoginErrorData>>;
                const errorMessage = serverError.response?.data?.statusText || "An unexpected error occurred.";
                console.log("serverError", serverError);
                setError(errorMessage);
                return {
                    statusCode: serverError.response?.status || 500,
                    statusText: serverError.response?.statusText || "Internal Server Error",
                    data: { message: errorMessage }
                };
            }
            setError("An unexpected error occurred. Please try again.");
            return {
                statusCode: 500,
                statusText: "Internal Server Error",
                data: { message: "An unexpected error occurred. Please try again." }
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading, error };
};
