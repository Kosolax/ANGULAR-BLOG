import { Tag } from "./Tag";

export interface LightAdminArticle {
  id: number;
  slug: string;
  title: string;
  views: number;
  tags: Tag[];
}
