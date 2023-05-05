import Joi from "joi";
import { Gateway } from "../gateway.types";


export const addGatewaySchema: Joi.ObjectSchema<Gateway> = Joi.object().keys({ 
    id: Joi.string().required(),
    name: Joi.string().required(),
    ipv4: Joi.string().ip().required(),
 });