// Database.md §4 — ContactInfo interface（数据填充在 Phase 1 / Task 1-1）
// LinkedIn 待补（null），Phase 3 Task 3-4 替换。

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string | null;      // 待补
  chromeWebStore: string;
}

export const contactTitle = "Get in Touch"

export const contactInfo: ContactInfo = {
  email: "stevenli2007@berkeley.edu",
  github: "https://github.com/stevenli2007-del",
  linkedin: null,
  chromeWebStore:
    "https://chromewebstore.google.com/detail/jeknmkmekajcbffbfijmmmcakpbbcoa",
}
