"use client";
import React, { useRef } from "react";
import { i } from "src/shared/di/container";
import UtilsForm from "src/shared/utils/utils-form";
import { GistControllerStore } from "src/layers/interface-adapters/controllers/gist.controller";
import { Content } from "src/shared/ui/content";
import { Form } from "src/shared/ui/form";

export default function SectionGist() {
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = "gist";
  const placeholder = "Github Gist Id (e.g: public)";

  const gist = GistControllerStore.gistStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const analyticsService = i.get("IAnalyticsService");
    analyticsService.setAnalytics(
      {
        name: "Get Gist By Id",
        from: SectionGist.name,
      },
      async () => {
        const value = UtilsForm.getFormDataByNameRef(e, nameRef);
        const controller = i.get("GistController");
        await controller.getGistById(value);
        UtilsForm.setEmptyValueByInputRef(inputRef);
      },
    );
  };

  return (
    <Content.Data
      data={gist}
      name={"Gist"}
      description={"Get information about a specific gist on GitHub."}
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
