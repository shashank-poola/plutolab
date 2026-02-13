import type { Request, Response } from "express";
import { projectSchema } from "../../schema/projectSchema";

export const createPlayground = async ( req: Request, res: Response ) => {
    try {

    } catch (error) {
        res.status(500).json({
            "success": false,
            "data": null,
            "error": "INTERNAL_SERVER_ERROR"
        })
        return;
    }
};

export const getPlayground = async ( req: Request, res: Response ) => {
    
};

export const getPlaygroundById = async ( req: Request, res: Response ) => {
    
};