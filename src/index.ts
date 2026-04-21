import  express  from "express";
import { PORT } from "./config/config.ts";


const app = express();


const server = app.listen(PORT, () => {
    console.log("Server is running on the " + PORT)
})

process.on("SIGTERM", () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log("Server closed")
    })
})