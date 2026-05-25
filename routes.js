import express from "express";
import { chatbot, openaiapicall } from "./services/openaiapi.ts";
import { downloadPdf } from "./services/PdfDownload.ts";

const router = express.Router()



router.post("/openaiapicall",openaiapicall)
router.post("/chatstart",chatbot)
router.post("/download",downloadPdf)




export default router;