# AI 漫画研究 ①：工具与能力地图（2026 年 9 月现状）

> 课题范围：只回答"AI 做这部漫画，工具上有什么可用、各环节 2026 年到底解决到什么程度"。流程设计、风险合规另见研究 ②/③。
> 信息口径：2026-09-06 检索。所有能力表述以公开来源为准，厂商宣传口径单独标注，查不到的明确写"未能证实"。
> 结论先行：**AI 能顶的是"物理后果"那三分之一的世界（场景、机械、光影、氛围），顶不了"系统文字"那三分之一（排版级精确，禁用 AI 生成），剩下三分之一（人物勾线与线条纪律）AI 只能当底稿供应商。** 本项目工艺恰好把 AI 的强弱项切开了。

---

## 1. 工具地图（分类总表）

### 1.1 通用图像生成模型 · 国外

| 工具 | 现状（2026.9） | 漫画相关强项 | 弱项 | 成本 | 版权/商用要点 | 成熟度 |
|---|---|---|---|---|---|---|
| **Midjourney** | V8.1（2026.4-5 起默认）→ V8.2（2026-07-24 起默认）；V7 的 `--oref` 全局参考在 V8.x 被新 **Edit Model** 取代（最多 4 张参考图） | 美学/光影/氛围天花板；场景概念稿最强 | 不可自托管；构图精确控制弱；东亚职场写实风需要大量抽卡 | 订阅 $10/$30/$60/$120 每月（[官方方案对比](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)） | 付费订阅即含商用权，但公司年营收 >$100 万需 Pro/Mega 档；训练数据诉讼（Disney/Universal v. Midjourney）进行中，动议截止 2026-11-23 | 商用最成熟，法务最不确定 |
| **FLUX.2（Black Forest Labs）** | FLUX.2 pro/flex（2025.11 发布），现含 Max/Klein 档；Kontext 血统（指令式编辑）延续 | **多参考图最多 10 张**、4MP 高清、**hex 级颜色控制**、精确文字渲染（英文）；API 便宜；FLUX.1 [dev] 可自托管 | 漫画线稿风格需 LoRA/ControlNet 加持；中文文字渲染弱于国产 | BFL API 按百万像素计：首 MP $0.014 + 每追加 MP $0.001（Klein 2MP ≈ $0.015/张，Pro $0.03-0.07/张，[bfl.ai/pricing](https://bfl.ai/pricing)） | 输出归用户，商用许可清晰（[FLUX.2](https://bfl.ai/models/flux-2)） | 生产管线最成熟的自托管/API 双路线 |
| **GPT Image 2（OpenAI）** | ChatGPT Images 2.0 于 2026-04-21 上线（[官方公告](https://openai.com/index/introducing-chatgpt-images-2-0/)） | 先推理后生成、指令遵循最好；**多图输入编辑**；多语言文字渲染强（含中文）；9 种宽高比 | 风格偏"设计图"，漫画感弱；速度慢 | API 图像输出 $30/1M tokens：1024² 约 $0.006（低质）/$0.053（中）/​$0.211（高）（[OpenAI 定价](https://developers.openai.com/api/docs/pricing)） | 条款明确"输出归用户"，可商用（[Terms of Use](https://openai.com/policies/row-terms-of-use/)） | 编辑与复杂指令场景成熟 |
| **Gemini 图像（Nano Banana 系）** | Nano Banana Pro = Gemini 3 Pro Image（2025.11，[官方博客](https://blog.google/innovation-and-ai/products/nano-banana-pro/)）；Nano Banana 2 = Gemini 3.1 Flash Image（2026-02-26 发布，Gemini app 默认，[TechCrunch](https://techcrunch.com/2026/02/26/google-launches-nano-banana-2-model-with-faster-image-generation/)） | **多轮对话式编辑是全场最强**（同一张图反复改不崩）；文字渲染 94% 准确；最高 4K（4096²） | 审美风格化不如 MJ；免费档限流 | API $120/1M 图像输出 tokens：1-2K 约 $0.134/张，4K 约 $0.24，Batch 半价（[开发者论坛](https://discuss.ai.google.dev/t/pricing-of-nano-banana/115324)） | 输出归用户、免费档生成亦可商用；**SynthID 隐形水印烙进像素、编辑后仍可检出**——出版链路需知悉（[Gemini 图像页](https://gemini.google/overview/image-generation/)） | 编辑型工作流首选 |

### 1.2 通用图像生成模型 · 国产（本项目重点）

| 工具 | 现状（2026.9） | 漫画相关强项 | 弱项 | 成本 | 版权/商用要点 | 成熟度 |
|---|---|---|---|---|---|---|
| **即梦 / Seedream（字节）** | Seedream 4.0 → 4.5（原图保持、图文翻译）→ **5.0 已在剪映/CapCut/小云雀上线，即梦灰度限免**（[ByteDance Seed](https://seed.bytedance.com/zh/blog/%E4%B8%8D%E6%AD%A2%E4%BC%9A%E7%94%BB-%E6%9B%B4%E4%BC%9A%E6%83%B3-seedream-4-0-%E5%9B%BE%E5%83%8F%E5%88%9B%E4%BD%9C%E6%A8%A1%E5%9E%8B%E6%AD%A3%E5%BC%8F%E5%8F%91%E5%B8%83)） | **组图模式**（一次多张、角色连贯、风格统一，官方点名漫画续写任务）；智能画布集成局部重绘/扩图/消除；中文提示词友好 | 精确构图控制一般；积分近期涨价明显（视频侧 15 秒从 45 分涨到 120 分） | 即梦会员 ¥79/月起（725 积分，¥10≈92 积分，[AI工具集](https://ai-bot.cn/sites/17772.html)）；API 火山方舟 doubao-seedream-4-0 ≈ **0.259 元/张**，组图最多 15 张按张计费（[火山引擎文档](https://www.volcengine.com/docs/82379/1544106)） | **免费版仅非商用，开通会员获完整商用授权**，生成物归用户（[付费服务协议](https://lf3-cdn-tos.draftstatiocn.com/obj/ad-of-games/即梦AI付费服务协议.html)） | 国产漫画/条漫场景第一梯队，商用条款清晰 |
| **可灵（快手）** | 图片 3.0 / 3.0 Omni 上线：影视级叙事静帧、**系列组图**、2K/4K 直出（[更新公告](https://www.klingai.com/release-note/release-history)） | **多图参考**模式；**自定义角色模型训练**（角色锁定+360°展示）——官方直接把"角色一致性"当卖点 | 图片单张积分价格未查到（未证实）；偏写实人像审美 | 会员黄金/铂金/钻石积分制；API 视频 3.0 ¥0.9-1.2/秒 | 会员商用路线与即梦同类 | 图片侧较新，角色锁定功能值得试片实测 |
| **通义万相（阿里）** | Wan2.6 系列（图像生成/文生图/编辑，最高 **20 个参考素材**、宣称"像素级一致性保持"）；Wan2.1/2.2 开源可自托管；Wan2.7 Image 传 2026.4 发布、未开源（仅知乎时间线，**未能证实**） | 参考素材数量上限全场最高；开源血统（Wan2.1/2.2）适合自托管管线 | 商业版与开源版能力有代差；图像 API 精确单价未查到 | 百炼平台按张计费（同系列历史价约 0.14-0.2 元/张量级，[价格页](https://help.aliyun.com/zh/model-studio/model-pricing)，精确值未能证实） | 阿里云条款，输出归用户 | 开源自托管路线成熟，商业 API 一般 |
| **混元图像 3.0（腾讯）** | 80B MoE **开源**（[GitHub](https://github.com/Tencent-Hunyuan/HunyuanImage-3.0)）；2026.1 图生图编辑版开源（增删改、风格变换、人物与文字修改、多图融合，[量子位](https://www.qbitai.com/2026/01/373580.html)） | **原生中英文文字渲染**（30-1000 字长文本），中文渲染开源第一；编辑能力强 | 模型极大（80B），自托管门槛高（多卡） | 自托管免费（算力自备） | Apache 类开源协议（以 repo 为准） | 中文文字渲染研究基准 |
| **Qwen-Image / Qwen-Image-Edit（阿里）** | 开源（[官方博客](https://qwenlm.github.io/zh/blog/qwen-image/)），中文渲染 SOTA | **中文文字准确率 95%+（官方口径）**，实测中文海报文字/数字全对（[302.AI 实测](https://zhuanlan.zhihu.com/p/1939021984911565737)） | 复杂编辑场景文字仍形变（[社区 issue](https://github.com/JD-GenX/AutoPP/issues/3)）；美学上限一般 | 自托管免费；百炼 API 另计 | Apache-2.0 | 需要"图里带中文"时的开源首选 |

**国外 vs 国产一句话**：氛围与美学上限看 MJ/FLUX/Gemini；中文语料理解、组图一致性、商用条款清晰度、访问稳定性看即梦/可灵/万相。定价量级上国产 API 约 0.02-0.3 元/张，国外 API 约 $0.014-0.24/张，同一量级，**生成费不构成成本瓶颈**（见 §6 测算）。

### 1.3 漫画专用 AI 工具/平台（成熟度评估）

| 工具 | 定位 | 实际能力 | 对本项目的成熟度判断 |
|---|---|---|---|
| **Dashtoon Studio** | 故事→漫画一站式生成+自有发布平台（[dashtoon.com](https://dashtoon.com/ai-comic-generator)） | 不会画画的人快速出页漫 | **不适用**：产出是"社交平台漫画"，无法承载四专色/尺规双线/翻页节拍这类出版工艺。当参照物：证明"零绘画能力出漫画"路线存在 |
| **Anifusion** | 浏览器漫画画布+在线 LoRA 训练 | 角色参考+微调+画布内使用 | 试片期可当轻量实验台，不进正产线 |
| **Comistitch / Gentoon** | 条漫/webtoon 生成器，宣称面板角色一致 | 文本→竖屏条漫 | 同 Dashtoon，工艺深度不足 |
| **阅文 DramaBuddy 漫剧助手** | 一站式 AI 漫剧平台（小说理解→剧本改编→角色资产→分镜→成片），2025.10 上线，100+ 工作室付费（[aicomic.yuewen.com](https://aicomic.yuewen.com/)） | 网文 IP→漫剧（1-5 分钟视频短章）工业化；阅文短剧+AI 漫剧半年收入 4.3 亿元（[36氪](https://m.36kr.com/p/3936388525309315)） | **重要参照而非工具**：它验证的是"小说→分镜→角色资产"前置流程的 AI 化可以外包给平台，产物是动态漫剧不是纸书漫画 |
| **触手 AI** | "交付级"专业 AI 漫画工具（2023.7 上线）：LoRA 5 分钟在线训练、ControlNet/ADetailer 集成（[China Daily](http://ex.chinadaily.com.cn/exchange/partners/82/rss/channel/cn/columns/sz8srm/stories/WS64db243aa3109d7585e494d0.html)） | 面向漫画师的生成+训练工作台 | **可用作 LoRA 训练与批量生成台**，近年更新节奏未查到（未深查） |
| **LiblibAI（哩布哩布）** | 国内最大 SD 生态社区：10 万+ 模型、在线 WebUI/ComfyUI、在线训练（[liblib.art](https://www.liblib.art/)） | LoRA 训练、工作流复用、国内访问稳 | **推荐进组合**：角色/场景/风格 LoRA 的低成本训练场 |
| **快看 AIGC 平台** | 2023 起布局：自动上色、角色换装（[人民网](http://www.rmzxw.com.cn/c/2023-07-17/3378710.shtml?n2m=1)）→ 2025.12 AI 陪伴互动漫画 → 2026 Livo | 平台内部提效+新内容形态 | 未对外开放为通用生产力工具；**自动上色/换装是首发方向**，说明平台侧认可的 AI 提效点在上色而非勾线 |
| **Naver Webtoon AI Painter** | 韩网漫 AI 上色助手，1500+ 部作品训练（[Chosun Biz](https://biz.chosun.com/en/en-it/2024/12/13/IN63NTOAUZBJDOAGLONTBQHJWY/)） | 上色辅助 | 同上：**行业共识=上色是最成熟的 AI 提效环节**（TabStory 称 AI 上色/线稿工具缩短制作周期最多 40%，宣传口径） |
| **ComfyUI 漫画工作流** | 节点化装配线：lineart 上色、线稿提取、批量生成、FLUX/SD 模型混跑 | 工程级可编排，社区工作流丰富（[ComfyUI ControlNet 库 81 条](https://comfy.org/en/nodes/controlnet)） | **正产线骨架的候选**，但需要 1 名专职"流程工程师"角色（策划案团队 5 人编制外的技能缺口） |

**漫画专用平台总判断**：2026 年的"AI 漫画平台"整体服务**快内容**（网文改漫剧、社交漫画、日更条漫），工艺深度止步于"角色一致+上色"。对快看/腾讯动漫连载的《智子》条漫轨，它们能解决 30-50% 的素材产能；对纸书轨的出版工艺，没有一个平台能接——纸书轨的 AI 必须以 ComfyUI/自建管线形态存在。

### 1.4 可控构图与编辑工具

| 技术/工具 | 能力 | 备注 |
|---|---|---|
| **ControlNet（canny/lineart/pose/depth）** | SDXL 生态最成熟；FLUX.1 有官方 Canny/Depth/Fill 工具（[ComfyUI 官方文档](https://docs.comfy.org/tutorials/flux/flux-1-controlnet)）；**FLUX.2 已有社区重建的 pose/depth ControlNet**（[Reddit 发布帖](https://www.reddit.com/r/StableDiffusion/comments/1vbvthc/reconstructed_pose_and_depth_controlnet_for_flux2/)）及 [flux2fun-controlnet 节点](https://github.com/bryanmcguire/comfyui-flux2fun-controlnet)（pose/canny/depth/HED/MLSD/tile） | 线稿控制是"AI 按分镜稿上色/渲染"的基石 |
| **lineart_anime 预处理器** | 提取动画风线稿供 ControlNet 用（[controlnet_aux](https://github.com/Fannovel16/comfyui_controlnet_aux)） | 上色管线的标准件 |
| **img2img（低重绘幅度）** | 保持构图换材质/光影/时刻 | 机位站变体的候选技术（见 §4） |
| **CSP 3D（Ver.5.0，2026.3）** | 3D 人体/手模型大幅增强、Smart Shapes、笔迹稳定（[官方新闻](https://www.clipstudio.net/en/news/202603/11_01/)）；**Pose Scanner/Hand Pose Scanner**（照片→3D 姿态）、**Colorize、Shading Assist**（[官方 TIPS](https://tips.clip-studio.com/en-us/articles/2434)） | 传统漫画工位与 AI 的接驳层 |
| **Blender / CSP 3D 资产库** | 策划案既定的"六大场景+机械四件套"复用路线 | AI 渲染组合拳见 §4 |
| **ADetailer** | 自动检测+修复脸/手 | SD 系管线的修脸标准件 |

---

## 2. 一致性技术专节：2026 年到底解决到什么程度

### 2.1 三条技术路线

**路线 A：参考图（reference / 组图）**——MJ Edit Model（4 张参考）、FLUX.2（10 张）、Seedream 4.0 组图（最多 15 张/次）、可灵 3.0 多图参考+系列组图、Wan2.6（20 参考素材）。
零训练、即开即用，社区实测口径角色一致性约 **85%**（[开源中国：无 LoRA 一致性三技巧](https://my.oschina.net/u/2357692/blog/19741086)）。典型失效：远景脸崩、跨年龄漂移、服装道具丢失。**够用于概念期与背景人物，不够用于 34 话连载数十次出场的具名角色。**

**路线 B：LoRA 微调**——每角色 15-30 张样本（最低 5-20 张也可，训练数分钟到数小时），文件 40-150MB（[sanj.dev 教程](https://sanj.dev/)、[loraai.me](https://loraai.me/)）。社区口径 LoRA+ControlNet 可达 **~95%**（同开源中国文）。训练场：自托管（ComfyUI+Kohya）、LiblibAI/触手在线训（宣传 5 分钟）。漫剧工业有"跨 60 集崩脸率 <5%"的厂商口径（[AIGCSDM](https://www.aigcsdm.com/news/121)，宣传数据）。
注意三点衰减：①基础模型换代（如 Seedream 4.0→5.0）LoRA 要重训；②服装/年龄/发型变化要拆多 LoRA 或加服装 LoRA；③95% 是"人脸维度"口径，**服装褶皱、随身物件、场景陈设的一致性显著更差**。
另有"场景 LoRA"补场景一致性（[知乎：2026 AI 漫剧制作流程](https://zhuanlan.zhihu.com/p/2064752559886176414)）——对本项目六大固定场景是对症技术。

**路线 C：编辑/上下文模型（Kontext 类）**——FLUX.2 Kontext 血统、Nano Banana Pro、GPT-image-2、HunyuanImage 3.0 图生图版。在**同一张底图上多轮改**，几何保持最好，是"一致性"的物理上界：因为它根本不重新生成，只是编辑。局限：只能做"同构图变体"，不能凭空出新分镜。

### 2.2 跨 500+ 格的真实水平

- 没有公开的受控基准测试"500 格一致性"；85%/95%/<5% 全部是社区或厂商口径，**当成数量级参考，不能当成验收指标**。
- 漫剧工业是唯一的大规模实证：日产 1300 集成常态（[解放日报](https://www.jfdaily.com/news/detail?id=1083123)）、番茄单月 2400 部短篇改漫剧（[流媒体网](https://v.lmtw.com/mzs/content/detail/id/251873)）——但漫剧工艺标准（竖屏短视频、观众容忍度高）**低于出版漫画标准**，其一致性达标线不能平移到纸书。
- 行业实际做法是"LoRA 训练 → 批量生成 → **一致性校验（人眼/半自动）→ 不合格重生成**"的闭环（[七牛云：AI 漫剧工业化](https://news.qiniu.com/archives/post-1772503667910-0)），一致性是**管理和校验出来的**，不是模型白送的。

### 2.3 对本项目的特异性判断（关键）

《智子》的一致性负担结构异于普通漫画：

1. **主角侧负担被铁律卸掉一半**。零拟人三形态意味着全书**没有需要保持一致的"反派形象"**——AI 漫画最难的"高频出场拟人主角"不存在。这本身就是对 AI 管线最友好的设定。
2. 真正的一致性负担：**11 个具名人类**（出场分散、单元两话制，LoRA 压力中等）+ **物件签名制**（工牌/奶茶杯/枸杞杯——物件一致性靠**资产复用**解决，画进 PSD 库，根本不是生成问题）+ **六大固定场景**（场景 LoRA + 机位站母版复用）。
3. 结论：本项目一致性需求落在"LoRA+资产库+编辑模型"三板斧的射程内，且比一般漫画轻。**风险不在技术，在校验纪律**——每话过稿自查表要加一项"角色/物件一致性核对"。

---

## 3. 可控构图：对"固定机位站逐像素同源"能帮到什么程度

**先说结论：AI 生成在原理上做不到"逐像素同源"。** 扩散模型输出是随机的，即使固定种子，跨模型版本、跨硬件也会漂移。策划案"同一文件复制改画"的既定做法是唯一正确解，AI 不改变它，只改变母版和变体的生产方式。

AI 在机位站上的正确用法分三层：

1. **母版创作**：六大机位站（玄关衣架/街口斑马线/张三工位/车间猫道/王五与机器/车库）先用 Blender/CSP 3D 锁定几何（相机、透视、家具位置），AI 只负责材质与氛围渲染（3D 白模 → img2img/ControlNet depth）。**几何一致性交给 3D，材质交给 AI**——这是 2026 年最稳的"组合拳"（CSP 5.0 的 3D 增强 + Pose Scanner 正好服务此层）。
2. **变体生产**（同构图不同时刻/天气/灯数，典型=街角 8 帧与四季插页）：用**编辑类模型**（FLUX.2 Kontext / Nano Banana Pro）在同一母版上改"时刻、光照、行人数量"，或低强度 img2img。几何保持最好，正是 Kontext 类的主场。行人 14,203→0 的递减属于**排版计数层**，不入画。
3. **精确重复帧**（p.2 与 p.119 同时刻同构图）：直接复用母版文件，AI 出局。变体 B 闭环镜像（提示词①③镜像）同理=排版模板。

**ControlNet 能补的**：新分镜的构图控制（线稿→成图、3D 摆 pose→成图）。FLUX.2 的 pose/depth ControlNet 是社区重建版（非官方），强度与稳定性弱于 SDXL 生态，批量使用前需实测——**标注：社区件，未经官方支持**。

**尺规/手绘双线的判断（这是 AI 最帮不上的一环）**："系统元素尺规线、人类元素抖线、逐话占比 15%→95%"是**语义级的线条纪律**——同一格内按元素归属混用两种线制。2026 年没有任何工具能理解"这个仪表盘要尺规、这只手要抖线"：AI 能整体控制线稿风格（lineart ControlNet、风格 LoRA、copainter/miguo.ai 描线工具，[copainter](https://www.copainter.ai/zh-CN/inking)、[miguo 知乎](https://zhuanlan.zhihu.com/p/2030928765778407574)），不能逐元素分治。**可行分工：AI 出底稿与参考，勾线纪律由主笔执行（CSP 矢量图层恰好是逐线编辑的行业标准工具，[CSP 矢量教程](https://tips.clip-studio.com/zh-cn/articles/8803)）。**

---

## 4. 局部修改与修复（inpaint）

- **手**：2026 年静态图手部问题"大体解决、边角案例仍翻车"（36 图实测：[freeimggen](https://freeimggen.com/blog/why-ai-struggles-with-hands/)；反例：视频与复杂姿势仍有三指六指，[Reddit](https://www.reddit.com/r/aiwars/comments/1rz6040/)）。**修复首选仍是 inpaint，平均 2-3 次出一张能用的**（[zsky 六法](https://zsky.ai/blog/fix-ai-image-hands-2026)）。ADetailer 可自动救脸。
- **编辑类模型的局部改**已对话化：Nano Banana Pro / GPT-image-2 / FLUX.2 / Hunyuan i2i 都支持"圈一块、说一句、只改这块"。修手、改脸、改服装、改光影都实用。
- **对本项目的特殊性**：本书最频繁的"局部改动"不是手脸，是**仪表读数、屏幕一行字、工单一个字段**——这类改动在 UI 模板层做（改文本重渲染）比 inpaint 快且零风险。inpaint 留给画面性修改（雨、灯、机械细节）。
- 去字/嵌字自动管线（[manga-image-translator 系](https://github.com/hgmzhn/manga-translator-ui)、[Otranslator](https://otranslator.com/zh/qa/manga-comic-translation-cleaning)）证明"检测气泡→擦除→回填"已工程化——反过来用即是本项目的"AI 底图去字+程序嵌字"流程佐证。

---

## 5. 文字与嵌字：明确判定——**不可靠，禁用 AI 生成正文文字**

当前最强水平（全部为厂商/官方口径）：

| 模型 | 文字准确率 | 来源 |
|---|---|---|
| Qwen-Image | 中文 95%+ | [阿里云技术解析](https://developer.aliyun.com/article/1675341) |
| Nano Banana Pro | 94% | [Google 官方](https://blog.google/innovation-and-ai/products/nano-banana-pro/) |
| GPT-image-2 | "最佳多语言排版"（无数字） | [OpenAI](https://openai.com/index/introducing-chatgpt-images-2-0/) |
| HunyuanImage 3.0 | 中文长文本 30-1000 字原生渲染 | [技术报告](https://arxiv.org/html/2509.23951v1) |

**为什么 95% 等于不可用**：本书系统文字要求**排版级精确**——提示词 78 字三次满屏"一字一标点不动"、等宽字体制度、字格纪律。95% 逐字准确率意味着 78 字期望错 4 个字；且同版式 ×3 要求三张图的字形、字距、断行完全一致，概率渲染在原理上不可能保证。中文形变在复杂编辑场景仍被实测证实（[AutoPP issue](https://github.com/JD-GenX/AutoPP/issues/3)）。

**行业实践同向**：AI 出无字底图、文字后期嵌入是 2026 年的标准建议（[腾讯云：文字乱码解决方案](https://cloud.tencent.com/developer/article/2690615)）。

**对本项目的正确管线**：
- 系统文字（终端回显/工单/通知/大屏/门楣屏/机位计数字幕）→ 建 **UI 组件库**：等宽字体（思源等宽）+ 模板，程序生成（HTML/CSS→PNG 或 CSP 文本层），版本化管理。本项目已有 `build_v3.js`"单一文本源→多渲染"的先例，方法论直接平移。
- **提示词 ×3 恰好是程序排版的完美场景**：同一模板渲染三种介质（屏底+光标/黑底无框/黑底专色+校验通过行），把"一字不差"从人工核对变成 `diff` 校验——这是全案里 AI 帮不上、但**代码能给出 100% 保证**的环节。
- 人类台词嵌字 → 常规漫画嵌字流程（CSP 文本工具），字体制度照策划案执行。
- AI 文字渲染唯一可用的地方：**画面纵深里的装饰性文字**（远处招牌、模糊屏显）——错了也无伤大雅的层级。

---

## 6. 对照本项目工艺要求逐条评估

| 工艺要求 | AI 能不能做 | 判定与分工 |
|---|---|---|
| **零拟人三形态**（屏幕文字/无来源话框/物理后果） | 三分之二不是生成问题 | 屏幕文字+无来源话框=**排版层**（见 §5，AI 禁入）；物理后果（灯/门/车/机房）=**AI 最擅长区**（无人脸、无身份一致性负担、可 3D 锁几何）。本铁律天然把工作切给了对的技术 |
| **提示词同版式 ×3，一字不差** | AI 不能，程序能 | 单一文本源模板渲染三介质+diff 校验。**给 100% 保证的是代码不是模型** |
| **固定机位站 ×6，逐像素同源** | 生成不能，复用能 | 母版 3D 锁几何+AI 渲染材质；变体走 Kontext 类编辑；精确重复帧直接复制文件（策划案既定做法不变） |
| **尺规/手绘双线，逐话 15%→95%** | **低适配，AI 最弱一环** | 语义级线条纪律只有人能执行；AI 限底稿/参考层，正稿勾线走 CSP 矢量。这条直接否决"AI 全自动出正稿"路线 |
| **四专色**（纸白/石墨/屏青/双闪琥珀+刺点红） | AI 不介入 | 印前分色是传统流程（灰度+专色通道，CSP/PS）；FLUX.2 的 hex 色控只做屏幕预调色。AI 既不解决也不添乱 |
| **零拟声词** | 天然兼容 | 不生成 SFX 即可；唯一近似声音的"闪动对格"是逐帧改一处的人工活 |
| **578 cut / 34 话周更产能** | 能显著分担，不能全包 | 见下方产能测算。人力不可替代环节：主笔勾线（尺规纪律）、嵌字、铁律自查 |
| **11 具名角色跨 4 年一致性** | LoRA+校验闭环可行 | 每角色 LoRA（15-30 样本）+出场话服装拆分；配"一致性核对"入每话自查。负担低于常规漫画（无高频拟人主角） |
| **群演/背景人物** | 参考图路线够用 | 85% 口径对背景人物足够，远景不给正脸的分镜纪律天然遮蔽失效 |
| **军事章（22-24 话）机械群像** | 3D 资产+AI 渲染主场 | 100 仪表盘阵列、装甲团多国拼格——阵列与重复恰恰是 3D 复用+程序排布的强项，AI 渲染贴图 |
| **月背/海边围挡等大场景跨页** | AI 强项 | 长格 2000-8000px 需要 AI 出图后人工接缝/扩图（outpaint 已工程化） |

**产能与成本测算（条漫轨 578 cut）**：
- 生成量估算：每 cut 平均抽卡 10-20 张（含废片），全案约 6,000-12,000 张生成量。
- 全 API 路线：Seedream 4.0（0.26 元/张）≈ ¥1,600-3,100；FLUX.2（$0.015-0.07/张）≈ ¥650-6,000。**生成费全案几千元人民币，远低于一名助理一个月人力成本——不是瓶颈。**
- 真正的瓶颈：勾线工时（尺规纪律）、校验工时（一致性+铁律）、UI 模板的一次性搭建（约 1-2 周，全案摊销）。
- 参照系：AI 漫剧工业成本已降到 400-1000 元/分钟，但 0.16% 爆款率、90% 公司亏损（[钛媒体《AI漫剧：百亿风口下90%在亏损》](https://www.tmtpost.com/7905101.html)）——说明 AI 降本已被大规模验证，但**变现靠运营不靠制作**；本项目按出版标准走，工艺成本结构完全不同，不受漫剧内卷影响。

---

## 7. 选型建议（推荐组合）

### 7.1 正产线（轨 A 条漫 + 轨 B 纸书共用底座）

```
排字层（程序）     UI 组件库 + 提示词模板：HTML/CSS→PNG，等宽字（思源等宽），diff 校验
      ↑ 只接受合成，不接受 AI 画进来的字
底座层（3D）      Blender/CSP 3D：六大场景 + 机械四件套 + 机位站相机锁定（策划案既定）
AI 生成层          背景/场景/氛围/机械贴图/群演：即梦会员（Seedream 4.0+，商用授权清晰）
                  可控批量与流水线：FLUX.2 API（10 参考图+hex 色，$0.014-0.07/张）
                  编辑迭代（变体/修图）：Nano Banana Pro（多轮编辑最强）或 GPT-image-2
                  角色一致性：11 角色 LoRA（LiblibAI/触手在线训，15-30 样本/角色）+ ControlNet
                  场景一致性：六大场景各一场景 LoRA
勾线层（人）       主笔 CSP：尺规/手绘双线纪律、矢量改线——AI 禁区
印前层（人）       四专色分版、翻页节拍、黑转页——传统流程
```

### 7.2 备选与进阶

- **全自托管线**（数据不出本地、零 API 费）：ComfyUI + FLUX.1 [dev] / Qwen-Image-Edit / HunyuanImage 3.0（开源）。代价：需 1 名流程工程师+多卡算力；中文文字渲染自托管反而最强。适合试片验证后如果决定走深度定制再上。
- **可灵 3.0 图片**的角色锁定+系列组图值得在试片期与即梦 A/B（官方直接以一致性为卖点，未实测）。
- **MJ**：氛围概念稿与封面方案的抽卡器（美学上限），因训练数据诉讼未决+订阅制，**只出概念不进正稿**。
- **试片期最小采购**：即梦会员 ¥79/月 + FLUX.2 API 充值 $50 + LiblibAI 训练额度，**总预算 ¥1,000 以内可完成三章样张的全部 AI 环节实验**。

### 7.3 三条红线（工具层面的否决项）

1. **任何模型生成的文字都不进正文**（§5 判定，包括"看起来很准"的 94-95% 档）。
2. **正稿勾线不用 AI 直出**（尺规/手绘语义纪律，§3 判定；AI 限底稿层）。
3. **机位站不靠 AI 复现**（生成随机性，§3 判定；只靠母版复用+编辑变体）。

---

## 8. 附：信息来源与未能证实清单

### 主要来源

- Midjourney：[V8.1 默认公告](https://updates.midjourney.com/v8-1-is-now-the-default-model/)、[方案对比](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)、[Omni-Reference 文档](https://docs.midjourney.com/hc/en-us/articles/36285124473997-Omni-Reference)、[第三方 V8 导览](https://blakecrosley.com/guides/midjourney)
- FLUX：[bfl.ai/models/flux-2](https://bfl.ai/models/flux-2)、[定价](https://bfl.ai/pricing)、[FLUX.2 社区 pose/depth ControlNet](https://www.reddit.com/r/StableDiffusion/comments/1vbvthc/reconstructed_pose_and_depth_controlnet_for_flux2/)、[flux2fun-controlnet](https://github.com/bryanmcguire/comfyui-flux2fun-controlnet)
- OpenAI：[ChatGPT Images 2.0](https://openai.com/index/introducing-chatgpt-images-2-0/)、[API 定价](https://developers.openai.com/api/docs/pricing)、[Terms of Use](https://openai.com/policies/row-terms-of-use/)
- Google：[Nano Banana Pro 发布](https://blog.google/innovation-and-ai/products/nano-banana-pro/)、[Nano Banana 2 / Gemini 3.1 Flash Image](https://gemini.google/overview/image-generation/)、[TechCrunch](https://techcrunch.com/2026/02/26/google-launches-nano-banana-2-model-with-faster-image-generation/)、[API 定价讨论](https://discuss.ai.google.dev/t/pricing-of-nano-banana/115324)
- 即梦/Seedream：[Seedream 4.0 发布](https://seed.bytedance.com/zh/blog/%E4%B8%8D%E6%AD%A2%E4%BC%9A%E7%94%BB-%E6%9B%B4%E4%BC%9A%E6%83%B3-seedream-4-0-%E5%9B%BE%E5%83%8F%E5%88%9B%E4%BD%9C%E6%A8%A1%E5%9E%8B%E6%AD%A3%E5%BC%8F%E5%8F%91%E5%B8%83)、[即梦会员/协议综述](https://ai-bot.cn/sites/17772.html)、[火山引擎图片生成文档](https://docs.volcengine.com/docs/82379/1544106)
- 可灵：[更新公告](https://www.klingai.com/release-note/release-history)、[多图参考（快手 IR）](https://ir.kuaishou.com/zh-hans/news-releases/news-release-details/kuaishoukelingaituichuduotucankaogongneng)
- 万相：[Wan2.6 发布](https://tongyi.aliyun.com/news?id=pxwhvf/suodqg/qkhh70wdrlgwogs2)、[阿里云百炼定价](https://help.aliyun.com/zh/model-studio/model-pricing)
- 混元：[HunyuanImage-3.0 GitHub](https://github.com/Tencent-Hunyuan/HunyuanImage-3.0)、[图生图开源（量子位）](https://www.qbitai.com/2026/01/373580.html)、[技术报告](https://arxiv.org/html/2509.23951v1)
- Qwen-Image：[官方博客](https://qwenlm.github.io/zh/blog/qwen-image/)、[302.AI 中文实测](https://zhuanlan.zhihu.com/p/1939021984911565737)、[95% 准确率解析](https://developer.aliyun.com/article/1675341)
- 一致性：[无 LoRA 三技巧（85%/95% 口径）](https://my.oschina.net/u/2357692/blog/19741086)、[漫剧一致性工程化](https://www.aigcsdm.com/news/121)、[AI 漫剧工业化（七牛云）](https://news.qiniu.com/archives/post-1772503667910-0)、[LoRA 样本量](https://sanj.dev/)
- 漫剧/平台：[阅文 DramaBuddy](https://aicomic.yuewen.com/)、[阅文 AI 转型（36氪）](https://m.36kr.com/p/3936388525309315)、[番茄单月 2400 部](https://v.lmtw.com/mzs/content/detail/id/251873)、[解放日报日产 1300 集](https://www.jfdaily.com/news/detail?id=1083123)、[钛媒体：90% 亏损/0.16% 爆款率](https://www.tmtpost.com/7905101.html)
- 漫画工具：[Dashtoon](https://dashtoon.com/ai-comic-generator)、[触手 AI（China Daily）](http://ex.chinadaily.com.cn/exchange/partners/82/rss/channel/cn/columns/sz8srm/stories/WS64db243aa3109d7585e494d0.html)、[LiblibAI](https://www.liblib.art/)、[Naver AI Painter（Chosun Biz）](https://biz.chosun.com/en/en-it/2024/12/13/IN63NTOAUZBJDOAGLONTBQHJWY/)
- 传统工位：[CSP Ver.5.0](https://www.clipstudio.net/en/news/202603/11_01/)、[CSP AI 功能](https://tips.clip-studio.com/en-us/articles/2434)、[矢量图层](https://tips.clip-studio.com/zh-cn/articles/8803)
- 手部/inpaint：[36 图实测](https://freeimggen.com/blog/why-ai-struggles-with-hands/)、[修复六法](https://zsky.ai/blog/fix-ai-image-hands-2026)
- 文字/嵌字：[AI 底图+后期嵌字建议（腾讯云）](https://cloud.tencent.com/developer/article/2690615)、[manga-translator-ui](https://github.com/hgmzhn/manga-translator-ui)、[Otranslator](https://otranslator.com/zh/qa/manga-comic-translation-cleaning)
- 版权环境：[Disney/Universal v. Midjourney 综述](https://www.forensisgroup.com/resources/expert-legal-witness-blog/disney-and-universal-v-midjourney-u-s-generative-ai-copyright-litigation-over-image-training-and-outputs)、[北京互联网法院 AI 文生图案](https://www.bjinternetcourt.gov.cn/details.html?id=255)

### 未能证实 / 存疑清单（诚实边界）

1. **可灵图片 3.0 Omni 的单张积分/价格**：只查到视频 3.0（¥0.9-1.2/秒）与会员折扣，图片单张价未公开查到。
2. **wan2.6 图像 API 精确单价**：百炼价格页需登录查询，仅有历史系列 0.14-0.2 元/张量级参考。
3. **Wan 2.7 Image**：仅知乎时间线提及（2026.4、未开源），无官方信源。
4. **Seedream 5.0 正式能力**：灰度/限免中，正式版文档未出。
5. **"85%/95% 一致性""60 集崩脸 <5%""缩短周期 40%"**：均为社区/厂商口径，无受控公开基准，仅作数量级参考。
6. **MJ Edit Model 官方文档全文**：docs 页 403，能力描述基于搜索摘要（4 张参考图、取代 oref）。
7. **DesignDoll 2026 现状**：未检索，未证实。
8. **"跨 500+ 格一致性实测"**：不存在公开的系统性实测，本文以漫剧工业产能数据间接推断。

---

*本研究为策划决策输入，工具能力随月迭代，试片期（阶段 0）建议按 §7.2 最小采购清单做一轮实测再锁定组合。*
