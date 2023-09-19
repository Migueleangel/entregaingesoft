import applyFilters from "../controllers/filters/applyFilters.mjs";
import Boom from "@hapi/boom";
import HttpStatusCodes from "http-status-codes";
import express  from "express";

const applyFiltersHandler = express.Router();

applyFiltersHandler.post("/", async (req, res, next) => {
    
    try {
        const body = req.body;
        const files = req.files;
        console.log(files)
        const response = await applyFilters(body,files);
        return res.status(HttpStatusCodes.OK).json(response);

    } catch (error) {
        const err = Boom.isBoom(error) ? error : Boom.internal(error);
        next(err);

    }
});
export default applyFiltersHandler;