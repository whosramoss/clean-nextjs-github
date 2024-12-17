import { IOrganizationRepository } from "src/layers/application/interfaces/repositories/iorganization.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IGetOrganizationByNameUsecase } from "src/layers/application/interfaces/usecases/get-organization-by-name.usecase.interface";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Organization } from "src/layers/domain/models/organization";

export class GetOrganizationByNameUsecase
  implements IGetOrganizationByNameUsecase {
  constructor(
    private readonly repository: IOrganizationRepository,
    private readonly service: IAnalyticsService,
  ) { }

  public async execute(name: string): Promise<typeof Organization.model> {
    return this.service.setAnalytics(
      {
        name: "Get Organization By Name",
        from: GetOrganizationByNameUsecase.name,
      },
      async () => {
        if (!name) {
          throw new ValidationError({ message: "organization name empty" });
        }
        return await this.repository.getOrganizationByName(name);
      },
    );
  }
}
