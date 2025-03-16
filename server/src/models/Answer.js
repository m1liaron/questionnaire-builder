import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { Question } from "./models.js";

const Answer = sequelize.define("Question", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRight: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Question,
            key: 'id',
        }
    }
}, {
    timestamps: true
});

export { Answer };