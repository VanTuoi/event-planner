import { useEffect, useState } from "react";
import { Event } from "~/types/event";

const fakeEventApi = (): Promise<Event[]> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: "1",
                    titleEvent: "Music Concert",
                    venue: "Stadium A",
                    maxParticipants: 1000,
                    alertPoint: 500,
                    startTime: "2024-12-25T18:00:00Z",
                    endTime: "2024-12-25T22:00:00Z",
                    description: "A grand music concert featuring popular artists.",
                    status: "completed",
                    entries: [
                        {
                            id: "entry-1",
                            name: "Main Entrance",
                            totalIn: 355,
                            totalOut: 355,
                            status: "open"
                        },
                        {
                            id: "entry-2",
                            name: "Main Entrance",
                            totalIn: 405,
                            totalOut: 405,
                            status: "open"
                        }
                    ],
                    doorKeepers: [
                        {
                            id: "doorkeeper-1",
                            name: "John Doe",
                            email: "johndoe@example.com"
                        }
                    ],
                    notifications: [
                        {
                            type: "email",
                            message: "The event is approaching!",
                            status: "pending"
                        }
                    ]
                },
                {
                    id: "2",
                    titleEvent: "Art Exhibition",
                    venue: "Art Gallery",
                    maxParticipants: 500,
                    alertPoint: 250,
                    startTime: "2025-01-05T10:00:00Z",
                    endTime: "2025-01-05T18:00:00Z",
                    description: "An art exhibition featuring contemporary artists.",
                    status: "scheduled",
                    entries: [
                        {
                            id: "entry-1",
                            name: "Gallery Entrance floor 1",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open"
                        },
                        {
                            id: "entry-2",
                            name: "Gallery Entrance floor 2",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open"
                        },
                        {
                            id: "entry-3",
                            name: "Gallery Entrance floor 3",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open"
                        },
                        {
                            id: "entry-4",
                            name: "Gallery Entrance floor 4",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open"
                        },
                        {
                            id: "entry-5",
                            name: "Gallery Entrance floor 5",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open"
                        }
                    ],
                    doorKeepers: [
                        {
                            id: "doorkeeper-2",
                            name: "Alice Smith",
                            email: "alicesmith@example.com"
                        }
                    ],
                    notifications: [
                        {
                            type: "sms",
                            message: "Reminder: The Art Exhibition starts tomorrow!",
                            status: "sent"
                        }
                    ]
                }
            ]);
        }, 350);
    });

interface UseEventReturn {
    events: Event[];
    isLoading: boolean;
    error: string | null;
}

export const useEvent = (): UseEventReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const eventList = await fakeEventApi();
            setEvents(eventList);
        } catch (err) {
            console.log("err", err);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, isLoading, error };
};
