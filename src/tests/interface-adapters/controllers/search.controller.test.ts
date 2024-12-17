import { vi, describe, it, expect, beforeEach } from "vitest";
import BaseError from "src/layers/domain/errors/base-error";
import {
  SearchController,
  SearchControllerStore,
} from "src/layers/interface-adapters/controllers/search.controller";
import { Search } from "src/layers/domain/models/search-topics";

describe("SearchController", () => {
  let controller: SearchController;
  let mockGetSearchByTopicsUsecase: any;
  let mockAnalyticsService: any;
  let mockCrashlyticsService: any;
  let mockStore: any;

  beforeEach(() => {
    mockGetSearchByTopicsUsecase = {
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

    SearchControllerStore.searchStore = mockStore;

    controller = new SearchController(
      mockGetSearchByTopicsUsecase,
      mockAnalyticsService,
      mockCrashlyticsService,
    );
  });

  it("should fetch user and update search store on success", async () => {
    const mockParam = "topic";
    const mockUsecaseResponse = { value: "search" };
    const mockPresenterResponse = {
      count: 0,
      incomplete_results: true,
      items: []
    }

    vi.spyOn(Search, 'toPresenter').mockReturnValueOnce(mockPresenterResponse);

    mockGetSearchByTopicsUsecase.execute.mockResolvedValue(mockUsecaseResponse);

    await controller.getSearchByTopic(mockParam);

    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Get Search By Topics",
        from: "SearchController",
      }),
      expect.any(Function),
    );

    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(true);
    expect(Search.toPresenter).toHaveBeenCalledWith(mockUsecaseResponse);
    expect(mockStore.getState().setValue).toHaveBeenCalledWith(mockPresenterResponse);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle error and report to crashlytics when getSearchByTopic fails", async () => {
    const mockError = new BaseError({ message: "error" });

    mockGetSearchByTopicsUsecase.execute.mockRejectedValue(mockError);

    await controller.getSearchByTopic("");

    expect(mockStore.getState().setError).toHaveBeenCalledWith(mockError);
    expect(mockCrashlyticsService.reportError).toHaveBeenCalledWith(mockError);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });
});
