import { Image } from "./Image";
import { Tag } from "./Tag";

export interface LightViewerArticle {
  id: number;
  description: string;
  title: string;
  slug: string;
  tags: Tag[];
  images: Image[];
  createdDate: Date;
  updatedDate: Date;
  thumbnail: string;
}
