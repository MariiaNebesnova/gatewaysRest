import { DBModel, DBSchema, DBSchemaDefinition, DataBase } from "../db";

export abstract class BaseModel {
    static attributes: DBSchemaDefinition;
    static modelName: string;

    schema: DBSchema;
    model: DBModel<any>;

    constructor(db: DataBase, name: string, attributes: DBSchemaDefinition) {
        this.schema = db.newSchema(attributes);
        this.model = db.createModel(name, this.schema);
    }
}
