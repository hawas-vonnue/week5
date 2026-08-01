export declare function fetchJson<T>(url: string, options: object): Promise<T>;
export declare class ApiClient {
    private baseUrl;
    constructor(baseUrl: string);
    responseInterceptor<T>(response: T): Promise<T>;
    requestInterceptor<T, B>(path: string, option: object): Promise<T>;
    get<T>(path: string): Promise<T>;
    post<T, B>(path: string, body: B): Promise<T>;
    put<T, B>(path: string, body: B): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
