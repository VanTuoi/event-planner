export type RootStackParamList = {
    login: undefined;
    register: undefined;
    home: undefined;
    about: undefined;
    "review-detail": { id: number; title: string; star: number } | undefined;
    homeLayout: undefined;
    authStack: undefined;
};

declare global {
    namespace ReactNavigation {
        type RootParamList = RootStackParamList;
    }
}
