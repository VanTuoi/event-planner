import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiResponse } from "~/types/api-response";
import { User } from "~/types/user";

export interface RegisterSuccessData {
    user: User;
}

export interface RegisterErrorData {
    message: string;
}

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (
        email: string,
        password: string,
        name: string
    ): Promise<ApiResponse<RegisterSuccessData | RegisterErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<ApiResponse<RegisterSuccessData>>(
                `${process.env.EXPO_PUBLIC_API_URL}/users/register`,
                {
                    email,
                    password,
                    name
                }
            );
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiResponse<RegisterErrorData>>;
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

    return { handleRegister, isLoading, error };
};
