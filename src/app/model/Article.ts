import { Image } from "./Image";
import { Tag } from "./Tag";

export interface Article {
  id: number;
  content: string;
  description: string;
  title: string;
  slug: string;
  tags: Tag[];
  images: Image[]; 
  createdDAte: Date;
  updatedDAte: Date;
  views: number;
}
