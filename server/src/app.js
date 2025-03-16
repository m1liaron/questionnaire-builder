import express from 'express';
const app = express();
import cors from 'cors';
import { connectDB, sequelize } from "./db/sequelize.js";
import { quizRoute, questionRoute } from "./routers/routers.js";

app.use(express.json());
app.use(cors());

// routes
app.use("/quizzes", quizRoute);
app.use("/questions", questionRoute);

const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
        console.log("Database connected, attempting to sync models...");
        await sequelize.sync({ alter: true });

        app.listen(port, () => {
            console.log(`Server running on port: ${port}...`);
        })
    } catch (error) {
        console.error("Error starting server: ", error);
    }
})();