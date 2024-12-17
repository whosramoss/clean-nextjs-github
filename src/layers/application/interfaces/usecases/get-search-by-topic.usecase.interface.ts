import { Search } from "src/layers/domain/models/search-topics";

export interface IGetSearchByTopicsUsecase {
  execute(topic: string): Promise<typeof Search.model>;
}
