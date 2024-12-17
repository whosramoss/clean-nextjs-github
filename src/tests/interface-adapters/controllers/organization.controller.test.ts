import { vi, describe, it, expect, beforeEach } from "vitest";
import BaseError from "src/layers/domain/errors/base-error";
import {
  OrganizationController,
  OrganizationControllerStore,
} from "src/layers/interface-adapters/controllers/organization.controller";
import { Organization } from "src/layers/domain/models/organization";

describe("OrganizationController", () => {
  let controller: OrganizationController;
  let mockGetOrganizationByNameUsecase: any;
  let mockAnalyticsService: any;
  let mockCrashlyticsService: any;
  let mockStore: any;

  beforeEach(() => {
    mockGetOrganizationByNameUsecase = {
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

    OrganizationControllerStore.orgStore = mockStore;

    controller = new OrganizationController(
      mockGetOrganizationByNameUsecase,
      mockAnalyticsService,
      mockCrashlyticsService,
    );
  });

  it("should fetch user and update organization store on success", async () => {
    const mockParams = "name";
    const mockUsecaseResponse = { value: "organizaiton" };
    const mockPresenterResponse = {
      url: "string",
      description: "string",
      name: "string",
    }


    vi.spyOn(Organization, 'toPresenter').mockReturnValueOnce(mockPresenterResponse);

    mockGetOrganizationByNameUsecase.execute.mockResolvedValue(mockUsecaseResponse);

    await controller.getOrganizationByName(mockParams);

    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Get Organization By Name",
        from: "OrganizationController",
      }),
      expect.any(Function),
    );

    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(true);
    expect(Organization.toPresenter).toHaveBeenCalledWith(mockUsecaseResponse);
    expect(mockStore.getState().setValue).toHaveBeenCalledWith(mockPresenterResponse);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle error and report to crashlytics when getOrganizationByName fails", async () => {
    const mockError = new BaseError({ message: "error" });

    mockGetOrganizationByNameUsecase.execute.mockRejectedValue(mockError);

    await controller.getOrganizationByName("");

    expect(mockStore.getState().setError).toHaveBeenCalledWith(mockError);
    expect(mockCrashlyticsService.reportError).toHaveBeenCalledWith(mockError);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });
});
