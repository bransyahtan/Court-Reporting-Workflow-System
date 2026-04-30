import { Request, Response } from 'express';
import { CityService } from '../services/CityService';

export class CityController {
  constructor(private cityService: CityService) {}

  async index(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;

      const { data, total } = await this.cityService.getAllCities(page, limit, search);
      
      res.json({
        status: 'success',
        data,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: (error as Error).message,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await this.cityService.getCityById(BigInt(id as string));
      
      if (!city) {
        return res.status(404).json({
          status: 'error',
          message: 'City not found',
        });
      }

      res.json({
        status: 'success',
        data: city,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: (error as Error).message,
      });
    }
  }
}
