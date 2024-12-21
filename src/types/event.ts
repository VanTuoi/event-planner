export interface Entry {
    id: string;
    name: string;
    totalIn: number;
    totalOut: number;
    status: "open" | "close";
}

export interface DoorKeeper {
    id: string;
    name: string;
    email: string;
}

export interface Notification {
    type: "email" | "sms";
    message: string;
    status: "pending" | "sent" | "failed";
}

export interface Event {
    id: string;
    titleEvent: string;
    venue: string;
    maxParticipants: number;
    alertPoint: number;
    startTime: string;
    endTime: string;
    description: string;
    status: "scheduled" | "ongoing" | "completed" | "cancelled";
    entries: Entry[];
    doorKeepers: DoorKeeper[];
    notifications: Notification[];
}

export interface EventCreate {
    titleEvent: string;
    venue: string;
    maxParticipants: string;
    alertPoint: string;
    numberOfEntries: string;
}
