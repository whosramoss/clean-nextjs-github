import {
  IAnalyticsService,
  AnalyticsOptions,
} from "src/layers/application/interfaces/services/analytics.service.interface";

export class AnalyticsService implements IAnalyticsService {
  public setAnalytics<T>(options: AnalyticsOptions, callback: () => T): T {
    this.printAnalyticsOptions(options);
    /// Add an external analytics service here
    return callback();
  }

  private printAnalyticsOptions(options: AnalyticsOptions) {
    console.log({ Name: options.name, From: options.from || "Not informed" });
  }
}
