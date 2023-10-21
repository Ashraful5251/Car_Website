import express from "express";
import signin from "../controllers/signin.js";
import signup from "../controllers/signup.js";

const auth = express.Router();

auth.post("/signin", signin);
auth.post("/signup", signup);

export default auth;
