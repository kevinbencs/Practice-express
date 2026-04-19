import  express  from "express";
import { PORT } from "./config/config.ts";


const app = express();


app.listen(PORT, () => {
    console.log("Server is running on the " + PORT)
})