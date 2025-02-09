import {Router} from "express"
import { GetUser } from "../controllers/user.controller"


const router = Router()

router.get("/logging", GetUser)



export default router