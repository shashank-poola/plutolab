import type { Request, Response } from "express";
import { projectSchema } from "../../schema/projectSchema";
import { db } from "@repo/database";
import { success } from "zod";

export const createPlayground = async ( req: Request, res: Response ) => {
    try {
        const user = req.user?.id

        if (!user) {
            res.status(403).json({
                success: false,
                data: null,
                error: "UNAUTHORIZED"
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
    try {
        const user = req.user?.id;

        if (!user) {
            res.status(401).json({
                success: false,
                data: null,
                error: "UNAUTHORIZED"
            })
            return;
        }

        const projects = await db.project.findMany({
            where: {
                userId: user
            },
        })

        return res.status(200).json({
            success: true,
            data: projects,
            error: null,
        });

    } catch (error) {
        console.log("getPlayground error", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "INTERNAL_SERVER_ERROR",
        })
        return;
    };
};

export const getPlaygroundById = async ( req: Request, res: Response ) => {
    try {
        const user = req.user?.id;

        if (!user) {
            res.status(401).json({
                success: false,
                data: null,
                error: "UNAUTHORIZED",
            })
            return;
        }

        const { projectId } = req.params;

        if (typeof projectId !== "string") {
            res.status(400).json({
                success: false,
                data: null,
                error: "INVALID_PROJECT_ID"
            })
            return;
        }

        const project = await db.project.findFirst({
            where: {
                userId: user,
                id: projectId,
            },
        });

        if (!project) {
            res.status(404).json({
                success: false,
                data: null,
                error: "PROJECT_NOT_FOUND"
            })
            return;
        }

        return res.status(200).json({
            success: true,
            data: project,
            error: null,
        });

    } catch (error) {
        console.log("getPlaygroundById failed", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "INTERNAL_SERVER_ERROR"
        })
        return;
    }
};