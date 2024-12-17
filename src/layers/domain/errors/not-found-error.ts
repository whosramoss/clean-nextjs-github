import BaseError, { ErrorDetails } from "src/layers/domain/errors/base-error";

export default class NotFoundError extends BaseError {
  status: number;
  name: string;
  type: string;
  errors: string[];

  constructor({
    status = 404,
    name = "NotFoundError",
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
