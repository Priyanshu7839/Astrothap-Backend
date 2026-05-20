import express from "express";
import { chatbot, openaiapicall } from "./services/openaiapi.ts";

const router = express.Router()



router.post("/openaiapicall",openaiapicall)
router.post("/chatstart",chatbot)




export default router;