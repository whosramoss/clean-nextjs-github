"use client";
import React from "react";
import { i } from "src/shared/di/container";
import { EventControllerStore } from "src/layers/interface-adapters/controllers/event.controller";
import { Content } from "src/shared/ui/content";
import { Form } from "src/shared/ui/form";

export default function SectionEvents() {
  const event = EventControllerStore.eventStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const analyticsService = i.get("IAnalyticsService");
    analyticsService.setAnalytics(
      {
        name: "Get Events",
        from: SectionEvents.name,
      },
      async () => {
        const controller = i.get("EventController");
        await controller.getEvents();
      },
    );
  };

  return (
    <Content.Data
      data={event}
      name={"Event"}
      description={"Get events on GitHub."}
    >
      <Form.Root
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <p className="text-base items-center">
          No params
        </p>
        <Form.Button type="submit">
          Send
        </Form.Button>
      </Form.Root>
    </Content.Data>
  )
}
