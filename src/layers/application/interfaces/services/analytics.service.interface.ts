export interface AnalyticsOptions {
  name: string;
  from?: string;
}

export interface IAnalyticsService {
  setAnalytics<T>(options: AnalyticsOptions, callback: () => T): T;
}
