import { App } from "./app";
import { Config } from "./common/config";

const app = new App(new Config());
export const status = app.run();