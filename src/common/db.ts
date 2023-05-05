import mongoose, { Model, Query, Schema, SchemaDefinition } from 'mongoose';

export type DBSchema = Schema;
export type DBSchemaDefinition = SchemaDefinition;
export type DBModel<T> = Model<T>;
export type DBQuery<T> = Query<T, any, any>;

export class DataBase {
  static db = mongoose;
  static schemaTypes = mongoose.Schema.Types;

  // constructor() {
  //   this.db = mongoose;
  // }

  async connect() {
    await DataBase.db.connect('mongodb://127.0.0.1:27017/gatewaydb1');
  }

  newSchema(definition: DBSchemaDefinition) {
    return new DataBase.db.Schema(definition);
  }

  createModel(name: string, schema: DBSchema) {
    return DataBase.db.model(name, schema);
  }
 }