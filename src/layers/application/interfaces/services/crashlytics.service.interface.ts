export interface CrashlyticsOptions {
  from?: string;
}

export interface ICrashlyticsService {
  reportError<T>(error: unknown, options?: CrashlyticsOptions): void;
}
