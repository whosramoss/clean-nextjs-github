import { IUserRepository } from "src/layers/application/interfaces/repositories/iuser.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IGetUserByNameUsecase } from "src/layers/application/interfaces/usecases/get-user-by-name.usecase.interface";
import ValidationError from "src/layers/domain/errors/validation-error";
import { User } from "src/layers/domain/models/user";

export class GetUserByNameUsecase implements IGetUserByNameUsecase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly service: IAnalyticsService,
  ) { }

  public async execute(name: string): Promise<typeof User.model> {
    return this.service.setAnalytics(
      {
        name: "Get User By Name",
        from: GetUserByNameUsecase.name,
      },
      async () => {
        if (!name) {
          throw new ValidationError({ message: "User name is empty" });
        }
        return await this.repository.getUserByName(name);
      },
    );
  }
}
