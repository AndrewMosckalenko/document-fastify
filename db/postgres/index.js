import { DataSource } from "typeorm";
import {
  Document,
  Paragraph,
  ParagraphTag,
  Tag,
  User,
  Project,
  userProjects,
} from "../../entities";

let pgPool;

const createPgPool = async () => {
  pgPool = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: Number(process.env.POSTGRES_DB_PORT),
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASS,
    database: process.env.POSTGRES_DB_NAME,
    entities: [User, Document, Paragraph, Tag, ParagraphTag, Project, userProjects],
    logging: true,
    synchronize: true,
  });

  await pgPool
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
};

export { pgPool, createPgPool };
