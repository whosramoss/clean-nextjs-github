import { createModule } from "@evyweb/ioctopus";
import { DISymbol } from "src/shared/di/symbols";
import { GetUserByNameUsecase } from "src/layers/application/usecases/get-user-by-name.usecase";
import { GetEventsUsecase } from "src/layers/application/usecases/get-events.usecase";
import { GetGistByIdUsecase } from "src/layers/application/usecases/get-gists-by-id.usecase";
import { GetSearchByTopicsUsecase } from "src/layers/application/usecases/get-search-by-topic.usecase";
import { GetOrganizationByNameUsecase } from "src/layers/application/usecases/get-organization-by-name.usecase";

export function createUsecaseModule() {
  const module = createModule();
  module
    .bind(DISymbol.IGetUserByNameUsecase)
    .toClass(GetUserByNameUsecase, [
      DISymbol.IUserRepository,
      DISymbol.IAnalyticsService,
    ]);

  module
    .bind(DISymbol.IGetEventsUsecase)
    .toClass(GetEventsUsecase, [
      DISymbol.IEventRepository,
      DISymbol.IAnalyticsService,
    ]);

  module
    .bind(DISymbol.IGetGistByIdUsecase)
    .toClass(GetGistByIdUsecase, [
      DISymbol.IGistRepository,
      DISymbol.IAnalyticsService,
    ]);

  module
    .bind(DISymbol.IGetSearchByTopicsUsecase)
    .toClass(GetSearchByTopicsUsecase, [
      DISymbol.ISearchRepository,
      DISymbol.IAnalyticsService,
    ]);

  module
    .bind(DISymbol.IGetOrganizationByNameUsecase)
    .toClass(GetOrganizationByNameUsecase, [
      DISymbol.IOrganizationRepository,
      DISymbol.IAnalyticsService,
    ]);
  return module;
}
