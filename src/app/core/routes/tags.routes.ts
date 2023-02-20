export abstract class TagsRoutes {
  static readonly BASE_URL: string = "admin/tags"
  static readonly CREATE: string = "/"
  static readonly MODIFY: string = "/{0}"
  static readonly DELETE: string = "/{0}"
  static readonly GET: string = "/{0}"
  static readonly LIST: string = "/"
  static readonly PAGINATION: string = "/pagination/{0}"
}
