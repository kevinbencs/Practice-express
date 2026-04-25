import  express, {urlencoded}  from "express";
import { PORT } from "./config/config.ts";
import router from "./routes/routes.ts";



const app = express();


app.use(urlencoded({ extended: true }));

app.use(express.json({
    type: ['application/json', 'text/plain'],
    limit: '1mb'
}));


app.use(router)
const server = app.listen(PORT, () => {
    console.log("Server is running on the " + PORT)
})



process.on("SIGTERM", () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log("Server closed")
    })
})