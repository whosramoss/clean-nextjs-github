import { IGistRepository } from "src/layers/application/interfaces/repositories/igist.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { GetGistByIdUsecase } from "src/layers/application/usecases/get-gists-by-id.usecase";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Gist } from "src/layers/domain/models/gist";
import { vi, describe, it, expect, beforeEach, assertType } from "vitest";

describe("GetGistByIdUsecase", () => {
  let usecase: GetGistByIdUsecase;
  let mockRepository: IGistRepository;
  let mockService: IAnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getGistById: vi.fn(),
    };

    mockService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    usecase = new GetGistByIdUsecase(mockRepository, mockService);
  });

  it("should call setAnalytics and getGistById when execute is called with a valid id", async () => {
    const id = "public";
    mockRepository.getGistById(id);
    const result = await usecase.execute(id);
    expect(mockService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockRepository.getGistById).toHaveBeenCalledWith(id);
    assertType<typeof Gist.model[]>(result);
  });

  it("should throw a ValidationError when id is empty", async () => {
    const id = "";
    await expect(usecase.execute(id)).rejects.toThrowError(
      new ValidationError({ message: "gist id empty" }),
    );
  });

  it("should throw an error if the gist is not found", async () => {
    const id = "";
    mockRepository.getGistById(id);

    await expect(usecase.execute(id)).rejects.toThrowError("gist id empty");
  });
});
