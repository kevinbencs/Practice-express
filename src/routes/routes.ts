import { Router } from "express";
import { validateBody, validateURL } from "../middleware/validation.ts";
import { informationSchema, loginSchema, signUpSchema } from "../schema/schema.ts";
import { getInformation, getMainAPI, logout, signIn, singUp } from "~/controllers/controller.ts";
import { verify } from "~/middleware/verify.ts";


const router = Router();

router.get('/', getMainAPI);

router.post('/signup', validateBody(signUpSchema), singUp);

router.post('/login', validateBody(loginSchema), signIn);

router.get('/logout', logout)

router.get('/information',verify, validateURL(informationSchema), getInformation)


export default router;