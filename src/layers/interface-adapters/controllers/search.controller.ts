import { AlertStore } from "src/shared/ui/alert";
import UtilsStore from "src/shared/utils/utils-store";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IGetSearchByTopicsUsecase } from "src/layers/application/interfaces/usecases/get-search-by-topic.usecase.interface";
import { Search } from "src/layers/domain/models/search-topics";

export class SearchControllerStore {
  static searchStore = UtilsStore.createStoreByType<typeof Search.presenter>();
}

export class SearchController {
  constructor(
    private readonly getSearchByTopicsUsecase: IGetSearchByTopicsUsecase,
    private readonly analyticsService: IAnalyticsService,
    private readonly crashlyticsService: ICrashlyticsService,
  ) { }

  private get search() {
    return SearchControllerStore.searchStore.getState();
  }

  private get alert() {
    return AlertStore.alertStore.getState();
  }

  public getSearchByTopic(topic: string): Promise<void> {
    return this.analyticsService.setAnalytics(
      {
        name: "Get Search By Topics",
        from: SearchController.name,
      },
      async () => {
        try {
          this.search.reset();
          this.search.setLoading(true);
          const response = await this.getSearchByTopicsUsecase.execute(topic);
          const value = Search.toPresenter(response);
          this.search.setValue(value);
        } catch (error) {
          this.search.setError(error);
          this.alert.setMessage("Unable to get search data by topic");
          this.crashlyticsService.reportError(error);
        } finally {
          this.search.setLoading(false);
        }
      },
    );
  }
}
