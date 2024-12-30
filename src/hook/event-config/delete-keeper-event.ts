import axios, { AxiosError } from "axios";
import { useState } from "react";
import customAxios from "~/services/http";
import { ApiResponse } from "~/types/api-response";
import { Event } from "~/types/event";

interface SuccessData {
    event: Event;
}

interface ErrorData {
    message: string;
}

export const useDeleteKeeperEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteKeeperEvent = async (
        idKeeper: string,
        entryId: string
    ): Promise<ApiResponse<SuccessData | ErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await customAxios.delete<ApiResponse<SuccessData>>(`/events/keeper/remove/${idKeeper}`, {
                data: { entryId }
            });

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

            console.error("Unexpected error in useDeleteKeeperEvent", err);
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

    return { handleDeleteKeeperEvent, isLoading, error };
};
