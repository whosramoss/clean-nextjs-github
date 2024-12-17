"use client"
import React from "react";
import { Icon } from "src/shared/ui/icon";
import { Content } from "src/shared/ui/content";
import ButtonTheme from "src/shared/ui/buttons/button-theme";
import SectionUser from "src/app/_components/section-user";
import SectionGist from "src/app/_components/section-gist";
import SectionOrganization from "src/app/_components/section-organization";
import SectionEvents from "src/app/_components/section-events";
import SectionSearch from "src/app/_components/section-search";
import LinkButton from "src/shared/ui/buttons/button-link";


export default function HomePage() {
  return (
    <Content.Root className="mt-20">
      <Content.Box className="sm:col-span-6 col-span-12 ">
        <div className="flex flex-row items-center">
          <Icon className="hidden sm:block rounded-full mix-blend-difference " width={"96"} height={"96"} />
          <div className="mx-2" />
          <div className="flex flex-col font-semibold leading-tight text-black">
            <h1 className="text-6xl">Github API</h1>
            <h1 className="text-base">with Clean Architecture</h1>
          </div>
        </div>
      </Content.Box>
      <Content.Box className="col-span-6  hidden sm:block">
        <ButtonTheme className="float-right items-center" />
      </Content.Box>
      <Content.Space />
      <Content.Box className="col-span-12 sm:col-span-6 text-default ">
        The GitHub API,
        is a powerful RESTful web service that
        allows developers to interact programmatically with GitHub's platform.
        It provides a wide range of endpoints for accessing and manipulating
        data stored on GitHub, such as repositories, issues, pull requests,
        users, organizations, and more.
      </Content.Box>
      <Content.Box className="col-span-12 sm:col-span-6 text-default ">
        With both REST and GraphQL options, the GitHub API (<LinkButton title="https://api.github.com" href="https://api.github.com" />) allows developers
        to retrieve only the data they need, ensuring efficiency.
      </Content.Box>
      <Content.Space hasBoder />
      <Content.Title>
        Clean Architecture
      </Content.Title>
      <Content.Box className="col-span-12 sm:col-span-6 text-default ">
        Software design principle focused on organizing the
        code to improve maintainability, testability, and flexibility by
        clearly defining the responsibilities of different components.
        When applied to an application using the GitHub API,
        it ensures that the core business logic remains independent of external systems like the API.
      </Content.Box>
      <Content.Box className="col-span-12 sm:col-span-6 text-default ">
        This allows for easier updates, testing, and modifications, as changes to the API or
        other external dependencies do not directly impact the core logic. The approach promotes a modular
        and extensible design, making the application easier to maintain and scale over time.
      </Content.Box>
      <Content.Box className="col-span-12 text-6xl font-semibold leading-tight ">
        <img src="./clean-arch.png" alt={"clean-arch"} />
      </Content.Box>
      <Content.Space hasBoder />
      <Content.Title>
        Endpoints
      </Content.Title>
      <SectionUser />
      <SectionGist />
      <SectionOrganization />
      <SectionEvents />
      <SectionSearch />
      <Content.Box className="col-span-12 ">
        <Icon className="rounded-full mx-auto flex items-center mix-blend-difference" width={"50"} height={"50"} />
      </Content.Box>
    </Content.Root>
  );
};
