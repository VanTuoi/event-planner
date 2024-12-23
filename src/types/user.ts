export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
    role: "admin" | "keeper";
}
