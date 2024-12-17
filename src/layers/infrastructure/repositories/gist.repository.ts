import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { IGistRepository } from "src/layers/application/interfaces/repositories/igist.respository.interface";
import { Gist } from "src/layers/domain/models/gist";

export class GistRepository implements IGistRepository {
  private readonly path = "/gists";

  constructor(
    private readonly analyticsService: IAnalyticsService,
    private readonly httpService: IHttpService,
  ) { }

  async getGistById(id: string): Promise<typeof Gist.model[]> {
    return await this.analyticsService.setAnalytics(
      {
        name: "Get Gist By Id",
        from: GistRepository.name,
      },
      async () => {
        const response = await this.httpService.get<typeof Gist.schema[]>(`${this.path}/${id}`);
        return response.map((value) => Gist.toModel(value))
      },
    );
  }
}
