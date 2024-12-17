import { IGistRepository } from "src/layers/application/interfaces/repositories/igist.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { IGetGistByIdUsecase } from "src/layers/application/interfaces/usecases/get-gists-by-id.usecase.interface";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Gist } from "src/layers/domain/models/gist";

export class GetGistByIdUsecase implements IGetGistByIdUsecase {
  constructor(
    private readonly repository: IGistRepository,
    private readonly service: IAnalyticsService,
  ) { }

  public async execute(id: string): Promise<typeof Gist.model[]> {
    return this.service.setAnalytics(
      {
        name: "Get Gist By Id",
        from: GetGistByIdUsecase.name,
      },
      async () => {
        if (!id) {
          throw new ValidationError({ message: "gist id empty" });
        }
        return await this.repository.getGistById(id);
      },
    );
  }
}
