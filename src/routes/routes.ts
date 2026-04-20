import { Router } from "express";


const router = Router();

router.get('/');

router.post('/signup');

router.post('/login');

router.get('/logout')


export default router;