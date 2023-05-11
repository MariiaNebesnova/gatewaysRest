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

export const switchStatusSchema: Joi.ObjectSchema<{ _id: string }> = Joi.object().keys({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

export const removeDeviceSchema: Joi.ObjectSchema<{ deviceId: string, gatewayId: string }> = Joi.object().keys({
    deviceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    gatewayId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});