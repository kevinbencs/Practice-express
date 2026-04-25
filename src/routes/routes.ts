import { Router } from "express";
import { validateBody, validateURL } from "../middleware/validation.js";
import { informationSchema, loginSchema, signUpSchema } from "../schema/schema.js";
import { getMainAPI, logout, signIn, singUp } from "~/controllers/controller.js";


const router = Router();

router.get('/', getMainAPI);

router.post('/signup', validateBody(signUpSchema), singUp);

router.post('/login', validateBody(loginSchema), signIn);

router.get('/logout', logout)

/*router.get('/information', validateURL(informationSchema))*/


export default router;