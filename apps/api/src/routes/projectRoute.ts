import { Router } from "express";
import { getPlayground, createPlayground, getPlaygroundById } from "../controller/project-controller/createPlayground";
import authMiddleware from "../middleware/authMiddleware";
import { startPlaygroundChat } from "../controller/chat-controller/startChat";

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post("/", createPlayground);
projectRouter.get("/", getPlayground);
projectRouter.get("/:PlaygroundId", getPlaygroundById);
projectRouter.post("/:PlaygroundId/chat", startPlaygroundChat);

export default projectRouter;