import express from "express";
import type { Request, Response } from "express";
import { ExpressAuth } from "@auth/express";
import { Primsa } from "@repo/database";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function signInController(req: Request, res: Response) {
    const { user, account } = req.body;

    try {
        const provider = account?.provider;
        
    }
}