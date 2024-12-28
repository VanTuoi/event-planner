import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiResponse } from "~/types/api-response";
import { Event } from "~/types/event";

interface SuccessData {
    events: Event[];
}

interface ErrorData {
    message: string;
}

export const useCreateEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateEvent = async (
        titleEvent: string,
        venue: string,
        maxParticipants: string,
        alertPoint: string,
        entries: string
    ): Promise<ApiResponse<SuccessData | ErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<ApiResponse<SuccessData>>(
                `${process.env.EXPO_PUBLIC_API_URL}/events/create`,
                {
                    titleEvent,
                    venue,
                    maxParticipants,
                    alertPoint,
                    numberOfEntries: entries
                }
            );
            if (response.data.statusCode === 200 && Array.isArray(response.data.data.events)) {
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
    };

    return { handleCreateEvent, isLoading, error };
};
