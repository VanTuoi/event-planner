import { create } from "zustand";
import { Event } from "~/types/event";

interface EventState {
    events: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    resetEvents: () => void;
    initEvents: (events: Event[]) => void;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],

    addEvent: (event) => set((state) => ({ events: [...state.events, event] })),

    updateEvent: (id, updatedEvent) =>
        set((state) => ({
            events: state.events.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event))
        })),

    deleteEvent: (id) =>
        set((state) => ({
            events: state.events.filter((event) => event.id !== id)
        })),

    resetEvents: () => set({ events: [] }),

    initEvents: (events) => set(() => ({ events }))
}));
