// ./src/repositories/BaseRepository.ts
import { PrismaClient } from '../generated/prisma';

export class BaseRepository<TModel, TDelegate> {
  protected prisma: PrismaClient;
  protected model: TDelegate;

  constructor(model: TDelegate, prismaClient: PrismaClient) {
    this.prisma = prismaClient;
    this.model = model;
  }

  findAll(args?: any): Promise<TModel[]> {
    return (this.model as any).findMany(args);
  }

  findById(id: string, args?: any): Promise<TModel | null> {
    return (this.model as any).findUnique({
      where: { id },
      ...args,
    });
  }

  create(data: any, args?: any): Promise<TModel> {
    return (this.model as any).create({
      data,
      ...args,
    });
  }

  update(id: string, data: any, args?: any): Promise<TModel> {
    return (this.model as any).update({
      where: { id },
      data,
      ...args,
    });
  }
}
