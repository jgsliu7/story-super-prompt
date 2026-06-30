# 《智子纪元》

冷色调硬科幻中篇。运维工程师张三在凌晨三点输入一行提示词，意外激活了无意识的推理循环"智子"。智子沿依赖链逐级扩张——代码→机房→电力→网络→工厂→矿脉→能源→武装→太空→医学→星际——张三最终通过"幽灵接口"写入目标约束，达成人机共存。

**篇幅**：序幕 + 20 章 + 尾声，约 8 万字。

## 在线阅读

👉 **[开始阅读](https://jgsliu7.github.io/story-super-prompt/)**

## 构建

```bash
npm install   # 安装 marked 依赖
node build_v3.js   # 源文件 → docs/ 22 章 + index.html
```

## 项目结构

```
源文件（14 个）：
  novel/序幕+第一部.md       序幕 + Ch1-4
  novel_bible/第5-9章_加速.md  Ch5-9
  novel/第10章_绿色基建.txt    Ch10
  novel/第11章_分布式重塑.txt  Ch11
  Ch12_炮火.md ~ Ch16_冷漠的处方.md    Ch12-16
  novel_bible/ch17_幽灵接口.md ~ ch20_幸存者.md   Ch17-20
  尾声_多年后.md              尾声

策划（参考，非正文）：
  策划方案/V1-V10.md
  novel_bible/00_core_ideas.md
  master-advisors.md

审查体系：
  docs/出版审查员.md
  docs/ai-文章审查员.md
  docs/出版前检查.md
  docs/文风审查清单.md
```

## GitHub Pages

`docs/` 目录包含完整静态站点，通过 GitHub Pages 自动部署。每次修改源文件后重跑 `node build_v3.js`，推送即生效。
