export interface ErrorDetails {
  status?: number;
  name?: string;
  message: string;
  type?: string;
  errors?: string[];
}

export default class BaseError extends Error {
  status: number;
  name: string;
  type: string;
  errors: string[];

  constructor({
    status = 500,
    name = "BaseError",
    message,
    type = "base-error",
    errors = [],
  }: ErrorDetails) {
    super(message);

    this.name = name;
    this.status = status;
    this.type = type;
    this.errors = errors;
  }
}
