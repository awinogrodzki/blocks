export class IncorrectRelationshipError extends Error {
  constructor(message: string) {
    super(message);

    // A hack to allow "instanceof" operator to be used together with errors
    // https://stackoverflow.com/questions/55065742/implementing-instanceof-checks-for-custom-typescript-error-instances
    Object.setPrototypeOf(this, IncorrectRelationshipError.prototype);
  }
}

export class BlockNotFoundError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BlockNotFoundError.prototype);
  }
}

export class BlockAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BlockAlreadyExistsError.prototype);
  }
}
