// ═══════════════════════════════════════════════════════════════
//  supabase.js  —  Shared Supabase client & API for all pages
//  সাজ্জাদ ইউনুস ওয়েবসাইট
// ═══════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────┐
// │  ⚠️  এখানে আপনার Supabase credentials বসান               │
// │  Step-by-step গাইড: SETUP.md দেখুন                        │
// └─────────────────────────────────────────────────────────────┘
const SUPABASE_URL  = 'YOUR_SUPABASE_URL';   // e.g. https://xxxx.supabase.co
const SUPABASE_ANON = 'YOUR_ANON_KEY';        // anon/public key

// Admin password (only stored in browser session, never in DB)
const ADMIN_PASSWORD = 'sajjad2025';          // ← পরিবর্তন করুন

// ── Supabase REST helpers ──────────────────────────────────────
const SB = {
  headers(auth = false) {
    const h = {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Prefer':        'return=representation',
    };
    return h;
  },

  async query(path, opts = {}) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: this.headers(),
      ...opts,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },

  // Posts ─────────────────────────────────────────────────────
  async getPosts(publishedOnly = false) {
    let url = 'posts?select=*&order=created_at.desc';
    if (publishedOnly) url += '&published=eq.true';
    return this.query(url);
  },

  async getPost(id) {
    const rows = await this.query(`posts?id=eq.${id}&select=*`);
    return rows[0] || null;
  },

  async upsertPost(post) {
    const method = post.id && !post.id.startsWith('new') ? 'PATCH' : 'POST';
    const path   = method === 'PATCH' ? `posts?id=eq.${post.id}` : 'posts';
    // Remove id for new posts (let Supabase auto-generate UUID)
    const body   = { ...post };
    if (method === 'POST') delete body.id;
    return this.query(path, { method, body: JSON.stringify(body) });
  },

  async deletePost(id) {
    return this.query(`posts?id=eq.${id}`, { method: 'DELETE' });
  },

  async clearFeatured() {
    return this.query(`posts?featured=eq.true`, {
      method: 'PATCH',
      body: JSON.stringify({ featured: false }),
    });
  },

  // Site settings ─────────────────────────────────────────────
  async getSettings() {
    const rows = await this.query('site_settings?select=*');
    // Convert array [{key, value}] → object {key: value}
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  },

  async setSetting(key, value) {
    return this.query('site_settings', {
      method: 'POST',
      headers: { ...this.headers(), 'Prefer': 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({ key, value }),
    });
  },

  // Image upload (Supabase Storage) ───────────────────────────
  async uploadImage(file) {
    const ext      = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const res = await fetch(
      `${SUPABASE_URL}/storage/v1/object/post-images/${filename}`,
      {
        method:  'POST',
        headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}`, 'Content-Type': file.type },
        body: file,
      }
    );
    if (!res.ok) throw new Error('Image upload failed');
    return `${SUPABASE_URL}/storage/v1/object/public/post-images/${filename}`;
  },
};

// ── Auth (session-only) ────────────────────────────────────────
const AUTH = {
  key: 'sajjad_admin_v2',
  isLoggedIn() { return sessionStorage.getItem(this.key) === 'yes'; },
  login(pw)    { if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(this.key,'yes'); return true; } return false; },
  logout()     { sessionStorage.removeItem(this.key); },
};

// ── Category labels ────────────────────────────────────────────
const CATS = {
  probondho: 'প্রবন্ধ',
  nibondho:  'নিবন্ধ',
  column:    'কলাম',
  research:  'গবেষণা',
  onubad:    'অনুবাদ',
  other:     'অন্যান্য',
};

// ── Utility ────────────────────────────────────────────────────
function fmtBnDate(isoDate) {
  if (!isoDate) return '';
  const months = ['','জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const [y, m, d] = isoDate.split('T')[0].split('-');
  return `${months[+m]} ${d}, ${y}`;
}

function toast(msg, type = 'success') {
  let el = document.getElementById('globalToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'globalToast';
    el.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;font-family:var(--sans,sans-serif);font-size:.9rem;z-index:99999;transform:translateY(80px);opacity:0;transition:all .35s;max-width:340px;border-left:4px solid';
    document.body.appendChild(el);
  }
  const colors = { success: '#2d6a4f', error: '#c0392b', info: '#b8860b' };
  el.style.background   = '#1a1208';
  el.style.color        = '#fff';
  el.style.borderColor  = colors[type] || colors.info;
  el.textContent = msg;
  requestAnimationFrame(() => { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; });
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.transform = 'translateY(80px)'; el.style.opacity = '0'; }, 3200);
}

// ── Check if Supabase is configured ───────────────────────────
function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON !== 'YOUR_ANON_KEY';
}
