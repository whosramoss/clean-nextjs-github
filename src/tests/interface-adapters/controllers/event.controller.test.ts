import {
  EventController,
  EventControllerStore,
} from "src/layers/interface-adapters/controllers/event.controller";
import { vi, describe, it, expect, beforeEach } from "vitest";
import BaseError from "src/layers/domain/errors/base-error";
import { Event } from "src/layers/domain/models/event";

describe("EventController", () => {
  let controller: EventController;
  let mockGetEventsUsecase: any;
  let mockAnalyticsService: any;
  let mockCrashlyticsService: any;
  let mockStore: any;

  beforeEach(() => {
    mockGetEventsUsecase = {
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

    EventControllerStore.eventStore = mockStore;

    controller = new EventController(
      mockGetEventsUsecase,
      mockAnalyticsService,
      mockCrashlyticsService,
    );
  });

  it("should fetch events and update event store on success", async () => {
    const mockUsecaseResponse = { value: "event" };
    const mockPresenterResponse = {
      type: "string",
      actor: "string",
    };

    vi.spyOn(Event, 'toPresenter').mockReturnValueOnce(mockPresenterResponse);

    mockGetEventsUsecase.execute.mockResolvedValue([mockUsecaseResponse]);

    await controller.getEvents();

    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockAnalyticsService.setAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Get Events",
        from: "EventController",
      }),
      expect.any(Function),
    );

    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(true);
    expect(Event.toPresenter).toHaveBeenCalledWith(mockUsecaseResponse);
    expect(mockStore.getState().setValue).toHaveBeenCalledWith([mockPresenterResponse]);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle error and report to crashlytics when getEvents fails", async () => {
    const mockError = new BaseError({ message: "error" });

    mockGetEventsUsecase.execute.mockRejectedValue(mockError);

    await controller.getEvents();

    expect(mockStore.getState().setError).toHaveBeenCalledWith(mockError);
    expect(mockCrashlyticsService.reportError).toHaveBeenCalledWith(mockError);
    expect(mockStore.getState().setLoading).toHaveBeenCalledWith(false);
  });
});
