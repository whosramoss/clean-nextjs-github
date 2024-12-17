import BaseError, { ErrorDetails } from "src/layers/domain/errors/base-error";

export default class UnauthorizedError extends BaseError {
  status: number;
  name: string;
  type: string;
  errors: string[];

  constructor({
    status = 401,
    name = "UnauthorizedError",
    message,
    type = "not-found-error",
    errors = [],
  }: ErrorDetails) {
    super({ message });

    this.name = name;
    this.status = status;
    this.type = type;
    this.errors = errors;
  }
}
