import {
  UserController,
  UserControllerStore,
} from "src/layers/interface-adapters/controllers/user.controller";
import { vi, describe, it, expect, beforeEach } from "vitest";
import BaseError from "src/layers/domain/errors/base-error";
import { User } from "src/layers/domain/models/user";

describe("UserController", () => {
  let controller: UserController;
  let mockGetUserByNameUsecase: any;
  let mockAnalyticsService: any;
  let mockCrashlyticsService: any;
  let mockStore: any;

  beforeEach(() => {
    mockGetUserByNameUsecase = {
      execute: vi.fn(),
    };

    mockAnalyticsService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    mockCrashlyticsService = {
      reportError: vi.fn(),
    };

    mockStore = {
      getState: vi.fn().mockReturnValue({
        reset: vi.fn(),
        setLoading: vi.fn(),
        setValue: vi.fn(),
        setError: vi.fn(),
      }),
    };

    UserControllerStore.userStore = mockStore;

    controller = new UserController(
      mockGetUserByNameUsecase,
      mockAnalyticsService,
      mockCrashlyticsService,
    );
  });

  it("should fetch user and update user store on success", async () => {
    const mockParams = "name";
    const mockUsecaseResponse = { value: "user" };
    const mockPresenterResponse = {
      name: "string",
      avatar_url: "string",
      bio: "string",
    }

    vi.spyOn(User, 'toPresenter').mockReturnValueOnce(mockPresenterResponse);

    mockGetUserByNameUsecase.execute.mockResolvedValue(mockUsecaseResponse);

    await controller.getUserByName(mockParams);

    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Get User By Name",
        from: "UserController",
      }),
      expect.any(Function),
    );

    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(true);
    expect(User.toPresenter).toHaveBeenCalledWith(mockUsecaseResponse);
    expect(mockStore.getState().setValue).toHaveBeenCalledWith(mockPresenterResponse);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle error and report to crashlytics when getUserByName fails", async () => {
    const mockError = new BaseError({ message: "error" });

    mockGetUserByNameUsecase.execute.mockRejectedValue(mockError);

    await controller.getUserByName("");

    expect(mockStore.getState().setError).toHaveBeenCalledWith(mockError);
    expect(mockCrashlyticsService.reportError).toHaveBeenCalledWith(mockError);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });
});
