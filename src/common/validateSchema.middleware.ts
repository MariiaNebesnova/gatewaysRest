import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

export const validateSchema = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (error?.isJoi) res.status(400).json({ message: "Invalid data" });
    else next();
}