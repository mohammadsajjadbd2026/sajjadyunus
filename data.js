// ═══════════════════════════════════════════════════
//  সাজ্জাদ ইউনুস — Shared Data & Storage Utilities
// ═══════════════════════════════════════════════════

const STORAGE_KEY = 'sajjad_yunus_posts';
const AUTH_KEY    = 'sajjad_admin_auth';

// ── Default seed posts ──────────────────────────────
const DEFAULT_POSTS = [
  {
    id: 'p1',
    title: 'ভাষার ভেতরে যে জগৎ লুকিয়ে থাকে',
    category: 'probondho',
    excerpt: 'মানুষ কেবল যোগাযোগের জন্য ভাষা ব্যবহার করে না—সে ভাষার মধ্যে দিয়ে একটি সমগ্র বিশ্বদর্শন নির্মাণ করে।',
    body: `<p>মানুষ কেবল যোগাযোগের জন্য ভাষা ব্যবহার করে না—সে ভাষার মধ্যে দিয়ে একটি সমগ্র বিশ্বদর্শন নির্মাণ করে। এই প্রবন্ধে আমি ভাষার সেই অদৃশ্য স্তরগুলো নিয়ে কথা বলতে চাই।</p>
<p>উইলহেলম ফন হুম্বোল্ট একসময় বলেছিলেন, ভাষা মানুষের বিশ্ব-দৃষ্টির (Weltanschauung) সবচেয়ে গভীর প্রকাশ। আমরা যে শব্দ ব্যবহার করি, যে ব্যাকরণিক কাঠামোর মধ্যে ভাবি—সেই কাঠামোই নির্ধারণ করে আমরা বাস্তবতাকে কীভাবে অনুভব করি।</p>
<p>বাংলা ভাষায় 'আকাশ' শব্দটি কেবল 'sky' নয়—এটি এক অনন্ত আশ্রয়ের অনুভূতি বহন করে, যা ইংরেজির 'sky' বা 'heaven' কোনোটিই সম্পূর্ণভাবে ধারণ করতে পারে না।</p>`,
    featured: true,
    published: true,
    date: '২০২৫-০৩-১৫',
    dateISO: '2025-03-15'
  },
  {
    id: 'p2',
    title: 'আধুনিকতা ও বাংলা সাহিত্যের টানাপোড়েন',
    category: 'nibondho',
    excerpt: 'উনিশ শতকের বাংলা সাহিত্যে আধুনিকতার আগমন কেবল শৈলীগত পরিবর্তন নয়, এটি একটি সভ্যতাগত সংকটের প্রতিফলন।',
    body: `<p>উনিশ শতকের বাংলা সাহিত্যে আধুনিকতার আগমন কেবল শৈলীগত পরিবর্তন নয়—এটি একটি সভ্যতাগত সংকটের প্রতিফলন।</p><p>বঙ্কিমচন্দ্র থেকে রবীন্দ্রনাথ পর্যন্ত প্রতিটি লেখক এই দ্বন্দ্বের মধ্যে দাঁড়িয়ে লিখেছেন—একদিকে ঔপনিবেশিক আধুনিকতার আকর্ষণ, অন্যদিকে নিজস্ব ঐতিহ্যের টান।</p>`,
    featured: false,
    published: true,
    date: '২০২৫-০২-২০',
    dateISO: '2025-02-20'
  },
  {
    id: 'p3',
    title: 'রাজনীতি যখন সংস্কৃতির আয়না হয়ে ওঠে',
    category: 'column',
    excerpt: 'প্রতিটি সমাজের রাজনৈতিক চর্চার মধ্যে সেই সমাজের সাংস্কৃতিক মানসিকতা প্রতিফলিত হয়।',
    body: `<p>প্রতিটি সমাজের রাজনৈতিক চর্চার মধ্যে সেই সমাজের সাংস্কৃতিক মানসিকতা প্রতিফলিত হয়—এই পর্যবেক্ষণ আজও প্রাসঙ্গিক।</p><p>আমরা যখন কোনো দেশের রাজনীতির দিকে তাকাই, আসলে তখন আমরা সেই দেশের মানুষের সম্মিলিত মনোজগতের একটি আয়নায় দৃষ্টি দিই।</p>`,
    featured: false,
    published: true,
    date: '২০২৫-০১-১০',
    dateISO: '2025-01-10'
  },
  {
    id: 'p4',
    title: 'লোকসংগীতে সামাজিক প্রতিরোধের রূপ',
    category: 'research',
    excerpt: 'বাংলাদেশের হাওর অঞ্চলের লোকগানে সামাজিক বঞ্চনার বিরুদ্ধে কীভাবে প্রতিরোধের ভাষা গড়ে উঠেছে তা নিয়ে একটি মাঠপর্যায়ের গবেষণা।',
    body: `<p>বাংলাদেশের হাওর অঞ্চলের লোকগানে সামাজিক বঞ্চনার বিরুদ্ধে কীভাবে প্রতিরোধের ভাষা গড়ে উঠেছে—এই প্রশ্নটি আমাকে দীর্ঘদিন ধরে ভাবাচ্ছিল।</p><p>২০২৩ সালে কিশোরগঞ্জ ও নেত্রকোণা জেলার হাওর অঞ্চলে তিন মাসের মাঠপর্যায়ের গবেষণায় আমি এমন অনেক গান খুঁজে পেয়েছি যেগুলো আপাতদৃষ্টিতে প্রেমের গান, কিন্তু তার ভেতরে লুকিয়ে আছে জমিদার-মহাজনের বিরুদ্ধে কৃষকের দীর্ঘশ্বাস।</p>`,
    featured: false,
    published: true,
    date: '২০২৪-১২-০৫',
    dateISO: '2024-12-05'
  },
  {
    id: 'p5',
    title: 'অ্যালবেয়ার কামুর "সিসিফাসের মিথ" — একটি বাংলা ভাষ্য',
    category: 'onubad',
    excerpt: 'কামুর অ্যাবসার্ডিজমের কেন্দ্রীয় রচনাটি বাংলায় অনুবাদ করার প্রয়াস, সাথে অনুবাদকের টীকা ও ব্যাখ্যা।',
    body: `<p><em>অনুবাদকের ভূমিকা:</em> অ্যালবেয়ার কামুর "The Myth of Sisyphus" (১৯৪২) বিশ শতকের দর্শনের অন্যতম গুরুত্বপূর্ণ রচনা। অ্যাবসার্ডিটির ধারণাকে কেন্দ্র করে কামু যে প্রশ্নটি উত্থাপন করেন—"জীবন কি বেঁচে থাকার যোগ্য?"—সেই প্রশ্নটি আজও মানুষকে ভাবায়।</p><p>এই অনুবাদে আমি যতটা সম্ভব কামুর মূল গদ্যের ছন্দ ও তীক্ষ্ণতা বজায় রাখার চেষ্টা করেছি, একই সাথে বাংলা ভাষার স্বাভাবিক প্রবাহকেও সম্মান দিয়েছি।</p>`,
    featured: false,
    published: true,
    date: '২০২৪-১১-১২',
    dateISO: '2024-11-12'
  }
];

// ── Storage helpers ─────────────────────────────────
function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { setPosts(DEFAULT_POSTS); return DEFAULT_POSTS; }
    return JSON.parse(raw);
  } catch { return DEFAULT_POSTS; }
}

function setPosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getPost(id) {
  return getPosts().find(p => p.id === id) || null;
}

function savePost(post) {
  const posts = getPosts();
  const idx   = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else          posts.unshift(post);
  setPosts(posts);
}

function deletePost(id) {
  setPosts(getPosts().filter(p => p.id !== id));
}

function generateId() {
  return 'p' + Date.now().toString(36);
}

// ── Auth helpers ────────────────────────────────────
const ADMIN_PASSWORD = 'sajjad2025'; // ← এখানে পাসওয়ার্ড পরিবর্তন করুন

function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === 'yes';
}
function login(pw) {
  if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(AUTH_KEY, 'yes'); return true; }
  return false;
}
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

// ── Category map ────────────────────────────────────
const CATEGORIES = {
  probondho: 'প্রবন্ধ',
  nibondho:  'নিবন্ধ',
  column:    'কলাম',
  research:  'গবেষণা',
  onubad:    'অনুবাদ',
  other:     'অন্যান্য'
};
