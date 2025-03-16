import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { Answer, Question } from "./models.js";

const ResultQuestion = sequelize.define("Result", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Question,
            key: 'id',
        },
    },
    answerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Answer,
            key: 'id',
        },
    }
}, {
    timestamps: true
});

export { ResultQuestion };