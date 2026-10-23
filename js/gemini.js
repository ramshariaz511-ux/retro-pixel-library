/**
 * RETROZEN PIXEL LIBRARY - GOOGLE GEMINI AI COMPANION & LIBRARIAN
 * Connects securely to the backend /api/gemini, /api/set-key, and /api/status routes.
 * No API keys or placeholder keys are hardcoded in frontend files.
 * Uses isolated storage keys ('retrolibrary_user_key') so it never conflicts with retroZen driving.
 */

class RetroLibraryGeminiAI {
  constructor() {
    this.drawer = null;
    this.chatBody = null;
    this.input = null;
    this.submitBtn = null;
    this.keyStatusBtn = null;
    this.keyPanel = null;
    this.keyInput = null;
    this.keySaveBtn = null;
    this.keyMsg = null;
    this.isOpen = false;
    this.isProcessing = false;
    this.isKeyActive = false;
    this.chatHistory = [];
    this.storageKeyName = 'retrolibrary_user_key';
  }

  init() {
    this.drawer = document.getElementById('ai-drawer');
    this.chatBody = document.getElementById('ai-chat-body');
    this.input = document.getElementById('ai-input');
    this.submitBtn = document.getElementById('ai-submit-btn');

    this.keyStatusBtn = document.getElementById('ai-key-status-btn');
    this.keyPanel = document.getElementById('ai-key-panel');
    this.keyInput = document.getElementById('ai-key-input');
    this.keySaveBtn = document.getElementById('ai-key-save-btn');
    this.keyMsg = document.getElementById('ai-key-msg');

    // Open / Close AI Drawer triggers
    document.querySelectorAll('.open-ai-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('select');
        this.toggleDrawer(true);
      });
    });

    const closeBtn = document.getElementById('close-ai-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('back');
        this.toggleDrawer(false);
      });
    }

    // Toggle API Key Panel
    if (this.keyStatusBtn && this.keyPanel) {
      this.keyStatusBtn.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('select');
        const isHidden = this.keyPanel.style.display === 'none';
        this.keyPanel.style.display = isHidden ? 'block' : 'none';
        if (isHidden && this.keyInput) {
          setTimeout(() => this.keyInput.focus(), 100);
        }
      });
    }

    // Save API Key button
    if (this.keySaveBtn && this.keyInput) {
      this.keySaveBtn.addEventListener('click', () => {
        const key = (this.keyInput.value || '').trim();
        if (key) this.submitApiKey(key);
      });
      this.keyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const key = (this.keyInput.value || '').trim();
          if (key) this.submitApiKey(key);
        }
      });
    }

    // Main chat submit
    if (this.submitBtn && this.input) {
      this.submitBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Quick Prompt Chips
    document.querySelectorAll('.mood-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('select');
        const text = chip.getAttribute('data-prompt') || chip.textContent.trim();
        if (this.input) {
          this.input.value = text;
          this.sendMessage();
        }
      });
    });

    this.checkStatus();
  }

  async checkStatus() {
    try {
      const localKey = localStorage.getItem(this.storageKeyName);
      const res = await fetch('/api/status');
      const data = await res.json();
      this.isKeyActive = !!(data.geminiConfigured || localKey);
      this.updateKeyBadge();
    } catch (e) {
      const localKey = localStorage.getItem(this.storageKeyName);
      if (localKey) {
        this.isKeyActive = true;
        this.updateKeyBadge();
      }
    }
  }

  updateKeyBadge() {
    if (!this.keyStatusBtn) return;
    if (this.isKeyActive) {
      this.keyStatusBtn.textContent = '🔑 ACTIVE';
      this.keyStatusBtn.classList.add('active');
      this.keyStatusBtn.title = 'Google Gemini AI is active and connected (click to update key)';
    } else {
      this.keyStatusBtn.textContent = '🔑 SET KEY';
      this.keyStatusBtn.classList.remove('active');
      this.keyStatusBtn.title = 'Click to enter your Google Gemini API key';
    }
  }

  toggleDrawer(open = null) {
    this.isOpen = open !== null ? open : !this.isOpen;
    if (this.drawer) {
      if (this.isOpen) {
        this.drawer.classList.add('open');
        setTimeout(() => this.input && this.input.focus(), 250);
      } else {
        this.drawer.classList.remove('open');
      }
    }
  }

  openKeyPanel() {
    if (this.keyPanel) {
      this.keyPanel.style.display = 'block';
      setTimeout(() => this.keyInput && this.keyInput.focus(), 100);
    }
  }

  async submitApiKey(apiKey) {
    if (!apiKey) return;
    if (window.retroAudio) window.retroAudio.playArcadeClick('select');

    if (this.keyMsg) {
      this.keyMsg.className = 'ai-key-msg';
      this.keyMsg.style.display = 'block';
      this.keyMsg.innerHTML = '<span style="color:var(--text-cyan);">Verifying key with Google Gemini API...</span>';
    }

    try {
      const res = await fetch('/api/set-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      const data = await res.json();

      if (data.success) {
        this.isKeyActive = true;
        localStorage.setItem(this.storageKeyName, apiKey);
        this.updateKeyBadge();

        if (this.keyMsg) {
          this.keyMsg.className = 'ai-key-msg success';
          this.keyMsg.innerHTML = '✅ Key verified & isolated for Pixel Library!';
        }

        if (window.retroAudio) window.retroAudio.playArcadeClick('fanfare');

        setTimeout(() => {
          if (this.keyPanel) this.keyPanel.style.display = 'none';
          if (this.keyInput) this.keyInput.value = '';
          if (this.keyMsg) this.keyMsg.style.display = 'none';
        }, 1200);

        this.appendMessage(
          'bot',
          this.formatMarkdown(
            `✨ **Google Gemini API Key Connected!**\n\nI am online and ready to talk about **anything** — science, mathematics, exam prep (SAT, GRE, MCAT, IGCSEs, A-Levels, Bar Exam), philosophy, coding, Minecraft/Roblox, stories, or finding the best books in our retroZen Library!`
          )
        );
      } else {
        if (this.keyMsg) {
          this.keyMsg.className = 'ai-key-msg error';
          this.keyMsg.innerHTML = `⚠️ ${data.error || 'Verification failed.'}`;
        }
      }
    } catch (err) {
      if (this.keyMsg) {
        this.keyMsg.className = 'ai-key-msg error';
        this.keyMsg.innerHTML = `⚠️ Connection error: ${err.message}`;
      }
    }
  }

  formatMarkdown(raw) {
    if (!raw) return '';

    let text = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    text = text.replace(/```(?:[a-zA-Z0-9_\-]+)?\n?([\s\S]*?)```/g, (match, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    text = text.replace(/(?:^[ \t]*[-*][ \t]+(.+)$)+/gm, (match) => {
      const items = match.trim().split(/\r?\n/);
      const lis = items.map(line => {
        const itemText = line.replace(/^[ \t]*[-*][ \t]+/, '');
        return `<li>${itemText}</li>`;
      }).join('');
      return `<ul>${lis}</ul>`;
    });

    const parts = text.split(/(<pre>[\s\S]*?<\/pre>|<ul>[\s\S]*?<\/ul>)/g);
    text = parts.map(part => {
      if (part.startsWith('<pre>') || part.startsWith('<ul>')) {
        return part;
      }
      return part
        .replace(/\r?\n\r?\n/g, '<br><br>')
        .replace(/\r?\n/g, '<br>');
    }).join('');

    return text;
  }

  async sendMessage(customPrompt = null) {
    if (this.isProcessing) return;
    const text = (customPrompt !== null ? customPrompt : (this.input?.value || '')).trim();
    if (!text) return;

    if (window.retroAudio) window.retroAudio.playArcadeClick('select');

    // Detect if user pasted a Gemini key directly into the chat
    if (/^(?:AIza|AQ\.)[0-9A-Za-z-_]{20,}$/.test(text)) {
      if (this.input) this.input.value = '';
      this.submitApiKey(text);
      return;
    }

    this.appendMessage('user', this.formatMarkdown(text));
    if (this.input && customPrompt === null) this.input.value = '';
    this.isProcessing = true;

    this.chatHistory.push({ role: 'user', text: text });
    if (this.chatHistory.length > 14) {
      this.chatHistory = this.chatHistory.slice(-14);
    }

    const loadingBubble = this.appendMessage(
      'bot',
      '<span style="color:var(--text-cyan);">Google Gemini is thinking... [■■■□□□]</span>'
    );

    try {
      const activeKey = localStorage.getItem(this.storageKeyName) || '';
      const storeContext = window.retroLibraryApp
        ? `Category=${window.retroLibraryApp.activeCategory}, Subcategory=${window.retroLibraryApp.activeSubcategory}, CartItems=${window.retroLibraryApp.getCartCount()}`
        : '';

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          history: this.chatHistory.slice(0, -1),
          apiKey: activeKey,
          storeContext
        })
      });

      const data = await res.json();

      if (loadingBubble && loadingBubble.parentNode) {
        loadingBubble.remove();
      }

      if (data.success) {
        const replyText = data.text || 'I am here to help!';
        this.chatHistory.push({ role: 'model', text: replyText });
        if (this.chatHistory.length > 14) {
          this.chatHistory = this.chatHistory.slice(-14);
        }

        this.renderBotResponse(replyText, data.recommendation, data.isMock, data.info, data.needsKey);
      } else {
        this.appendMessage('bot', `⚠️ Could not get AI response: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      if (loadingBubble && loadingBubble.parentNode) {
        loadingBubble.remove();
      }
      this.appendMessage('bot', '⚠️ Connection to retroZen Library Server lost. Make sure the server is running.');
    } finally {
      this.isProcessing = false;
    }
  }

  appendMessage(sender, htmlContent) {
    if (!this.chatBody) return null;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = htmlContent;
    this.chatBody.appendChild(bubble);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
    return bubble;
  }

  renderBotResponse(text, recommendation = null, isMock = false, extraInfo = '', needsKey = false) {
    const container = document.createElement('div');
    container.className = 'chat-bubble bot';

    let html = `<div class="bot-text-content" style="color: var(--text-primary); line-height: 1.45;">${this.formatMarkdown(text)}</div>`;

    if (recommendation && (recommendation.category || recommendation.subcategory)) {
      const catLabel = (recommendation.category || 'all').toUpperCase();
      const subLabel = recommendation.subcategory && recommendation.subcategory !== 'all'
        ? ` • ${recommendation.subcategory.toUpperCase()}`
        : '';

      html += `
        <div class="rec-card" style="margin-top: 10px;">
          <div style="color: var(--yellow-retro); font-weight: bold; margin-bottom: 6px; font-size: 13px; font-family: var(--font-pixel);">
            ✦ LIBRARY SHELF & AMBIENCE MATCH ✦
          </div>
          <div class="rec-item">
            <span class="rec-label">📚 Shelf:</span>
            <span class="rec-value">${catLabel}${subLabel}</span>
          </div>
          ${recommendation.ambientSuggestion ? `
          <div class="rec-item">
            <span class="rec-label">🎵 Study Vibe:</span>
            <span class="rec-value">Beat #${recommendation.ambientSuggestion.beatTrack || 1} | Vinyl: ${recommendation.ambientSuggestion.vinyl ? 'ON' : 'OFF'} | Rain: ${recommendation.ambientSuggestion.rain ? 'ON' : 'OFF'}</span>
          </div>
          ` : ''}
          <button class="apply-trip-btn" style="margin-top: 8px; width: 100%;">
            📖 [ OPEN RECOMMENDED SHELF & STUDY VIBE ]
          </button>
        </div>
      `;
    }

    if (needsKey) {
      html += `
        <button class="open-key-panel-btn" style="margin-top: 10px; width: 100%; background: var(--yellow-retro); color: #000; font-family: var(--font-pixel); font-size: 9px; padding: 8px; border: 2px solid #000; border-radius: 4px; cursor: pointer; box-shadow: 0 2px 0 #b45309;">
          🔑 [ CLICK TO ENTER GEMINI API KEY ]
        </button>
      `;
    }

    if (isMock && extraInfo && !needsKey) {
      html += `<div style="font-size: 13px; color: #94a3b8; margin-top: 8px; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 6px;">ℹ️ ${extraInfo}</div>`;
    }

    container.innerHTML = html;
    this.chatBody.appendChild(container);

    const applyBtn = container.querySelector('.apply-trip-btn');
    if (applyBtn && recommendation) {
      applyBtn.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('fanfare');
        if (window.retroLibraryApp) {
          window.retroLibraryApp.navigateToCategory(
            recommendation.category || 'all',
            recommendation.subcategory || 'all'
          );
          if (recommendation.ambientSuggestion) {
            window.retroLibraryApp.applyAmbientSuggestion(recommendation.ambientSuggestion);
          }
        }
      });
    }

    const keyBtn = container.querySelector('.open-key-panel-btn');
    if (keyBtn) {
      keyBtn.addEventListener('click', () => {
        this.openKeyPanel();
      });
    }

    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }
}

window.retroGemini = new RetroLibraryGeminiAI();
