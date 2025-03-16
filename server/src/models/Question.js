import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { Questionnaire } from "./models.js";

const Question = sequelize.define("Question", {
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
            model: Questionnaire,
            key: 'id',
        }
    }
}, {
    timestamps: true
});

export { Question };