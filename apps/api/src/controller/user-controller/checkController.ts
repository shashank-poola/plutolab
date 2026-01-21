import type { Request, Response } from "express";

export default function checkController(req: Request, res: Response) {
    res.json({ status: "ok - plutolab" });
}

export function meController(req: Request, res: Response) {
    res.json({ user: req.user });
}