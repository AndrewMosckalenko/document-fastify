import { DataSource } from "typeorm";
import {
  Document,
  Paragraph,
  ParagraphTag,
  Tag,
  User,
  Project,
  UserProject,
} from "../../entities";

export let pgPool;

export let projectRepository;
export let documentRepository;
export let tagRepository;
export let paragraphRepository;
export let userRepository;
export let paragraphTagRepository;
export let userProjectRepository;

export const createPgPool = async () => {
  pgPool = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: Number(process.env.POSTGRES_DB_PORT),
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASS,
    database: process.env.POSTGRES_DB_NAME,
    entities: [
      User,
      Document,
      Paragraph,
      Tag,
      ParagraphTag,
      Project,
      UserProject,
    ],
    logging: true,
    synchronize: true,
  });

  await pgPool
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      projectRepository = pgPool.getRepository(Project);
      documentRepository = pgPool.getRepository(Document);
      tagRepository = pgPool.getRepository(Tag);
      paragraphRepository = pgPool.getRepository(Paragraph);
      userRepository = pgPool.getRepository(User);
      userProjectRepository = pgPool.getRepository(UserProject);
      paragraphTagRepository = pgPool.getRepository(ParagraphTag);
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
};
