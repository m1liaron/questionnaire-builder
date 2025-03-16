    import { DataTypes } from "sequelize";
    import { sequelize } from "../db/sequelize.js";
    import { Answer, Question, Result } from "./models.js";

    const ResultQuestion = sequelize.define("ResultQuestion", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        resultId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Result,
                key: 'id',
            }
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