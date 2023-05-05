import { BaseModel } from "../common/baseClasses/baseModel";
import { DataBase } from "../common/db";


export class Gateway extends BaseModel {
    static modelName = "Gateway";
    static attributes = {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        ipv4: {
            type: String,
            required: true
        },
        // devices: {
        //     type: String,
        //     required: true
        // }
    };

    constructor(db: DataBase) {
        super(db, Gateway.modelName, Gateway.attributes);
    }
}