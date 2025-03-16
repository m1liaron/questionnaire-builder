import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

const Questionnaire = sequelize.define("Questionnaire", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            message: "Name is required",
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            message: "Description is required",
        }
    },
    amountOfCompletions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export { Questionnaire };