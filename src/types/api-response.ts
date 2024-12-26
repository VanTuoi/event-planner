export interface ApiResponse<T> {
    statusCode: number;
    statusText: string;
    data: T;
}
