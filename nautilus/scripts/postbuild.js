import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const indexPath = path.join(dist, 'index.html');
const roadmapDir = path.join(dist, 'roadmap');
const roadmapPath = path.join(roadmapDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

const roadmapMeta = {
  title: 'Roadmap — Nautilus Agent',
  description: 'What we are building and why: persistent research workspaces, resource-aware agents, and evidence-based AI for scientists.',
  url: 'https://tj-coding.github.io/nautilus-community/roadmap/',
};

function replaceMeta(html, title, description, url) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"\/?>/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title" content=".*?"\/?>/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content=".*?"\/?>/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url" content=".*?"\/?>/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta name="twitter:title" content=".*?"\/?>/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content=".*?"\/?>/, `<meta name="twitter:description" content="${description}">`);
}

const roadmapHtml = replaceMeta(indexHtml, roadmapMeta.title, roadmapMeta.description, roadmapMeta.url);

fs.mkdirSync(roadmapDir, { recursive: true });
fs.writeFileSync(roadmapPath, roadmapHtml);
console.log(`✓ wrote ${roadmapPath}`);

// Ensure 404.html has correct OG fallback tags
const notFoundPath = path.join(dist, '404.html');
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nautilus Agent — AI for Scientists</title>
  <meta name="description" content="Structured project state, persistent agent commands, and evidence-based claims for research teams.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Nautilus Agent — AI for Scientists">
  <meta property="og:description" content="Structured project state, persistent agent commands, and evidence-based claims for research teams.">
  <meta property="og:image" content="https://tj-coding.github.io/nautilus-community/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://tj-coding.github.io/nautilus-community/">
  <meta property="og:site_name" content="Nautilus Agent">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Nautilus Agent — AI for Scientists">
  <meta name="twitter:description" content="Structured project state, persistent agent commands, and evidence-based claims for research teams.">
  <meta name="twitter:image" content="https://tj-coding.github.io/nautilus-community/og-image.png">
  <script type="text/javascript">
    var l = window.location;
    var pathSegments = l.pathname.split('/').filter(Boolean);
    var repoIndex = pathSegments.indexOf('nautilus-community');
    var basePath = '/';
    if (repoIndex !== -1) {
      basePath += pathSegments.slice(0, repoIndex + 1).join('/') + '/';
    }
    var appPath = l.pathname.replace(basePath, '/');
    l.replace(basePath + '?redirect=' + encodeURIComponent(appPath + l.search + l.hash));
  </script>
</head>
<body>
</body>
</html>
`;
fs.writeFileSync(notFoundPath, notFoundHtml);
console.log(`✓ wrote ${notFoundPath}`);
