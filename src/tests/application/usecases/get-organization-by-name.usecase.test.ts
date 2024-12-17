import { IOrganizationRepository } from "src/layers/application/interfaces/repositories/iorganization.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { GetOrganizationByNameUsecase } from "src/layers/application/usecases/get-organization-by-name.usecase";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Organization } from "src/layers/domain/models/organization";
import { vi, describe, it, expect, beforeEach, assertType } from "vitest";

describe("GetOrganizationByNameUsecase", () => {
  let usecase: GetOrganizationByNameUsecase;
  let mockRepository: IOrganizationRepository;
  let mockService: IAnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getOrganizationByName: vi.fn(),
    };

    mockService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    usecase = new GetOrganizationByNameUsecase(mockRepository, mockService);
  });

  it("should call setAnalytics and getOrganizationByName when execute is called with a valid name", async () => {
    const name = "google";
    mockRepository.getOrganizationByName(name);
    const result = await usecase.execute(name);
    expect(mockService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockRepository.getOrganizationByName).toHaveBeenCalledWith(name);
    assertType<typeof Organization.model>(result);
  });

  it("should throw a ValidationError when name is empty", async () => {
    const name = "";
    await expect(usecase.execute(name)).rejects.toThrowError(
      new ValidationError({ message: "organization name empty" }),
    );
  });

  it("should throw an error if the name is not found", async () => {
    const name = "";
    mockRepository.getOrganizationByName(name);

    await expect(usecase.execute(name)).rejects.toThrowError(
      "organization name empty",
    );
  });
});
