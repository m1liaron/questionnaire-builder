import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

const Quiz = sequelize.define(
	"Quiz",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Name is required",
				},
			},
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Description is required",
				},
			},
		},
		amountOfCompletions: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
	},
	{
		timestamps: true,
	},
);

export { Quiz };
