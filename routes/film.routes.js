import { Router } from "express";
import filmController from "../controller/film.controller.js";
const router = new Router()

router.post("/films", filmController.createFilm)
router.get("/films", filmController.getFilms)
router.get("/films/:id", filmController.getOneFilm)
router.put("/films", filmController.updateFilm)
router.delete("/films/:id", filmController.deleteFilm)

export default router