import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "~/types/api-response";
import { Event } from "~/types/event";

interface SuccessData {
    entry: Event["entries"][0];
}

interface ErrorData {
    message: string;
}

export const useCheckDecrement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDecrement = useCallback(
        async (eventId: string, entryId: string): Promise<ApiResponse<SuccessData | ErrorData>> => {
            setIsLoading(true);
            setError(null);

            try {
                const url = `${process.env.EXPO_PUBLIC_API_URL}/events/event/${eventId}/entry/${entryId}/decrement`;
                const response = await axios.put<ApiResponse<SuccessData>>(url);

                if (response.data.statusCode === 200) {
                    return response.data;
                }
                return response.data;
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const serverError = err as AxiosError<ApiResponse<ErrorData>>;
                    const errorMessage =
                        serverError.response?.data?.statusText ||
                        serverError.message ||
                        "An unexpected error occurred.";
                    console.log("serverError", serverError);
                    setError(errorMessage);
                    return {
                        statusCode: serverError.response?.status || 500,
                        statusText: serverError.response?.statusText || "Internal Server Error",
                        data: { message: errorMessage }
                    };
                }
                console.error("Unexpected error", err);
                setError("An unexpected error occurred. Please try again.");
                return {
                    statusCode: 500,
                    statusText: "Internal Server Error",
                    data: { message: "An unexpected error occurred. Please try again." }
                };
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    return { handleDecrement, isLoading, error };
};
