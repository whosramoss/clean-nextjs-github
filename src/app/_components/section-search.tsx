"use client";
import React, { useRef } from "react";
import { i } from "src/shared/di/container";
import UtilsForm from "src/shared/utils/utils-form";
import { SearchControllerStore } from "src/layers/interface-adapters/controllers/search.controller";
import { Content } from "src/shared/ui/content";
import { Form } from "src/shared/ui/form";

export default function SectionSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = "search";
  const placeholder = "Github Search By Topic (e.g: google)";

  const searh = SearchControllerStore.searchStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const analyticsService = i.get("IAnalyticsService");
    analyticsService.setAnalytics(
      {
        name: "Get Search By Topic",
        from: SectionSearch.name,
      },
      async () => {
        const value = UtilsForm.getFormDataByNameRef(e, nameRef);
        const controller = i.get("SearchController");
        await controller.getSearchByTopic(value);
        UtilsForm.setEmptyValueByInputRef(inputRef);
      },
    );
  };


  return (
    <Content.Data
      data={searh}
      name={"Searh"}
      description={"Searh information about a specific topic on GitHub."}
    >
      <Form.Root
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <Form.Input
          ref={inputRef}
          name={nameRef}
          placeholder={placeholder}
        />
        <Form.Button type="submit">
          Send
        </Form.Button>
      </Form.Root>
    </Content.Data>
  )
}
