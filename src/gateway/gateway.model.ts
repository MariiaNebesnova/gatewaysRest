import { BaseModel } from "../common/baseClasses/baseModel";
import { DataBase } from "../common/db";


export class Gateway extends BaseModel {
    static modelName = "Gateway";
    static attributes = {
        name: {
            type: String,
            required: true
        },
        ipv4: {
            type: String,
            required: true
        },
        devices: [{
            type: DataBase.schemaTypes.ObjectId,
            ref: "Device",
            required: true
        }]
    };

    constructor(db: DataBase) {
        super(db, Gateway.modelName, Gateway.attributes);
    }
}