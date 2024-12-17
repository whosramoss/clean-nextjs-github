import { createModule } from "@evyweb/ioctopus";
import { DISymbol } from "src/shared/di/symbols";
import { EventController } from "src/layers/interface-adapters/controllers/event.controller";
import { GistController } from "src/layers/interface-adapters/controllers/gist.controller";
import { OrganizationController } from "src/layers/interface-adapters/controllers/organization.controller";
import { SearchController } from "src/layers/interface-adapters/controllers/search.controller";
import { UserController } from "src/layers/interface-adapters/controllers/user.controller";

export function createControllerModule() {
  const module = createModule();

  module
    .bind(DISymbol.UserController)
    .toClass(UserController, [
      DISymbol.IGetUserByNameUsecase,
      DISymbol.IAnalyticsService,
      DISymbol.ICrashlyticsService,
    ]);

  module
    .bind(DISymbol.EventController)
    .toClass(EventController, [
      DISymbol.IGetEventsUsecase,
      DISymbol.IAnalyticsService,
      DISymbol.ICrashlyticsService,
    ]);

  module
    .bind(DISymbol.GistController)
    .toClass(GistController, [
      DISymbol.IGetGistByIdUsecase,
      DISymbol.IAnalyticsService,
      DISymbol.ICrashlyticsService,
    ]);

  module
    .bind(DISymbol.SearchController)
    .toClass(SearchController, [
      DISymbol.IGetSearchByTopicsUsecase,
      DISymbol.IAnalyticsService,
      DISymbol.ICrashlyticsService,
    ]);

  module
    .bind(DISymbol.OrganizationController)
    .toClass(OrganizationController, [
      DISymbol.IGetOrganizationByNameUsecase,
      DISymbol.IAnalyticsService,
      DISymbol.ICrashlyticsService,
    ]);

  return module;
}
