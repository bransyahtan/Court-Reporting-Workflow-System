import { City, PrismaClient } from '@prisma/client';
import { ICityRepository } from '../interfaces/ICityRepository';
import prisma from '../config/database';

export class CityRepository implements ICityRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findPaginated(page: number, limit: number, search?: string): Promise<{ data: City[]; total: number }> {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.city.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: bigint): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<City, 'id' | 'created_at' | 'updated_at'>): Promise<City> {
    return this.prisma.city.create({
      data,
    });
  }
}
