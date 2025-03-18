import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: "postgres", 
		logging: console.log,
		dialectOptions: {
			ssl: {
				require: true, 
				rejectUnauthorized: false, 
			},
		},
	},
);

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅ Connection to PostgreSQL has been established successfully.");
	} catch (error) {
		console.error("❌ Unable to connect to PostgreSQL:", error);
	}
};

export { sequelize, connectDB };
