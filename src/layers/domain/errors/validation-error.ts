import BaseError, { ErrorDetails } from "src/layers/domain/errors/base-error";

export default class ValidationError extends BaseError {
  status: number;
  name: string;
  type: string;
  errors: string[];

  constructor({
    status = 422,
    name = "ValidationError",
    message,
    type = "validation-error",
    errors = [],
  }: ErrorDetails) {
    super({ message });

    this.name = name;
    this.status = status;
    this.type = type;
    this.errors = errors;
  }
}
