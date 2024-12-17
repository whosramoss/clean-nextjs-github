import { User } from "src/layers/domain/models/user";

export interface IUserRepository {
  getUserByName(name: string): Promise<typeof User.model>;
}
