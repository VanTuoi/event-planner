import { useState } from "react";

interface LogoutResponse {
    statusCode: number;
    statusText: string;
    data: {
        message?: string;
        error?: string;
    };
}

const fakeLogoutApi = (): Promise<LogoutResponse> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                statusCode: 200,
                statusText: "OK",
                data: { message: "Logout successful!" }
            });
        }, 300);
    });

interface UseLogoutReturn {
    handleLogout: () => Promise<LogoutResponse>;
    isLoading: boolean;
    error: string | null;
}

export const useLogout = (): UseLogoutReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async (): Promise<LogoutResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fakeLogoutApi();
            if (response.statusCode !== 200) {
                setError(response.data.error ?? "An error occurred");
            }
            return response;
        } catch (err) {
            console.error("err", err);
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

    return { handleLogout, isLoading, error };
};
