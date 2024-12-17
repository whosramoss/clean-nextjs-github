import { createModule } from "@evyweb/ioctopus";
import { DISymbol } from "src/shared/di/symbols";
import { AnalyticsService } from "src/layers/infrastructure/services/analytics.service";
import { CrashlyticsService } from "src/layers/infrastructure/services/crashlytics.service";
import HttpService from "src/layers/infrastructure/services/http.service";

export function createServiceModule() {
  const module = createModule();

  module.bind(DISymbol.ICrashlyticsService).toClass(CrashlyticsService, []);
  module.bind(DISymbol.IAnalyticsService).toClass(AnalyticsService, []);

  module
    .bind(DISymbol.IHttpService)
    .toClass(HttpService, [
      DISymbol.ICrashlyticsService,
      DISymbol.IAnalyticsService,
    ]);

  return module;
}
