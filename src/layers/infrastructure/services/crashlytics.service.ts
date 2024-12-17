import {
  CrashlyticsOptions,
  ICrashlyticsService,
} from "src/layers/application/interfaces/services/crashlytics.service.interface";
import BaseError from "src/layers/domain/errors/base-error";

export type CrashlyticsError = Error | BaseError;

export class CrashlyticsService implements ICrashlyticsService {
  public reportError<T>(error: Error | BaseError, options: CrashlyticsOptions) {
    this.printError(error, options);
    /// Add an external crashlytics service here
  }

  private printError(error: CrashlyticsError, options: CrashlyticsOptions) {
    console.table({
      name: error.name,
      message: error.message,
      from: options?.from || "Not informed",
    });
  }
}
