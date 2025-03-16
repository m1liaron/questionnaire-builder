import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

const Result = sequelize.define("Result", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    }
}, {
    timestamps: true
});

export { Result };