import { Event } from "./event";

export type RootStackParamList = {
    login: undefined;
    register: undefined;
    home: undefined;
    about: undefined;
    "event-detail": { event: Event } | undefined;
    "event-setting": { event: Event } | undefined;
    homeLayout: undefined;
    authStack: undefined;
};

declare global {
    namespace ReactNavigation {
        type RootParamList = RootStackParamList;
    }
}
