import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { ISearchRepository } from "src/layers/application/interfaces/repositories/isearch.respository.interface";
import { Search } from "src/layers/domain/models/search-topics";

export class SearchRepository implements ISearchRepository {
  private readonly path = "/search";

  constructor(
    private readonly analyticsService: IAnalyticsService,
    private readonly httpService: IHttpService,
  ) { }

  async getSearchTopics(topic: string): Promise<typeof Search.model> {
    return await this.analyticsService.setAnalytics(
      {
        name: "Get Search By Topics",
        from: SearchRepository.name,
      },
      async () => {
        const response = await this.httpService.get<typeof Search.schema>(
          `${this.path}/topics?q=${topic}`,
        );
        return Search.toModel(response)
      },
    );

  }
}
