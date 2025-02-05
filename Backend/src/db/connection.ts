import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DATABASE_NAME as string;
const dbUser = process.env.DATABASE_USER as string;
const dbHost = process.env.DATABASE_HOST as string;
const dbPassword = process.env.DATABASE_PASSWORD as string;

const db = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	dialect: "mysql",
	// logging: false,
});

export const rootDB = new Sequelize("", dbUser, dbPassword, {
	host: dbHost,
	dialect: "mysql",
	// logging: false,
});

export default db;
