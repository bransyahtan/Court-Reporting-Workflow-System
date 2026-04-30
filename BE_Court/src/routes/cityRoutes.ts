import { Router } from "express";
import { CityController } from "../controllers/CityController";
import { CityRepository } from "../repositories/CityRepository";
import { CityService } from "../services/CityService";

const router = Router();

const cityRepository = new CityRepository();
const cityService = new CityService(cityRepository);
const cityController = new CityController(cityService);

router.get("/", (req, res) => cityController.index(req, res));
router.get("/:id", (req, res) => cityController.show(req, res));

export default router;
