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
                            name: "Main Entrance 1",
                            totalIn: 800,
                            totalOut: 100,
                            status: "open",
                            doorKeepers: [
                                { id: "doorkeeper-1", name: "John Doe", email: "johndoe@example.com" },
                                { id: "doorkeeper-2", name: "Alice Johnson", email: "alicejohnson@example.com" }
                            ]
                        },
                        {
                            id: "entry-2",
                            name: "Main Entrance 2",
                            totalIn: 150,
                            totalOut: 50,
                            status: "close",
                            doorKeepers: [
                                { id: "doorkeeper-3", name: "Michael Smith", email: "michaelsmith@example.com" }
                            ]
                        }
                    ],
                    notifications: [
                        {
                            type: "email",
                            message: "Don't miss the Music Concert tonight!",
                            status: "sent"
                        },
                        {
                            type: "sms",
                            message: "Reminder: Concert starts at 6 PM!",
                            status: "sent"
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
                            name: "Gallery Entrance Floor 1",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open",
                            doorKeepers: [{ id: "doorkeeper-4", name: "Emily Davis", email: "emilydavis@example.com" }]
                        },
                        {
                            id: "entry-2",
                            name: "Gallery Entrance Floor 2",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open",
                            doorKeepers: [{ id: "doorkeeper-5", name: "Chris Brown", email: "chrisbrown@example.com" }]
                        }
                    ],
                    notifications: [
                        {
                            type: "email",
                            message: "The Art Exhibition is starting soon. See you there!",
                            status: "pending"
                        }
                    ]
                },
                {
                    id: "3",
                    titleEvent: "Tech Conference 2025",
                    venue: "Convention Center Hall A",
                    maxParticipants: 2000,
                    alertPoint: 1500,
                    startTime: "2025-03-15T09:00:00Z",
                    endTime: "2025-03-15T17:00:00Z",
                    description: "A conference showcasing the latest advancements in technology.",
                    status: "scheduled",
                    entries: [
                        {
                            id: "entry-1",
                            name: "Main Entrance",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open",
                            doorKeepers: [
                                { id: "doorkeeper-6", name: "Sarah Wilson", email: "sarahwilson@example.com" },
                                { id: "doorkeeper-7", name: "David Green", email: "davidgreen@example.com" }
                            ]
                        },
                        {
                            id: "entry-2",
                            name: "Side Entrance",
                            totalIn: 0,
                            totalOut: 0,
                            status: "open",
                            doorKeepers: [
                                { id: "doorkeeper-8", name: "Laura Martinez", email: "lauramartinez@example.com" }
                            ]
                        }
                    ],
                    notifications: [
                        {
                            type: "sms",
                            message: "Tech Conference is just around the corner. Save the date!",
                            status: "sent"
                        }
                    ]
                }
            ]);
        }, 2000);
    });

interface UseEventReturn {
    events: Event[];
    isLoading: boolean;
    error: string | null;
    fetchEvents: () => void;
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

    return { events, isLoading, error, fetchEvents };
};
