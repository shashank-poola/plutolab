import { Router } from "express";
import { getPlayground, createPlayground } from "../controller/project-controller/createPlayground";
import authMiddleware from "../middleware/authMiddleware";

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post("/", createPlayground);
projectRouter.get("/", getPlayground);

export default projectRouter;