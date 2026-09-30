/* ============================================================
 * 潮汐聚澜工会网站 - 公共配置与数据层
 * 三个页面（index.html / member.html / admin.html）都通过
 * <script src="config.js"> 引用本文件，配置只维护这一份
 * ============================================================ */

/* Supabase 云数据库配置（不填则自动回退到浏览器本地存储，仅本机可见） */
const SUPA_URL = 'https://dsmnfypykfxqlppgpbly.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbW5meXB5a2Z4cWxwcGdwYmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1ODgwNTgsImV4cCI6MjEwNjE2NDA1OH0.8qYG-lMGfDyoj5pRJ2WXDkeaZ862UHk1h0Pr7GPOTfY';
const USE_CLOUD = !!(SUPA_URL && SUPA_KEY);

/* EmailJS 邮件服务配置（管理后台点击"同意"后自动发邮件给申请者） */
const EMAILJS_SERVICE_ID = 'service_1et8gsf';
const EMAILJS_TEMPLATE_ID = 'template_2ffbops';
const EMAILJS_PUBLIC_KEY = 'QYJfjyV6dGk1Oe3Vw';
const EMAILJS_READY = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

/* ===================== 数据层：云端优先，本地回退 ===================== */
const DB = {
  /* --- 入会申请 --- */
  async getApps() {
    if (USE_CLOUD) {
      const res = await fetch(`${SUPA_URL}/rest/v1/applications?select=id,ign,email,server,skill,msg,time,status&apikey=${SUPA_KEY}&order=id.desc`);
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_apps') || '[]').map((a, i) => ({ ...a, id: i }));
  },
  async addApp(data) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/applications?apikey=${SUPA_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const apps = JSON.parse(localStorage.getItem('fr_apps') || '[]');
    apps.push(data); localStorage.setItem('fr_apps', JSON.stringify(apps));
  },
  async delApp(id) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/applications?id=eq.${id}&apikey=${SUPA_KEY}`, { method: 'DELETE' }); return;
    }
    const apps = JSON.parse(localStorage.getItem('fr_apps') || '[]');
    apps.splice(id, 1); localStorage.setItem('fr_apps', JSON.stringify(apps));
  },
  async clearApps() {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/applications?apikey=${SUPA_KEY}`, { method: 'DELETE' }); return;
    }
    localStorage.removeItem('fr_apps');
  },
  async updateAppStatus(id, status) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/applications?id=eq.${id}&apikey=${SUPA_KEY}`, {
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
      const res = await fetch(`${SUPA_URL}/rest/v1/notice?select=content,time&apikey=${SUPA_KEY}`);
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_notice') || '{}');
  },
  async saveNotice(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      /* upsert：有则更新，无则插入 */
      await fetch(`${SUPA_URL}/rest/v1/notice?apikey=${SUPA_KEY}`, {
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
      const res = await fetch(`${SUPA_URL}/rest/v1/nav_links?select=id,name,url,desc&apikey=${SUPA_KEY}&order=id.asc`);
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_links') || '[]').map((l, i) => ({ ...l, id: i }));
  },
  async addLink(data) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/nav_links?apikey=${SUPA_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_links') || '[]');
    links.push(data); localStorage.setItem('fr_links', JSON.stringify(links));
  },
  async updateLink(id, field, value) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/nav_links?id=eq.${id}&apikey=${SUPA_KEY}`, {
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
      await fetch(`${SUPA_URL}/rest/v1/nav_links?id=eq.${id}&apikey=${SUPA_KEY}`, { method: 'DELETE' }); return;
    }
    const links = JSON.parse(localStorage.getItem('fr_links') || '[]');
    links.splice(id, 1); localStorage.setItem('fr_links', JSON.stringify(links));
  },

  /* --- 工会规则（单行，id=1） --- */
  async getRules() {
    if (USE_CLOUD) {
      const res = await fetch(`${SUPA_URL}/rest/v1/rules?select=content,time&apikey=${SUPA_KEY}`);
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_rules') || '{}');
  },
  async saveRules(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/rules?apikey=${SUPA_KEY}`, {
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
      const res = await fetch(`${SUPA_URL}/rest/v1/servers?select=content,time&apikey=${SUPA_KEY}`);
      const arr = await res.json(); return arr[0] || {};
    }
    return JSON.parse(localStorage.getItem('fr_servers') || '{}');
  },
  async saveServers(content) {
    const time = new Date().toLocaleString('zh-CN');
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/servers?apikey=${SUPA_KEY}`, {
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
      const res = await fetch(`${SUPA_URL}/rest/v1/members?select=id,ign,dept,dept2,server,role&apikey=${SUPA_KEY}&order=id.asc`);
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_members') || '[]').map((m, i) => ({ ...m, id: i }));
  },
  async addMember(data) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/members?apikey=${SUPA_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const members = JSON.parse(localStorage.getItem('fr_members') || '[]');
    members.push(data); localStorage.setItem('fr_members', JSON.stringify(members));
  },
  async delMember(id) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/members?id=eq.${id}&apikey=${SUPA_KEY}`, { method: 'DELETE' }); return;
    }
    const members = JSON.parse(localStorage.getItem('fr_members') || '[]');
    members.splice(id, 1); localStorage.setItem('fr_members', JSON.stringify(members));
  },
  /* 修改成员某个字段（如把部门从战斗改成建筑） */
  async updateMember(id, field, value) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/members?id=eq.${id}&apikey=${SUPA_KEY}`, {
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
      const res = await fetch(`${SUPA_URL}/rest/v1/suggestions?select=id,ign,content,time,done&apikey=${SUPA_KEY}&order=id.desc`);
      return await res.json();
    }
    return JSON.parse(localStorage.getItem('fr_suggestions') || '[]').map((s, i) => ({ ...s, id: i }));
  },
  async addSuggestion(data) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/suggestions?apikey=${SUPA_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    list.push(data); localStorage.setItem('fr_suggestions', JSON.stringify(list));
  },
  async toggleSuggestion(id, done) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/suggestions?id=eq.${id}&apikey=${SUPA_KEY}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done })
      }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    if (list[id]) { list[id].done = done; localStorage.setItem('fr_suggestions', JSON.stringify(list)); }
  },
  async delSuggestion(id) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/suggestions?id=eq.${id}&apikey=${SUPA_KEY}`, { method: 'DELETE' }); return;
    }
    const list = JSON.parse(localStorage.getItem('fr_suggestions') || '[]');
    list.splice(id, 1); localStorage.setItem('fr_suggestions', JSON.stringify(list));
  },

  /* --- 系统设置（云端存储成员密码和管理员密码） --- */
  async getSettings() {
    if (USE_CLOUD) {
      const res = await fetch(`${SUPA_URL}/rest/v1/settings?select=key,value&apikey=${SUPA_KEY}`);
      const arr = await res.json();
      const map = {}; arr.forEach(r => map[r.key] = r.value); return map;
    }
    return JSON.parse(localStorage.getItem('fr_settings') || '{}');
  },
  async saveSetting(key, value) {
    if (USE_CLOUD) {
      await fetch(`${SUPA_URL}/rest/v1/settings?apikey=${SUPA_KEY}`, {
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
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
