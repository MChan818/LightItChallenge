import Patient from "../models/patient";
import { PatientType } from "../types/patient-type";
import { VerificationStatus } from "../types/verification-status";

export const verifyFields = (body: PatientType) => {
	const { name, email, phone, address } = body;
	return name && email && phone && address;
};

export const verifyGmail = (email: string): VerificationStatus => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
	return emailRegex.test(email)
		? { status: true, message: "" }
		: { status: false, message: "Only gmail accounts are allowed" };
};

export const verifyUniqueEmail = async (
	email: string,
	id?: string,
): Promise<VerificationStatus> => {
	const existsEmail = await Patient.findOne({ where: { email } });
	if (id && existsEmail && existsEmail.getDataValue("id") == id) {
		return { status: true, message: "" };
	}
	return existsEmail
		? { status: false, message: `${email} is already registered` }
		: { status: true, message: "" };
};

export const verifyEmail = async (email: string, id?: string): Promise<VerificationStatus> => {
	if (!email) return { status: true, message: "" };

	const emailVerification = await verifyUniqueEmail(email, id);
	const gmailVerification = verifyGmail(email);

	return {
		status: emailVerification.status && gmailVerification.status,
		message: gmailVerification.message || emailVerification.message,
	};
};
