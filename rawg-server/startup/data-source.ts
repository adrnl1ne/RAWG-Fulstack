import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";

const connectionString = process.env.MYSQL_URL;
console.log(connectionString);

const isProduction = process.env.NODE_ENV === "production";


const entitiesPath = isProduction
  ? path.join(__dirname, "../entities/**/*.js")
  : path.join(__dirname, "../entities/**/*.ts");

export const AppDataSource = new DataSource({
  type: "mysql",
  url: connectionString,
  synchronize: true,
  logging: true,
  entities: [entitiesPath],
});
