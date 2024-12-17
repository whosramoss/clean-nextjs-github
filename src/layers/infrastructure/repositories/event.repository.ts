import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { IEventRepository } from "src/layers/application/interfaces/repositories/ievent.respository.interface";
import { Event } from "src/layers/domain/models/event";

export class EventRepository implements IEventRepository {
  private readonly path = "/events";

  constructor(
    private readonly analyticsService: IAnalyticsService,
    private readonly httpService: IHttpService,
  ) { }

  async getEvents(): Promise<typeof Event.model[]> {
    return await this.analyticsService.setAnalytics(
      {
        name: "Get Events",
        from: EventRepository.name,
      },
      async () => {
        const response = await this.httpService.get<typeof Event.schema[]>(this.path);
        return response.map((value) => Event.toModel(value))
      },
    );
  }
}
