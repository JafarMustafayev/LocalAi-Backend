// ./src/dtos/ResponseDto.ts
export interface ResponseDto {
  isSuccess: boolean;
  statusCode: number;
  errors?: string[];
  message?: string;
  data?: any;
}
