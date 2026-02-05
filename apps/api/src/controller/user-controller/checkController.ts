import type { Request, Response } from "express";

export default function checkController(req: Request, res: Response) {
    res.status(200).json({
        "success": true,
        "data": "Health is OK",
        "error": null
    })
    return;
}

export function meController(req: Request, res: Response) {
    res.json({ user: req.user });
}