import {
  GistController,
  GistControllerStore,
} from "src/layers/interface-adapters/controllers/gist.controller";
import { vi, describe, it, expect, beforeEach } from "vitest";
import BaseError from "src/layers/domain/errors/base-error";
import { Gist } from "src/layers/domain/models/gist";

describe("GistController", () => {
  let controller: GistController;
  let mockGetGistByIdUsecase: any;
  let mockAnalyticsService: any;
  let mockCrashlyticsService: any;
  let mockStore: any;

  beforeEach(() => {
    mockGetGistByIdUsecase = {
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

    GistControllerStore.gistStore = mockStore;

    controller = new GistController(
      mockGetGistByIdUsecase,
      mockAnalyticsService,
      mockCrashlyticsService,
    );
  });

  it("should fetch user and update gist store on success", async () => {
    const mockParam = "id";
    const mockUsecaseResponse = { value: "gist" };
    const mockPresenterResponse = {
      urlHtml: "string",
      urlOwner: "string",
    }


    vi.spyOn(Gist, 'toPresenter').mockReturnValueOnce(mockPresenterResponse);

    mockGetGistByIdUsecase.execute.mockResolvedValue([mockUsecaseResponse]);

    await controller.getGistById(mockParam);

    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "GetGist By Id",
        from: "GistController",
      }),
      expect.any(Function),
    );

    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(true);
    expect(Gist.toPresenter).toHaveBeenCalledWith(mockUsecaseResponse);
    expect(mockStore.getState().setValue).toHaveBeenCalledWith([mockPresenterResponse]);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle error and report to crashlytics when getGistById fails", async () => {
    const mockError = new BaseError({ message: "error" });

    mockGetGistByIdUsecase.execute.mockRejectedValue(mockError);

    await controller.getGistById("");

    expect(mockStore.getState().setError).toHaveBeenCalledWith(mockError);
    expect(mockCrashlyticsService.reportError).toHaveBeenCalledWith(mockError);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });
});
