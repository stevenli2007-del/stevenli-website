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
    id: 'x-institute-ta-2026',
    date: '2026',
    category: { en: 'Lab', zh: '实验室' },
    title: { en: 'Ten Days as a TA', zh: '十天助教' },
    summary: {
      en: 'First time on the other side of the room: teaching middle and high schoolers to build their own contact-angle tool with AI — and getting the excitement back.',
      zh: '第一次站在讲台的另一边：带初中生和高中生用 AI 写自己的接触角测量工具，也把学习的兴奋捡了回来。',
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
        type: 'p',
        text: {
          en: 'The next summer I went back for the research camp, studying how micro- and nano-scale surface structures affect droplet condensation efficiency. That project got me the Starry Youth title and tied me to X-Institute for good. After that: underactuated soft robotic grippers with Prof. Zhang Wenzeng, CdSe quantum dots at Penn ESAP, an IEEE paper — all the same direction.',
          zh: '来年暑假我又回去，进了暑期科研营，研究微纳表面结构怎么影响水滴的冷凝效率。那个项目给了我“星空少年”的称号，也把我跟零一彻底绑上了。再往后就是跟张文增老师做欠驱动的柔性机器人抓手、去宾大 ESAP 做 CdSe 量子点、发 IEEE 论文——一路都是同一个方向。',
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
          en: 'When it settled, the pay came out to ¥3,808. Honestly, that felt like a lot.',
          zh: '最后结算下来，3808 块。讲真，我觉得超级多。',
        },
      },
    ],
  },
]

export function findDevLogPost(id: string): DevLogPost | undefined {
  return devLogPosts.find((post) => post.id === id)
}
