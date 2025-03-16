import express from 'express';
const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

(async () => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}...`);
        })
    } catch (error) {
        console.error("Error starting server: ", error);
    }
})();