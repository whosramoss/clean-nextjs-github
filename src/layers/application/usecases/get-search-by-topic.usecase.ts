import { ISearchRepository } from "src/layers/application/interfaces/repositories/isearch.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IGetSearchByTopicsUsecase } from "src/layers/application/interfaces/usecases/get-search-by-topic.usecase.interface";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Search } from "src/layers/domain/models/search-topics";

export class GetSearchByTopicsUsecase implements IGetSearchByTopicsUsecase {
  constructor(
    private readonly repository: ISearchRepository,
    private readonly service: IAnalyticsService,
  ) { }

  public async execute(topic: string): Promise<typeof Search.model> {
    return this.service.setAnalytics(
      {
        name: "Get Search By Topics",
        from: GetSearchByTopicsUsecase.name,
      },
      async () => {
        if (!topic) {
          throw new ValidationError({ message: "topic empty" });
        }
        return await this.repository.getSearchTopics(topic);
      },
    );
  }
}
