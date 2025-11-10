// ./src/exceptions/CustomErrors.ts
export class AppError extends Error {
  public statusCode: number;
  public errors?: string[];

  constructor(message: string, statusCode: number = 500, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundException extends AppError {
  constructor(message?: string) {
    super(message || 'Məlumat tapılmadı', 404);
  }
}

export class ValidationError extends AppError {
  constructor(errors: string[], message: string = 'Validasiya xətası') {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message?: string) {
    super(message || 'İcazə yoxdur', 401);
  }
}

export class BadRequestException extends AppError {
  constructor(message?: string) {
    super(message || 'Ugursuz emeliyyat', 400);
  }
}
