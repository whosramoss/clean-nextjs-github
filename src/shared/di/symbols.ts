import { IEventRepository } from "src/layers/application/interfaces/repositories/ievent.respository.interface";
import { IGistRepository } from "src/layers/application/interfaces/repositories/igist.respository.interface";
import { IOrganizationRepository } from "src/layers/application/interfaces/repositories/iorganization.respository.interface";
import { ISearchRepository } from "src/layers/application/interfaces/repositories/isearch.respository.interface";
import { IUserRepository } from "src/layers/application/interfaces/repositories/iuser.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { IGetEventsUsecase } from "src/layers/application/interfaces/usecases/get-events.usecase.interface";
import { IGetGistByIdUsecase } from "src/layers/application/interfaces/usecases/get-gists-by-id.usecase.interface";
import { IGetOrganizationByNameUsecase } from "src/layers/application/interfaces/usecases/get-organization-by-name.usecase.interface";
import { IGetSearchByTopicsUsecase } from "src/layers/application/interfaces/usecases/get-search-by-topic.usecase.interface";
import { IGetUserByNameUsecase } from "src/layers/application/interfaces/usecases/get-user-by-name.usecase.interface";
import { EventController } from "src/layers/interface-adapters/controllers/event.controller";
import { GistController } from "src/layers/interface-adapters/controllers/gist.controller";
import { OrganizationController } from "src/layers/interface-adapters/controllers/organization.controller";
import { SearchController } from "src/layers/interface-adapters/controllers/search.controller";
import { UserController } from "src/layers/interface-adapters/controllers/user.controller";

export const DISymbol = {
  // Services
  IHttpService: Symbol.for("IHttpService"),
  IAnalyticsService: Symbol.for("IAnalyticsService"),
  ICrashlyticsService: Symbol.for("ICrashlyticsService"),

  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IEventRepository: Symbol.for("IEventRepository"),
  IGistRepository: Symbol.for("IGistRepository"),
  IOrganizationRepository: Symbol.for("IOrganizationRepository"),
  ISearchRepository: Symbol.for("ISearchRepository"),

  // Use Cases
  IGetUserByNameUsecase: Symbol.for("IGetUserByNameUsecase"),
  IGetEmojisUsecase: Symbol.for("IGetEmojisUsecase"),
  IGetEventsUsecase: Symbol.for("IGetEventsUsecase"),
  IGetGistByIdUsecase: Symbol.for("IGetGistByIdUsecase"),
  IGetSearchByTopicsUsecase: Symbol.for("IGetSearchByTopicsUsecase"),
  IGetOrganizationByNameUsecase: Symbol.for("IGetOrganizationByNameUsecase"),

  // Controllers
  UserController: Symbol.for("UserController"),
  EventController: Symbol.for("EventController"),
  GistController: Symbol.for("GistController"),
  SearchController: Symbol.for("SearchController"),
  OrganizationController: Symbol.for("OrganizationController"),
};

export type DIValue = {
  // Services
  IHttpService: IHttpService;
  IAnalyticsService: IAnalyticsService;
  ICrashlyticsService: ICrashlyticsService;

  // Repositories
  IUserRepository: IUserRepository;
  IEventRepository: IEventRepository;
  IGistRepository: IGistRepository;
  IOrganizationRepository: IOrganizationRepository;
  ISearchRepository: ISearchRepository;

  // Use Cases
  IGetUserByNameUsecase: IGetUserByNameUsecase;
  IGetEventsUsecase: IGetEventsUsecase;
  IGetGistByIdUsecase: IGetGistByIdUsecase;
  IGetSearchByTopicsUsecase: IGetSearchByTopicsUsecase;
  IGetOrganizationByNameUsecase: IGetOrganizationByNameUsecase;

  // Controllers
  UserController: UserController;
  EventController: EventController;
  GistController: GistController;
  SearchController: SearchController;
  OrganizationController: OrganizationController;
};
