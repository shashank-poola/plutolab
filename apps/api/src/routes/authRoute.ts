import { Router } from "express";
import signInController from "../controller/user-controller/signInController";
import checkController from "../controller/user-controller/checkController";

const router = Router();

router.get("/health", checkController);

router.post("/signin", signInController);

export default router;