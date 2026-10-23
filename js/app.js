/**
 * RETROZEN PIXEL LIBRARY STORE - MAIN STOREFRONT & CART CONTROLLER
 * Handles:
 * - Genre & Educational Subcategory filtering (Science, Math, History, Literature, Business, Computing, Test Guides, Exam Flashcards)
 * - Side Navbar & Top Bar synchronized Ambient Controls (Vinyl, Lo-Fi Beats, Rain, CRT)
 * - Real-time search & sorting (Featured, Price Low-High, Price High-Low, Rating, Title)
 * - Pixel Book Cover procedural SVG generator
 * - Interactive Book Details / Preview Modal + "Ask Gemini AI About This Book"
 * - Isolated Shopping Cart Drawer with student discount & retro receipt
 */

class RetroLibraryApp {
  constructor() {
    this.activeCategory = 'all';
    this.activeSubcategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.cart = [];
    this.discountApplied = false;
    this.cartStorageKey = 'retrolibrary_cart_v1';
  }

  init() {
    this.loadCart();
    this.renderSidebarCategories();
    this.renderSubcategoryBar();
    this.renderBooks();
    this.updateCartUI();
    this.bindEvents();
    this.initRainCanvas();
  }

  /* ================= 1. SIDEBAR & CATEGORY NAVIGATION ================= */
  renderSidebarCategories() {
    const navList = document.getElementById('sidebar-genre-list');
    if (!navList) return;

    const categories = window.LIBRARY_CATEGORIES || [];
    let html = '';

    categories.forEach(cat => {
      const isCatActive = this.activeCategory === cat.id;
      const count = cat.id === 'all'
        ? window.LIBRARY_BOOKS.length
        : window.LIBRARY_BOOKS.filter(b => b.category === cat.id).length;

      html += `
        <div class="sidebar-cat-group">
          <button class="sidebar-cat-btn ${isCatActive ? 'active' : ''}" data-cat="${cat.id}">
            <span class="cat-left">
              <span class="cat-icon">${cat.icon}</span>
              <span class="cat-name">${cat.shortName}</span>
            </span>
            <span class="cat-count">${count}</span>
          </button>
      `;

      // Render Educational subcategories right inside the side navbar as well!
      if (cat.subcategories && cat.subcategories.length > 0) {
        html += `<div class="sidebar-subcat-list ${isCatActive ? 'expanded' : ''}">`;
        cat.subcategories.forEach(sub => {
          const isSubActive = isCatActive && this.activeSubcategory === sub.id;
          const subCount = sub.id === 'all'
            ? count
            : window.LIBRARY_BOOKS.filter(b => b.category === cat.id && b.subcategory === sub.id).length;

          html += `
            <button class="sidebar-subcat-btn ${isSubActive ? 'active' : ''}" data-parent="${cat.id}" data-sub="${sub.id}">
              <span>${sub.icon} ${sub.name}</span>
              <span class="subcat-count">${subCount}</span>
            </button>
          `;
        });
        html += `</div>`;
      }

      html += `</div>`;
    });

    navList.innerHTML = html;

    // Bind category clicks
    navList.querySelectorAll('.sidebar-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat');
        if (window.retroAudio) window.retroAudio.playArcadeClick('page');
        this.navigateToCategory(catId, 'all');
      });
    });

    // Bind subcategory clicks
    navList.querySelectorAll('.sidebar-subcat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentId = btn.getAttribute('data-parent');
        const subId = btn.getAttribute('data-sub');
        if (window.retroAudio) window.retroAudio.playArcadeClick('page');
        this.navigateToCategory(parentId, subId);
      });
    });
  }

  navigateToCategory(categoryId, subcategoryId = 'all') {
    this.activeCategory = categoryId;
    this.activeSubcategory = subcategoryId;

    // Update top genre pills if present
    document.querySelectorAll('.top-genre-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-cat') === categoryId);
    });

    this.renderSidebarCategories();
    this.renderSubcategoryBar();
    this.renderBooks();

    // Update banner title & description
    const catObj = window.LIBRARY_CATEGORIES.find(c => c.id === categoryId) || window.LIBRARY_CATEGORIES[0];
    const titleEl = document.getElementById('current-shelf-title');
    const descEl = document.getElementById('current-shelf-desc');
    const badgeEl = document.getElementById('current-shelf-badge');

    let subTitleSuffix = '';
    if (categoryId === 'educational' && subcategoryId !== 'all') {
      const subObj = catObj.subcategories?.find(s => s.id === subcategoryId);
      if (subObj) subTitleSuffix = ` // ${subObj.icon} ${subObj.name.toUpperCase()}`;
    }

    if (titleEl) titleEl.textContent = `${catObj.icon} ${catObj.name.toUpperCase()}${subTitleSuffix}`;
    if (descEl) descEl.textContent = catObj.desc;
    if (badgeEl) badgeEl.textContent = `${catObj.icon} ${catObj.shortName}`;
  }

  renderSubcategoryBar() {
    const bar = document.getElementById('educational-subcat-bar');
    if (!bar) return;

    const eduCat = window.LIBRARY_CATEGORIES.find(c => c.id === 'educational');
    if (!eduCat || !eduCat.subcategories) return;

    // Always show the Educational Subcategory Quick Bar when on 'all' or 'educational' so users can jump straight to Science, Math, Flashcards, Test Guides, etc.
    if (this.activeCategory === 'educational' || this.activeCategory === 'all') {
      bar.style.display = 'flex';
      bar.innerHTML = `
        <div class="subcat-bar-label">🎓 EDUCATIONAL SUBCATEGORIES:</div>
        <div class="subcat-pills-wrap">
          ${eduCat.subcategories.map(sub => {
            const active = this.activeCategory === 'educational' && this.activeSubcategory === sub.id;
            return `
              <button class="subcat-pill ${active ? 'active' : ''}" data-sub="${sub.id}">
                ${sub.icon} ${sub.name}
              </button>
            `;
          }).join('')}
        </div>
      `;

      bar.querySelectorAll('.subcat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const subId = pill.getAttribute('data-sub');
          if (window.retroAudio) window.retroAudio.playArcadeClick('page');
          this.navigateToCategory('educational', subId);
        });
      });
    } else {
      bar.style.display = 'none';
    }
  }

  /* ================= 2. PIXEL ART BOOK COVER GENERATOR ================= */
  createPixelCoverHTML(book) {
    return `
      <div class="pixel-book-cover" style="--cover-bg: ${book.coverColor}; --cover-accent: ${book.accentColor};">
        <div class="book-spine"></div>
        <div class="book-cover-inner">
          <div class="book-top-trim"></div>
          <div class="book-badge-tag">${book.badge}</div>
          <div class="book-pixel-emblem">${book.icon}</div>
          <div class="book-cover-mini-title">${book.subcategoryLabel.split('•')[0].trim()}</div>
          <div class="book-bottom-trim"></div>
        </div>
        <div class="book-pages-edge"></div>
      </div>
    `;
  }

  /* ================= 3. RENDER BOOK GRID ================= */
  getFilteredBooks() {
    let list = [...(window.LIBRARY_BOOKS || [])];

    if (this.activeCategory !== 'all') {
      list = list.filter(b => b.category === this.activeCategory);
    }

    if (this.activeCategory === 'educational' && this.activeSubcategory !== 'all') {
      list = list.filter(b => b.subcategory === this.activeSubcategory);
    }

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.subcategoryLabel.toLowerCase().includes(q) ||
        b.badge.toLowerCase().includes(q) ||
        (b.highlights && b.highlights.some(h => h.toLowerCase().includes(q)))
      );
    }

    if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }

  renderBooks() {
    const grid = document.getElementById('books-grid');
    const countBadge = document.getElementById('results-count-badge');
    if (!grid) return;

    const books = this.getFilteredBooks();
    if (countBadge) {
      countBadge.textContent = `${books.length} ${books.length === 1 ? 'VOLUME' : 'VOLUMES'} FOUND`;
    }

    if (books.length === 0) {
      grid.innerHTML = `
        <div class="empty-shelf-box">
          <div style="font-size: 46px; margin-bottom: 10px;">🔍</div>
          <div class="empty-shelf-title">NO BOOKS MATCH YOUR SEARCH</div>
          <p style="color: var(--text-muted); margin-bottom: 14px;">Try clearing your search filter or ask our Google Gemini AI Librarian for recommendations!</p>
          <button class="action-btn" id="reset-filters-btn">🔄 RESET ALL FILTERS</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.searchQuery = '';
          const searchInput = document.getElementById('book-search-input');
          if (searchInput) searchInput.value = '';
          this.navigateToCategory('all', 'all');
        });
      }
      return;
    }

    grid.innerHTML = books.map(book => `
      <article class="book-card" data-book-id="${book.id}">
        <div class="book-card-top" data-preview-id="${book.id}" title="Click to inspect book details">
          ${this.createPixelCoverHTML(book)}
          <div class="book-meta-col">
            <div class="book-subcat-pill">${book.subcategoryLabel}</div>
            <h3 class="book-title">${book.title}</h3>
            <div class="book-author">✍️ ${book.author}</div>
            <div class="book-stats-row">
              <span class="book-rating">★ ${book.rating.toFixed(1)}</span>
              <span>•</span>
              <span class="book-pages">${book.pages}</span>
            </div>
            <div class="book-price-tag">$${book.price.toFixed(2)}</div>
          </div>
        </div>

        <p class="book-desc">${book.description}</p>

        <div class="book-highlights">
          ${(book.highlights || []).map(h => `<span class="highlight-chip">✦ ${h}</span>`).join('')}
        </div>

        <div class="book-card-actions">
          <button class="preview-book-btn" data-preview-id="${book.id}" title="Read Synopsis & Ask AI">
            📖 INSPECT
          </button>
          <button class="add-to-cart-btn" data-add-id="${book.id}">
            🛒 ADD TO CART • $${book.price.toFixed(2)}
          </button>
        </div>
      </article>
    `).join('');

    // Attach Add to Cart listeners
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bookId = btn.getAttribute('data-add-id');
        this.addToCart(bookId, btn);
      });
    });

    // Attach Inspect / Preview listeners
    grid.querySelectorAll('[data-preview-id]').forEach(el => {
      el.addEventListener('click', () => {
        const bookId = el.getAttribute('data-preview-id');
        this.openBookModal(bookId);
      });
    });
  }

  /* ================= 4. BOOK PREVIEW & AI STUDY MODAL ================= */
  openBookModal(bookId) {
    const book = window.LIBRARY_BOOKS.find(b => b.id === bookId);
    if (!book) return;

    if (window.retroAudio) window.retroAudio.playArcadeClick('page');

    const modal = document.getElementById('book-detail-modal');
    const content = document.getElementById('book-detail-body');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="modal-book-layout">
        <div class="modal-cover-col">
          ${this.createPixelCoverHTML(book)}
          <div class="modal-price-box">
            <span class="modal-price-label">LIBRARY PRICE:</span>
            <span class="modal-price-val">$${book.price.toFixed(2)}</span>
          </div>
        </div>
        <div class="modal-info-col">
          <div class="book-subcat-pill" style="display:inline-block; margin-bottom:6px;">${book.subcategoryLabel}</div>
          <h2 class="modal-book-title">${book.title}</h2>
          <div class="modal-book-author">Author / Publisher: <strong>${book.author}</strong></div>
          <div class="modal-book-stats">
            <span>⭐ Rating: ${book.rating.toFixed(1)} / 5.0</span>
            <span>•</span>
            <span>📄 Length: ${book.pages}</span>
            <span>•</span>
            <span>🏷️ ID: #${book.id.toUpperCase()}</span>
          </div>
          <div class="modal-book-desc">
            ${book.description}
          </div>
          <div class="modal-highlights-box">
            <div class="modal-section-subtitle">KEY TOPICS & EDITION FEATURES:</div>
            <ul class="modal-highlights-list">
              ${(book.highlights || []).map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-action-row">
            <button class="big-start-btn" id="modal-add-cart-btn">
              🛒 [ ADD TO CART — $${book.price.toFixed(2)} ]
            </button>
            <button class="action-btn ai-btn" id="modal-ask-ai-btn" style="padding: 10px 14px; font-size: 16px;">
              🤖 ASK GEMINI AI ABOUT THIS BOOK
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');

    document.getElementById('modal-add-cart-btn')?.addEventListener('click', (e) => {
      this.addToCart(book.id, e.currentTarget);
    });

    document.getElementById('modal-ask-ai-btn')?.addEventListener('click', () => {
      modal.classList.add('hidden');
      if (window.retroGemini) {
        window.retroGemini.toggleDrawer(true);
        window.retroGemini.sendMessage(
          `Tell me more about "${book.title}" by ${book.author} (${book.subcategoryLabel}) and explain one of its core concepts!`
        );
      }
    });
  }

  /* ================= 5. SHOPPING CART SYSTEM ================= */
  loadCart() {
    try {
      const saved = localStorage.getItem(this.cartStorageKey);
      if (saved) {
        this.cart = JSON.parse(saved);
      }
    } catch (e) {
      this.cart = [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.cartStorageKey, JSON.stringify(this.cart));
    } catch (e) {}
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  addToCart(bookId, btnElement = null) {
    const book = window.LIBRARY_BOOKS.find(b => b.id === bookId);
    if (!book) return;

    if (window.retroAudio) window.retroAudio.playArcadeClick('coin');

    const existing = this.cart.find(item => item.id === bookId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        icon: book.icon,
        subcategoryLabel: book.subcategoryLabel,
        qty: 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast(`🛒 Added "${book.title}" to Cart!`);

    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.classList.add('added-flash');
      btnElement.innerHTML = `✅ IN CART (${existing ? existing.qty : 1})`;
      setTimeout(() => {
        btnElement.classList.remove('added-flash');
        btnElement.innerHTML = originalHTML;
      }, 1100);
    }
  }

  updateItemQty(bookId, delta) {
    const idx = this.cart.findIndex(item => item.id === bookId);
    if (idx === -1) return;

    if (window.retroAudio) window.retroAudio.playArcadeClick('select');

    this.cart[idx].qty += delta;
    if (this.cart[idx].qty <= 0) {
      this.cart.splice(idx, 1);
    }
    this.saveCart();
    this.updateCartUI();
  }

  clearCart() {
    this.cart = [];
    this.discountApplied = false;
    this.saveCart();
    this.updateCartUI();
  }

  updateCartUI() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = count;
    });

    const cartItemsContainer = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountValEl = document.getElementById('cart-discount-val');
    const totalEl = document.getElementById('cart-total-val');

    if (!cartItemsContainer) return;

    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = this.discountApplied ? subtotal * 0.20 : 0;
    const total = Math.max(0, subtotal - discount);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountRow) discountRow.style.display = this.discountApplied ? 'flex' : 'none';
    if (discountValEl) discountValEl.textContent = `-$${discount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-msg">
          <div style="font-size: 38px; margin-bottom: 8px;">🛒</div>
          <div>YOUR LIBRARY BAG IS EMPTY</div>
          <div style="font-size: 14px; color: var(--text-muted); margin-top: 6px;">Explore our Educational, Exam Flashcard, Philosophy, Novel, or Game Guide shelves to add books!</div>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item-card">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-sub">${item.subcategoryLabel} • $${item.price.toFixed(2)} each</div>
          <div class="cart-qty-controls">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
            <span class="cart-item-line-total">$${(item.price * item.qty).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');

    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        this.updateItemQty(id, delta);
      });
    });
  }

  toggleCartDrawer(open = null) {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    const shouldOpen = open !== null ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', shouldOpen);
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'retro-toast';
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  /* ================= 6. AMBIENT CONTROLS SYNC (SIDEBAR + TOPBAR) ================= */
  syncVinylUI(active, vol = null) {
    document.querySelectorAll('.vinyl-toggle-sync').forEach(btn => {
      btn.classList.toggle('active', active);
    });
    if (vol !== null) {
      document.querySelectorAll('.vinyl-slider-sync').forEach(s => { s.value = vol; });
    }
  }

  syncRainUI(active, vol = null) {
    document.querySelectorAll('.rain-toggle-sync').forEach(btn => {
      btn.classList.toggle('active', active);
    });
    const rainOverlay = document.getElementById('pixel-rain-overlay');
    if (rainOverlay) rainOverlay.classList.toggle('active', active);
    if (vol !== null) {
      document.querySelectorAll('.rain-slider-sync').forEach(s => { s.value = vol; });
    }
  }

  syncMusicUI(isPlaying, trackId = null, vol = null) {
    document.querySelectorAll('.music-toggle-sync').forEach(btn => {
      btn.textContent = isPlaying ? 'PAUSE' : 'PLAY';
      btn.classList.toggle('active', isPlaying);
    });
    if (trackId !== null) {
      document.querySelectorAll('.music-track-sync').forEach(sel => { sel.value = String(trackId); });
    }
    if (vol !== null) {
      document.querySelectorAll('.music-slider-sync').forEach(s => { s.value = vol; });
    }
  }

  syncCRTUI(active) {
    document.querySelectorAll('.crt-toggle-sync').forEach(btn => {
      btn.classList.toggle('active', active);
    });
    const crtOverlay = document.getElementById('crt-overlay');
    if (crtOverlay) crtOverlay.classList.toggle('hidden', !active);
  }

  applyAmbientSuggestion(suggestion) {
    if (!suggestion || !window.retroAudio) return;
    if (typeof suggestion.vinyl === 'boolean') {
      const vState = window.retroAudio.toggleVinyl(suggestion.vinyl);
      this.syncVinylUI(vState);
    }
    if (typeof suggestion.rain === 'boolean') {
      const rState = window.retroAudio.toggleRain(suggestion.rain);
      this.syncRainUI(rState);
    }
    if (suggestion.beatTrack) {
      window.retroAudio.setMusicTrack(suggestion.beatTrack);
      window.retroAudio.startMusic(suggestion.beatTrack);
      this.syncMusicUI(true, suggestion.beatTrack);
    }
  }

  /* ================= 7. PIXEL RAIN CANVAS OVERLAY ================= */
  initRainCanvas() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = Array.from({ length: 85 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: 10 + Math.random() * 14,
      speed: 7 + Math.random() * 6
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (window.retroAudio && window.retroAudio.rainActive) {
        ctx.fillStyle = 'rgba(0, 245, 212, 0.32)';
        drops.forEach(d => {
          ctx.fillRect(Math.floor(d.x), Math.floor(d.y), 2, d.len);
          d.y += d.speed;
          d.x -= 1;
          if (d.y > canvas.height) {
            d.y = -20;
            d.x = Math.random() * canvas.width;
          }
        });
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* ================= 8. EVENT LISTENERS ================= */
  bindEvents() {
    // Top genre quick-pills
    document.querySelectorAll('.top-genre-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const catId = pill.getAttribute('data-cat');
        if (window.retroAudio) window.retroAudio.playArcadeClick('page');
        this.navigateToCategory(catId, 'all');
      });
    });

    // Search input
    const searchInput = document.getElementById('book-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderBooks();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('book-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        if (window.retroAudio) window.retroAudio.playArcadeClick('select');
        this.renderBooks();
      });
    }

    // Vinyl controls (Sidebar + Topbar)
    document.querySelectorAll('.vinyl-toggle-sync').forEach(btn => {
      btn.addEventListener('click', () => {
        const active = window.retroAudio.toggleVinyl();
        this.syncVinylUI(active);
      });
    });
    document.querySelectorAll('.vinyl-slider-sync').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        window.retroAudio.setVinylVolume(val);
        this.syncVinylUI(window.retroAudio.vinylActive, val);
      });
    });

    // Rain controls (Sidebar + Topbar)
    document.querySelectorAll('.rain-toggle-sync').forEach(btn => {
      btn.addEventListener('click', () => {
        const active = window.retroAudio.toggleRain();
        this.syncRainUI(active);
      });
    });
    document.querySelectorAll('.rain-slider-sync').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        window.retroAudio.setRainVolume(val);
        this.syncRainUI(window.retroAudio.rainActive, val);
      });
    });

    // Lo-Fi Music controls (Sidebar + Topbar)
    document.querySelectorAll('.music-track-sync').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const trackId = parseInt(e.target.value, 10);
        window.retroAudio.setMusicTrack(trackId);
        this.syncMusicUI(true, trackId);
      });
    });
    document.querySelectorAll('.music-toggle-sync').forEach(btn => {
      btn.addEventListener('click', () => {
        const isPlaying = window.retroAudio.toggleMusic();
        this.syncMusicUI(isPlaying);
      });
    });
    document.querySelectorAll('.music-slider-sync').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        window.retroAudio.setMusicVolume(val);
        this.syncMusicUI(window.retroAudio.isPlayingMusic, null, val);
      });
    });

    // CRT Scanlines toggle
    document.querySelectorAll('.crt-toggle-sync').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextState = !window.retroAudio.crtActive;
        window.retroAudio.toggleCRT(nextState);
        this.syncCRTUI(nextState);
      });
    });

    // Cart Drawer Open / Close
    document.querySelectorAll('.open-cart-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.retroAudio) window.retroAudio.playArcadeClick('select');
        this.toggleCartDrawer();
      });
    });
    document.getElementById('close-cart-btn')?.addEventListener('click', () => {
      if (window.retroAudio) window.retroAudio.playArcadeClick('back');
      this.toggleCartDrawer(false);
    });

    // Promo code button
    document.getElementById('apply-promo-btn')?.addEventListener('click', () => {
      const codeInput = document.getElementById('promo-code-input');
      const code = (codeInput?.value || '').trim().toUpperCase();
      if (code === 'RETROZEN20' || code === 'STUDENT20') {
        this.discountApplied = true;
        this.updateCartUI();
        if (window.retroAudio) window.retroAudio.playArcadeClick('fanfare');
        this.showToast('🎓 20% Student Discount (RETROZEN20) Applied!');
      } else {
        this.showToast('⚠️ Try promo code: RETROZEN20 for 20% off!');
      }
    });

    // Checkout button
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
      if (this.cart.length === 0) {
        this.showToast('🛒 Add some books or flashcards to your cart first!');
        return;
      }
      if (window.retroAudio) window.retroAudio.playArcadeClick('fanfare');
      this.openCheckoutModal();
    });

    // Close modals
    document.getElementById('close-book-modal-btn')?.addEventListener('click', () => {
      if (window.retroAudio) window.retroAudio.playArcadeClick('back');
      document.getElementById('book-detail-modal')?.classList.add('hidden');
    });
    document.getElementById('close-checkout-modal-btn')?.addEventListener('click', () => {
      if (window.retroAudio) window.retroAudio.playArcadeClick('back');
      document.getElementById('checkout-modal')?.classList.add('hidden');
    });

    // Mobile sidebar toggle
    document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', () => {
      document.getElementById('side-navbar')?.classList.toggle('mobile-open');
    });
  }

  openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const receiptBox = document.getElementById('checkout-receipt-content');
    if (!modal || !receiptBox) return;

    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = this.discountApplied ? subtotal * 0.20 : 0;
    const total = Math.max(0, subtotal - discount);
    const orderId = 'RZ-' + Math.floor(100000 + Math.random() * 900000);

    receiptBox.innerHTML = `
      <div class="receipt-paper">
        <div class="receipt-header">
          <div>✦ RETROZEN PIXEL LIBRARY ✦</div>
          <div style="font-size: 14px; color: var(--text-muted);">ORDER RECEIPT #${orderId}</div>
        </div>
        <div class="receipt-items">
          ${this.cart.map(item => `
            <div class="receipt-line">
              <span>${item.qty}x ${item.title}</span>
              <span>$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="receipt-totals">
          <div class="receipt-line">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${this.discountApplied ? `
          <div class="receipt-line" style="color: var(--border-cyan);">
            <span>Student Discount (20%):</span>
            <span>-$${discount.toFixed(2)}</span>
          </div>
          ` : ''}
          <div class="receipt-line total">
            <span>TOTAL PAID:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        <div class="receipt-footer">
          🎉 Thank you for supporting the retroZen Educational Library! Your digital editions & flashcard activation codes are ready.
        </div>
      </div>
    `;

    this.clearCart();
    this.toggleCartDrawer(false);
    modal.classList.remove('hidden');
  }
}

window.retroLibraryApp = new RetroLibraryApp();
