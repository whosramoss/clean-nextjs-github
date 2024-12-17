import { ISearchRepository } from "src/layers/application/interfaces/repositories/isearch.respository.interface";
import { IAnalyticsService } from "src/layers/application/interfaces/services/analytics.service.interface";
import { GetSearchByTopicsUsecase } from "src/layers/application/usecases/get-search-by-topic.usecase";
import ValidationError from "src/layers/domain/errors/validation-error";
import { Search } from "src/layers/domain/models/search-topics";
import { vi, describe, it, expect, beforeEach, assertType } from "vitest";

describe("GetSearchByTopicsUsecase", () => {
  let usecase: GetSearchByTopicsUsecase;
  let mockRepository: ISearchRepository;
  let mockService: IAnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getSearchTopics: vi.fn(),
    };

    mockService = {
      setAnalytics: vi.fn().mockImplementation((_, fn) => fn()),
    };

    usecase = new GetSearchByTopicsUsecase(mockRepository, mockService);
  });

  it("should call setAnalytics and getSearchTopics when execute is called with a valid topic", async () => {
    const topic = "google";
    mockRepository.getSearchTopics(topic);
    const result = await usecase.execute(topic);
    expect(mockService.setAnalytics).toHaveBeenCalledTimes(1);
    expect(mockRepository.getSearchTopics).toHaveBeenCalledWith(topic);
    assertType<typeof Search.model>(result);
  });

  it("should throw a ValidationError when topic is empty", async () => {
    const topic = "";
    await expect(usecase.execute(topic)).rejects.toThrowError(
      new ValidationError({ message: "topic empty" }),
    );
  });

  it("should throw an error if the topic is not found", async () => {
    const topic = "";
    mockRepository.getSearchTopics(topic);

    await expect(usecase.execute(topic)).rejects.toThrowError("topic empty");
  });
});
