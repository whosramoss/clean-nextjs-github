import { AlertStore } from "src/shared/ui/alert";
import UtilsStore from "src/shared/utils/utils-store";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IGetUserByNameUsecase } from "src/layers/application/interfaces/usecases/get-user-by-name.usecase.interface";
import { User } from "src/layers/domain/models/user";

export class UserControllerStore {
  static userStore = UtilsStore.createStoreByType<typeof User.presenter>();
}

export class UserController {
  constructor(
    private readonly getUserByNameUsecase: IGetUserByNameUsecase,
    private readonly analyticsService: IAnalyticsService,
    private readonly crashlyticsService: ICrashlyticsService,
  ) { }

  private get user() {
    return UserControllerStore.userStore.getState();
  }

  private get alert() {
    return AlertStore.alertStore.getState();
  }

  public getUserByName(name: string): Promise<void> {
    return this.analyticsService.setAnalytics(
      {
        name: "Get User By Name",
        from: UserController.name,
      },
      async () => {
        try {
          this.user.reset();
          this.user.setLoading(true);
          const response = await this.getUserByNameUsecase.execute(name);
          const value = User.toPresenter(response);
          this.user.setValue(value);
        } catch (error) {
          this.user.setError(error);
          this.alert.setMessage("Unable to get user data by name");
          this.crashlyticsService.reportError(error);
        } finally {
          this.user.setLoading(false);
        }
      },
    );
  }
}
