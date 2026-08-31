// Database.md §4 — ContactInfo interface（数据填充在 Phase 1 / Task 1-1）
// LinkedIn 已于 Phase 3 Task 3-4 补全（2026-08-30）。

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  chromeWebStore: string;
}

export const contactTitle = "Get in Touch"

export const contactInfo: ContactInfo = {
  email: "stevenli2007@berkeley.edu",
  github: "https://github.com/stevenli2007-del",
  linkedin: "https://www.linkedin.com/in/youcheng-li-6b3447335/",
  chromeWebStore:
    "https://chromewebstore.google.com/detail/linkedin-ai-assistant/jeknmnkekajcbffbfijmnmckakpbkcoa",
}
