import { Question } from "./Question.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

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
		amountOfSelection: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
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
