import Joi from "joi";
import { Gateway } from "../gateway.types";


export const newGatewaySchema: Joi.ObjectSchema<Gateway> = Joi.object().keys({ 
    serialNumber: Joi.string().required(),
    name: Joi.string().required(),
    ipv4: Joi.string().ip().required(),
 });