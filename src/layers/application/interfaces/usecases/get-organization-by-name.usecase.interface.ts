import { Organization } from "src/layers/domain/models/organization";

export interface IGetOrganizationByNameUsecase {
  execute(name: string): Promise<typeof Organization.model>;
}
