import { useState } from "react";
import { useAuthStore } from "~/store";
import { User } from "~/types/user";

interface LoginResponse {
    statusCode: number;
    statusText: string;
    data: {
        message?: string;
        error?: string;
        user?: User;
    };
}

const fakeLoginApi = (email: string, password: string): Promise<LoginResponse> =>
    new Promise((resolve) => {
        setTimeout(() => {
            if (email === "test@example.com" && password === "123456") {
                resolve({
                    statusCode: 200,
                    statusText: "OK",
                    data: {
                        message: "Login successful!",
                        user: {
                            id: "doorkeeper-1",
                            name: "John Doe",
                            email,
                            token: "fake-token",
                            refreshToken: "fake-refresh-token",
                            role: "keeper"
                        }
                    }
                });
            } else if (email === "admin@gmail.com" && password === "123456") {
                resolve({
                    statusCode: 200,
                    statusText: "OK",
                    data: {
                        message: "Login successful!",
                        user: {
                            id: "2",
                            name: "Admin User",
                            email,
                            token: "admin-token",
                            refreshToken: "admin-refresh-token",
                            role: "admin"
                        }
                    }
                });
            } else {
                resolve({
                    statusCode: 401,
                    statusText: "Unauthorized",
                    data: { error: "Invalid email or password" }
                });
            }
        }, 350);
    });

interface UseLoginReturn {
    handleLogin: (email: string, password: string) => Promise<LoginResponse>;
    isLoading: boolean;
    error: string | null;
}

export const useLogin = (): UseLoginReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fakeLoginApi(email, password);
            if (response.statusCode === 200 && response.data.user) {
                login(response.data.user);
            } else {
                setError(response.data.error ?? "An error occurred");
            }
            return response;
        } catch (err) {
            console.log("err", err);
            setError("An unexpected error occurred");
            return {
                statusCode: 500,
                statusText: "Internal Server Error",
                data: { error: "An unexpected error occurred" }
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading, error };
};
