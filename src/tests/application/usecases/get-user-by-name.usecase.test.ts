import { IUserRepository } from "src/layers/application/interfaces/repositories/iuser.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { GetUserByNameUsecase } from "src/layers/application/usecases/get-user-by-name.usecase";
import ValidationError from "src/layers/domain/errors/validation-error";
import { User } from "src/layers/domain/models/user";
import { vi, describe, it, expect, beforeEach, assertType } from "vitest";

describe("GetUserByNameUsecase", () => {
  let usecase: GetUserByNameUsecase;
  let mockRepository: IUserRepository;
  let mockService: IAnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getUserByName: vi.fn(),
    };

    mockService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    usecase = new GetUserByNameUsecase(mockRepository, mockService);
  });

  it("should call setAnalytics and getUserByName when execute is called with a valid name", async () => {
    const userName = "userName";
    mockRepository.getUserByName(userName);
    const result = await usecase.execute(userName);
    expect(mockService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockRepository.getUserByName).toHaveBeenCalledWith(userName);
    assertType<typeof User.model>(result);
  });

  it("should throw a ValidationError when name is empty", async () => {
    const userName = "";
    await expect(usecase.execute(userName)).rejects.toThrowError(
      new ValidationError({ message: "User name is empty" }),
    );
  });

  it("should throw an error if the user is not found", async () => {
    const userName = "";
    mockRepository.getUserByName(userName);

    await expect(usecase.execute(userName)).rejects.toThrowError(
      "User name is empty",
    );
  });
});
