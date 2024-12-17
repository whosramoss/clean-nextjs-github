import { createModule } from "@evyweb/ioctopus";
import { DISymbol } from "src/shared/di/symbols";
import { UserRepository } from "src/layers/infrastructure/repositories/user.repository";
import { SearchRepository } from "src/layers/infrastructure/repositories/search.repository";
import { EventRepository } from "src/layers/infrastructure/repositories/event.repository";
import { GistRepository } from "src/layers/infrastructure/repositories/gist.repository";
import { OrganizationRepository } from "src/layers/infrastructure/repositories/organization.repository";

export function createRepositoryModule() {
  const module = createModule();
  const commonDependencies = [
    DISymbol.IAnalyticsService,
    DISymbol.IHttpService,
  ];

  module
    .bind(DISymbol.IUserRepository)
    .toClass(UserRepository, commonDependencies);
  module
    .bind(DISymbol.IGistRepository)
    .toClass(GistRepository, commonDependencies);
  module
    .bind(DISymbol.IEventRepository)
    .toClass(EventRepository, commonDependencies);
  module
    .bind(DISymbol.ISearchRepository)
    .toClass(SearchRepository, commonDependencies);
  module
    .bind(DISymbol.IOrganizationRepository)
    .toClass(OrganizationRepository, commonDependencies);

  return module;
}
