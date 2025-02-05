import { Request, Response } from "express";
import Patient from "../models/patient";
import { verifyEmail, verifyFields } from "../utils/patientUtils";
import { PatientType } from "../types/patient-type";
import sendEmail from "../services/email";

export const getPatients = async (req: Request, res: Response) => {
	const patients = await Patient.findAll();
	res.json(patients);
};

export const getPatient = async (req: Request, res: Response) => {
	const { id } = req.params;

	const patient = await Patient.findByPk(id);
	patient ? res.json(patient) : res.status(404).json({ msg: `Patient id: ${id} not found` });
};

export const createPatient = async (req: Request<{}, {}, PatientType>, res: Response) => {
	const { body } = req;

	try {
		const emailVerification = await verifyEmail(body.email);

		if (!verifyFields(body)) {
			res.status(400).json({ msg: "All fields are required" });
			return;
		}
		if (!emailVerification.status) {
			res.status(400).json({ msg: emailVerification.message });
			return;
		}

		const patient = Patient.build(body);
		await patient.save().catch((error) => {
			console.error(error);
			return res.status(500).json({
				msg: "An error has ocurred, please contact the administrator",
			});
		});
		setImmediate(async () => {
			try {
				await sendEmail();
			} catch (err) {
				console.error("Failed to send email:", err);
			}
		});
		res.json(patient);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: "An error has ocurred, please contact the administrator" });
	}
};

export const editPatient = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const patient = await Patient.findByPk(id);
		const emailVerification = await verifyEmail(body.email, id);
		if (!patient) {
			res.status(404).json({ msg: `Patient id: ${id} not found` });
			return;
		}
		if (!emailVerification.status) {
			res.status(400).json({ msg: emailVerification.message });
			return;
		}

		await patient.update(body);
		res.json(patient);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "An error has ocurred, please contact the administrator" });
	}
};

export const deletePatient = async (req: Request, res: Response) => {
	const { id } = req.params;

	const patient = await Patient.findByPk(id);
	if (!patient) {
		res.status(404).json({ msg: `Patient id: ${id} not found` });
		return;
	}
	// Normalmente, uno no elimina registros de la base de datos, sino que se les cambia el estado a "eliminado"
	// En este caso, se elimina el registro de la base de datos, ya que solo hay 1 tabla y no hay relaciones
	await patient.destroy();
	res.status(200).json({ msg: `Patient id: ${id} deleted` });
};
