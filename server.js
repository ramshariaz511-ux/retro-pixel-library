/**
 * RETROZEN PIXEL LIBRARY STORE - SECURE BACKEND SERVER (LOCAL & VERCEL)
 * Serves static web store assets and provides secure Google Gemini AI proxy routes:
 * - POST /api/gemini
 * - POST /api/set-key
 * - GET  /api/status
 *
 * Explicitly references static assets via path.join(__dirname, ...) so Vercel's
 * Node File Tracer (@vercel/nft) bundles all frontend assets automatically.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

function loadEnvFile() {
  const envPath = fs.existsSync(path.join(__dirname, '.env'))
    ? path.join(__dirname, '.env')
    : path.join(process.cwd(), '.env');

  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (val) {
            process.env[key] = val;
          }
        }
      }
    } catch (err) {
      console.warn('[Server] Could not parse .env file:', err.message);
    }
  }
}
loadEnvFile();

const PORT = parseInt(process.env.PORT || '3005', 10);
const PUBLIC_DIR = __dirname;

// Explicit literal path.join(__dirname, ...) calls so Vercel @vercel/nft bundles every static file
const STATIC_ASSET_MAP = {
  '/': {
    filePath: path.join(__dirname, 'index.html'),
    contentType: 'text/html; charset=utf-8'
  },
  '/index.html': {
    filePath: path.join(__dirname, 'index.html'),
    contentType: 'text/html; charset=utf-8'
  },
  '/css/retro.css': {
    filePath: path.join(__dirname, 'css', 'retro.css'),
    contentType: 'text/css; charset=utf-8'
  },
  '/js/audio.js': {
    filePath: path.join(__dirname, 'js', 'audio.js'),
    contentType: 'application/javascript; charset=utf-8'
  },
  '/js/catalog.js': {
    filePath: path.join(__dirname, 'js', 'catalog.js'),
    contentType: 'application/javascript; charset=utf-8'
  },
  '/js/app.js': {
    filePath: path.join(__dirname, 'js', 'app.js'),
    contentType: 'application/javascript; charset=utf-8'
  },
  '/js/gemini.js': {
    filePath: path.join(__dirname, 'js', 'gemini.js'),
    contentType: 'application/javascript; charset=utf-8'
  }
};

// Pre-trace files at module load so @vercel/nft always includes them in serverless deployment
const BUNDLED_ASSETS = {};
try {
  BUNDLED_ASSETS['/index.html'] = fs.readFileSync(path.join(__dirname, 'index.html'));
  BUNDLED_ASSETS['/'] = BUNDLED_ASSETS['/index.html'];
  BUNDLED_ASSETS['/css/retro.css'] = fs.readFileSync(path.join(__dirname, 'css', 'retro.css'));
  BUNDLED_ASSETS['/js/audio.js'] = fs.readFileSync(path.join(__dirname, 'js', 'audio.js'));
  BUNDLED_ASSETS['/js/catalog.js'] = fs.readFileSync(path.join(__dirname, 'js', 'catalog.js'));
  BUNDLED_ASSETS['/js/app.js'] = fs.readFileSync(path.join(__dirname, 'js', 'app.js'));
  BUNDLED_ASSETS['/js/gemini.js'] = fs.readFileSync(path.join(__dirname, 'js', 'gemini.js'));
} catch (e) {
  console.warn('[Server] Preload warning:', e.message);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const geminiHandler = require('./api/gemini');
const setKeyHandler = require('./api/set-key');
const statusHandler = require('./api/status');

function saveApiKeyToEnvFile(key) {
  process.env.GEMINI_API_KEY = key;
  const envPath = path.join(__dirname, '.env');
  let content = '';
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8');
  }
  if (content.includes('GEMINI_API_KEY=')) {
    content = content.replace(/GEMINI_API_KEY=.*/g, `GEMINI_API_KEY=${key}`);
  } else {
    content = `GEMINI_API_KEY=${key}\n` + content;
  }
  try {
    fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
  } catch (e) {
    // Ignore write error in read-only serverless environments
  }
}

function decorateRes(res) {
  res.status = function (code) {
    res.statusCode = code;
    return res;
  };
  res.json = function (obj) {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    res.end(JSON.stringify(obj));
    return res;
  };
  return res;
}

const server = http.createServer(async (req, res) => {
  decorateRes(res);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname === '/api/gemini' && req.method === 'POST') {
    return geminiHandler(req, res);
  }

  if (pathname === '/api/set-key' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50000) req.connection.destroy();
    });
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body || '{}');
      } catch (e) {
        req.body = {};
      }
      const candidateKey = (req.body.apiKey || '').trim();
      const origJson = res.json.bind(res);
      res.json = (obj) => {
        if (obj && obj.success && candidateKey) {
          saveApiKeyToEnvFile(candidateKey);
        }
        return origJson(obj);
      };
      return setKeyHandler(req, res);
    });
    return;
  }

  if (pathname === '/api/status' && req.method === 'GET') {
    return statusHandler(req, res);
  }

  // 1. Serve from pre-traced static asset map if matched
  if (STATIC_ASSET_MAP[pathname]) {
    const entry = STATIC_ASSET_MAP[pathname];
    if (BUNDLED_ASSETS[pathname]) {
      res.writeHead(200, { 'Content-Type': entry.contentType });
      return res.end(BUNDLED_ASSETS[pathname]);
    }
    if (fs.existsSync(entry.filePath)) {
      res.writeHead(200, { 'Content-Type': entry.contentType });
      return res.end(fs.readFileSync(entry.filePath));
    }
  }

  // 2. Fallback static file lookup or SPA fallback to index.html
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (BUNDLED_ASSETS['/index.html']) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(BUNDLED_ASSETS['/index.html']);
      }
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        if (BUNDLED_ASSETS['/index.html']) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(BUNDLED_ASSETS['/index.html']);
        }
        res.writeHead(500);
        return res.end('Internal Server Error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    const hasKey = !!(
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== '' &&
      process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    );
    console.log(`\n=======================================================`);
    console.log(`  📚 RETROZEN PIXEL LIBRARY STORE SERVER ONLINE`);
    console.log(`  URL: http://localhost:${portToTry}`);
    console.log(`  Isolated .env Gemini Key Active: ${hasKey ? 'YES' : 'NO (Set via UI or .env)'}`);
    console.log(`=======================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Port ${portToTry} in use, trying ${portToTry + 1}...]`);
      startServer(portToTry + 1);
    } else {
      console.error('[Server Error]', err);
    }
  });
}

if (require.main === module) {
  startServer(PORT);
}

module.exports = server;
