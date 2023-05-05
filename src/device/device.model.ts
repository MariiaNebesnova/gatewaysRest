import { BaseModel } from "../common/baseClasses/baseModel";
import { DataBase } from "../common/db";


export class Device extends BaseModel {
    static modelName = "Device";
    static attributes = {
        id: {
            type: String,
            required: true
        },
        vendor: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        gateway: {
            type: DataBase.dataType.ObjectId,
            ref: "Gateway",
            required: true,
        }
    };

    constructor(db: DataBase) {
        super(db, Device.modelName, Device.attributes);
    }
}