import { AlertStore } from "src/shared/ui/alert";
import UtilsStore from "src/shared/utils/utils-store";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IGetOrganizationByNameUsecase } from "src/layers/application/interfaces/usecases/get-organization-by-name.usecase.interface";
import { Organization } from "src/layers/domain/models/organization";

export class OrganizationControllerStore {
  static orgStore = UtilsStore.createStoreByType<typeof Organization.presenter>();
}

export class OrganizationController {
  constructor(
    private readonly getOrganizationByNameUsecase: IGetOrganizationByNameUsecase,
    private readonly analyticsService: IAnalyticsService,
    private readonly crashlyticsService: ICrashlyticsService,
  ) { }

  private get org() {
    return OrganizationControllerStore.orgStore.getState();
  }

  private get alert() {
    return AlertStore.alertStore.getState();
  }

  public getOrganizationByName(name: string): Promise<void> {
    return this.analyticsService.setAnalytics(
      {
        name: "Get Organization By Name",
        from: OrganizationController.name,
      },
      async () => {
        try {
          this.org.reset();
          this.org.setLoading(true);
          const response = await this.getOrganizationByNameUsecase.execute(name);
          const value = Organization.toPresenter(response);
          this.org.setValue(value);
        } catch (error) {
          this.org.setError(error);
          this.alert.setMessage("Unable to get organization data by name");
          this.crashlyticsService.reportError(error);
        } finally {
          this.org.setLoading(false);
        }
      },
    );
  }
}
