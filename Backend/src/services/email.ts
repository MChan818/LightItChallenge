import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.MAILTRAP_HOST,
	port: 2525,
	secure: false,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PASS,
	},
});

transporter.verify(function (error, success) {
	if (error) {
		console.log("Connection error: ", error);
	} else {
		console.log("Server is ready to take our messages");
	}
});

const sendEmail = () => {
	const mailOptions = {
		from: "testuser@gmail.com",
		to: process.env.MAILTRAP_RECEIVER,
		subject: "Bienvenido!",
		text: "Gracias por registrarte en nuestra plataforma",
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Error:", error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};
export default sendEmail;
