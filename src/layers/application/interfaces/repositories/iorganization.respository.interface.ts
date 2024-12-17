import { Organization } from "src/layers/domain/models/organization";

export interface IOrganizationRepository {
  getOrganizationByName(name: string): Promise<typeof Organization.model>;
}
