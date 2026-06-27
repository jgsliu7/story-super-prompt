const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked for Chinese content
marked.setOptions({
  breaks: true,
  gfm: true,
});

const CHAPTER_DIR = path.join(__dirname, 'novel_bible/06_chapters');
const OUTPUT_DIR = path.join(__dirname, 'html');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');

// Ensure output dir
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Get all chapter files sorted
const chapterFiles = fs.readdirSync(CHAPTER_DIR)
  .filter(f => f.match(/^ch_\d+\.md$/))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });

if (chapterFiles.length === 0) {
  console.log('No chapter files found in', CHAPTER_DIR);
  process.exit(1);
}

// Extract chapter info from the first <h1> in each file
function extractTitle(content) {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1];
  const titleMatch = content.match(/^第[一二三四五六七八九十\d]+章[：:]\s*(.+)$/m);
  if (titleMatch) return titleMatch[0];
  return '未命名';
}

// Build chapter list data
const chapters = [];
for (const file of chapterFiles) {
  const md = fs.readFileSync(path.join(CHAPTER_DIR, file), 'utf-8');
  const match = file.match(/^ch_(\d+)\.md$/);
  const num = parseInt(match[1]);
  const title = extractTitle(md);
  chapters.push({ num, file, title, htmlFile: file.replace('.md', '.html') });
}

// Convert each chapter
for (const ch of chapters) {
  const mdPath = path.join(CHAPTER_DIR, ch.file);
  const htmlPath = path.join(OUTPUT_DIR, ch.htmlFile);
  const md = fs.readFileSync(mdPath, 'utf-8');

  // Remove the first h1 (title) — we show it in the header instead
  const mdWithoutTitle = md.replace(/^#\s+.+\n+/, '');

  const bodyHTML = marked.parse(mdWithoutTitle);
  const prevFile = ch.num > 1 ? `ch_${String(ch.num - 1).padStart(2, '0')}.html` : '';
  const nextFile = ch.num < chapters.length ? `ch_${String(ch.num + 1).padStart(2, '0')}.html` : '';
  const displayTitle = ch.num === 0 ? ch.title : `第${ch.num}章 · ${ch.title}`;
  const chapterHTML = TEMPLATE
    .replaceAll('{{TITLE}}', displayTitle)
    .replace('{{CONTENT}}', bodyHTML)
    .replaceAll('{{PREV}}', prevFile || '#')
    .replaceAll('{{NEXT}}', nextFile || '#')
    .replaceAll('{{PREV_CLASS}}', prevFile ? '' : 'disabled')
    .replaceAll('{{NEXT_CLASS}}', nextFile ? '' : 'disabled')
    .replaceAll('{{CHAPTER_NUM}}', ch.num === 0 ? '前言' : String(ch.num))
    .replaceAll('{{TOTAL}}', String(chapters.length));

  fs.writeFileSync(htmlPath, chapterHTML, 'utf-8');
  console.log(`✓ ch_${String(ch.num).padStart(2, '0')}.html`);
}

// Generate index.html
const menuItems = chapters.map(ch => {
  const numStr = String(ch.num).padStart(2, '0');
  const label = ch.num === 0 ? ch.title : `第${ch.num}章`;
  return `<li><a href="${ch.htmlFile}" target="content" data-ch="ch_${numStr}">${label}<br><span>${ch.title}</span></a></li>`;
}).join('\n');

const indexHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>《一行毁灭世界的提示词》</title>
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
    --sidebar-width: 240px;
    --font: 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; background: var(--bg); font-family: var(--font); color: var(--text); }
  body { display: flex; }

  /* ── Sidebar ── */
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
  #sidebar nav li { }
  #sidebar nav a {
    display: block; padding: 14px 20px; text-decoration: none;
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

  /* ── Main ── */
  #main {
    margin-left: var(--sidebar-width); flex: 1; height: 100vh;
    display: flex; flex-direction: column;
  }
  #main iframe {
    flex: 1; width: 100%; border: none;
    background: #fff;
  }

  /* ── Responsive ── */
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
  <div class="brand">
    一行毁灭世界的提示词
    <span>Objective Function</span>
  </div>
  <div class="stats">17 章 · 约 9.5 万字</div>
  <nav>
    <ul>
${menuItems}
    </ul>
  </nav>
</aside>

<main id="main">
  <iframe src="${chapters[0].htmlFile}" name="content" id="contentFrame"></iframe>
</main>

<script>
(function() {
  const links = document.querySelectorAll('#sidebar nav a');
  const frame = document.getElementById('contentFrame');

  function setActive(href) {
    links.forEach(l => l.classList.remove('active'));
    const match = document.querySelector(\`#sidebar nav a[href="\${href}"]\`);
    if (match) match.classList.add('active');
  }

  // Click handler
  links.forEach(a => {
    a.addEventListener('click', function() {
      setActive(this.getAttribute('href'));
    });
  });

  // Detect iframe navigation (when user clicks prev/next inside chapter)
  frame.addEventListener('load', function() {
    try {
      const src = frame.contentWindow.location.href;
      const filename = src.split('/').pop().split('?')[0];
      if (filename && filename.endsWith('.html')) {
        setActive(filename);
      }
    } catch(e) {
      // cross-origin — ignore
    }
  });

  // Set initial active
  setActive('${chapters[0].htmlFile}');
})();
</script>

</body>
</html>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHTML, 'utf-8');
console.log(`✓ index.html`);
console.log(`\nDone! ${chapters.length} chapters converted to ${OUTPUT_DIR}/`);
