import { Router } from "express";
import { getPlayground, createPlayground } from "../controller/chat-controller/createPlayground";
import authMiddleware from "../middleware/authMiddleware";

const projectRouter = Router();

projectRouter.post("/", createPlayground);
projectRouter.get("/", getPlayground);

