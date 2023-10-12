export interface CreateTagDTO {
  title: string;
  project?: { id: number };
  paragraphId?: number;
}
