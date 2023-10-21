import express from "express";
import addcart from "../controllers/addcart.js";
import getcart from "../controllers/getcart.js";
import deletecart from "../controllers/deletecart.js";

const item = express.Router();

item.put("/addcart", addcart);
item.get("/getcart", getcart);
item.delete("/deletecart", deletecart);

export default item;
