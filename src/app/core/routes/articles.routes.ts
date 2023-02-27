export abstract class ArticlesRoutes {
  static readonly BASE_URL: string = "admin/articles"
  static readonly CREATE: string = "/"
  static readonly MODIFY: string = "/{0}"
  static readonly DELETE: string = "/{0}"
  static readonly GET: string = "/{0}"
  static readonly PAGINATION: string = "/pagination/{0}"
}
