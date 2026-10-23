/**
 * RETROZEN PIXEL LIBRARY STORE - LOCAL DEVELOPMENT SERVER
 * Placed in scripts/dev-server.js so Vercel's root server.js auto-detector
 * serves static files (index.html, css/, js/) directly from the Vercel CDN
 * while using api/*.js for serverless endpoints.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function loadEnvFile() {
  const envPath = path.join(ROOT_DIR, '.env');
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

const geminiHandler = require('../api/gemini');
const setKeyHandler = require('../api/set-key');
const statusHandler = require('../api/status');

function saveApiKeyToEnvFile(key) {
  process.env.GEMINI_API_KEY = key;
  const envPath = path.join(ROOT_DIR, '.env');
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
  } catch (e) {}
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

  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(ROOT_DIR, safePath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(ROOT_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
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
      startServer(portToTry + 1);
    } else {
      console.error('[Server Error]', err);
    }
  });
}

if (require.main === module) {
  startServer(PORT);
}
