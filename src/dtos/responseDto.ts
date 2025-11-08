// ./src/dtos/ResponseDto.ts
export interface ResponseDto<T = any> {
  isSuccess: boolean;
  statusCode: number;
  errors?: string[];
  message?: string;
  data?: T;
}
