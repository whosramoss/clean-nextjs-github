import { Search } from "src/layers/domain/models/search-topics";

export interface ISearchRepository {
  getSearchTopics(topic: string): Promise<typeof Search.model>;
}
