import type { Request, Response, NextFunction } from 'express';
import type { ResponseDto } from '../dtos/responseDto';
import { AppError } from '../exceptions/customExceptions';
import configurator from '../config/';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let response: ResponseDto;

  if (err instanceof AppError) {
    // Custom error
    response = {
      isSuccess: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [err.message],
    };
  } else {
    // Gözlənilməyən error
    response = {
      isSuccess: false,
      statusCode: 500,
      message: 'Daxili server xətası',
      errors: [
        configurator.serverConfig.nodeEnv === 'development'
          ? err.message
          : 'Gözlənilməz xəta baş verdi',
      ],
    };
  }

  res.status(response.statusCode).json(response);
};
