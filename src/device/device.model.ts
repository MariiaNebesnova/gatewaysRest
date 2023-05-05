import { BaseModel } from "../common/baseClasses/baseModel";
import { DataBase } from "../common/db";


export class Device extends BaseModel {
    static modelName = "Device";
    static attributes = {
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
    };

    constructor(db: DataBase) {
        super(db, Device.modelName, Device.attributes);

        this.model.events.on("error", (data: any) => console.log())
    }
}