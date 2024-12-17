import { createContainer } from "@evyweb/ioctopus";

import { DISymbol, DIValue } from "./symbols";
import { createServiceModule } from "src/shared/di/modules/service.module";
import { createControllerModule } from "src/shared/di/modules/controller.module";
import { createRepositoryModule } from "src/shared/di/modules/repository.module";
import { createUsecaseModule } from "src/shared/di/modules/usecase.module";

type InjectionSymbol = keyof typeof DISymbol;

class Injection {
  private container;

  constructor() {
    this.container = createContainer();
    this.loadModules();
  }

  private loadModules() {
    this.container.load(Symbol("ServicesModule"), createServiceModule());
    this.container.load(Symbol("RepositoryModule"), createRepositoryModule());
    this.container.load(Symbol("UsecaseModule"), createUsecaseModule());
    this.container.load(Symbol("ControllerModule"), createControllerModule());
  }

  public get<T extends InjectionSymbol>(key: T): DIValue[T] {
    return this.container.get(DISymbol[key]);
  }
}

const i = new Injection();

export { i };
