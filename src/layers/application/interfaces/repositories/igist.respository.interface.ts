import { Gist } from "src/layers/domain/models/gist";

export interface IGistRepository {
  getGistById(id: string): Promise<typeof Gist.model[]>;
}
