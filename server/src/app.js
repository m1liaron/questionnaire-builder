import express from 'express';
const app = express();

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