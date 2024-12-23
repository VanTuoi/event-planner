import { Event } from "./event";

export type RootStackParamList = {
    login: undefined;
    register: undefined;
    home: undefined;
    about: undefined;
    "event-detail": { event: Event } | undefined;
    "event-setting": { event: Event } | undefined;
    "keeper-home": undefined;
    "keeper-event-detail": { event: event } | undefined;
    "keeper-check": { event: event; entry: Entry } | undefined;
    homeLayout: undefined;
    authStack: undefined;
    keeperStack: undefined;
};

declare global {
    namespace ReactNavigation {
        type RootParamList = RootStackParamList;
    }
}
