/* ============================================================
 * 潮汐聚澜工会网站 - 公共配置与数据层
 * 三个页面（index.html / member.html / admin.html）都通过
 * <script src="config.js"> 引用本文件，配置只维护这一份
 * ============================================================ */

/* Supabase 云数据库配置（不填则自动回退到浏览器本地存储，仅本机可见） */
const SUPA_URL = 'https://dsmnfypykfxqlppgpbly.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbW5meXB5a2Z4cWxwcGdwYmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1ODgwNTgsImV4cCI6MjEwNjE2NDA1OH0.8qYG-lMGfDyoj5pRJ2WXDkeaZ862UHk1h0Pr7GPOTfY';
const USE_CLOUD = !!(SUPA_URL && SUPA_KEY);

/* Logo (embedded base64 image; persists even if original file is deleted) */
const LOGO = 'data:image/png;base64,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';

/* 网页标签页图标（潮汐护甲纹饰锻造模板，独立于 LOGO） */
const FAVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHNSURBVHhe7ZYhTgRBEEXnKJyBG6DRmFVgEYQrwAVQmNFgwUKCJWQV19hbgGlR/fLTnd4e2JnZX8lTy9TUe2LC8Ndz8/7yU2Lz+pSRHlvPKOmIAzjAygJQ8P7zowk+v7hAFFCSJfi8AzjAwgM8fn8VUREi3McgZ3fXGemMww0PVtIRJR3hPgdwgJkF4EEUqAmfb7cZ/HsGIHw/g5B09nTDAyhIIf7uAA6wsgDqyBKXu10GgzAY30cuxocip7ebjKSx//AAJVnCARxgYQG4UEmVoCAD8CNIQbUzwvuIAziAA/xvAApQmEEYQO2M8B7Cf4QcwAEcoC0AF/KAmiCpCfMfH76PUJA0C3McwAEcIAtQE64JET6vJCO8R0lHHMABHKAtAF9w9Txm8Hd+1CjIYKQ1gJKMNAtzKOgADnDkAUivMOE+CvP9SjriAA7gANMG4EfwZHzLaA1AYe5jACUZ6RbmOIADHHkALmQQJdUCA1CY71PSEd6bNPYfLuRBSqoFB3CAmQfg8AWEByvpyOw+erXhC4kDOMDKA9SGB5FaIP6upCPcn8443PAgQkEHcICVBagND+4lrV3OKIke0trljJLoIa1dziiJHtLaiWYYfgHR5O+n8gmyqgAAAABJRU5ErkJggg==';

/* 页面 LOGO 图片用 LOGO；浏览器标签页图标用 FAVICON */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.logo-img').forEach(function (i) { i.src = LOGO; });
  var icon = document.createElement('link');
  icon.rel = 'icon'; icon.type = 'image/png'; icon.href = FAVICON;
  document.head.appendChild(icon);
});

/* EmailJS 邮件服务配置（管理后台点击"同意"后自动发邮件给申请者） */
const EMAILJS_SERVICE_ID = 'service_1et8gsf';
const EMAILJS_TEMPLATE_ID = 'template_2ffbops';
const EMAILJS_PUBLIC_KEY = 'QYJfjyV6dGk1Oe3Vw';
const EMAILJS_READY = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

/* ===================== 数据层：云端优先，本地回退 =====================
 * 云端请求统一走 apiFetch()：12 秒超时 + 自动检查 HTTP 状态，
 * 失败会抛出带中文说明的错误（实现见本文件底部），不再"假成功/卡死"。
 */
const DB = {
  /* --- 入会申请 --- */
  async getApps() {
    if (USE_CLOUD) {
      const res = await apiFetch('applications?select=id,ign,email,server,skill,msg,time,status&order=id.desc');
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_apps') || '[]').map((a, i) => ({ ...a, id: i }));
  },
  async addApp(data) {
    if (USE_CLOUD) {
      await apiFetch('applications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const apps = JSON.parse(localStorage.getItem('fr_apps') || '[]');
    apps.push(data); localStorage.setItem('fr_apps', JSON.stringify(apps));
  },
  async delApp(id) {
    if (USE_CLOUD) {
      await apiFetch(`applications?id=eq.${id}`, { method: 'DELETE' }); return;
    }
    const apps = JSON.parse(localStorage.getItem('fr_apps') || '[]');
    apps.splice(id, 1); localStorage.setItem('fr_apps', JSON.stringify(apps));
  },
  async clearApps() {
    if (USE_CLOUD) {
      await apiFetch('applications?id=gte.0', { method: 'DELETE' }); return;
    }
    localStorage.removeItem('fr_apps');
  },
  async updateAppStatus(id, status) {
    if (USE_CLOUD) {
      await apiFetch(`applications?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }); return;
    }
    const apps = JSON.parse(localStorage.getItem('fr_apps') || '[]');
    if (apps[id]) { apps[id].status = status; localStorage.setItem('fr_apps', JSON.stringify(apps)); }
  },

  /* --- 成员公告（单行，id=1） --- */
  async getNotice() {
    if (USE_CLOUD) {
      const res = await apiFetch('notice?select=content,time');
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_notice') || '{}');
  },
  async saveNotice(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      /* upsert：有则更新，无则插入 */
      await apiFetch('notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ id: 1, content, time })
      }); return;
    }
    localStorage.setItem('fr_notice', JSON.stringify({ content, time }));
  },

  /* --- 网页导航 --- */
  async getLinks() {
    if (USE_CLOUD) {
      const res = await apiFetch('nav_links?select=id,name,url,desc&order=id.asc');
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_links') || '[]').map((l, i) => ({ ...l, id: i }));
  },
  async addLink(data) {
    if (USE_CLOUD) {
      await apiFetch('nav_links', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_links') || '[]');
    links.push(data); localStorage.setItem('fr_links', JSON.stringify(links));
  },
  async updateLink(id, field, value) {
    if (USE_CLOUD) {
      await apiFetch(`nav_links?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_links') || '[]');
    links[id] = { ...links[id], [field]: value };
    localStorage.setItem('fr_links', JSON.stringify(links));
  },
  async delLink(id) {
    if (USE_CLOUD) {
      await apiFetch(`nav_links?id=eq.${id}`, { method: 'DELETE' }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_links') || '[]');
    links.splice(id, 1); localStorage.setItem('fr_links', JSON.stringify(links));
  },

  /* --- 友情链接（主页展示，与成员导航完全独立） --- */
  async getFriendLinks() {
    if (USE_CLOUD) {
      const res = await apiFetch('friend_links?select=id,name,url,desc&order=id.asc');
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_friend_links') || '[]').map((l, i) => ({ ...l, id: i }));
  },
  async addFriendLink(data) {
    if (USE_CLOUD) {
      await apiFetch('friend_links', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_friend_links') || '[]');
    links.push(data); localStorage.setItem('fr_friend_links', JSON.stringify(links));
  },
  async updateFriendLink(id, field, value) {
    if (USE_CLOUD) {
      await apiFetch(`friend_links?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_friend_links') || '[]');
    links[id] = { ...links[id], [field]: value };
    localStorage.setItem('fr_friend_links', JSON.stringify(links));
  },
  async delFriendLink(id) {
    if (USE_CLOUD) {
      await apiFetch(`friend_links?id=eq.${id}`, { method: 'DELETE' }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_friend_links') || '[]');
    links.splice(id, 1); localStorage.setItem('fr_friend_links', JSON.stringify(links));
  },

  /* --- 工会规则（单行，id=1） --- */
  async getRules() {
    if (USE_CLOUD) {
      const res = await apiFetch('rules?select=content,time');
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_rules') || '{}');
  },
  async saveRules(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      await apiFetch('rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ id: 1, content, time })
      }); return;
    }
    localStorage.setItem('fr_rules', JSON.stringify({ content, time }));
  },

  /* --- 服务器信息（单行，id=1） --- */
  async getServers() {
    if (USE_CLOUD) {
      const res = await apiFetch('servers?select=content,time');
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_servers') || '{}');
  },
  async saveServers(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      await apiFetch('servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ id: 1, content, time })
      }); return;
    }
    localStorage.setItem('fr_servers', JSON.stringify({ content, time }));
  },

  /* --- 成员名录 --- */
  async getMembers() {
    if (USE_CLOUD) {
      const res = await apiFetch('members?select=id,ign,dept,dept2,server,role&order=id.asc');
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_members') || '[]').map((m, i) => ({ ...m, id: i }));
  },
  async addMember(data) {
    if (USE_CLOUD) {
      await apiFetch('members', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const members = JSON.parse(localStorage.getItem('fr_members') || '[]');
    members.push(data); localStorage.setItem('fr_members', JSON.stringify(members));
  },
  async delMember(id) {
    if (USE_CLOUD) {
      await apiFetch(`members?id=eq.${id}`, { method: 'DELETE' }); return;
    }
    const members = JSON.parse(localStorage.getItem('fr_members') || '[]');
    members.splice(id, 1); localStorage.setItem('fr_members', JSON.stringify(members));
  },
  /* 修改成员某个字段（如把部门从战斗改成建筑） */
  async updateMember(id, field, value) {
    if (USE_CLOUD) {
      await apiFetch(`members?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      }); return;
    }
    const members = JSON.parse(localStorage.getItem('fr_members') || '[]');
    members[id] = { ...members[id], [field]: value };
    localStorage.setItem('fr_members', JSON.stringify(members));
  },

  /* --- 提议箱 --- */
  async getSuggestions() {
    if (USE_CLOUD) {
      const res = await apiFetch('suggestions?select=id,ign,content,time,done&order=id.desc');
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_suggestions') || '[]').map((s, i) => ({ ...s, id: i }));
  },
  async addSuggestion(data) {
    if (USE_CLOUD) {
      await apiFetch('suggestions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    list.push(data); localStorage.setItem('fr_suggestions', JSON.stringify(list));
  },
  async toggleSuggestion(id, done) {
    if (USE_CLOUD) {
      await apiFetch(`suggestions?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done })
      }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    if (list[id]) { list[id].done = done; localStorage.setItem('fr_suggestions', JSON.stringify(list)); }
  },
  async delSuggestion(id) {
    if (USE_CLOUD) {
      await apiFetch(`suggestions?id=eq.${id}`, { method: 'DELETE' }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    list.splice(id, 1); localStorage.setItem('fr_suggestions', JSON.stringify(list));
  },

  /* --- 系统设置（云端存储成员密码和管理员密码） --- */
  async getSettings() {
    if (USE_CLOUD) {
      const res = await apiFetch('settings?select=key,value');
      const arr = await res.json();
      const map = {}; arr.forEach(r => map[r.key] = r.value); return map;
    }
    return JSON.parse(localStorage.getItem('fr_settings') || '{}');
  },
  async saveSetting(key, value) {
    if (USE_CLOUD) {
      await apiFetch('settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ key, value })
      }); return;
    }
    const s = JSON.parse(localStorage.getItem('fr_settings') || '{}');
    s[key] = value; localStorage.setItem('fr_settings', JSON.stringify(s));
  }
};

/* HTML 转义：防止用户输入的内容破坏页面结构 */
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

/* ============================================================
 * 通用基础设施（三个页面共享）：
 * apiFetch 请求封装 / Toast 提示 / 加载动画 / 失败重试 / 按钮loading
 * ============================================================ */

/* ---------- 云端请求封装：12秒超时 + HTTP 状态检查 ---------- */
const REQ_TIMEOUT = 12000;
async function apiFetch(path, options) {
  const ctrl = new AbortController();
  const timer = setTimeout(function () { ctrl.abort(); }, REQ_TIMEOUT);
  let res;
  try {
    res = await fetch(`${SUPA_URL}/rest/v1/${path}${path.includes('?') ? '&' : '?'}apikey=${SUPA_KEY}`,
      Object.assign({}, options, { signal: ctrl.signal }));
  } catch (e) {
    clearTimeout(timer);
    throw new Error(e.name === 'AbortError' ? '请求超时，请检查网络后重试' : '网络连接失败，请检查网络后重试');
  }
  clearTimeout(timer);
  if (!res.ok) {
    let detail = '';
    try { const j = await res.json(); detail = j.message || j.error_description || ''; } catch (_) {}
    throw new Error(detail || `服务器开小差了（错误码 ${res.status}），请稍后重试`);
  }
  return res;
}

/* ---------- 敏感词库（辱骂/脏话/色情类；可按需自行增删） ---------- */
const BAD_WORDS = [
  '草泥马', '操你', '艹你', '日你', '你妈', '他妈', '妈的', '妈的',
  '傻逼', '煞笔', '傻b', 'sb', '弱智', '脑残', '王八蛋', '混蛋', '狗日',
  '狗东西', '婊子', '妓女', '鸡巴', '几把', 'jb', '贱人', '贱货', '去死',
  '装逼', '撕逼', '屌丝', '约炮', '做爱', '色情', '裸体', '色逼', '下流'
];
/* 命中则返回该词，否则返回空串（统一转小写匹配，兼容中英） */
function containsBadWord(text) {
  const t = String(text || '').toLowerCase();
  for (let i = 0; i < BAD_WORDS.length; i++) {
    if (t.indexOf(BAD_WORDS[i].toLowerCase()) !== -1) return BAD_WORDS[i];
  }
  return '';
}

/* ---------- 通用样式（Toast / Spinner / 重试 / 抖动） ---------- */
(function injectCommonCSS() {
  const css = `
  /* ---- Toast 轻提示（右上角，自动消失，替代 alert） ---- */
  #cxToastWrap { position: fixed; top: 20px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
  .cx-toast { pointer-events: auto; min-width: 240px; max-width: 380px; padding: 12px 18px; border-radius: 10px; font-size: 14px; line-height: 1.5;
    color: #fff; background: #34495e; box-shadow: 0 8px 24px rgba(0,0,0,.18); display: flex; align-items: center; gap: 10px;
    animation: cxToastIn .3s ease; word-break: break-all; }
  .cx-toast.success { background: #27ae60; }
  .cx-toast.error   { background: #e74c3c; }
  .cx-toast.info    { background: #2980b9; }
  .cx-toast.out     { animation: cxToastOut .3s ease forwards; }
  .cx-toast .cx-ico { flex: 0 0 auto; font-size: 16px; font-weight: bold; }
  @keyframes cxToastIn  { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes cxToastOut { to   { opacity: 0; transform: translateX(30px); } }
  @media (max-width: 600px) { #cxToastWrap { left: 12px; right: 12px; top: 12px; } .cx-toast { max-width: none; } }

  /* ---- 加载动画（旋转圆环，替代纯文字"加载中"） ---- */
  .cx-loading { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 30px 16px; color: #5d7079; font-size: 14px; }
  .cx-spinner { width: 22px; height: 22px; border: 3px solid #cfe0ea; border-top-color: #0c7bb3; border-radius: 50%; animation: cxSpin .8s linear infinite; flex: 0 0 auto; }
  .cx-spinner.cx-spinner-sm { width: 15px; height: 15px; border-width: 2px; }
  @keyframes cxSpin { to { transform: rotate(360deg); } }
  /* 网格容器内的加载/失败提示占满整行 */
  .roster-grid > .cx-loading, .nav-links-grid > .cx-loading, .cx-row-loading .cx-loading { grid-column: 1 / -1; }

  /* ---- 失败重试 ---- */
  .cx-retry { flex-direction: column; gap: 12px; }
  .cx-retry p { margin: 0; color: #c0392b; }
  .cx-retry-btn { padding: 8px 22px; border: none; border-radius: 20px; background: #0c7bb3; color: #fff; font-size: 14px; cursor: pointer; font-family: inherit; }
  .cx-retry-btn:hover { background: #085a8a; }

  /* ---- 输入框错误抖动 ---- */
  @keyframes cxShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-7px); } 40%,80% { transform: translateX(7px); } }
  .shake { animation: cxShake .4s ease; border-color: #c0392b !important; }

  /* ---- 按钮 loading 状态 ---- */
  button.cx-btn-loading { opacity: .75; cursor: not-allowed; }
  button.cx-btn-loading { display: inline-flex; align-items: center; justify-content: center; gap: 7px; }

  /* ---- 字数统计 ---- */
  .char-count { text-align: right; font-size: 12px; color: #8aa0ab; margin-top: 4px; }
  .char-count.warn { color: #e67e22; }
  .char-count.over { color: #c0392b; }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-cx-common', '1');
  style.textContent = css;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
})();

/* ---------- Toast：showToast('文字', 'success'|'error'|'info') ---------- */
function showToast(msg, type) {
  let wrap = document.getElementById('cxToastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'cxToastWrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'cx-toast ' + (type || 'info');
  const ico = type === 'success' ? '✓' : type === 'error' ? '✕' : 'i';
  t.innerHTML = `<span class="cx-ico">${ico}</span><span>${esc(msg)}</span>`;
  wrap.appendChild(t);
  setTimeout(function () {
    t.classList.add('out');
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300);
  }, 3200);
}

/* ---------- 加载 HTML：loadingHTML('加载中...') ---------- */
function loadingHTML(text) {
  return `<div class="cx-loading"><span class="cx-spinner"></span><span>${esc(text || '加载中...')}</span></div>`;
}

/* ---------- 容器内显示"加载失败 + 点击重试" ---------- */
function showRetry(el, retryFn, text) {
  el.innerHTML = `<div class="cx-loading cx-retry"><p>${esc(text || '加载失败，请检查网络')}</p><button type="button" class="cx-retry-btn">点击重试</button></div>`;
  const btn = el.querySelector('.cx-retry-btn');
  if (btn) btn.addEventListener('click', function () {
    el.innerHTML = loadingHTML('重新加载中...');
    retryFn();
  });
}

/* ---------- 按钮 loading：禁用+转圈，结束后恢复原内容 ---------- */
function setBtnLoading(btn, loading, loadingText) {
  if (!btn) return;
  if (loading) {
    if (!btn.dataset.cxOrigin) btn.dataset.cxOrigin = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('cx-btn-loading');
    btn.innerHTML = `<span class="cx-spinner cx-spinner-sm"></span><span>${esc(loadingText || '处理中...')}</span>`;
  } else {
    btn.disabled = false;
    btn.classList.remove('cx-btn-loading');
    if (btn.dataset.cxOrigin) { btn.innerHTML = btn.dataset.cxOrigin; delete btn.dataset.cxOrigin; }
  }
}

/* ============================================================
 * 密码防暴力尝试（成员页 / 管理后台共用）
 * 规则：同一浏览器连续输错 5 次密码，锁定 24 小时
 * 说明：基于 localStorage，防的是"随手乱试"的暴力破解；
 *       真正的安全边界在云端数据库权限，这里是第一道减速带
 * ============================================================ */
const GATE_MAX_FAILS = 5;                 /* 最多允许连续输错次数 */
const GATE_LOCK_MS = 24 * 60 * 60 * 1000; /* 锁定时长：24 小时 */

/* 返回剩余锁定毫秒数；未锁定返回 0 */
function gateLockedMs(lockKey) {
  try {
    const until = parseInt(localStorage.getItem(lockKey) || '0', 10);
    const left = until - Date.now();
    if (left <= 0) { localStorage.removeItem(lockKey); return 0; }
    return left;
  } catch (_) { return 0; }
}

/* 记录一次输错；返回 { locked, leftMs, leftFails } */
function gateRecordFail(failKey, lockKey) {
  try {
    const fails = (parseInt(localStorage.getItem(failKey) || '0', 10) || 0) + 1;
    if (fails >= GATE_MAX_FAILS) {
      localStorage.setItem(lockKey, String(Date.now() + GATE_LOCK_MS));
      localStorage.removeItem(failKey);
      return { locked: true, leftMs: GATE_LOCK_MS, leftFails: 0 };
    }
    localStorage.setItem(failKey, String(fails));
    return { locked: false, leftMs: 0, leftFails: GATE_MAX_FAILS - fails };
  } catch (_) { return { locked: false, leftMs: 0, leftFails: GATE_MAX_FAILS }; }
}

/* 验证成功后清除输错记录 */
function gateClearFail(failKey, lockKey) {
  try { localStorage.removeItem(failKey); localStorage.removeItem(lockKey); } catch (_) {}
}

/* 把毫秒数格式化成"X小时X分钟"（用于锁定提示文案） */
function fmtLockTime(ms) {
  const totalMin = Math.ceil(ms / 60000);
  const h = Math.floor(totalMin / 60), m = totalMin % 60;
  return h > 0 ? `${h} 小时${m > 0 ? ' ' + m + ' 分钟' : ''}` : `${m} 分钟`;
}
