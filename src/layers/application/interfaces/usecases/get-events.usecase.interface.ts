import { Event } from "src/layers/domain/models/event";

export interface IGetEventsUsecase {
  execute(): Promise<typeof Event.model[]>;
}
