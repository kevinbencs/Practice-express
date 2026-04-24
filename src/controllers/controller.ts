import type { Response, Request } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { SECRET } from "../config/config.ts";



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

        const hashPassword = await bcrypt.hash(body.password, 10)

        return res.status(201).json({ message: "Success" })

    } catch (error) {
        console.error('Registration error:', error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
}


export const signIn = async (req: Request, res: Response) => {
    try {
        const body = await req.body as { password: string, email: string };

        const pass = "1" //have to change to db

        const passwordConfirm = await bcrypt.compare(body.password, pass)


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