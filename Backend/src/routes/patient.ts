import { Router } from "express";
import { createPatient, deletePatient, editPatient, getPatient, getPatients } from "../controllers/patients";

const router = Router();

router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);
router.put("/:id", editPatient);
router.delete("/:id", deletePatient);

export default router;
