import { useState } from "react";

interface LoginResponse {
    statusCode: number;
    statusText: string;
    data: {
        message?: string;
        error?: string;
        user?: {
            email: string;
        };
    };
}

const fakeLoginApi = (email: string, password: string): Promise<LoginResponse> =>
    new Promise((resolve) => {
        setTimeout(() => {
            if (email === "test@example.com" && password === "123456") {
                resolve({
                    statusCode: 200,
                    statusText: "OK",
                    data: { message: "Login successful!", user: { email } }
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

    const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fakeLoginApi(email, password);
            if (response.statusCode !== 200) {
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
