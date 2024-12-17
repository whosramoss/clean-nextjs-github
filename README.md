<a href="https://github.com/whosramoss/clean-nextjs-github">
  <img alt="clean-nextjs-github" src="./public/thumbnail.png" />
  <h1 align="center">Clean Nextjs Github</h1>
</a>

<p align="center">
  Project implementing clean architecture consuming data from Github Api with NextJs
</p>

<div align="center">
  <img src="https://img.shields.io/badge/next.js-242424?style=for-the-badge&logo=nextdotjs" alt="Website">
  <img src="https://img.shields.io/badge/React-563D7C?style=for-the-badge&logo=React&logoColor=fff" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-FEFEFE?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&logo=typescript&logoColor=fff" alt="TypeScript">
  <img src="https://img.shields.io/badge/Framer%20Motion-CC6699?style=for-the-badge&logo=framer" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Prettier-242424?style=for-the-badge&logo=prettier" alt="Prettier">
  <img src="https://img.shields.io/badge/eslint-0170FE?style=for-the-badge&logo=eslint" alt="eslint">
  <img src="https://img.shields.io/badge/zod-242424?style=for-the-badge&logo=zod" alt="zod">
  <img src="https://img.shields.io/badge/vitest-242424?style=for-the-badge&logo=vitest" alt="vitest">
  <img src="https://img.shields.io/badge/zustand-242424?style=for-the-badge&logo=React" alt="zustand">
</div>
<br/>

<br/>



## How to install

```bash
  # Clone the project
  git clone https://github.com/whosramoss/clean-nextjs-github/

  # Go to the project directory
  cd clean-nextjs-github

  # Install dependencies
  npm install

  # Start the server 
  npm run dev
```

## About GitHub API
The GitHub API (https://api.github.com), is a powerful RESTful web service that allows developers to interact programmatically with GitHub's platform. It provides a wide range of endpoints for accessing and manipulating data stored on GitHub, such as repositories, issues, pull requests, users, organizations, and more.
With both REST and GraphQL options, the api allows developers to retrieve only the data they need, ensuring efficiency.

The following API endpoints are being used in the project. Each route corresponds to a specific action within the system :

|  Name | Purpose | Method | Params |
|---|---|---|---|
|/events|Get events|GET|No Params|
|/orgs|Get information about a specific organization|GET|Organization Name  (e.g.: [/orgs/google](https://api.github.com/orgs/google))|
|/gists|Get information about a specific gist|GET|Gist Id - (e.g.: [/gists/public](https://api.github.com/gists/public))|
|/search/topics|Searh information about a specific topic|GET|Topic Name - (e.g.: [/topics?q=google](https://api.github.com/search/topics?q=google))|
|/users|Get information about a specific user|GET|User Name - (e.g.: [/users/whosramoss](https://api.github.com/users/whosramoss))|

## About Clean Architecture
Software design principle focused on organizing the code to improve maintainability, testability, and flexibility by clearly defining the responsibilities of different components. When applied to an application using the GitHub API, it ensures that the core business logic remains independent of external systems like the API.

This allows for easier updates, testing, and modifications, as changes to the API or other external dependencies do not directly impact the core logic. The approach promotes a modular and extensible design, making the application easier to maintain and scale over time.


##  Layers and Structs
Following the Clean Architecture principles, we separate our project into 4 layers inside the [layers](./src/layers/) folder:

|  Name | Contains  | Purpose |
|---|---|---|
|[interface-adapters](./src/layers/interface-adapters/)|[controllers](./src/layers/interface-adapters/controllers)|The layer translates data between the core business logic and the UIs. It implements controllers to adapt data returned by the usecases into usable formats.|
|[application](./src/layers/application/)|[interfaces](./src/layers/application/interfaces) & [usecases](./src/layers/application/usecases)|Contains the usecases that define the application's business processes and workflows. Usecases may also need data from external sources, so they interact with repositories or services implemented in the infrastructure layer to fulfill specific requirements.|
|[infrastructure](./src/layers/infrastructure/)|[repositories](./src/layers/infrastructure/repositories) & [services](./src/layers/infrastructure/services)|The layer provides the implementation details for external systems like databases, APIs, and file storage. It's responsible for managing communication with external services and ensuring the core logic remains decoupled from specific technologies.|
|[domain](./src/layers/domain/)|[errors](./src/layers/domain/errors) & [models](./src/layers/domain/models)|Contains models, schemas and errors that drive the system's behavior.|

You can explore the entire data search process, layer by layer, through the graph below:

<a href="https://github.com/whosramoss/clean-nextjs-github/blob/public/clean-arch.png">
  <img alt="clean-nextjs-github" src="https://github.com/whosramoss/clean-nextjs-github/blob/main/public/clean-arch.png" />
</a>


## Overhead Structure View
- [src](./src/)
  - [app](./src/app/)
    - [_components](./src/app/_components)
  - [layers](./src/layers/)
    - [application](./src/layers/application/) 
      - [interfaces](./src/layers/application/interfaces) 
      - [usecases](./src/layers/application/usecases) 
    - [domain](./src/layers/domain/)
      - [errors](./src/layers/domain/errors) 
      - [models](./src/layers/domain/models) 
    - [infrastructure](./src/layers/infrastructure/)
      - [repositories](./src/layers/infrastructure/repositories) 
      - [services](./src/layers/infrastructure/services)  
    - [interface-adapters](./src/layers/interface-adapters/)
      - [controllers](./src/layers/interface-adapters/controllers)  
  - [shared](./src/shared/)
    - [di](./src/shared/di/) - (using [ioctopus](https://github.com/Evyweb/ioctopus)  as dependency injection)
    - [hooks](./src/shared/hooks/)
    - [providers](./src/shared/providers/)
    - [ui](./src/shared/ui/)
    - [utils](./src/shared/utils/) 
  - [tests](./src/tests/)



## Framework and Packages 
- [Next.js](https://nextjs.org/) 
- [TypeScript](https://www.typescriptlang.org/) 
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [Framer Motion](https://framer.com/motion) 
- [Zod](https://zod.dev/) 
- [Vitest](https://vitest.dev/) 
- [ioctopus](https://github.com/Evyweb/ioctopus) 


# Screenshoots
|   |   |
|---|---|
|  ![](./public/screenshoots/1.png) | ![](./public/screenshoots/2.png)  |
|  ![](./public/screenshoots/3.png) | ![](./public/screenshoots/4.png)  |



## Contributing 
If you want to contribute to `clean-nextjs-github`, please make sure to review the [contribution guidelines](https://github.com/whosramoss/clean-nextjs-github/blob/master/CONTRIBUTING.md). This project makes use of [GitHub issues](https://github.com/whosramoss/clean-nextjs-github/issues) for
tracking requests and bugs.

## License 

MIT License. [LICENSE](./LICENSE)

## Author 

Gabriel Ramos ([@whosramoss](https://github.com/whosramoss))

