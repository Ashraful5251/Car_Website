import express from "express";
import cors from "cors";
import "dotenv/config";
import auth from "./routes/auth.js";
import item from "./routes/item.js";
import appu from "./controllers/appu.js";

const app = express();
const port = process.env.PORT || 0;

app.use(express.json());
app.use(cors());


app.use("/auth", auth);
app.use("/item", item);
app.get("/", appu);

app.listen(port);
