import axios, { AxiosError } from "axios";
import { useState } from "react";
import customAxios from "~/services/http";
import { ApiResponse } from "~/types/api-response";

interface SuccessData {
    eventId: string;
}

interface ErrorData {
    message: string;
}

export const useDeleteEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteEvent = async (eventId: string): Promise<ApiResponse<SuccessData | ErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await customAxios.delete<ApiResponse<SuccessData>>(`/events/event/${eventId}`);

            if (response.data.statusCode === 200) {
                return {
                    statusCode: response.data.statusCode,
                    statusText: response.data.statusText,
                    data: response.data.data
                };
            }

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiResponse<ErrorData>>;
                const errorMessage =
                    serverError.response?.data?.statusText || serverError.message || "An unexpected error occurred.";

                console.log("serverError", serverError);

                setError(errorMessage);
                return {
                    statusCode: serverError.response?.status || 500,
                    statusText: serverError.response?.statusText || "Internal Server Error",
                    data: { message: errorMessage }
                };
            }

            console.error("Unexpected error in useDeleteEvent", err);
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

    return { handleDeleteEvent, isLoading, error };
};
