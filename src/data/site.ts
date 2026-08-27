// Database.md §5 — SiteInfo（站点级文案；Hero 定位句）
// Phase 3 可在此扩展 Hero 副标题等站点级字段。

export interface SiteInfo {
  name: string;                 // 站点标题 / 姓名
  tagline: string;              // Hero 定位句
}

export const siteInfo: SiteInfo = {
  name: "Steven Li",
  tagline: "Builder · Calligrapher · UC Berkeley 2030",
}
