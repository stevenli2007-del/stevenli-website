// Phase 5（2026-10-09）新增 — Dev Log 数据层（Database.md §10）
// ⚠️ Phase 5 只建页面结构，**不写文章**：Steven 明确要求不编造日志、反思或日期。
// Phase 6（2026-10-09）：升级正文为 block 结构（段落 / 小标题 / 图片），并落地首篇真实文章。
//   首篇 `x-institute-ta-2026` 全部来自 Steven 口述采访（Bud 提问 → Steven 回答 → 整理成稿），
//   **未确认的细节一律不写**；后续要补（岔子/翻车、腾讯细节、具体日期）直接改本文。
// 一篇文章必须回答：想做什么 / 试了或决定了什么 / 什么变了或失败了 / 下次怎么做。
// ⚠️ 写作契约见 docs/Roadmap.md「Dev Log 写作契约」：叙事做皮、四问当骨；双语功能对等（不直译）；
//    技术论断处一律平实；文章内不点名学生。

import type { LocalizedText } from './locales'
import imgXInstituteTa2026 from '../assets/experience/x-institute-ta-2026.jpg'
import imgAfmLotus2022 from '../assets/dev-log/afm-lotus-2022.jpg'
import imgCondensation2023 from '../assets/dev-log/condensation-2023.jpg'
import imgCommercialContactAngle from '../assets/dev-log/commercial-contact-angle.jpg'
import imgXInstituteBuilding from '../assets/dev-log/x-institute-building.jpg'
import imgTempoDashboard from '../assets/dev-log/tempo-dashboard.jpg'
import imgGoogleMuse from '../assets/dev-log/google-muse.jpg'
import imgTempoRoadmapDocs from '../assets/dev-log/tempo-roadmap-docs.jpg'
import imgTempoMessagesParse from '../assets/dev-log/tempo-messages-parse.jpg'
import imgTempoSettingsPrivacy from '../assets/dev-log/tempo-settings-privacy.jpg'
import imgNvidiaIgniteOaInvite from '../assets/dev-log/nvidia-ignite-oa-invite.jpg'
import imgNvidiaIgniteHweOaFormat from '../assets/dev-log/nvidia-ignite-hwe-oa-format.jpg'
import imgStevenliWebsiteHero from '../assets/dev-log/stevenli-website-hero-2026.jpg'
import imgRameshLab from '../assets/dev-log/ramesh-lab-berkeley.jpg'
import imgGuitarPedalTeardown from '../assets/dev-log/guitar-pedal-teardown.jpg'
import imgGuitarPedalAmpScope from '../assets/dev-log/guitar-pedal-amp-scope.jpg'
import imgGuitarPedalBreadboard from '../assets/dev-log/guitar-pedal-breadboard.jpg'
import imgGuitarPedalSoldering from '../assets/dev-log/guitar-pedal-soldering.jpg'
import imgGuitarPedalSchematicV2 from '../assets/dev-log/guitar-pedal-schematic-v2.jpg'
import imgGuitarPedalPcbFinal from '../assets/dev-log/guitar-pedal-pcb-final.jpg'
import imgCalHacksHackportalRepo from '../assets/dev-log/cal-hacks-hackportal-repo.jpg'
import imgCalHacksVenue from '../assets/dev-log/cal-hacks-venue.jpg'
import imgLastcallXcodeIphone from '../assets/dev-log/lastcall-xcode-iphone.jpg'
import imgLastcallDevpost from '../assets/dev-log/lastcall-devpost.jpg'

// Phase 6：正文块。段落用 p，小节标题用 h，图片用 img（双语 alt 必填）。
export type DevLogBlock =
  | { type: 'p'; text: LocalizedText }
  | { type: 'h'; text: LocalizedText }
  | {
      type: 'img'
      src: string
      width: number   // 处理后文件的实际像素（写进 <img width> 防 CLS）
      height: number
      alt: LocalizedText
      caption?: LocalizedText
    }

export interface DevLogPost {
  id: string;                 // 唯一标识，**同时是单篇路由 slug**（/dev-log/<id>）
  date: string;               // 显示用日期（不确定就不写具体日，见 Phase 6）
  category: LocalizedText;    // Dev / Lab / Research …（Phase 6 拍板：放宽到非 shipped 项目）
  title: LocalizedText;
  summary: LocalizedText;     // 一句话 takeaway，索引页展示
  cover?: {                   // 封面图（可选），单篇页标题下方展示；不裁切、保留原比例
    src: string
    width: number
    height: number
    alt: LocalizedText
  }
  body: DevLogBlock[];        // 正文
}

export const devLogTitle: LocalizedText = { en: 'Dev Log', zh: '开发日志' }

// Phase 6：定位由「shipped 项目的 build notes」放宽为「我做过的那些事」
export const devLogIntro: LocalizedText = {
  en: 'Build notes and post-mortems from things I have actually done — shipped or not.',
  zh: '我做过的那些事的构建笔记与复盘——上线与否都算。',
}

export const devLogEmpty: LocalizedText = {
  en: 'No entries yet. This page will hold build notes and post-mortems from things I have done.',
  zh: '暂无文章。这个页面之后会放我做过的那些事的构建笔记与复盘。',
}

// Phase 6 新增：单篇页返回索引的链接文案（组件零硬编码文案）
export const devLogBackToIndex: LocalizedText = {
  en: 'All entries',
  zh: '全部文章',
}

export const devLogReadMore: LocalizedText = {
  en: 'Read',
  zh: '阅读',
}

// Phase 6 新增：文章内图片说明前缀（可选，暂未使用；插图时按需启用）
export const devLogFigureLabel: LocalizedText = {
  en: 'Figure',
  zh: '图',
}

export const devLogPosts: DevLogPost[] = [
  {
    // 第三篇（2026-11-06）：NVIDIA Ignite HWE/SWE OA + 对 AI 与方向的反思。
    // 正文由 Steven 口述成稿，Bud 只做：错别字 / 语句通顺 / 删重复 / 专名大小写与空格，
    //   **内容与说话方式均未改**。具体修正：梁文峰→梁文锋、Ai→AI、Nvidia→NVIDIA、Calhacks→Cal Hacks、
    //   hackerank→HackerRank、Leetcode→LeetCode、累的→累得、的→地；删掉重复的「此外」「相信自己的判断」；
    //   ⚠️ 原句「大幅拉低创业成本OPC」中的 OPC 语义不明，暂按笔误省略，待 Steven 确认是否补回。
    // 英文版按 Roadmap「Dev Log 写作契约」做**功能对等**（各自母语的口语层、不直译）：
    //   自嘲与短句保留，涉及 OA 内容 / 技术判断的句子一律平实。
    // 插图 SOP：exif_transpose → 最长边 880 → JPEG q80 / progressive / optimize，双语 alt + 实际像素防 CLS。
    //   现有 4 张：OA 邀请邮件（开头）、HWE 测评格式页（SWE/HWE 两段总结之后，2026-11-08 追加）、
    //   网站 Hero（收获段后）、Ramesh Lab（末段）。
    id: 'nvidia-ignite-oa-2026',
    date: '2026-11',
    category: { en: 'Notes', zh: '随笔' },
    title: {
      en: 'NVIDIA Ignite HWE & SWE Intern OA',
      zh: '英伟达 Ignite 实习 OA 与 AI 浅谈',
    },
    summary: {
      en: 'Two HackerRank OAs in one weekend, a hard check on my CS fundamentals, and why I am not switching majors just because AI is loud.',
      zh: '一个周末两场 HackerRank OA，一次对 CS 基本功的当头棒喝，以及我为什么没因为 AI 风大就转专业。',
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'Freshman year had barely started and I was already applying to internships like crazy — partly Berkeley, partly everyone around me doing the same. Then, out of nowhere, I saw on Xiaohongshu that NVIDIA had opened Ignite, an internship track for first- and second-years: HWE and SWE. Figured I’d throw in an application. They actually sent the OA. Both of them — SWE and HWE.',
          zh: '进入大一，受伯克利的氛围和身边同龄人的影响，我第一个学期就开始疯狂找实习。鬼使神差在小红书上刷到 NVIDIA 开了面向大一大二的低龄实习项目——Ignite HWE/SWE Intern，就想着投一下试试，没想到真的给我发来了 OA。SWE 和 HWE 都发了。',
        },
      },
      {
        type: 'img',
        src: imgNvidiaIgniteOaInvite,
        width: 880,
        height: 604,
        alt: {
          en: 'NVIDIA Ignite Hardware Engineering Intern (2027) HackerRank assessment invitation email, with a seven-day completion window and HackerRank tips.',
          zh: 'NVIDIA Ignite Hardware Engineering Intern (2027) 的 HackerRank 测评邀请邮件，写着 7 天内完成，附了几条答题提示。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The second that email landed, I was already writing fanfiction in my head: Jensen spots me, one thing leads to another, and suddenly I’m in the inner circle of the AI giant.',
          zh: '收到 OA 的那一刻毋庸置疑心潮澎湃啊，脑中都已经想好一些神奇剧情：比如突然被 Jensen 看中，然后一路高升走进 AI 巨头的圈子。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Reality, of course. The OA window landed right on top of Cal Hacks, which made it the most stressful weekend of freshman year so far: hacking Friday through Sunday (absolutely wiped), the NVIDIA OA on Sunday night, and R4A project 2 somewhere in the gaps.',
          zh: '当然现实是残酷的。这个 OA 的时间非常不巧地和我的 Cal Hacks 撞了，于是我度过了大一最最 stressful 的一个周末：周五六日搞 Cal Hacks（累得半死），周日晚上考 NVIDIA 的 OA，然后还要做英语 R4A 的 project 2。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'SWE OA in one line: HackerRank, hard. Mostly algorithms, LeetCode medium-to-hard. My fundamentals just aren’t there yet.',
          zh: '一句话总结 SWE 的 OA：HackerRank，题目很难，大概考的是一些算法问题。我的功底还是不够扎实，这些题目大概是 LeetCode medium 到 hard 的难度。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'HWE OA in one line: HackerRank, just as hard, maybe harder. I’d assumed it would lean on signals or circuits, which I’m stronger at. It was mostly foundational computer architecture instead — also not where my depth is.',
          zh: '一句话总结 HWE 的 OA：HackerRank，题目同样很难甚至更难。我原本以为会考一些我擅长的 signals 或者 circuits 之类的，但考的还是基础 CS architecture 偏多，这方面我的积累还是不够。',
        },
      },
      {
        // 2026-11-08 追加：接在两张 OA 的总结之后，展示 HWE 测评的题型与时长（Steven 提供截图）
        type: 'img',
        src: imgNvidiaIgniteHweOaFormat,
        width: 880,
        height: 480,
        alt: {
          en: 'The HackerRank test-format page for the NVIDIA Ignite Hardware Engineering Intern (2027) OA: a 75-minute timed test with one coding question, four multiple-choice questions and two true/false questions.',
          zh: 'NVIDIA Ignite Hardware Engineering Intern (2027) 的 HackerRank 测评格式页：限时 75 分钟，1 道 Coding、4 道选择题、2 道判断题。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'So what did I get out of it? Honestly, I don’t think these OAs go anywhere. But I’m still glad I got the shot, and now I know how HackerRank works and what a big-tech OA loop looks like — that’s worth something. The bigger win was rebuilding my resume from scratch: a CV I can actually send people, and this site. That matters. I’ve also decided to treat LeetCode the way I treat Cantonese on Duolingo — a little every day, slowly stacking up the coding and algorithms base.',
          zh: '说说我的收获。总而言之，这次 OA 我觉得希望不大，但至少被给了这次机会，我还是开心的。另外熟悉了 HackerRank 以及这些 big tech 公司 OA 的大致流程，还是比较赚的。更大的收获是我重新整理了自己的履历，产出了一份能用的 CV 以及个人网站，这个很重要。还有，我打算把刷 LeetCode 当成多邻国学粤语，每天一点点，慢慢攒 coding 和算法的底子。',
        },
      },
      {
        type: 'img',
        src: imgStevenliWebsiteHero,
        width: 880,
        height: 482,
        alt: {
          en: 'The hero section of this site in November 2026: “UC Berkeley 2030 / Software & Semiconductors”, a proof line, two buttons and a portrait over a faint calligraphy background.',
          zh: '2026 年 11 月这个网站的 Hero：UC Berkeley 2030 / Software & Semiconductors，proof line、两个按钮和证件照头像，背后是淡书法纹样。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Now, AI. Living in the Bay Area means a nonstop feed of someone barely older than me raising eight figures, or some AI thing printing money. It’s genuinely disorienting. I was close to just majoring in CS. This OA pulled me back. My strength isn’t code; it’s actual research and putting it to work. Switching to CS right now because AI is loud would never get me anywhere. And I think the way you learn CS has changed anyway. Will I learn it? Definitely. How, exactly, still needs more thought. Rough plan for now: learn CS to understand the mechanism behind AI — same reason you study electricity in physics — plus the practical basics of building things.',
          zh: '最后来讲讲 AI。身处湾区，铺天盖地的消息都是某某又年少成名融资上千万、某某 AI 又赚了多少钱，搞得人迷失方向，我差点就想去 major 计算机了——这个 OA 算是给我拉回来了。我的强项并不在代码，而在于真正的科学研究与应用。所以我现在要是只因为 AI 风大就转 CS，是无论如何也无法有所建树的。再加上，我认为现在学习 CS 的方式变了。我会不会学 CS 呢？答案是一定的，但怎么学，这个还需要我更细致地探索。目前大概想的是：学 CS 去了解 AI 的技术机理（就跟你物理学电是一样的），了解一些开发的必备知识。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Don’t be impatient. If you want to start a company you need a real skill and a real moat; an AI tool isn’t one. Do the work in front of you first. That’s why Liang Wenfeng gets to me — the Xunzi line: don’t be swayed by praise, don’t be scared by criticism; walk the path straight, keep yourself upright. Trust your own read, stay on what’s in front of you, and don’t pile into whatever people are calling the next big thing. That’s no different from chasing a stock on the way up.',
          zh: '人不能太浮躁。想要创业要有真本事，不是靠个 AI 就能上，要有自己的技术壁垒，要先专注眼前好好学习。这也是为什么梁文锋触动我：不诱于誉，不恐于诽。率道而行，端然正己。相信自己的判断，专注眼下，不要太浮躁，别搞得别人说什么有前景就去盲目投入，这和追涨杀跌、赌股票没区别。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'When the AI hype bubble pops, the real value shows up: it turns into cheap infrastructure, like electricity, and the cost of starting something drops a lot. You still need to know your stuff, though. You get me?',
          zh: '未来 AI 的浮躁泡沫一破裂，它真正的价值就会显现：逐渐变成越来越低成本的基础设施，就例如电力，大幅拉低创业的成本——但还是需要你有技术，懂么？',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Next up: keep applying — 影视飓风, a PM role at DeepSeek (I really do admire Liang Wenfeng right now, and I’d like to contribute something back home). Actually ship LastCall. And join Ramesh’s lab.',
          zh: '一些我的下一步：继续投递一些岗位申请，比如影视飓风、DeepSeek 的 PM（我现在真的很崇拜梁文锋，也希望能够为国内的发展作出点贡献）。把 LastCall 也落地。加入 Ramesh 的课题组。',
        },
      },
      {
        type: 'img',
        src: imgRameshLab,
        width: 880,
        height: 480,
        alt: {
          en: 'The Ramesh Lab group page at Berkeley Lab: a team photo under the heading “A Team Approach at the Crossroads of Science & Engineering”.',
          zh: 'Berkeley Lab 的 Ramesh Lab 课题组主页：团队合影，标题是「A Team Approach at the Crossroads of Science & Engineering」。',
        },
      },
    ],
  },
  {
    // 第五篇（2026-11-24 上线）：Cal Hacks 13.0 + LastCall。
    // 来源：Steven 2026-11-24 口述原稿 + LastCall 仓库 docs/PRD.md、DEVPOST.md、TECHSTACK.md、源码，
    //   以及 Devpost 项目页（https://devpost.com/software/lastcall-nswo04）。
    // ⚠️ 口述里的队友（大二，Kevin）按 Roadmap 写作契约「文章内不点名学生」处理，只写「大二的同学」。
    // 技术细节只写已实现：SwiftUI / SwiftData / VisionKit DataScanner、本地存储、Calendar 日期归一、
    //   条码字符串存储、移除事务 + 同格补位；临期挂牌卡已有，但支付 / 线上售卖仍是计划，不写成已实现。
    // 四张图按 Steven @image#1~#4 落段。#1 实际是 HackPortal 仓库截图，图注如实说明是当时交的 take-home。
    id: 'lastcall-cal-hacks-2026',
    date: '2026-10',
    category: { en: 'Dev', zh: '开发' },
    title: { en: 'Cal Hacks 13.0 and LastCall', zh: 'Cal Hacks 13.0 和 LastCall' },
    summary: {
      en: 'From the Tech Team interviews to the Cal Hacks demo round — and an offline iOS app for my mom’s convenience store that actually ran on a phone.',
      zh: '从 Tech Team 面试走到 Cal Hacks 路演，最后留下一个给我妈便利店做的离线 iOS App：LastCall。',
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'Cal Hacks was the first club I wanted to join after I got to Berkeley. Getting on the Tech Team is hard — it seems they take only one or two people a year. I made it to the final interview round and submitted the take-home, but still didn’t get in. The Tech Director told me to come as a hacker this year and apply again next year.',
          zh: 'Cal Hacks 是我到伯克利之后第一个想进的社团。Tech Team 不好进，好像一年只招一两个。我一路进了最后一轮面试，take-home 也交了，最后还是没选上。Tech Director 的意思是：今年先作为 hacker 来参加 Cal Hacks，明年再申请。',
        },
      },
      {
        type: 'img',
        src: imgCalHacksHackportalRepo,
        width: 880,
        height: 482,
        alt: {
          en: 'GitHub page for the public hackportal repo, described as a Cal Hacks take-home miniature hackathon application portal, with a live demo link and recent commits.',
          zh: '公开的 hackportal 仓库页面，简介写着 Cal Hacks take-home、简化版黑客松申请门户，右侧有在线演示链接和最近提交。',
        },
        caption: {
          en: 'The take-home I submitted: a miniature hackathon application portal.',
          zh: '当时交的 take-home：一个简化版黑客松申请门户。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Anyway, I went to “the world’s largest collegiate hackathon”. The vibe: absolutely wrecked. I’d been thinking about doing TreeHacks too, but Cal Hacks killed that idea fast. Nothing burns quite like watching a big chunk of code fall apart all at once, and the venue was loud enough to turn it into a two-front attack — brain and body.',
          zh: 'Anyway，我就来参加这个「世界上最大的大学生黑客松」了。体感就一个词：超级无敌累。我本来还想接着去 TreeHacks，Cal Hacks 一趟下来直接打消了这个念头。代码大批量跑崩的时候尤其烧心，会场又人声嘈杂，精神和身体双重攻击。',
        },
      },
      {
        type: 'img',
        src: imgCalHacksVenue,
        width: 495,
        height: 880,
        alt: {
          en: 'The hackathon venue: long rows of shared tables packed with hackers and laptops under a high, dark steel-truss ceiling.',
          zh: '黑客松现场：高高的深色钢桁架天花板下，一长排一长排的共享桌上坐满了人和笔记本电脑。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'My teammate was a sophomore, and really easy to work with. We built LastCall. The idea came from a small headache my mom has: she runs a convenience store, and with a shelf full of nearly identical products, she needed a fast way to catch the ones going out of date before a customer picked them up.',
          zh: '这次的队友是一个大二的同学，人特别好。我们做的东西叫 LastCall，灵感来自我妈的一个小麻烦：她开着一家便利店，店里有海量长得差不多的商品，她需要一个够快的方法把临期和过期的找出来，别让顾客买到。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'I built it as a native iOS app in SwiftUI. We thought about a web version, but native won mostly because of scanning: VisionKit’s DataScannerViewController is built into the system, runs on-device, and works fully offline. SwiftUI handled the UI, SwiftData handled persistence, and the whole demo — register, check what’s near expiry, remove — ran in airplane mode with zero third-party dependencies.',
          zh: '我这次用 SwiftUI 做原生 iOS。前面纠结过要不要做网页版，最后选原生，主要是扫码：VisionKit 的 DataScannerViewController 是系统自带的，设备端就能跑，完全离线；SwiftUI 负责界面，SwiftData 做本地存储，整个 demo 飞行模式下也能走完上架、查临期、下架的全流程，一个第三方依赖都没引。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The biggest takeaway was Apple’s dev ecosystem: once Developer Mode is on, Xcode runs the app straight onto the phone. No SDK wrangling, no server, and the scanner comes with the OS. Getting a real device to run it felt like a big deal beforehand; in the end the signing setup was the main thing to get through.',
          zh: '最大的收获还得是 Apple 的开发生态：iPhone 打开开发者模式以后，Xcode 里点 Run，App 就直接跑到手机上。不用配 SDK，不用搭服务器，扫码能力也是系统免费给的。真机能跑起来这件事，以前觉得挺遥远，做完发现主要卡在签名那一步。',
        },
      },
      {
        type: 'img',
        src: imgLastcallXcodeIphone,
        width: 880,
        height: 542,
        alt: {
          en: 'Xcode with an iPhone device selected, showing the CellBox SwiftUI view and shelf-slot logic in the editor while the Canvas is paused.',
          zh: 'Xcode 里选中了 iPhone 设备，编辑器中是 CellBox 这个 SwiftUI 视图和货架格子的逻辑，右侧 Canvas 处于暂停状态。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The hard part wasn’t deciding whether something was expired — it was keeping the digital record aligned with the physical shelf. Each item gets a container → slot → depth position, like A1 or A2. Scan the barcode, enter the production date and shelf life, and the app derives the expiry date. Taking something off requires scanning the full barcode again; the removal is recorded and the items behind it shift forward in the same slot. Date math uses Calendar with start-of-day normalization, because adding 86,400 seconds breaks across daylight-saving changes. Barcodes are stored as strings, otherwise a code like 0641234567 quietly loses its leading zero.',
          zh: '真正麻烦的不是判断「过期了没」，而是让数字地址和货架对得上。我们把每件商品记到容器 → 格子 → 纵深，比如 A1、A2；上架扫条码、填生产日期和保质期，过期日期自动算；下架要再扫一次完整条码核对，移除记录写进去，同格后面的商品自动往前补位。日期不能用 86400 秒硬加，夏令时会出错，全部走 Calendar 并按当天 00:00 归一；条码也必须按字符串存，不然 0641234567 这种前导零会直接掉。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Then we submitted on Devpost, and this was my biggest mistake of the event: to be judged, you have to enter the main Cal Hacks track first; only then are you also considered for sponsor tracks. I only entered Anthropic’s “Best Hack for Humanity” and skipped the main track. So even though we made it to the demo round, we were out of judging. Devpost: https://devpost.com/software/lastcall-nswo04',
          zh: '做完之后我们上传了 Devpost。这里是本次最大的失误：想被评选，必须先投 Cal Hacks 主赛道，之后才会同时被赞助商赛道考虑。我只投了 Anthropic 的「Best Hack for Humanity」，没投主赛道。结果就是，项目即使进了路演 round，最后也没进评选。Devpost 在这：https://devpost.com/software/lastcall-nswo04',
        },
      },
      {
        type: 'img',
        src: imgLastcallDevpost,
        width: 880,
        height: 481,
        alt: {
          en: 'The LastCall Devpost submission page: a demo video at the top, submitted to Cal Hacks 13.0, with Youcheng Li listed as a creator and the Inspiration section below.',
          zh: 'LastCall 的 Devpost 提交页：上方是演示视频，Submitted to 写着 Cal Hacks 13.0，创作者列表里有 Youcheng Li，下方是 Inspiration 段落。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Anyway, the next part matters more. Apple’s Swift Student Challenge is coming up, and I’m going to use it to keep working on LastCall. Three things I want to push over winter break:',
          zh: 'Anyway，说一下我接下来的安排，这个最重要：苹果的 Swift Student Challenge 马上要开了，我打算参加，继续打磨 LastCall。寒假期间主要想推三个方向：',
        },
      },
      {
        type: 'p',
        text: {
          en: '1. Cut the input cost. Right now you scan one item, then type in its production date and shelf life, one by one. That’s tedious enough to kill adoption. What I want next: keep the API key on the server, call a model to read the date off a package photo, and leave the user with a quick confirmation. On-device Vision OCR is another path that needs no cloud. Either way, scanning shouldn’t be followed by a wall of typing.',
          zh: '1. 把输入成本砍下来。现在是扫一个商品、再手动填生产日期和保质期，一件一件来，成本高到会直接把使用意愿压下去。下一步想的是：站内放 API key 调 AI，让它从包装照片里把日期读出来，人只需要确认一下；用 Apple 的 Vision 在设备上做 OCR 也是一条不用上云的路。总之扫码之后别再让我手打一堆字。',
        },
      },
      {
        type: 'p',
        text: {
          en: '2. Bring in hardware. The first idea is generating and printing QR stickers: one on each item or slot, so scanning takes you straight to that exact product instead of guessing which of ten identical bottles is the one you scanned. The Cal Hacks demo proved the software loop works; next I want to make finding things cheaper.',
          zh: '2. 逐步安排硬件。初步想的是配套二维码的生成和打印：每件商品或每个格位贴一张码，想知道单个商品的信息，扫一下就跳到那一件，而不是对着一排长得一样的商品猜哪瓶是哪瓶。Cal Hacks 的 demo 证明纯软件链路能跑，下一步是把查找成本再压低。',
        },
      },
      {
        type: 'p',
        text: {
          en: '3. Actually sell the near-expiry stock. There’s already a Deals tab in the app that turns a near-expiry item into a card with a discounted price and its shelf location, but the actual selling part isn’t there — no checkout, no online orders, no transfers between stores. I want to close that loop: get the stock discounted and sold early instead of writing it off on expiry day.',
          zh: '3. 临期产品二次售卖。现在 App 里已经有个临期专区，能把快过期的商品挂成一张带折后价和取货位置的卡片；但真正的售卖还没有，支付、线上下单、门店之间调货都没接。想把它做成一条完整的链路：卖不掉的临期货，早点折价卖出去，而不是到点直接报损。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'I didn’t get into the Tech Team and I didn’t get judged at Cal Hacks. But LastCall came out of a real problem my mom has, and it ran on a real phone. I’ll take that.',
          zh: 'Cal Hacks 这趟，Tech Team 没进，奖也没评上。但 LastCall 是从我妈的真实麻烦里长出来的东西，而且已经在真机上跑通了。这个我认。',
        },
      },
    ],
  },
  {
    // 第二篇（2026-10-18）：Tempo 开发受阻的复盘。正文由 Steven 本人撰写，Bud 只修错别字与专名拼写，内容未改动。
    id: 'tempo-diagnosis-2026',
    date: '2026-10',
    category: { en: 'Dev', zh: '开发' },
    title: { en: 'Diagnosing Tempo', zh: 'Tempo的诊断书' },
    summary: {
      en: 'Tempo is stuck and this is the post-mortem: a roadmap that melted, a context window that exploded, and four lessons I should have learned earlier.',
      zh: 'Tempo 开发受阻的复盘：roadmap 失控、上下文撑爆、定位没想清，以及四条本该早点学会的教训。',
    },
    cover: {
      src: imgTempoDashboard,
      width: 880,
      height: 571,
      alt: {
        en: 'The Tempo course dashboard: today’s tasks pulled in from Canvas, sorted by deadline pressure.',
        zh: 'Tempo 的课程面板：从 Canvas 抓来的今日任务，按紧迫度折叠排序。',
      },
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'Sigh. The most painful thing these past few weeks has been watching Tempo’s development get more and more blocked — especially code review and fixes, UI design, and feature building. A complete mess...',
          zh: '唉这些天最让我难受的事莫过于Tempo的开发越来越受阻，尤其是代码review和修改、UI设计，以及功能建造上，简直一团乱麻。。。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'First, what even is Tempo? At the start of my first semester at Berkeley, systems and platforms were flying at me from every direction (one thing on bCourses, another on Gradescope, another on Expert TA — the most ridiculous one, why do I have to pay to do my homework?). And the syllabi professors hand out are long, unreadable, and somehow still easy to miss important info in. So my roommate Harris and I decided to build a unified portal (Tempo) that pulls all the platforms into one place.',
          zh: '首先先讲讲Tempo是个啥。伯克利大一第一学期开学初，各种系统，平台满天飞（一会儿在bCourses，一会儿在Gradescope，一会儿又在Expert TA【这个平台最离谱，为什么还要付费才能做作业？】），并且，老师给的Syllabus那可以说是又臭又长，根本读不下去，还会miss很多重要信息。于是我和我的室友Harris就决定做一个unified portal（也就是Tempo）来集合所有的平台，一站通的那种感觉。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The overall logic is not complicated: a few multimodal LLMs running in the background (mostly DeepSeek), connected to each platform through API access tokens (Canvas, for example), pulling info from them and keeping everything up to date.',
          zh: '整体逻辑其实不难，后台调度几个多模态LLM（主要DeepSeek），然后通过API access Token连接到各个平台（比如Canvas）然后抓取上面的信息实时更新。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'I even had this bigger vision of a personal secretary — and then, mid-build, I found out Google had already shipped MUSE?? Exactly what I wanted to build, super-powered edition.',
          zh: '我甚至还有个大的设想就是personal secretary，结果我做着做着发现怎么Google已经发布了MUSE？？？完完全全就是我想做的东西的超级无敌加强版。',
        },
      },
      {
        type: 'img',
        src: imgGoogleMuse,
        width: 802,
        height: 482,
        alt: {
          en: 'Google MUSE, an AI assistant product that overlaps with the personal-secretary vision I had for Tempo.',
          zh: 'Google MUSE——和我给 Tempo 设想的 personal secretary 方向高度重合的 AI 助手产品。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Now for Tempo’s actual problems. The one that stresses me out most: the development roadmap completely fell apart. Before we started, I designed a roadmap with 5 phases, where Phase 0 handled the MVP. I actually finished Phase 0 pretty early — by the cards, I should have been moving on to Private Beta.',
          zh: '现在主要来聊聊Tempo的问题。。（最让我焦心的）首先是这个开发roadmap完全混乱掉了。开始动工之前设计了一个roadmap，里面分成了5个phase，Phase 0主要负责MVP。其实我Phase 0很早就完工了，按照卡上的安排，我应该是要开始Private Beta了。',
        },
      },
      {
        type: 'img',
        src: imgTempoRoadmapDocs,
        width: 880,
        height: 480,
        alt: {
          en: 'Tempo’s “development constitution” docs on GitHub — the roadmap has grown far past what it was designed to hold.',
          zh: 'GitHub 上 Tempo 的开发宪法文档——roadmap 早已超出当初设计的体量。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'But instead: build a little, discover a new problem, want to add a new feature. The roadmap that was supposed to end at P0-4 got stretched all the way to P0-5-4, and the project’s “development constitution” docs are now a mess. [Problem 1]',
          zh: '结果呢，我一边做，一边发现新的问题，然后想要加新的功能来完善，这就导致原本直到P0-4的roadmap硬生生被我撑到P0-5-4。整个开发宪法Docs现在就很混乱。【问题1】',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Second, my main coder this time has been WorkBuddy (Hy4 has gotten seriously smart, I have to say), and some of the project’s internal docs have grown so large that content management broke down. Every time I tell WorkBuddy to start work and have it read the constitution, the context just explodes. There are also hidden files like .workbuddy/memory that I can’t even see, let alone edit — that’s a big problem. [Problem 2]',
          zh: '其次，我这次主要的码农是WorkBuddy（Hy4现在变得很聪明不得不说），现在项目内部的一些文档存储太太太大了，内容管理也出现了问题，导致我每次和WorkBuddy说开工，叫他读开发宪法的时候，上下文直接撑爆。。也有一些隐藏文件例如.workbuddy/memory，我完全看不到，也无法修改，这是个很大的问题【问题2】',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Third: positioning, monetization, and per-feature polish were never thought through. Take external link monitoring. The current approach caches the page inside Tempo and fetches it through the scheduling API. But a lot of what comes back is badly parsed and full of irrelevant noise. And Tempo doesn’t really know how to handle what it fetches: “Unit 2 exam” and “Test 2” are the same thing, but Tempo adds a new item instead of overwriting. The way WorkBuddy fixed it was incredibly crude — it just found some semantic set to stuff into the prompt. That’s pure garbage-code stacking (which is exactly why the project becomes impossible to change once it gets big).',
          zh: '然后，项目定位，变现逻辑，以及单个功能优化没想清楚。举例子来说：关于外部链接监控这个功能，目前的做法是缓存在Tempo平台里，然后通过调度API去抓。但是很多时候抓取到的信息都存在解析结果非常失真，且带有大量非必要信息的情况。而且，Tempo没有办法很好理解怎么处理抓取到的信息：比如Unit 2 exam和Test 2其实是一个东西，但是Tempo会新加一个东西而不是覆盖。WorkBuddy修的方式也特别粗暴，单纯找了个语义集来输入进prompt里，这么做完全是堆叠垃圾代码（这也是为什么项目一大完全改不动。）',
        },
      },
      {
        type: 'img',
        src: imgTempoMessagesParse,
        width: 880,
        height: 568,
        alt: {
          en: 'Tempo’s message feed: a MATH 53 course update parsed from a course-page link, with plenty of noisy, low-value “updates”.',
          zh: 'Tempo 的消息栏：一条从课程网页链接解析出来的 MATH 53 内容更新，混着不少失真、低价值的「更新」。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'And on top of all that, I never thought about the real-world usage scenario. Right now basically every feature on the site runs through my personal AI API key to call DeepSeek. If the user base grows, my key can’t survive a flood of requests in a short window — the whole thing just falls over.',
          zh: '还有就是没有考虑到真实的使用场景。现在全站功能基本全部要依靠我个人的AI API Key来调度DeepSeek，如果用户量涨起来了，我的key根本撑不住短时间内大量的request，一下子就崩掉了。',
        },
      },
      {
        type: 'img',
        src: imgTempoSettingsPrivacy,
        width: 880,
        height: 479,
        alt: {
          en: 'Tempo’s Settings & Privacy page: syllabi, tasks and Canvas connections stored in Supabase, with AI calls routed through a single personal API key.',
          zh: 'Tempo 的「设置与隐私」页：课程与任务存在 Supabase，AI 调度走的是我个人的 API key。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Finally, the UI is badly designed (I think it needs an Astra redesign), and the site’s main language is still Chinese.',
          zh: '最后，UI设计得特别烂（我觉得需要Astra redesign一下），以及全站目前的主语言还是中文。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'My summary at the end — I learned a lot:',
          zh: '我最后的总结：学到了很多很多：',
        },
      },
      {
        type: 'p',
        text: {
          en: '1. You really can’t get lazy and let WorkBuddy or any agent do all the coding for you. The pile of garbage code grows fast, especially when fixing or completing a specific feature — the AI’s fix is always a local patch, never a logic change.',
          zh: '1. 真的是不能偷懒纯让WorkBuddy/any agent来完全代劳coding，屎山代码越攒越多，尤其是修复/补全特定功能的时候，AI的修法完全是局部修好，而不是改逻辑',
        },
      },
      {
        type: 'p',
        text: {
          en: '2. Once a roadmap is set, it really shouldn’t move. At minimum, don’t keep adding tasks to the current phase, or there will never be a day it gets done.',
          zh: '2. Roadmap设计好，就真的不能动了。至少当前Phase的任务不能随便乱加，否则根本就没有完成的那一天。',
        },
      },
      {
        type: 'p',
        text: {
          en: '3. File, context, and constitution management have to be planned ahead of time, otherwise they blow up easily — and the project will quietly generate piles of useless, meaningless junk docs on its own.',
          zh: '3. 文件和上下文和宪法管理一定要提前想好，要不然很容易就轻轻松松撑爆，项目也会自己生成一堆根本没有用没有意义的垃圾文档。',
        },
      },
      {
        type: 'p',
        text: {
          en: '4. UI and site language have to move in sync with development. Otherwise, once the project gets big, retrofitting them is a huge job...',
          zh: '4. UI/站内语言一定要和开发同步进行。否则到了后面项目规模做大了，UI和站内语言再去改动就会是个huge work。。。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'And my solution is simple: thank god for GitHub. I’ll roll back a few versions, fix the development docs first, and then keep building.',
          zh: '我的解决方案也很简单：还好我有Github。我会回滚几个版本，然后先把开发文档什么的修好，然后再继续开发。',
        },
      },
    ],
  },
  {
    id: 'x-institute-ta-2026',
    date: '2026',
    category: { en: 'Lab', zh: '实验室' },
    // Steven 指定（2026-10-09）：不叫「十天助教」，就叫 X-Institute 3.0 —— 学生冬令营 → 学生暑期营 → 助教，第三次回来
    title: { en: 'X-Institute 3.0', zh: 'X-Institute 3.0' },
    summary: {
      en: 'First time on the other side of the room: teaching middle and high schoolers to build their own contact-angle tool with AI — and getting the excitement back.',
      zh: '第一次站在讲台的另一边：带初中生和高中生用 AI 写自己的接触角测量工具，也把学习的兴奋捡了回来。',
    },
    cover: {
      src: imgXInstituteBuilding,
      width: 807,
      height: 880,
      alt: {
        en: 'The X-Institute building in Shenzhen on a clear summer day.',
        zh: '晴天的深圳零一学院大楼。',
      },
    },
    body: [
      { type: 'h', text: { en: 'That one WeChat message', zh: '那条微信' } },
      {
        type: 'p',
        text: {
          en: 'Summer 2026. I had just graduated from SCIE, was not heading to Berkeley until September, and had a gap in between. I did not want to sit around.',
          zh: '2026 年夏天，SCIE 毕业，九月才去 Berkeley，中间空着一段。我不想闲着。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Around then I posted a graduation update on LinkedIn. One of the teachers at X-Institute saw it and messaged me on WeChat: want to come be a TA?',
          zh: '那阵子我在 LinkedIn 发了条毕业动态，零一的老师刷到了，直接微信来问：要不要来当助教。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'No interview, no offer letter — just one message. But it was my first real job, and it was not an easy one.',
          zh: '没有面试，没有 offer letter，就一条微信。但这是我第一份真正意义上的实习工作，干起来一点不含糊。',
        },
      },

      { type: 'h', text: { en: 'The line starts back in 8th grade', zh: '这条线是从八年级铺过来的' } },
      {
        type: 'p',
        text: {
          en: 'My history with X-Institute starts the winter of 8th grade. I had just started at SCIE, had nothing going on over winter break, and saw a repost on the school website — Tsinghua was running something. I wanted hands-on experience early, so I signed up for the winter camp.',
          zh: '我跟零一的缘分得从八年级寒假讲起。当时刚进深国交，寒假闲着没事，刷学校官网看到一篇转发的推文——清华大学办的。想着正好早点有一段 hands-on 的经历，就报了冬令营。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'That is where I first touched an SEM and an AFM, and looked at the microstructure of a lotus leaf and the structural color on a Blue Morpho wing — that blue is not pigment, it is the wing’s own physical structure doing the work. It was a tiny first attempt, but that winter is when I got hooked on the micro scale and on materials. Basically everything I have done since sits on top of it.',
          zh: '那次我第一次摸到 SEM 和 AFM，看荷叶表面的微结构，还有大蓝闪蝶翅膀上的结构色——那种蓝不是色素，是翅膀自己的物理结构把光“算”出来的。当时只是个特别小的尝试，可就是那个冬天，我跟 micro 尺度和材料结上了缘，后来所有的科研基本都 base 在这上面。',
        },
      },
      {
        type: 'img',
        src: imgAfmLotus2022,
        width: 880,
        height: 660,
        alt: {
          en: 'The benchtop AFM used to probe the surface microstructure of a lotus leaf during the 2022 winter camp.',
          zh: '2022 年冬令营里用来探查荷叶表面微结构的台式 AFM。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The next summer I went back for the research camp, studying how micro- and nano-scale surface structures affect droplet condensation efficiency. That project got me the Starry Youth title and tied me to X-Institute for good. After that: underactuated soft robotic grippers with Prof. Zhang Wenzeng, CdSe quantum dots at Penn ESAP, an IEEE paper — all the same direction.',
          zh: '来年暑假我又回去，进了暑期科研营，研究微纳表面结构怎么影响水滴的冷凝效率。那个项目给了我“星空少年”的称号，也把我跟零一彻底绑上了。再往后就是跟张文增老师做欠驱动的柔性机器人抓手、去宾大 ESAP 做 CdSe 量子点、发 IEEE 论文——一路都是同一个方向。',
        },
      },
      {
        type: 'img',
        src: imgCondensation2023,
        width: 880,
        height: 495,
        alt: {
          en: 'The bench setup for the surface-structure vs. condensation-efficiency project at the 2023 summer research camp.',
          zh: '2023 年暑期科研营，表面微结构与冷凝效率项目的实验台。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'So the offer felt less like being picked and more like the obvious next step: they knew I was free, and I knew where the road led.',
          zh: '所以这个 offer 与其说是被选中，不如说是水到渠成：他们知道我闲着，我知道这条路通向哪。',
        },
      },

      { type: 'h', text: { en: 'Ten days', zh: '十天' } },
      {
        type: 'p',
        text: {
          en: 'Every morning I left home at 7 to get to the X-Institute research base. Mornings I sat in on the technical and theoretical classes with the students; afternoons were their own project time, and that is where all my work was — showing them how to write a thesis, helping the ones who wanted to build a platform code it, setting experiment parameters together.',
          zh: '每天早上七点从家出门，到零一的研究基地。上午跟着学生一起上 technical 和 theoretical 的课；下午是他们做自己 project 的时间，我的活儿基本都在下午——教怎么写 thesis，想搭平台的帮他们 coding，一起把实验参数定下来。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Middle schoolers and high schoolers, several years apart, projects all over the place. In a single afternoon I could finish explaining how to structure a paper and immediately have to debug someone else’s code.',
          zh: '有初中生也有高中生，年龄差好几岁，project 也五花八门。同一个下午我可能刚讲完文章怎么组织，转头就得帮另一个人 debug。',
        },
      },
      {
        type: 'img',
        src: imgXInstituteTa2026,
        width: 880,
        height: 587,
        alt: {
          en: 'Walking a student through the measurement software during the 2026 X-Institute program.',
          zh: '在 2026 年 X-Institute 项目里带学生操作测量软件。',
        },
      },

      { type: 'h', text: { en: 'Making them build their own', zh: '让学生自己写一个' } },
      {
        type: 'p',
        text: {
          en: 'The contact-angle tool was actually part of the course design. Prof. Zhao Meng did not want us stuck in theory — he wanted us to build something. AI agents were having their moment right then, so it turned into me leading the students to code their own platform with AI assistance: photograph the droplet, measure the contact angle, decide whether the surface is hydrophilic or hydrophobic.',
          zh: '接触角工具其实是课程设计的一部分。赵蒙老师不想让大家只停在理论上，想让我们动手搭点东西出来。赶上那阵子 AI agents 的概念正热，于是就变成了我带着他们，用 AI 辅助 code 出一个自己的平台：拍下液滴的照片，测接触角，判断这块材料是亲水还是疏水。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'There was a commercial instrument in the lab (the software looked like it came from another era), but the course was not about operating a machine — it was about understanding the measurement itself: how you get an angle out of a photo, where the baseline sits, how the tangent is drawn. Write it once yourself and you do not forget it.',
          zh: '实验室里商用仪器是有的（配套软件看着很有年代感），但课程要的不是“会用仪器”，是“理解测量这件事本身”——角度怎么从一张照片里算出来，基线在哪、切线怎么定。自己写过一遍就再也忘不掉了。',
        },
      },
      {
        type: 'img',
        src: imgCommercialContactAngle,
        width: 880,
        height: 660,
        alt: {
          en: 'The lab’s commercial contact-angle goniometer and its bundled measurement software.',
          zh: '实验室的商用接触角测量仪及其配套测量软件。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Honestly, live-coding with a room of middle and high schoolers was new to me.',
          zh: '说实话，带着一群初中生高中生现场开发，我之前没干过。',
        },
      },

      { type: 'h', text: { en: 'Tencent', zh: '腾讯' } },
      {
        type: 'p',
        text: {
          en: 'We also went to Tencent, where they walked us through how WorkBuddy is built today and where they want to take it, blah blah blah.',
          zh: '中间还去了一趟腾讯，听他们讲 WorkBuddy 现在怎么开发、未来想做成什么样，blabla。',
        },
      },

      { type: 'h', text: { en: 'What I picked up too', zh: '我也在学' } },
      {
        type: 'p',
        text: {
          en: 'I learned a fair amount myself over those ten days: how to actually work with AI on a codebase, how a project’s architecture and its base contract docs get set up, how you keep a big project from falling apart.',
          zh: '这十天我自己也学到一堆东西：AI 开发的工作流、一个项目的架构和基础契约文档怎么搭、大 project 怎么管。',
        },
      },

      {
        type: 'h',
        text: {
          en: 'From the kid at the SEM to the one bringing kids to it',
          zh: '从看 SEM 的人，到带人看 SEM 的人',
        },
      },
      {
        type: 'p',
        text: {
          en: 'We also took the students to Shenzhen University — saw an SEM, and toured their battery lab, all kinds of battery research, solid-state, liquid, the works.',
          zh: '还带学生去了一趟深大。看了 SEM，还参观了他们的电池车间——各种电池的研究，固态的、液态的，一堆。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Four winters earlier, I was the kid leaning into an SEM screen for the first time, looking at a lotus leaf. Four years later I was standing next to the group, watching a new batch of kids lean in for their first time. When that circle closed — honestly, that was something.',
          zh: '四年前那个冬天，我是第一次凑在 SEM 屏幕前看荷叶微结构的那个学生；四年后我站在队伍旁边，看另一拨学生第一次凑上去。这个圈画上的时候，讲真，挺妙的。',
        },
      },

      { type: 'h', text: { en: 'Tired', zh: '累' } },
      {
        type: 'p',
        text: {
          en: 'Ten days was tiring, and the 7 a.m. start was only the beginning — classes during the day, project support in the afternoon, and catching whatever question came at me from any direction.',
          zh: '十天很累，早上七点出门只是开始——白天上课、下午辅导，还得随时接住学生各种问题。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'But it also gave me back the feeling of learning and making things — except this time I was on the other side of the room, watching someone else go through what I went through four years ago, and being happy for them in the second it clicks.',
          zh: '但也重新感受到学习和创造那种兴奋，只不过这次是站在讲台的另一边：看别人经历我四年前经历过的事，在他们搞懂的那个瞬间替他们高兴。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'When it settled, the pay came out to ¥3,232. Honestly, that felt like a lot.',
          zh: '最后结算下来，3232 块。讲真，我觉得超级多。',
        },
      },
    ],
  },
  {
    // 第四篇（2026-11-21 上线）：吉他八度泛音效果器。
    // ⚠️ 2026-11-21 订正：项目实际完成于 2025-12，date 由 2026-11 改为 2025-12，
    //    并从数组最前移到末尾（索引页顺序 = 数组顺序，按 date 倒序）。勿按「新文章插最前」挪回。
    // 中文成稿由 Steven 提供，Bud 只做少许修改：
    //   错字与搭配（与我→对我、本身→本来、负电极→负电压、该品→这个音、给他→把它）、
    //   语句通顺、专名（wawa- effect→wah-wah）、数字与单位空格；「频率翻倍的驻波」→「频率翻倍的波形」
    //   （这里得到的是 2 倍频信号，不是驻波）。内容与口吻未动。
    // 英文按 Roadmap「Dev Log 写作契约」做功能对等：口语层与自嘲保留，电路 / 信号链描述一律平实。
    // 插图 6 张按原稿 @image#1~#6 的位置落段，SOP 同前（最长边 880 / JPEG q80 / progressive / 双语 alt / 实际像素）。
    id: 'octave-pedal-2026',
    date: '2025-12',
    category: { en: 'Dev', zh: '开发' },
    title: { en: 'Building an Octave Pedal', zh: '做一台泛音效果器' },
    summary: {
      en: 'I wanted to skip practicing pinch harmonics; I ended up taking my guitar apart, building two boards, and learning that a single 9V supply quietly turns full-wave rectification into half-wave.',
      zh: '想偷懒不练人工泛音，结果拆了吉他、做了两版板子，最后发现问题出在电池只有正电压。',
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'The world runs on lazy people — I somehow buy that now. This whole thing started with one problem: pinch harmonics. It’s that electric-guitar trick where a note suddenly jumps up an octave mid-solo, and it’s really catchy. But I’d just moved from acoustic guitar to electric guitar, and I could not land it. So I started wondering if there was some other way to get there.',
          zh: '世界科技由懒人推动，这句话我现在 somehow 认可了。吉他泛音效果器这个项目始于一个难题：人工泛音（Pinch Harmonic）。作为一种电吉他的加花技巧，它能让吉他 solo 在弹奏某个音的时候瞬间升调，很 catchy。但是作为一个刚从 acoustic guitar 转 electric guitar 的人，这个技巧对我而言实在是太难掌握，于是我开始想有没有别的什么方法可以解决。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The idea came from pedals. At the end of the day an electric guitar just puts out an electrical signal (in wave form), and a pedal reshapes that signal into whatever effect you want — fuzz, wah-wah, that sort of thing. I’d also just finished sound and waves in physics. So the pinch harmonic problem turned into: how do you rectify the guitar’s output signal to get a waveform at double the frequency?',
          zh: '解决这个问题的灵感来源于效果器。因为说到底，电吉他的输出就是一连串的电信号（in wave form），而效果器就是通过整流电信号从而实现各种各样的声音效果，比如 Fuzz、wah-wah 之类的。恰巧物理刚学完 sound and waves，所以，Pinch Harmonic 的问题也就变成了：怎么整流电吉他输出的电信号，得到频率翻倍的波形。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'First thing I did: took my guitar apart.',
          zh: '我做的第一件事就是把我的电吉他给拆了：',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalTeardown,
        width: 520,
        height: 692,
        alt: {
          en: 'The disassembled yellow electric guitar: the whole pickup assembly lifted out, with its wiring, potentiometers and switch still connected.',
          zh: '拆开的黄色电吉他：整块拾音器总成被拎了出来，线缆、电位器和开关还连着。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'The principle behind the signal is honestly simple: metal strings cut the pickup’s magnetic field and induce a current. Different vibration frequencies give you different signal frequencies, which is where the notes come from. The guitar just adds a few filters and amplifiers on top so the signal is easier to pick up.',
          zh: '其实电吉他输出电信号的原理特简单：金属琴弦切割拾音器的磁场，从而产生电流。又因为琴弦震动频率不一，产出电信号的频率就跟着这个音走，由此产生不同音符。电吉他就是加了几个滤波器和放大器，从而让电信号更好被识别。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'With that clear, I wanted to put a scope on the waveform right away — but the signal from strings cutting magnetic field lines is still way too weak. So I added four little amplifier modules:',
          zh: '清楚信号产生原理后，我本来想直接上示波器抓波形的，但是琴弦切割磁场线产生的电信号还是太微弱了，所以我又加了 4 个放大波形的模块：',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalAmpScope,
        width: 568,
        height: 426,
        alt: {
          en: 'Four small amplifier boards wired up to a handheld oscilloscope on the bench, which finally shows the guitar’s waveform.',
          zh: '实验台上四块小放大板接到手持示波器，终于看到了吉他输出的波形。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Once the waveform was actually on screen, I drew the schematic. Then I threw together a prototype from whatever was lying around, just to see if it could filter and full-wave rectify.',
          zh: '成功观察到波形后我开始设计原理图。设计完后我先用现成材料搭了一个模型，看看能不能起到滤波 + 全波整流的效果。',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalBreadboard,
        width: 522,
        height: 392,
        alt: {
          en: 'The bench prototype built out of loose resistors, diodes and blue and white jumper wires, used to test filtering and full-wave rectification.',
          zh: '用零散电阻、二极管和蓝白跳线搭出来的实验模型，用来验证滤波和全波整流。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Per the scope, the little model did work. But once I actually assembled the JLCPCB board, the guitar signal stopped making any sound at all, and the noise was huge.',
          zh: '根据示波器的输出呢，这个小模型是起效了，但是等我把嘉立创打样的 PCB 真正焊好装起来，才发现吉他的电信号没办法再发声了，且杂波非常大。',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalSoldering,
        width: 402,
        height: 616,
        alt: {
          en: 'Soldering the first PCB at the workbench, with the schematic open on the laptop behind it.',
          zh: '在工作台上焊第一版 PCB，背后笔记本上开着原理图。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'I worked out why soon enough. The battery only gives me 0V and up — there is no negative rail. So what I called full-wave rectification quietly turned into half-wave after the caps and diodes: the negative half of the waveform was just wiped out. I redrew the schematic.',
          zh: '我分析了一下原因，因为电池只有 0V 以上，没有负电压，所以所谓的全波整流其实在经过电容和二极管后变成了半波整流（波形的 negative 部分被直接抹掉了）。所以我重新设计了一个原理图：',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalSchematicV2,
        width: 548,
        height: 294,
        alt: {
          en: 'The revised schematic: a small op-amp circuit generating a negative rail / virtual ground at top right, and the input buffer, precision full-wave rectifier and low-pass output stage along the bottom.',
          zh: '重画后的原理图：右上角是产生负电压 / 虚地的小电路，下方是输入缓冲、精密全波整流和低通输出级。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'In this version, the top-right corner is a small circuit built from two op-amps, diodes, a 10k resistor and a 100nF cap. It pulls a negative rail, or virtual ground, out of the single supply. Now the downstream op-amps reference a center voltage that can swing both ways instead of the 0V floor, so the negative half of the waveform no longer gets clipped by the supply rail before rectification.',
          zh: '在这个版本里，我先在右上角加了一个由两个运放、二极管、10k 电阻和 100nF 电容组成的小电路，用来从单电源里“拆”出一路负电压 / 虚地。这样后级运放的参考点就不再是 0V 底线，而是可以上下摆动的中心电压，波形的 negative 部分也就不会在整流前被电源轨直接截掉。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'On the main signal path, the input goes through a 1M input impedance and a 1nF coupling cap into a voltage follower, then a 100nF cap and two 100k resistors bias it up to 9V. Two op-amps with 10k, 5k and 22k feedback form a precision full-wave rectifier, turning the input into its absolute value — the frequency doubles on its own. After rectification, 110nF blocks DC, a 10k resistor limits current, anti-parallel diodes clip once, and a first-order low-pass (1k with 100nF feedback) smooths the pulses into a reasonably clean 2× sine output.',
          zh: '主信号链这边，输入先经过 1M 输入阻抗和 1nF 耦合进入电压跟随器，再通过 100nF 和两个 100k 分压抬到 9V 偏置；随后两个运放配合 10k、5k 电阻和 22k 反馈构成精密全波整流，把输入信号变成绝对值波形，频率自然翻倍。整流后先用 110nF 隔直、10k 限流，反并联二极管做一次限幅，最后交给 1k 加 100nF 反馈的一阶低通，把脉动波平滑成比较干净的 2 倍频正弦输出。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Compared with v1, this one mostly fixes the “single positive supply turns full-wave into half-wave” problem. The whole cycle survives, so in theory the octave harmonic should be steadier and a bit fuller.',
          zh: '和上一版相比，这一版主要解决了“只有正电源导致全波整流变半波”的问题，完整周期的信息保留下来了，所以理论上八度泛音会更稳定、也更饱满一些。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'Then off to JLCPCB for fabrication, and the finished board:',
          zh: '然后就是送去嘉立创打样封装，最后成品 PCB 板：',
        },
      },
      {
        type: 'img',
        src: imgGuitarPedalPcbFinal,
        width: 472,
        height: 354,
        alt: {
          en: 'The finished purple PCB from JLCPCB, populated with three op-amp ICs, resistors, diodes and four yellow film capacitors.',
          zh: '嘉立创打样的成品紫色 PCB，三颗运放、电阻、二极管和四个黄色电容都焊好了。',
        },
      },
      {
        type: 'p',
        text: {
          en: 'I 3D-printed a case and put it in there. A few things still to do: 1. It needs a footswitch-type control, so the board only rectifies when I actually want the harmonic and passes the original waveform through the rest of the time. 2. The processed sound comes out quieter and pretty distorted. My guess is something in the coupling part.',
          zh: '我 3D 打印了个外壳把它装起来。后续需要处理的几件事：1. 应该有个踏板一样的装置，控制效果器的开关。如此一来，只有在我需要泛音的时候，PCB 板才会整流电路，其他时间则放原波形通过。2. 处理完的声音会变小，且很失真。我觉得应该是耦合的部分出了问题。',
        },
      },
    ],
  },
]

export function findDevLogPost(id: string): DevLogPost | undefined {
  return devLogPosts.find((post) => post.id === id)
}
