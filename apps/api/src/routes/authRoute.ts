import { Router } from "express";
import signInController from "../controller/user-controller/signInController";
import checkController from "../controller/user-controller/checkController";

const Userrouter = Router();

Userrouter.get("/health", checkController);
Userrouter.post("/signin", signInController);

export default Userrouter;