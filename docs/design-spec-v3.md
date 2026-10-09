# Design Spec v3 — Bilingual, multi-page portfolio

**Status:** Design proposal selected by Steven: medium restructuring, independent page routes, English/中文 switch.
**Scope:** Specification only. Do not change `src/`, add implementation code, or run a build as part of this design task.

## 1. Product and navigation decisions

- Build six static pages corresponding to the existing six narrative sections. Keep their order: Home (Hero) → About → Projects → Experience → Art → Contact.
- Use these paths: `/`, `/about`, `/projects`, `/experience`, `/art`, `/contact`.
- The root page is the Hero/Home page only. Do not repeat all six sections on every route.
- A persistent top header contains the six page links and an `EN / 中文` language control. Clicking a page link loads that route. Clicking the language control keeps the current route and changes its language.
- Use ordinary links so each page has a shareable URL and browser back/forward works. Provide a static-host fallback to the app entry for these paths, and render a useful not-found state for unknown paths.
- Keep the selected language in the URL as `?lang=en` or `?lang=zh`; English is the default when the parameter is absent. The language toggle changes only this parameter and preserves the pathname. This makes language state shareable and avoids hidden persistence behavior.
- Preserve the established Apple-inspired light palette, system sans font, six-part narrative, exact project and experience inventory, and image assets. Maintain the white Hero and the two-column CSS masonry gallery with original image proportions.
- All visible copy, including navigation labels, page titles, metadata, accessibility labels, and button text, must come from bilingual data in `src/data/*.ts`; components must not contain user-facing copy literals.
- No animations, parallax, carousel, hero video, or new large media. Performance target remains Lighthouse Performance ≥ 90.

## 2. Shared visual system and shell

### Header

Structure:

```text
header (sticky top-0, z-50)
  nav (container, brand/home link, route links, language switch)
main
  one route page
```

Use `header className="sticky top-0 z-50 border-b border-[#D2D2D7] bg-white/95 backdrop-blur-sm"` and `nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3"`.

- Brand/home link: `text-sm font-semibold tracking-tight text-[#1D1D1F]`, visible text `Steven Li` in both languages. Preserve legal name in the Home and About copy as `Youcheng (Steven) Li`; do not invent a Chinese-character spelling for the name.
- Desktop route list: `hidden items-center gap-6 md:flex`. Link classes: `text-sm text-[#6E6E73] hover:text-[#1D1D1F]`; current route: `font-medium text-[#1D1D1F]` plus `aria-current="page"`.
- Language control: `inline-flex rounded-full border border-[#D2D2D7] p-1 text-xs`. Each option uses `rounded-full px-3 py-1.5`; active option uses `bg-[#1D1D1F] text-white`, inactive `text-[#6E6E73]`.
- On mobile, use a two-row header rather than a menu animation: brand + language control on row one, horizontally scrollable route links on row two. Row two classes: `flex w-full gap-5 overflow-x-auto whitespace-nowrap pb-1 md:hidden`. Keep visible focus styles and accessible labels. No hamburger menu is required.
- Do not add `scroll-behavior: smooth`; route links navigate directly.

### Page frame

- Each route contains exactly one semantic `<main>` and one page `<section>` or `<article>`; the shared header sits before it.
- Content wrapper: `mx-auto w-full max-w-6xl px-6`.
- Standard page spacing: `py-16 md:py-20`; section background alternates only where specified below.
- Page heading: `text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl`.
- Body: `text-base leading-relaxed text-[#1D1D1F]`; secondary: `text-sm leading-relaxed text-[#6E6E73]`.
- Maintain a visible footer on all routes: `border-t border-[#D2D2D7]`, with `© 2026 Youcheng (Steven) Li` and the same bilingual route/language behavior. Footer copy is supplied in §4.

## 3. Section-by-section diagnosis

### Home / Hero

1. The large centered portrait competes with the positioning statement; strong peer portfolios put name and value proposition first and let the portrait support recognition.
2. The introductory sentence is generic and does not surface the concrete proof (shipped extension, IEEE paper, invited TA) that differentiates this profile.
3. The 80vh centered stack spends much of the initial viewport on portrait and spacing, delaying the scan path on mobile.

### About

1. “I've always been doing one thing” sounds broad and indirect; a concise, specific statement is easier to trust.
2. The three examples name categories but do not state what the workflow automates or who benefits.
3. The Shenzhen-to-Berkeley and end-to-end delivery identity line is styled as low-priority footer text despite being useful context.

### Projects

1. Three desktop columns for two cards leave a conspicuous empty slot and weaken the balance of the most evidence-rich page.
2. The paper card compresses title, publication context, mentor, and date into a long paragraph; the extension card gives the stack similar visual weight to the outcome.
3. Status chips are more prominent than proof such as Chrome Web Store availability and fourth authorship.

### Experience

1. Descriptions vary in length and require paragraph reading before the chronology is clear.
2. The 2022 first SEM exposure and 2026 invited TA SEM visit form a memorable arc but are buried in separate paragraphs.
3. Current node and weight changes distinguish the invited TA only subtly at a glance.

### Art

1. The four-image gallery occupies substantial vertical space before visitors understand that the work is the author's own calligraphy.
2. CSS columns may be read down one column at a time, making the item sequence less obvious than an explicit numbered or paired gallery.
3. The gallery has little context connecting the calligraphy identity with the builder profile.

### Contact

1. Four button-like links give similar visual weight, so the preferred contact path is not immediate.
2. “Get in Touch” does not set context for professors, investors, or startup collaborators.
3. Generic labels such as “GitHub” and “LinkedIn” do not tell visitors what will open.

## 4. Detailed implementation spec

For every row, put copy into bilingual data fields and render it according to the active `lang`. The English and Chinese strings below are the proposed final copy; preserve wording and project facts during implementation unless Steven revises them.

### Shared navigation and footer

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Shared shell | Visitors need direct page access and language choice without scrolling through a long document. | Sticky header and responsive nav as specified in §2. Route anchors map to `/`, `/about`, `/projects`, `/experience`, `/art`, `/contact`. Mobile route list is a horizontally scrollable second row; do not hide routes behind animated menu. | Nav: `Home` / `首页`; `About` / `关于`; `Projects` / `项目`; `Experience` / `经历`; `Art` / `书法`; `Contact` / `联系`. Toggle accessible names: `Switch to Chinese` / `切换为英文`, with visible options `EN` and `中文`. | P0 | Neutral to positive: text-only shell; backdrop blur may add minor paint cost, omit `backdrop-blur-sm` if measured performance regresses. |
| Shared shell | Routes and language need to survive sharing and refresh. | Use real anchors with `href` and `aria-current="page"`. Read `lang` from query string; toggle preserves pathname and sets/removes query parameter. Configure static host fallback. Not-found page uses same shell. | Not found: `Page not found` / `找不到此页面`; link `Return home` / `返回首页`. Footer: `© 2026 Youcheng (Steven) Li` / `© 2026 Youcheng (Steven) Li`. | P0 | Neutral; route handling and copy add negligible transfer size. |

### Home / Hero (`/`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Home | Portrait dominates the message and the 80vh stack delays evidence. | Keep pure white background. Container `mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col items-center justify-center gap-8 px-6 py-12 md:flex-row md:justify-between md:gap-12 md:py-16`. Text column first in DOM: `max-w-2xl text-center md:text-left`. Portrait `h-32 w-32 shrink-0 rounded-full object-cover object-[50%_18%] md:order-2 md:h-40 md:w-40`; remove `shadow-lg`. Keep portrait asset. | Name: `Youcheng (Steven) Li` in both languages. H1: `Builder · Calligrapher · UC Berkeley 2030` / `创造者 · 书法家 · 加州大学伯克利分校 2030 届`. Intro: `I turn manual workflows into useful tools, from AI-assisted networking to automated lab measurement.` / `我把手动流程变成实用工具，从 AI 辅助拓展人脉到实验室自动测量。` Proof line: `Chrome Web Store launch · IEEE PVSC 2025 co-author · Invited teaching assistant` / `Chrome 应用商店上线 · IEEE PVSC 2025 论文合著者 · 受邀助教`. CTA links: `Explore projects` / `查看项目`; `Contact me` / `联系我`. | P0 | Positive/neutral: same portrait asset, remove shadow and no new media; no animation. |
| Home | Visitors need a fast route into detail pages. | Under proof line add `div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"`; primary anchor `rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white`; secondary `rounded-full border border-[#D2D2D7] px-5 py-2.5 text-sm font-medium text-[#1D1D1F]`. | As above. | P1 | Neutral; two text links only. |

### About (`/about`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| About | Narrative is generic and examples do not name the value or beneficiary. | Use `bg-[#F5F5F7]`; page intro `max-w-3xl`; examples in `mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3`. Each example is `rounded-2xl border border-[#D2D2D7] bg-white p-5`; title `text-base font-semibold`; effect `mt-2 text-sm leading-relaxed text-[#6E6E73]`. | H1: `About` / `关于我`. Narrative: `Across software and lab work, I look for repetitive steps and build tools that make them easier to complete.` / `无论是软件还是实验室工作，我都会寻找重复步骤，并动手做工具，让这些流程更简单。` Example 1 title `LinkedIn AI Assistant`; effect `Drafts personalized networking messages to reduce repetitive outreach.` / `生成个性化的人脉拓展消息，减少重复沟通。` Example 2 title `Contact-Angle Measurement Platform`; effect `Automates image-based contact-angle measurement for lab experiments.` / `通过图像自动测量接触角，简化实验流程。` Example 3 title `Convenience Store Mini Program`; effect `Brings a family convenience store's services into a digital mini program.` / `将家中便利店的服务搬到数字化小程序中。` | P0 | Neutral: no images or scripts; three simple cards. |
| About | Identity and end-to-end delivery are visually buried. | Add a bottom identity strip `mt-8 border-t border-[#D2D2D7] pt-5 text-sm font-medium text-[#1D1D1F]`; keep it on same gray background. | `From Shenzhen to UC Berkeley. I take products from design through development and deployment.` / `从深圳到加州大学伯克利分校。我参与产品从设计、开发到部署的完整流程。` | P1 | Neutral. |

### Projects (`/projects`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Projects | Three columns for two items create a blank slot; outcome hierarchy is weak. | White background. Intro `max-w-3xl`; card grid `mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2`. Cards `flex h-full flex-col rounded-2xl border border-[#D2D2D7] bg-white p-6 md:p-7`; no hover animation or shadow. Use status as compact text row `inline-flex items-center gap-2 text-sm font-medium`; green dot `h-2 w-2 rounded-full bg-[#34C759]`, purple dot `bg-[#5E5CE6]`. Add outcome line immediately below title, then concise description, then optional tech list. | H1: `Selected Projects` / `代表项目`. Intro: `Two outcomes across product engineering and applied research.` / `两个成果，分别来自产品工程与应用研究。` Card 1 title: `LinkedIn AI Networking Assistant`; outcome: `Live on the Chrome Web Store`; description: `A Chrome extension that drafts personalized messages to help make LinkedIn networking more efficient.` / `一款 Chrome 扩展，可生成个性化消息，让 LinkedIn 人脉拓展更高效。` Card 2 title: `CdSe Quantum Dots on Si Solar Cells`; outcome: `IEEE PVSC 2025 · Fourth author of five`; description: `“The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning.” Research conducted at UPenn ESAP 2024 under Dr. Gyuseok L. Kim; published in IEEE PVSC 2025.` / `《硒化镉量子点对硅太阳能电池效率的影响：实践式项目学习》。研究于 2024 年在宾大 ESAP 开展，由 Gyuseok L. Kim 博士指导，发表于 IEEE PVSC 2025。` | P0 | Positive/neutral: same two cards, no new media, lower visual effects. |
| Projects | Technology list competes with project evidence and takes scanning time. | Place stack in a final `mt-5 border-t border-[#D2D2D7] pt-4` region. Use `text-xs leading-relaxed text-[#6E6E73]`; label `Stack` / `技术栈`. Keep all existing stack items from data. Links in `mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-medium text-[#0071E3]`; links named for destinations. | Extension links: `Chrome Web Store listing` / `Chrome 应用商店页面`; `Source on GitHub` / `GitHub 源代码`. Paper link: `Read on IEEE Xplore` / `在 IEEE Xplore 阅读`. | P1 | Neutral. |

### Experience (`/experience`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Experience | Paragraphs obscure the progression and SEM arc. | White background. Intro `max-w-3xl`; timeline `relative mt-8 space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[#D2D2D7]`. Each item `relative pl-8`; student nodes `absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[#D2D2D7] bg-white`; 2026 node `bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10`. Each row uses period `text-xs font-medium uppercase tracking-wide text-[#6E6E73]`, institution `mt-1 text-lg font-semibold`, one concise description `mt-2 max-w-3xl text-sm leading-relaxed text-[#6E6E73]`, keywords `mt-2 text-xs text-[#59595E]`. Maintain 2022→2026 order. | H1: `Experience` / `经历`. Intro: `From a first SEM lab visit to guiding students through one as an invited teaching assistant.` / `从第一次走进 SEM 实验室，到受邀担任助教并带学生参观。` 2022 description: `First hands-on SEM experience while studying superhydrophobicity, butterfly-wing structural color, and lotus-leaf microstructures.` / `初次上手 SEM，学习超疏水性、蝴蝶翅膀结构色与荷叶微结构。` 2023: `Studied materials science and launched a research project with Prof. Zhang Wenzeng.` / `深入学习材料科学，并启动张文增教授指导的研究项目。` 2024: `At UPenn ESAP, researched CdSe quantum dots and silicon solar cells with Dr. Gyuseok L. Kim; the work became an IEEE paper.` / `在宾大 ESAP 与 Gyuseok L. Kim 博士研究硒化镉量子点与硅太阳能电池，成果发表于 IEEE 论文。` 2025: `Joined Yale Young Global Scholars in the Innovation, Science & Technology track; continued the X-Institute research project through year-end.` / `参加耶鲁全球青年学者项目的创新、科学与技术方向；张文增项目持续至年底。` 2026: `Invited to assist Prof. Zhao Meng's programmable materials group. Built an automated contact-angle platform, worked with EWOD devices, and guided students through an SEM lab visit.` / `受邀加入赵蒙老师的可编程材料课题组，搭建接触角自动测量平台、操作 EWOD 器件，并带学生参观 SEM 实验室。` | P0 | Neutral: text and CSS only. |
| Experience | Student-to-TA transition needs a clear visual signal. | Add a small `Invited` / `受邀` label only to the 2026 item, class `inline-flex rounded-full bg-[#1D1D1F] px-2.5 py-1 text-xs font-medium text-white`; keep the distinct filled node and semibold institution. Preserve the 2023 `Starry Youth` badge in muted gray. | 2023 badge: `Starry Youth` / `星空少年`; 2026 badge: `Invited` / `受邀`. | P1 | Neutral. |

### Art (`/art`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Art | Visitors need context before a tall image gallery. | Retain `bg-[#F5F5F7]`, `md:columns-2`, original image proportions, `loading="lazy"`, and all four original images. Add an intro block `max-w-3xl` before the gallery. Gallery classes `mt-8 columns-1 gap-4 md:columns-2`; each figure `mb-4 break-inside-avoid rounded-2xl border border-[#D2D2D7] bg-white p-3`; image `w-full rounded-xl`; caption `mt-3 text-right text-sm text-[#6E6E73]`. No crop, no carousel. | H1: `Calligraphy` / `書法`. Intro: `Calligraphy is a practice I return to for focus, patience, and a connection to Chinese literary tradition.` / `書法讓我練習專注與耐心，也讓我與中國文學傳統保持連結。` Small note: `Four works · Cursive script` / `四幅作品 · 行草`. | P0 | Neutral: reuse optimized local images; preserve lazy loading and no new font usage. |
| Art | The identity connection is not explicit and column reading order can be unclear. | Keep each caption directly inside its figure. Add a simple native ordered sequence only through source order; do not add numbers over the art. Set figure accessible name from existing alt text; keep Chinese caption font already loaded. | Existing captions remain exactly: `花鳥一池書 · 風雲三尺劍`; `大鵬一日同風起`; `龍虎風雨，天下梟雄`; `明月清風酒 · 一邱高山流水`. Chinese caption same in both languages. | P1 | Neutral. |

### Contact (`/contact`)

| [section] | [problem] | [how: structure and exact classes] | [copy, English / Chinese] | [priority] | [Lighthouse impact] |
|---|---|---|---|---|---|
| Contact | Primary contact action is visually level with all outbound links. | White background. Page intro `max-w-3xl`; email link is a primary button `mt-6 inline-flex rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white`; social links below as simple inline links `mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#0071E3]`. Avoid rendering all links as buttons. | H1: `Contact` / `联系`. Intro: `For research, product, or startup conversations, email is the best way to reach me.` / `欢迎就研究、产品或创业合作联系我；邮件是联系我的最佳方式。` Email action: `Email Youcheng` / `发送邮件`; visible address: `stevenli2007@berkeley.edu`. | P0 | Neutral: text and links only. |
| Contact | Outbound destination labels are too generic. | Render accessible, descriptive link names; keep external links `target="_blank" rel="noreferrer"`. Put Chrome Web Store under a `Project` label if included on this route. | `GitHub profile` / `GitHub 主页`; `LinkedIn profile` / `LinkedIn 主页`; `LinkedIn AI Assistant on the Chrome Web Store` / `Chrome 应用商店中的 LinkedIn AI Assistant`. | P1 | Neutral. |

## 5. Bilingual content and behavior rules

- Use `en` and `zh` locale keys for every user-facing string. Chinese display language is Simplified Chinese except the artwork titles/captions, which remain in their original Traditional Chinese.
- Translate all page headings, navigation, badges, project summaries, experience descriptions, CTA labels, footer text, document title, and image alternative text. URLs, product names, institution names, official paper title, and tool names remain unchanged where translating could make them inaccurate.
- Set `<html lang="en">` or `<html lang="zh-CN">` on language changes. Update `document.title` to `Youcheng (Steven) Li — Builder & Calligrapher` / `李宥成（Steven Li）— 创造者与书法爱好者` and the page-specific title in that language.
- Language switch uses standard links: from `/projects?lang=en`, Chinese target is `/projects?lang=zh`; from `/projects` it is `/projects?lang=zh`. English target uses `?lang=en` consistently.
- Persist no separate local preference; URL is the source of truth. If a requested language is unsupported, default to English.
- Use Chinese typography with the existing local Noto Serif SC only for artwork captions; all other Chinese uses the system sans stack. Do not add another font download.

## 6. Locked decisions and intentional changes

| Decision | v3 treatment |
|---|---|
| Six narrative parts and their order | Preserved as navigation order and six independent routes. This changes the single-page delivery model while preserving the six-part information architecture. |
| Pure white Hero, no background image | Preserved. |
| Art uses two-column masonry and original proportions | Preserved. |
| No emoji or self-deprecating “vibe coding” language | Preserved. |
| All copy in `src/data/*.ts`; no copy literals in components | Preserved and expanded to bilingual locale fields. |
| All substantive content inventory | Preserved: 2 projects, 3 About examples, 5 experience points, 4 artworks, and 4 contact destinations. |
| New independent routes | Intentional change to the PRD's “single-page” deployment description. Six route pages replace the single long scroll page. |
| Persistent header navigation and language toggle | New requirement from Steven; added as a shared site shell. |
| Hero portrait size/layout | Modified within the white, typography-led Hero; portrait asset remains. |

## 7. Priorities and performance acceptance

- **P0:** Six routes, shared responsive header, route-preserving language toggle, complete translated copy, single-page content mapping per route, projects two-column desktop layout, concise experience arc, lazy-loaded original Art assets.
- **P1:** Secondary CTAs, refined identity strip, specific outbound labels, invited badge, Art intro and captions.
- **P2:** None proposed; do not add embellishments unless implementation review finds a concrete usability issue.
- Keep the current system font stack, local image assets, and local subset font. Do not add UI libraries, external font requests, remote images, JS animation packages, video, or heavy route-transition code.
- Verify Lighthouse Performance ≥ 90 after implementation on the production build. Compare mobile and desktop. If header blur or another decorative style reduces the score, remove the decorative style first while preserving navigation and content.

## 8. Open content verification before implementation

- Verify the exact official publication date and how the IEEE venue should be named. PRD says Xplore date added 2025-08-29; current data description says 2025-09-03. The copy above intentionally omits the day to avoid publishing conflicting dates.
