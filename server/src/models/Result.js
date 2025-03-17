import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import {Quiz} from "./Quiz.js";

const Result = sequelize.define(
	"Result",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		quizId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Quiz,
				key: "id",
			}
		}
	},
	{
		timestamps: true,
	},
);

export { Result };
