import type { Request, Response } from "express";
import { projectSchema } from "../../schema/projectSchema";
import { db } from "@repo/database";

export const createPlayground = async ( req: Request, res: Response ) => {
    try {
        const user = req.user?.id

        if (!user) {
            res.status(403).json({
                success: false,
                data: null,
                error: "Unauthorized"
            })
            return;
        }

        const { success, data } = projectSchema.safeParse(req.body);

        if (!success) {
            res.status(401).json({
                success: false,
                data: null,
                error: "All fields are required"
            })
            return;
        }

        const { title, initialPrompt, userId} = data 

        const project = await db.project.create({
            data: {
                title,
                initialPrompt,
                userId,
            },
        });

        return res.status(201).json({
            success: true,
            data: project,
            error: null,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: "INTERNAL_SERVER_ERROR"
        })
        return;
    }
};

export const getPlayground = async ( req: Request, res: Response ) => {
    
};

export const getPlaygroundById = async ( req: Request, res: Response ) => {
    
};