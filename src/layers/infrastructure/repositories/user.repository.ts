import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IHttpService } from "src/layers/application/interfaces/services/http.service.interface";
import { IUserRepository } from "src/layers/application/interfaces/repositories/iuser.respository.interface";
import { User } from "src/layers/domain/models/user";

export class UserRepository implements IUserRepository {
  private readonly path = "/users";

  constructor(
    private readonly analyticsService: IAnalyticsService,
    private readonly httpService: IHttpService,
  ) { }

  async getUserByName(name: string): Promise<typeof User.model> {
    return this.analyticsService.setAnalytics(
      {
        name: "Get User By Name",
        from: UserRepository.name,
      },
      async () => {
        const response = await this.httpService.get<typeof User.schema>(`${this.path}/${name}`);
        return User.toModel(response)
      },
    );
  }
}
