import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { Quiz } from "./models.js";

const Question = sequelize.define(
	"Question",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quizId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Quiz,
				key: "id",
			},
			validate: {
				notEmpty: {
					msg: "Quiz id must be not empty"
				}
			},
			onDelete: "CASCADE"
		},
		type: {
			type: DataTypes.ENUM("Text", "Single Choice", "Multiple Choices"),
			allowNull: false,
			defaultValue: "Text",
			validate: {
				notEmpty: {
					msg: "Type Must be not empty"
				}
			}
		},
	},
	{
		timestamps: true,
	},
);

export { Question };
