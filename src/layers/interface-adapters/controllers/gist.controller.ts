import { AlertStore } from "src/shared/ui/alert";
import UtilsStore from "src/shared/utils/utils-store";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IGetGistByIdUsecase } from "src/layers/application/interfaces/usecases/get-gists-by-id.usecase.interface";
import { Gist } from "src/layers/domain/models/gist";

export class GistControllerStore {
  static gistStore = UtilsStore.createStoreByType<typeof Gist.presenter[]>();
}

export class GistController {
  constructor(
    private readonly getGistByIdUsecase: IGetGistByIdUsecase,
    private readonly analyticsService: IAnalyticsService,
    private readonly crashlyticsService: ICrashlyticsService,
  ) { }

  private get gist() {
    return GistControllerStore.gistStore.getState();
  }

  private get alert() {
    return AlertStore.alertStore.getState();
  }

  public getGistById(name: string): Promise<void> {
    return this.analyticsService.setAnalytics(
      {
        name: "GetGist By Id",
        from: GistController.name,
      },
      async () => {
        try {
          this.gist.reset();
          this.gist.setLoading(true);
          const response = await this.getGistByIdUsecase.execute(name);
          const value = response.map((e) => Gist.toPresenter(e))
          this.gist.setValue(value);
        } catch (error) {
          this.gist.setError(error);
          this.alert.setMessage("Unable to get gist list data by id");
          this.crashlyticsService.reportError(error);
        } finally {
          this.gist.setLoading(false);
        }
      },
    );
  }
}
