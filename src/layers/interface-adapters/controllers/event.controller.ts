import { AlertStore } from "src/shared/ui/alert";
import UtilsStore from "src/shared/utils/utils-store";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { ICrashlyticsService } from "src/layers/application/interfaces/services/crashlytics.service.interface";
import { IGetEventsUsecase } from "src/layers/application/interfaces/usecases/get-events.usecase.interface";
import { Event } from "src/layers/domain/models/event";


export class EventControllerStore {
  static eventStore = UtilsStore.createStoreByType<typeof Event.presenter[]>();
}

export class EventController {
  constructor(
    private readonly getEventsUsecase: IGetEventsUsecase,
    private readonly analyticsService: IAnalyticsService,
    private readonly crashlyticsService: ICrashlyticsService,
  ) { }

  private get event() {
    return EventControllerStore.eventStore.getState();
  }

  private get alert() {
    return AlertStore.alertStore.getState();
  }

  public getEvents(): Promise<void> {
    return this.analyticsService.setAnalytics(
      {
        name: "Get Events",
        from: EventController.name,
      },
      async () => {
        try {
          this.event.reset();
          this.event.setLoading(true);
          const response = await this.getEventsUsecase.execute();
          const value = response.map((e) => Event.toPresenter(e))
          this.event.setValue(value);
        } catch (error) {
          this.event.setError(error);
          this.alert.setMessage("Unable to get list events data");
          this.crashlyticsService.reportError(error);
        } finally {
          this.event.setLoading(false);
        }
      },
    );
  }
}
