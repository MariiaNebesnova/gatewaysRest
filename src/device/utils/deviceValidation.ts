import Joi from "joi";
import { Device } from "../device.types";

export const newDeviceSchema: Joi.ObjectSchema<Device> = Joi.object().keys({
    device: {
        uid: Joi.string().required(),
        vendor: Joi.string().required(),
        date: Joi.date().required(),
        status: Joi.boolean().required(),
    },
    gatewayId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});