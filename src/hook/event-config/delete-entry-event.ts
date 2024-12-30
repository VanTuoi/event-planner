import axios, { AxiosError } from "axios";
import { useState } from "react";
import customAxios from "~/services/http";
import { ApiResponse } from "~/types/api-response";

interface SuccessData {
    id: string;
}

interface ErrorData {
    message: string;
}

export const useDeleteEntryEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteEntryEvent = async (entryId: string): Promise<ApiResponse<SuccessData | ErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await customAxios.delete<ApiResponse<SuccessData>>(`/events/entry/remove/${entryId}`, {
                data: { entryId }
            });

            if (response.data.statusCode === 200) {
                return {
                    statusCode: response.data.statusCode,
                    statusText: response.data.statusText,
                    data: response.data.data
                };
            }

            return {
                statusCode: response.data.statusCode,
                statusText: response.data.statusText,
                data: response.data.data
            };
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

            console.error("Unexpected error in useDeleteEntryEvent", err);
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

    return { handleDeleteEntryEvent, isLoading, error };
};
