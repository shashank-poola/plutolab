import { Router } from "express";
import signInController from "../controller/user-controller/signInController";
import checkController, { meController } from "../controller/user-controller/checkController";

const router = Router();

router.get("/health", checkController);

router.get("/me", meController)

router.post("/signin", signInController);

export default router;