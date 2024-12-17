import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import BaseError from "src/layers/domain/errors/base-error";

export default class HttpService implements IHttpService {
  private readonly baseUrl: string = "https://api.github.com";

  constructor(
    private readonly crashlyticsService: ICrashlyticsService,
    private readonly analyticsService: IAnalyticsService,
  ) { }

  private async request<T>(
    url: string,
    method: string,
    body?: Record<string, unknown>,
    params?: Record<string, string>,
  ): Promise<T> {
    return this.analyticsService.setAnalytics(
      {
        name: `${method} | ${url}`,
        from: HttpService.name,
      },
      async () => {
        const queryParams = params
          ? "?" + new URLSearchParams(params).toString()
          : "";

        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        };

        try {
          const response = await fetch(
            `${this.baseUrl}${url}${queryParams}`,
            options,
          );

          if (!response.ok) {
            throw new BaseError({
              type: response.type,
              status: response.status,
              message: response.statusText,
            });
          }

          const data: T = await response.json();
          return data;
        } catch (error) {
          this.crashlyticsService.reportError(error, {
            from: HttpService.name,
          });
          throw new BaseError({ message: `Error: ${error}` });
        }
      },
    );
  }

  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(url, "GET", undefined, params);
  }

  async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return this.request<T>(url, "POST", body);
  }

  async put<T>(url: string, body: Record<string, unknown>): Promise<T> {
    return this.request<T>(url, "PUT", body);
  }

  async delete<T>(url: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(url, "DELETE", undefined, params);
  }
}
