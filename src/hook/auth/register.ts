import { useState } from "react";

interface RegisterResponse {
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

const fakeRegisterApi = (email: string, password: string): Promise<RegisterResponse> =>
    new Promise((resolve) => {
        setTimeout(() => {
            if (email === "test@example.com" && password === "123456") {
                resolve({
                    statusCode: 200,
                    statusText: "OK",
                    data: { message: "Registration successful!", user: { email } }
                });
            } else {
                resolve({
                    statusCode: 400,
                    statusText: "Bad Request",
                    data: { error: "Email is already in use" }
                });
            }
        }, 350);
    });

interface UseRegisterReturn {
    handleRegister: (email: string, password: string) => Promise<RegisterResponse>;
    isLoading: boolean;
    error: string | null;
}

export const useRegister = (): UseRegisterReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (email: string, password: string): Promise<RegisterResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fakeRegisterApi(email, password);
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

    return { handleRegister, isLoading, error };
};
