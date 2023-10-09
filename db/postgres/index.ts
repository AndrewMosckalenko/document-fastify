import { DataSource, Repository } from "typeorm";
import {
  IDocument,
  IParagraph,
  IParagraphTag,
  ITag,
  IUser,
  IUserProject,
  IProject,
  Paragraph,
  ParagraphTag,
  Project,
  Tag,
  User,
  UserProject,
  Document,
} from "../../entities";

export let pgPool: DataSource;

export let projectRepository: Repository<IProject>;
export let documentRepository: Repository<IDocument>;
export let tagRepository: Repository<ITag>;
export let paragraphRepository: Repository<IParagraph>;
export let userRepository: Repository<IUser>;
export let paragraphTagRepository: Repository<IParagraphTag>;
export let userProjectRepository: Repository<IUserProject>;

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
      projectRepository = pgPool.getRepository(Project);
      documentRepository = pgPool.getRepository(Document);
      tagRepository = pgPool.getRepository(Tag);
      paragraphRepository = pgPool.getRepository(Paragraph);
      userRepository = pgPool.getRepository(User);
      userProjectRepository = pgPool.getRepository(UserProject);
      paragraphTagRepository = pgPool.getRepository(ParagraphTag);
    })
    .catch((err: any) => {
      console.error("Error during Data Source initialization:", err);
    });
};
