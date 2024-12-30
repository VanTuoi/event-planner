import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import customAxios from "~/services/http";
import { ApiResponse } from "~/types/api-response";
import { Event } from "~/types/event";

interface SuccessData {
    entry: Event["entries"][0];
}

interface ErrorData {
    message: string;
}

export const useCheckIncrement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleIncrement = useCallback(
        async (eventId: string, entryId: string): Promise<ApiResponse<SuccessData | ErrorData>> => {
            setIsLoading(true);
            setError(null);

            try {
                const url = `/events/event/${eventId}/entry/${entryId}/increment`;
                const response = await customAxios.put<ApiResponse<SuccessData>>(url);

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

    return { handleIncrement, isLoading, error };
};
