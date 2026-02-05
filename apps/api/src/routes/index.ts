import { Router } from "express";
import Userrouter from "./authRoute";
import authMiddleware from "../middleware/authMiddleware";

const mainRouter = Router();

mainRouter.use("/auth", authMiddleware, Userrouter)

export default mainRouter;