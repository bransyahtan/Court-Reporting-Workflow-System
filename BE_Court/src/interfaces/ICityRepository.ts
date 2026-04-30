import { City } from '@prisma/client';

export interface ICityRepository {
  findPaginated(page: number, limit: number, search?: string): Promise<{ data: City[]; total: number }>;
  findById(id: bigint): Promise<City | null>;
  create(data: Omit<City, 'id' | 'created_at' | 'updated_at'>): Promise<City>;
}
