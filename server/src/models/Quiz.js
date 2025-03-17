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
				len: [5, 30],
				notNull: {
					msg: "Name is required",
				},
			},
			unique: {
				msg: "Name is already exist",
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [10, 90],
				notEmpty: {
					msg: "Description is required",
				},
			},
		},
		questionsAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		amountOfCompletions: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		timestamps: true,
	},
);

export { Quiz };
