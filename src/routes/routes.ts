import { Router } from "express";
import { validateBody, validateURL } from "../middleware/validation.js";
import { informationSchema, loginSchema, signUpSchema } from "../schema/schema.js";
import { getMainAPI } from "~/controllers/controller.js";


const router = Router();

router.get('/', getMainAPI);

router.post('/signup', validateBody(signUpSchema));

router.post('/login', validateBody(loginSchema));

router.get('/logout')

router.get('/information', validateURL(informationSchema))


export default router;