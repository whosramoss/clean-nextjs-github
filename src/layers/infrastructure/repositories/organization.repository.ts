import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { IOrganizationRepository } from "src/layers/application/interfaces/repositories/iorganization.respository.interface";
import { Organization } from "src/layers/domain/models/organization";

export class OrganizationRepository implements IOrganizationRepository {
  private readonly path = "/orgs";

  constructor(
    private readonly analyticsService: IAnalyticsService,
    private readonly httpService: IHttpService,
  ) { }

  async getOrganizationByName(name: string): Promise<typeof Organization.model> {
    return await this.analyticsService.setAnalytics(
      {
        name: "Get Organization By Name",
        from: OrganizationRepository.name,
      },
      async () => {
        const response = await this.httpService.get<typeof Organization.schema>(
          `${this.path}/${name}`,
        );
        return Organization.toModel(response);
      },
    );
  }
}
