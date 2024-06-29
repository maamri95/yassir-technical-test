export class UseCaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UseCaseError';
  }
}

export class UseCaseNotFoundError extends UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'UseCaseNotFoundError';
  }
}

export class UseCaseValidationError extends UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'UseCaseValidationError';
  }
}