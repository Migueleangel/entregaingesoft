import { Router } from "express";
import applyFilterHandler from "../applyFiltersHandler.mjs";
import multer from "multer";

const router = Router();


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get("/",(req,res)=>{
    res.send("ok images GET");
})

router.post("/", upload.array('files[]'), applyFilterHandler);
export const test = () => {}
export default router;