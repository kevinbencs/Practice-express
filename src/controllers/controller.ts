import type { Response, Request } from "express";


export const getMainAPI = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({"Message": "main api"})
    } catch (error) {
        console.error(error)
        res.status(500).json({"Error": "Server error"})
    }
}