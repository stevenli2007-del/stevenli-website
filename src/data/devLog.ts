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
]

export function findDevLogPost(id: string): DevLogPost | undefined {
  return devLogPosts.find((post) => post.id === id)
}
