import { useEffect } from "react";
import { io } from "socket.io-client";
import { useEventStore } from "~/store";

const socket = io(process.env.EXPO_PUBLIC_API_URL);

export const useSocket = () => {
    const { initEvents } = useEventStore();

    useEffect(() => {
        socket.on("eventUpdated", (data) => {
            initEvents(data.events);
        });

        return () => {
            socket.off("eventUpdated");
        };
    }, [initEvents]);
};
