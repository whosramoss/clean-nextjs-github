export interface IHttpService {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
  post<T>(url: string, body: Record<string, unknown>): Promise<T>;
  put<T>(url: string, body: Record<string, unknown>): Promise<T>;
  delete<T>(url: string, params?: Record<string, string>): Promise<T>;
}
