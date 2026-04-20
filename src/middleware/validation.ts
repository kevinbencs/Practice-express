import type { Request, Response, NextFunction } from "express";
import * as z from "zod"


export const validateBody = (schema: z.ZodObject<any, any>) => {
    return async (req:Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if(error instanceof z.ZodError){
                console.error('Validation error: '+ error.errors)

                return res.status(400).json({failed: error.errors})
            }

            console.error(error);
            return res.status(500).json({error: "Server error"})
        }
    }
}


export const validateURL = (schema: z.ZodObject<any, any>) => {
    return async (req:Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.query)
            next()
        } catch (error) {
            if(error instanceof z.ZodError){
                console.error('Validation error: '+ error.errors)

                return res.status(400).json({failed: error.errors})
            }

            console.error(error);
            return res.status(500).json({error: "Server error"})
        }
    }
}