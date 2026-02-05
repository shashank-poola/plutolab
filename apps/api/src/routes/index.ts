import { Router } from "express";
import Userrouter from "./authRoute";
import authMiddleware from "../middleware/authMiddleware";
import projectRouter from "./projectRoute";

const mainRouter = Router();

mainRouter.use("/auth", authMiddleware, Userrouter);
mainRouter.use("/playground", authMiddleware, projectRouter);

export default mainRouter;