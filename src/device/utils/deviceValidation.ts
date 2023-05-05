import Joi from "joi";
import { Device } from "../device.types";


export const addDeviceSchema: Joi.ObjectSchema<Device> = Joi.object().keys({ 
    id: Joi.string().required(),
    name: Joi.string().required(),
    ipv4: Joi.string().ip().required(),
 });