import { User } from "src/layers/domain/models/user";

export interface IGetUserByNameUsecase {
  execute(name: string): Promise<typeof User.model>;
}
