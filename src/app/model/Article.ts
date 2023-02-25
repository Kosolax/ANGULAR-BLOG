import { Tag } from "./Tag";

export interface Article {
  id: number;
  content: string;
  description: string;
  title: string;
  slug: string;
  tags: Tag[];
  thumbnail: string;
  createdDAte: Date;
  updatedDAte: Date;
  views: number;
}
