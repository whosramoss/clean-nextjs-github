import { Gist } from "src/layers/domain/models/gist";

export interface IGetGistByIdUsecase {
  execute(id: string): Promise<typeof Gist.model[]>;
}
