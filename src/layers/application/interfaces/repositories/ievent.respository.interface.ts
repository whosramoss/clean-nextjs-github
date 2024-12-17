import { Event } from "src/layers/domain/models/event";

export interface IEventRepository {
  getEvents(): Promise<typeof Event.model[]>;
}
