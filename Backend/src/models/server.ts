import express, { Application } from "express";
import dotenv from "dotenv";
import patientRoutes from "../routes/patient";
import cors from "cors";
import db, { rootDB } from "../db/connection";
import path from "path";
import fs from "fs";

dotenv.config();

class Server {
	private app: Application;
	private port: string | number;
	private apiPaths = {
		patients: "/api/patients",
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	routes() {
		this.app.use(this.apiPaths.patients, patientRoutes);
	}

	async dbConnection() {
		try {
			console.log("⏳ Inicializando la base de datos...");
			await rootDB.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME};`);
			await rootDB.close();
			console.log("✅ Base de datos creada/verificada.");

			await db.authenticate();
			console.log("✅ Conexión establecida con la base de datos.");

			await db.sync();
			console.log("✅ Modelos sincronizados.");

			console.log("🚀 Database online.");
		} catch (error) {
			console.log(error);
			throw new Error(error as string);
		}
	}

	middlewares() {
		this.app.use(
			cors({
				origin: "*",
				methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
				allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
			}),
		);
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

export default Server;
