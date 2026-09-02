// Database.md §6 — AboutInfo（About 板块文案；PRD 4.2）

export interface AboutExample {
  title: string;                // 如 "LinkedIn AI Assistant"
  effect: string;               // 一句话说明自动化了什么
}

export interface AboutInfo {
  title: string;                // section 标题
  narrative: string;            // 2-3 行核心叙事
  examples: AboutExample[];     // 自动化例子，并列展示
  identity: string;             // 身份线
}

export const aboutInfo: AboutInfo = {
  title: "About",
  narrative:
    "I've always been doing one thing: turning manual processes into automation.",
  examples: [
    {
      title: "LinkedIn AI Assistant",
      effect: "Automates networking",
    },
    {
      title: "Contact-Angle Measurement Platform",
      effect: "Automates experiments",
    },
    {
      title: "Convenience Store Mini Program",
      effect: "Digitizes a family business",
    },
  ],
  identity:
    "Shenzhen → UC Berkeley 2030. End-to-end product delivery: design, build, deploy.",
}
