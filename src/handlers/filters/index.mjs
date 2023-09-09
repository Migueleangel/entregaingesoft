import { Router } from "express";
import applyFilterHandler from "../applyFiltersHandler.mjs";
const router = Router();
router.get("/",(req,res)=>{
    res.send("ok images GET");
})

router.post("/", applyFilterHandler);
export const test = () => {}
export default router;