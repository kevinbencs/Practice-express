import * as z from "zod"


export const signUpSchema = z.object({
    name: z.string().min(1, {message: "Name is require"}),
    email: z.email({message: "Email is required"}),
    password: z.string().refine((val) =>{
        const uppercase = /[A-Z]/.test(val);
        const lowercase = /[a-z]/.test(val);
        const number = /[0-9]/.test(val);

        const length = val.length >= 8;

        return length && uppercase && lowercase && number;

    }, {message: "Password should be at least 8, contain 1 uppercase 1 lowercase and 1 number."})
})

export const loginSchema = z.object({
    email: z.email({message: "Email is required"}),
    password: z.string()
})


export const informationSchema = z.object({
    color: z.union([z.string(), z.undefined()]),
    number: z.union([z.number(), z.undefined()])
})