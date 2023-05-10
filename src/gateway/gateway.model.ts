import { BaseModel } from "../common/baseClasses/baseModel";
import { DataBase } from "../common/db";


export class Gateway extends BaseModel {
    static modelName = "Gateway";
    static attributes = {
        serialNumber: {
            type: DataBase.schemaTypes.String,
            required: true
        },
        name: {
            type: DataBase.schemaTypes.String,
            required: true
        },
        ipv4: {
            type: DataBase.schemaTypes.String,
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