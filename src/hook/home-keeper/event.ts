import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import customAxios from "~/services/http";
import { useAuthStore, useEventStore } from "~/store";
import { ApiResponse } from "~/types/api-response";
import { Event } from "~/types/event";

interface SuccessData {
    events: Event[];
}

interface ErrorData {
    message: string;
}

export const useEventKeeper = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<Event[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { initEvents } = useEventStore();
    const { user } = useAuthStore();

    const handleGetEventKeeper = useCallback(async (): Promise<ApiResponse<SuccessData | ErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await customAxios.get<ApiResponse<SuccessData>>(`/events/keeper/${user?.id}`);

            if (response.data.statusCode === 200 && Array.isArray(response.data.data.events)) {
                setEvents(response.data.data.events);
                initEvents(response.data.data.events);
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
    }, [user, initEvents]);

    useEffect(() => {
        handleGetEventKeeper();
    }, [handleGetEventKeeper]);

    return { handleGetEventKeeper, events, isLoading, error };
};
