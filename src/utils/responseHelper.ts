// ./src/utils/responseHelper.ts
import type { Response } from 'express';
import type { ResponseDto } from '../dtos/responseDto';

export class ResponseHelper {
  static success(res: Response, data?: any, message?: string, statusCode: number = 200): void {
    const response: ResponseDto = {
      isSuccess: true,
      statusCode,
      message,
      data,
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, errors?: string[], statusCode: number = 500): void {
    const response: ResponseDto = {
      isSuccess: false,
      statusCode,
      message,
      errors,
    };
    res.status(statusCode).json(response);
  }
}
