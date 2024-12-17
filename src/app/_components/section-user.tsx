"use client";
import React, { useRef } from "react";
import { i } from "src/shared/di/container";
import UtilsForm from "src/shared/utils/utils-form";
import { UserControllerStore } from "src/layers/interface-adapters/controllers/user.controller";
import { Content } from "src/shared/ui/content";
import { Form } from "src/shared/ui/form";


export default function SectionUser() {
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = "githubUserName";
  const placeholder = "Github User Name (e.g: whosramoss)";

  const user = UserControllerStore.userStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const analyticsService = i.get("IAnalyticsService");
    analyticsService.setAnalytics(
      {
        name: "Get User By Name",
        from: SectionUser.name,
      },
      async () => {
        const value = UtilsForm.getFormDataByNameRef(e, nameRef);
        const controller = i.get("UserController");
        await controller.getUserByName(value);
        UtilsForm.setEmptyValueByInputRef(inputRef);
      },
    );
  };

  return (
    <Content.Data
      data={user}
      name={"User"}
      description={"Get information about a specific user on GitHub."}
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
