import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { Question } from "./models.js";

const Answer = sequelize.define(
	"Answer",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isCorrect: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		questionId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Question,
				key: "id",
			},
			validate: {
				notEmpty: {
					msg: "QuestionId must be not empty",
				},
			},
			onDelete: "CASCADE",
		},
	},
	{
		timestamps: true,
	},
);

export { Answer };
