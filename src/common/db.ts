import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';

export type DBSchema = Schema;
export type DBSchemaDefinition = SchemaDefinition;
export type DBModel<T> = Model<T>;

export class DataBase {
  private db: mongoose.Mongoose;
  static dataType = mongoose.Schema.Types;

  constructor() {
    this.db = mongoose;
  }

  async connect() {
    await this.db.connect('mongodb://127.0.0.1:27017/gatewaydb');
  }

  newSchema(definition: DBSchemaDefinition) {
    return new this.db.Schema(definition);
  }

  createModel(name: string, schema: DBSchema) {
    return this.db.model(name, schema);
  }
 }