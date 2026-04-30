import { ICityRepository } from '../interfaces/ICityRepository';

export class CityService {
  constructor(private cityRepository: ICityRepository) {}

  async getAllCities(page: number, limit: number, search?: string) {
    return this.cityRepository.findPaginated(page, limit, search);
  }

  async getCityById(id: bigint) {
    return this.cityRepository.findById(id);
  }
}
