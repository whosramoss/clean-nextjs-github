import { IEventRepository } from "src/layers/application/interfaces/repositories/ievent.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { GetEventsUsecase } from "src/layers/application/usecases/get-events.usecase";
import { Event } from "src/layers/domain/models/event";
import { vi, describe, it, expect, beforeEach, assertType } from "vitest";

describe("GetEventsUsecase", () => {
  let usecase: GetEventsUsecase;
  let mockRepository: IEventRepository;
  let mockService: IAnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getEvents: vi.fn(),
    };

    mockService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    usecase = new GetEventsUsecase(mockRepository, mockService);
  });

  it("should call setAnalytics and getEvents ", async () => {
    mockRepository.getEvents();
    const result = await usecase.execute();
    expect(mockService.setAnalytics).toHaveBeenCalledTimes(1);
    assertType<typeof Event.model[]>(result);
  });
});
