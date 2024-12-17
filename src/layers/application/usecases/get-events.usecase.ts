import { IEventRepository } from "src/layers/application/interfaces/repositories/ievent.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IGetEventsUsecase } from "src/layers/application/interfaces/usecases/get-events.usecase.interface";
import { Event } from "src/layers/domain/models/event";

export class GetEventsUsecase implements IGetEventsUsecase {
  constructor(
    private readonly repository: IEventRepository,
    private readonly service: IAnalyticsService,
  ) { }

  public async execute(): Promise<typeof Event.model[]> {
    return this.service.setAnalytics(
      {
        name: "Get Events",
        from: GetEventsUsecase.name,
      },
      async () => {
        return await this.repository.getEvents();
      },
    );
  }
}
