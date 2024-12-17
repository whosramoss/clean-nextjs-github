"use client";
import React, { useRef } from "react";
import { i } from "src/shared/di/container";
import UtilsForm from "src/shared/utils/utils-form";
import { OrganizationControllerStore } from "src/layers/interface-adapters/controllers/organization.controller";
import { Content } from "src/shared/ui/content";
import { Form } from "src/shared/ui/form";

export default function SectionOrganization() {
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = "organization";
  const placeholder = "Github Organization Name (e.g: google)";

  const org = OrganizationControllerStore.orgStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const analyticsService = i.get("IAnalyticsService");
    analyticsService.setAnalytics(
      {
        name: "Get Organization By Name",
        from: SectionOrganization.name,
      },
      async () => {
        const value = UtilsForm.getFormDataByNameRef(e, nameRef);
        const controller = i.get("OrganizationController");
        await controller.getOrganizationByName(value);
        UtilsForm.setEmptyValueByInputRef(inputRef);
      },
    );
  };

  return (
    <Content.Data
      data={org}
      name={"Organization"}
      description={"Get information about a specific organization on GitHub."}
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
