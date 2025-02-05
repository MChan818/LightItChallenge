import { DataTypes } from "sequelize";
import db from "../db/connection";

const Patient = db.define("Patient", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	photo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

export default Patient;
