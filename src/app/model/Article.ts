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
  createdDate: Date;
  updatedDate: Date;
  views: number;
}
