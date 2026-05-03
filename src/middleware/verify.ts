import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { SECRET } from "~/config/config.ts";
import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.signedCookies["user"];

        if (!token) {
            res.status(401).json({ error: "Please log in" })
        }

        if (!SECRET) return res.status(500).json({ error: "SECRET is missing" })

        const decoded = jwt.verify(token, SECRET)

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return void res.status(401).json({ error: 'Please log in' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: 'Please log in' });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: 'Please log in' });
        } else if (error.name === "NotBeforeError") {
            return res.status(401).json({ error: 'Please log in' });
        }

        return res.status(500).json({ error: "Server error" })
    }
}