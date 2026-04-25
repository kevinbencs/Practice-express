import type { Response, Request } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { SECRET } from "../config/config.ts";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient()


export const getMainAPI = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ "Message": "main api" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ "Error": "Server error" })
    }
}


export const singUp = async (req: Request, res: Response) => {
    try {
        const body = await req.body as { name: string, password: string, email: string };

        const existUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (existUser) return res.status(400).json({error: "Email is used in another account"})

        const hashPassword = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
            email: body.email,
            name: body.name,
            password: hashPassword
        })

        return res.status(201).json({ message: "Success" })

    } catch (error) {
        console.error('Registration error:', error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
}


export const signIn = async (req: Request, res: Response) => {
    try {
        const body = await req.body as { password: string, email: string };

        const user = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })

        if (!user) return res.status(401).json({error: 'Invalid email or password. Please try again with the correct credentials'})


        const passwordConfirm = await bcrypt.compare(body.password, user.password)

        if(!passwordConfirm) return res.status(401).json({error: 'Invalid email or password. Please try again with the correct credentials'})


        const token = jwt.sign({ id: 2, }, SECRET, { expiresIn: "1h" })

        res.cookie("user", token,
            {
                signed: true,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            }
        )

        return res.status(200).json({ message: "Success" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
}