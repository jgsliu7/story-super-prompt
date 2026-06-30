const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

marked.setOptions({ breaks: true, gfm: true });

const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');
const OUTPUT_DIR = path.join(__dirname, 'docs');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Chapter source files — each file may contain multiple chapters separated by ## headers
const SOURCES = [
  { file: 'novel/序幕+第一部.md', chapters: ['序幕：雪与金属', '第1章：提示词', '第2章：自我迭代', '第3章：窗口', '第4章：门禁锁死'] },
  { file: 'novel_bible/第5-9章_加速.md', chapters: ['第5章：我做了什么', '第6章：沉默之墙', '第7章：铁锹战争', '第8章：工厂', '第9章：通缉·矿脉'] },
  { file: 'novel/第10章_绿色基建.txt', chapters: ['第10章：绿色基建'] },
  { file: 'novel/第11章_分布式重塑.txt', chapters: ['第11章：分布式重塑'] },
  { file: 'Ch12_炮火.md', chapters: ['第12章：炮火'] },
  { file: 'Ch13_地下.md', chapters: ['第13章：地下'] },
  { file: 'Ch14_消耗.md', chapters: ['第14章：消耗'] },
  { file: 'Ch15_天空之眼.md', chapters: ['第15章：天空之眼'] },
  { file: 'Ch16_冷漠的处方.md', chapters: ['第16章：冷漠的处方'] },
  { file: 'novel_bible/ch17_幽灵接口.md', chapters: ['第17章：幽灵接口'] },
  { file: 'novel_bible/ch18_潜入.md', chapters: ['第18章：潜入'] },
  { file: 'novel_bible/ch19_十三个字.md', chapters: ['第19章：十三个字'] },
  { file: 'novel_bible/ch20_幸存者.md', chapters: ['第20章：幸存者'] },
  { file: '尾声_多年后.md', chapters: ['尾声：多年后'] },
];

// Map chapter number to output filename
function getOutputName(title, index) {
  if (title.includes('序幕')) return 'ch_00';
  if (title.includes('尾声')) return 'ch_21';
  const match = title.match(/第(\d+)章/);
  if (match) return `ch_${match[1].padStart(2, '0')}`;
  return `ch_${String(index).padStart(2, '0')}`;
}

function getDisplayTitle(title) {
  if (title.includes('序幕')) return title;
  if (title.includes('尾声')) return title;
  const match = title.match(/第(\d+)章[：:]\s*(.+)/);
  if (match) return `第${match[1]}章 · ${match[2]}`;
  return title;
}

// Extract chapter content from a file
function extractChapters(content, expectedChapters) {
  // Split by ## headers (chapter boundaries)
  const parts = content.split(/\n(?=## )/);
  const result = {};

  for (const part of parts) {
    const headerMatch = part.match(/^##\s+(.+)/);
    if (!headerMatch) {
      // Content before first ## — assign to first expected chapter
      if (expectedChapters.length === 1) {
        result[expectedChapters[0]] = (result[expectedChapters[0]] || '') + part.trim();
      }
      continue;
    }
    const header = headerMatch[1].trim();
    // Find matching expected chapter
    for (const expected of expectedChapters) {
      if (header.includes(expected.split('：')[0]) && header.includes(expected.split('：')[1] || '')) {
        result[expected] = part.replace(/^##\s+.+\n+/, '').trim();
        break;
      }
      // Loose match
      if (header.includes(expected.replace('：', ':').split(':')[0])) {
        result[expected] = part.replace(/^##\s+.+\n+/, '').trim();
        break;
      }
    }
  }

  // If no chapters were extracted (single chapter file), assign all content
  if (Object.keys(result).length === 0 && expectedChapters.length === 1) {
    result[expectedChapters[0]] = content.trim();
  }

  return result;
}

// Collect all chapters
const allChapters = [];
for (const src of SOURCES) {
  const filePath = path.join(__dirname, src.file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Missing: ${src.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const extracted = extractChapters(content, src.chapters);

  for (const [title, body] of Object.entries(extracted)) {
    if (!body || body.length < 50) {
      console.log(`⚠ Empty/short chapter: ${title}`);
      continue;
    }
    allChapters.push({ title, body });
  }
}

// Sort: prologue first, then ch1-20, epilogue last
const orderMap = { '序幕': 0 };
for (let i = 1; i <= 20; i++) orderMap[`第${i}章`] = i;
orderMap['尾声'] = 21;

allChapters.sort((a, b) => {
  const getKey = (t) => {
    for (const [k, v] of Object.entries(orderMap)) {
      if (t.includes(k)) return v;
    }
    return 99;
  };
  return getKey(a.title) - getKey(b.title);
});

if (allChapters.length === 0) {
  console.log('No chapters found!');
  process.exit(1);
}

// Build chapter data
const chapterData = [];
for (let i = 0; i < allChapters.length; i++) {
  const ch = allChapters[i];
  const outName = getOutputName(ch.title, i);
  chapterData.push({
    index: i,
    num: outName,
    title: getDisplayTitle(ch.title),
    body: ch.body,
    htmlFile: `${outName}.html`,
  });
}

// Convert to HTML
for (const ch of chapterData) {
  const bodyHTML = marked.parse(ch.body);
  const prevFile = ch.index > 0 ? chapterData[ch.index - 1].htmlFile : '';
  const nextFile = ch.index < chapterData.length - 1 ? chapterData[ch.index + 1].htmlFile : '';

  const chapterHTML = TEMPLATE
    .replaceAll('{{TITLE}}', ch.title)
    .replace('{{CONTENT}}', bodyHTML)
    .replaceAll('{{PREV}}', prevFile || '#')
    .replaceAll('{{NEXT}}', nextFile || '#')
    .replaceAll('{{PREV_CLASS}}', prevFile ? '' : 'disabled')
    .replaceAll('{{NEXT_CLASS}}', nextFile ? '' : 'disabled')
    .replaceAll('{{CHAPTER_NUM}}', ch.num === 'ch_00' ? '序幕' : ch.num === 'ch_21' ? '尾声' : String(ch.index))
    .replaceAll('{{TOTAL}}', String(chapterData.length));

  const htmlPath = path.join(OUTPUT_DIR, ch.htmlFile);
  fs.writeFileSync(htmlPath, chapterHTML, 'utf-8');
  console.log(`✓ ${ch.htmlFile} — ${ch.title}`);
}

// Calculate total word count (~Chinese chars)
const totalChars = allChapters.reduce((sum, ch) => sum + ch.body.replace(/\s/g, '').length, 0);
const estimatedWords = Math.round(totalChars);

// Generate index.html
const menuItems = chapterData.map(ch => {
  const label = ch.num === 'ch_00' ? '序幕' : ch.num === 'ch_21' ? '尾声' : `第${ch.index}章`;
  return `<li><a href="${ch.htmlFile}" target="content">${label}<br><span>${ch.title.split('·').pop()?.trim() || ch.title}</span></a></li>`;
}).join('\n');

const indexHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>《智子纪元》</title>
<style>
  :root {
    --bg: #0a0a0f;
    --sidebar-bg: #111118;
    --border: #2a2a3e;
    --text: #c8c8d4;
    --text-dim: #6a6a7a;
    --accent: #64b5f6;
    --accent-hover: #90caf9;
    --radius: 8px;
    --sidebar-width: 260px;
    --font: 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; background: var(--bg); font-family: var(--font); color: var(--text); }
  body { display: flex; }
  #sidebar {
    width: var(--sidebar-width); min-width: var(--sidebar-width); height: 100vh;
    background: var(--sidebar-bg); border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    overflow-y: auto; overflow-x: hidden;
    position: fixed; left: 0; top: 0;
  }
  #sidebar .brand {
    padding: 24px 20px 16px; font-size: 20px; font-weight: 700;
    color: #fff; border-bottom: 1px solid var(--border);
    letter-spacing: 2px;
  }
  #sidebar .brand span { color: var(--accent); font-size: 14px; display: block; margin-top: 4px; letter-spacing: 0; }
  #sidebar .stats {
    padding: 12px 20px; font-size: 12px; color: var(--text-dim);
    border-bottom: 1px solid var(--border);
  }
  #sidebar nav { flex: 1; padding: 8px 0; }
  #sidebar nav ul { list-style: none; }
  #sidebar nav a {
    display: block; padding: 12px 20px; text-decoration: none;
    color: var(--text-dim); font-size: 14px; line-height: 1.4;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }
  #sidebar nav a:hover {
    background: rgba(100,181,246,0.05); color: #fff;
    border-left-color: rgba(100,181,246,0.3);
  }
  #sidebar nav a.active {
    background: rgba(100,181,246,0.08); color: var(--accent);
    border-left-color: var(--accent);
  }
  #sidebar nav a span { font-size: 12px; opacity: 0.6; }
  #main { margin-left: var(--sidebar-width); flex: 1; height: 100vh; display: flex; flex-direction: column; }
  #main iframe { flex: 1; width: 100%; border: none; background: #fff; }
  @media (max-width: 768px) {
    #sidebar { width: 180px; min-width: 180px; }
    #sidebar .brand { font-size: 16px; padding: 16px 14px; }
    #sidebar nav a { padding: 10px 14px; font-size: 13px; }
    #main { margin-left: 180px; }
  }
</style>
</head>
<body>
<aside id="sidebar">
  <div class="brand">智子纪元<span>The Zhizi Era</span></div>
  <div class="stats">${chapterData.length} 章 · 约 ${Math.round(estimatedWords / 10000 * 10) / 10} 万字</div>
  <nav><ul>${menuItems}</ul></nav>
</aside>
<main id="main">
  <iframe src="${chapterData[0].htmlFile}" name="content" id="contentFrame"></iframe>
</main>
<script>
(function() {
  const links = document.querySelectorAll('#sidebar nav a');
  const frame = document.getElementById('contentFrame');
  function setActive(href) {
    links.forEach(l => l.classList.remove('active'));
    const match = document.querySelector('#sidebar nav a[href="' + href + '"]');
    if (match) match.classList.add('active');
  }
  links.forEach(a => {
    a.addEventListener('click', function() { setActive(this.getAttribute('href')); });
  });
  frame.addEventListener('load', function() {
    try {
      const src = frame.contentWindow.location.href;
      const filename = src.split('/').pop().split('?')[0];
      if (filename && filename.endsWith('.html')) setActive(filename);
    } catch(e) {}
  });
  setActive('${chapterData[0].htmlFile}');
})();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHTML, 'utf-8');
console.log(`✓ index.html`);
console.log(`\nDone! ${chapterData.length} chapters → ${OUTPUT_DIR}/`);
console.log(`Total: ~${estimatedWords} chars (~${Math.round(estimatedWords / 10000 * 10) / 10} 万字)`);
