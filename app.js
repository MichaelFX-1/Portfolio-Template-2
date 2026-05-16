/* Lumen vanilla portfolio — runtime. Mirrors the React template feature-for-feature. */
"use strict";

const KEY = "pow.portfolio.template.v1";

const defaultData = {
  name: "Ada Lumen",
  title: "Product Designer & Creative Developer",
  tagline: "I craft playful, bright interfaces with a touch of motion.",
  about:
    "Multidisciplinary designer-developer building joyful digital products. I blend bold color, considered typography and just-enough motion to make interfaces feel alive.",
  avatar: "",
  email: "hello@example.com",
  phone: "+1 555 010 1234",
  location: "Lisbon, Portugal",
  stats: { years: "6+", projects: "80+", clients: "30+" },
  experience: [
    { id: "e1", role: "Senior Product Designer", company: "Lumen Studio", period: "2023 — Now", description: "Leading design for consumer apps used by 200k+ people." },
    { id: "e2", role: "Frontend Developer", company: "Bright Labs", period: "2020 — 2023", description: "Shipped design systems and animated marketing sites." }
  ],
  education: [
    { id: "ed1", degree: "BSc Interaction Design", school: "Lisbon School of Arts", period: "2016 — 2020" }
  ],
  skills: ["Figma", "React", "Three.js", "Motion", "TypeScript", "Brand", "Illustration"],
  projects: [
    { id: "p1", title: "Sunny Banking", tag: "Fintech", description: "A bright, friendly mobile banking experience.", image: "", link: "#" },
    { id: "p2", title: "Bloom CMS", tag: "SaaS", description: "Editorial CMS with delightful micro-interactions.", image: "", link: "#" }
  ],
  socials: [
    { id: "s1", label: "Twitter", url: "https://twitter.com" },
    { id: "s2", label: "GitHub", url: "https://github.com" },
    { id: "s3", label: "Dribbble", url: "https://dribbble.com" }
  ],
  theme: "light"
};

const uid = () => Math.random().toString(36).slice(2, 9);

let data = loadData();
let editing = false;

function loadData() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign({}, defaultData, JSON.parse(raw));
  } catch (_) {}
  return JSON.parse(JSON.stringify(defaultData));
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
}

/* ---------- SVG icon helpers ---------- */
const svg = {
  sun: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
  trashSm: '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  arrowSm: '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
};

/* ---------- Bind editable text spans ---------- */
function bindEditables() {
  document.querySelectorAll(".editable[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (key === "name") el.textContent = data.name;
    else if (key === "title") el.textContent = data.title;
    else if (key === "tagline") el.textContent = data.tagline;
    else if (key === "about") el.textContent = data.about;

    el.addEventListener("blur", () => {
      const v = el.textContent || "";
      if (key && data[key] !== v) {
        data[key] = v;
        persist();
      }
    });
    el.addEventListener("keydown", (e) => {
      if (!el.hasAttribute("data-multiline") && e.key === "Enter") {
        e.preventDefault();
        el.blur();
      }
    });
  });
}

/* ---------- Apply edit mode ---------- */
function applyEditMode() {
  document.body.classList.toggle("edit-mode", editing);
  document.querySelectorAll(".editable").forEach((el) => {
    if (editing) el.setAttribute("contenteditable", "true");
    else el.removeAttribute("contenteditable");
  });
  // Avatar upload button
  const avatarBtn = document.getElementById("avatarBtn");
  if (avatarBtn) avatarBtn.hidden = !editing;

  // Edit button label
  document.getElementById("editLabel").textContent = editing ? "Done" : "Edit";
  document.getElementById("iconEdit").outerHTML =
    (editing ? svg.check : svg.pencil).replace("<svg ", '<svg id="iconEdit" ');

  // Re-render dynamic sections
  renderAll();
}

/* ---------- Renderers ---------- */
function renderStats() {
  const el = document.getElementById("stats");
  const labels = { years: "Years exp.", projects: "Projects", clients: "Clients" };
  el.innerHTML = "";
  ["years", "projects", "clients"].forEach((k) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    const num = document.createElement("div");
    num.className = "stat-num text-gradient editable";
    num.textContent = data.stats[k];
    if (editing) num.setAttribute("contenteditable", "true");
    num.addEventListener("blur", () => {
      data.stats[k] = num.textContent || "";
      persist();
    });
    num.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); num.blur(); } });
    const lbl = document.createElement("div");
    lbl.className = "stat-label";
    lbl.textContent = labels[k];
    card.append(num, lbl);
    el.appendChild(card);
  });
}

function renderAvatar() {
  const img = document.getElementById("avatarImg");
  const initials = document.getElementById("avatarInitials");
  if (data.avatar) {
    img.src = data.avatar;
    img.hidden = false;
    initials.style.display = "none";
  } else {
    img.hidden = true;
    initials.style.display = "";
    initials.textContent = data.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  }
}

function renderSocials() {
  const el = document.getElementById("socials");
  el.innerHTML = "";
  data.socials.forEach((s) => {
    if (editing) {
      const wrap = document.createElement("div");
      wrap.className = "social-edit";
      wrap.innerHTML =
        '<input class="lbl" /> ' + svg.link + ' <input class="url" /> <button class="del">' + svg.trashSm + "</button>";
      const [lbl, url] = wrap.querySelectorAll("input");
      lbl.value = s.label; url.value = s.url;
      lbl.addEventListener("input", () => { s.label = lbl.value; persist(); });
      url.addEventListener("input", () => { s.url = url.value; persist(); });
      wrap.querySelector(".del").addEventListener("click", () => {
        data.socials = data.socials.filter((x) => x.id !== s.id); persist(); renderSocials();
      });
      el.appendChild(wrap);
    } else {
      const a = document.createElement("a");
      a.className = "social-pill";
      a.href = s.url; a.target = "_blank"; a.rel = "noreferrer";
      a.innerHTML = s.label + " " + svg.arrowSm;
      el.appendChild(a);
    }
  });
  if (editing) {
    const add = document.createElement("button");
    add.className = "add-link";
    add.innerHTML = svg.plus + " Add link";
    add.addEventListener("click", () => {
      data.socials.push({ id: uid(), label: "New", url: "https://" });
      persist(); renderSocials();
    });
    el.appendChild(add);
  }
}

function makeEditable(text, multiline, onChange, className, tag = "div") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  if (editing) {
    el.classList.add("editable");
    el.setAttribute("contenteditable", "true");
    el.addEventListener("blur", () => onChange(el.textContent || ""));
    el.addEventListener("keydown", (e) => {
      if (!multiline && e.key === "Enter") { e.preventDefault(); el.blur(); }
    });
  }
  return el;
}

function renderExperience() {
  const list = document.getElementById("experienceList");
  list.innerHTML = "";
  data.experience.forEach((exp) => {
    const card = document.createElement("div");
    card.className = "card-row";
    const left = document.createElement("div");
    left.appendChild(makeEditable(exp.role, false, (v) => { exp.role = v; persist(); }, "", "h3"));
    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.appendChild(makeEditable(exp.company, false, (v) => { exp.company = v; persist(); }, "", "span"));
    const sep = document.createElement("span"); sep.textContent = "•"; meta.appendChild(sep);
    meta.appendChild(makeEditable(exp.period, false, (v) => { exp.period = v; persist(); }, "", "span"));
    left.appendChild(meta);
    left.appendChild(makeEditable(exp.description, true, (v) => { exp.description = v; persist(); }, "", "p"));
    card.appendChild(left);
    if (editing) {
      const del = document.createElement("button");
      del.className = "del-btn";
      del.innerHTML = svg.trash;
      del.addEventListener("click", () => {
        data.experience = data.experience.filter((x) => x.id !== exp.id); persist(); renderExperience();
      });
      card.appendChild(del);
    }
    list.appendChild(card);
  });
  if (editing) list.appendChild(makeAddBtn("Add experience", () => {
    data.experience.push({ id: uid(), role: "New role", company: "Company", period: "Year — Year", description: "What you did." });
    persist(); renderExperience();
  }));
}

function renderEducation() {
  const list = document.getElementById("educationList");
  list.innerHTML = "";
  data.education.forEach((ed) => {
    const card = document.createElement("div");
    card.className = "card-row";
    const left = document.createElement("div");
    left.appendChild(makeEditable(ed.degree, false, (v) => { ed.degree = v; persist(); }, "", "h3"));
    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.appendChild(makeEditable(ed.school, false, (v) => { ed.school = v; persist(); }, "", "span"));
    const sep = document.createElement("span"); sep.textContent = "•"; meta.appendChild(sep);
    meta.appendChild(makeEditable(ed.period, false, (v) => { ed.period = v; persist(); }, "", "span"));
    left.appendChild(meta);
    card.appendChild(left);
    if (editing) {
      const del = document.createElement("button");
      del.className = "del-btn";
      del.innerHTML = svg.trash;
      del.addEventListener("click", () => {
        data.education = data.education.filter((x) => x.id !== ed.id); persist(); renderEducation();
      });
      card.appendChild(del);
    }
    list.appendChild(card);
  });
  if (editing) list.appendChild(makeAddBtn("Add education", () => {
    data.education.push({ id: uid(), degree: "Degree", school: "School", period: "Year — Year" });
    persist(); renderEducation();
  }));
}

function renderSkills() {
  const list = document.getElementById("skillsList");
  list.innerHTML = "";
  data.skills.forEach((skill, i) => {
    const wrap = document.createElement("div");
    wrap.className = "skill";
    const dot = document.createElement("span"); dot.className = "dot2"; wrap.appendChild(dot);
    if (editing) {
      const inp = document.createElement("input");
      inp.value = skill;
      inp.addEventListener("blur", () => {
        data.skills[i] = inp.value;
        data.skills = data.skills.filter(Boolean);
        persist(); renderSkills();
      });
      wrap.appendChild(inp);
      const x = document.createElement("button");
      x.className = "x"; x.innerHTML = svg.trashSm;
      x.addEventListener("click", () => {
        data.skills = data.skills.filter((_, idx) => idx !== i); persist(); renderSkills();
      });
      wrap.appendChild(x);
    } else {
      const span = document.createElement("span"); span.textContent = skill; wrap.appendChild(span);
    }
    list.appendChild(wrap);
  });
  if (editing) {
    const add = document.createElement("button");
    add.className = "add-link";
    add.innerHTML = svg.plus + " Add";
    add.addEventListener("click", () => {
      data.skills.push("New skill"); persist(); renderSkills();
    });
    list.appendChild(add);
  }
}

function renderProjects() {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";
  const palette = ["var(--blob-1)", "var(--blob-2)", "var(--blob-3)", "var(--primary)"];
  data.projects.forEach((p, i) => {
    const bg = palette[i % palette.length];
    const article = document.createElement("article");
    article.className = "project";

    const imgWrap = document.createElement("div");
    imgWrap.className = "project-img";
    imgWrap.style.background = `linear-gradient(135deg, ${bg}, color-mix(in oklab, ${bg} 40%, white))`;
    if (p.image) {
      const im = document.createElement("img"); im.src = p.image; im.alt = p.title; imgWrap.appendChild(im);
    } else {
      const ltr = document.createElement("span"); ltr.className = "project-letter"; ltr.textContent = p.title.charAt(0); imgWrap.appendChild(ltr);
    }
    const tag = document.createElement("span"); tag.className = "project-tag"; tag.textContent = p.tag; imgWrap.appendChild(tag);
    if (editing) {
      const btn = document.createElement("button");
      btn.className = "project-img-btn";
      btn.innerHTML = svg.upload + " Image";
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.hidden = true;
      btn.addEventListener("click", () => inp.click());
      inp.addEventListener("change", () => {
        const f = inp.files && inp.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = () => { p.image = String(r.result); persist(); renderProjects(); };
        r.readAsDataURL(f);
      });
      imgWrap.appendChild(btn); imgWrap.appendChild(inp);
    }
    article.appendChild(imgWrap);

    const body = document.createElement("div"); body.className = "project-body";
    const left = document.createElement("div"); left.style.minWidth = "0"; left.style.flex = "1";
    left.appendChild(makeEditable(p.title, false, (v) => { p.title = v; persist(); }, "", "h3"));
    left.appendChild(makeEditable(p.description, true, (v) => { p.description = v; persist(); }, "", "p"));
    if (editing) {
      const fields = document.createElement("div");
      fields.className = "project-edit-fields";
      const tagL = document.createElement("span"); tagL.textContent = "Tag:"; tagL.style.color = "var(--muted-foreground)";
      const tagI = document.createElement("input"); tagI.value = p.tag;
      tagI.addEventListener("input", () => { p.tag = tagI.value; persist(); tag.textContent = p.tag; });
      const lnkL = document.createElement("span"); lnkL.textContent = "Link:"; lnkL.style.color = "var(--muted-foreground)";
      const lnkI = document.createElement("input"); lnkI.value = p.link; lnkI.style.flex = "1";
      lnkI.addEventListener("input", () => { p.link = lnkI.value; persist(); });
      fields.append(tagL, tagI, lnkL, lnkI);
      left.appendChild(fields);
    }
    body.appendChild(left);

    if (editing) {
      const del = document.createElement("button");
      del.className = "del-btn"; del.innerHTML = svg.trash;
      del.addEventListener("click", () => {
        data.projects = data.projects.filter((x) => x.id !== p.id); persist(); renderProjects();
      });
      body.appendChild(del);
    } else {
      const a = document.createElement("a");
      a.className = "project-link"; a.href = p.link; a.target = "_blank"; a.rel = "noreferrer";
      a.innerHTML = svg.arrow;
      body.appendChild(a);
    }
    article.appendChild(body);
    list.appendChild(article);
  });

  const wrap = document.getElementById("addProjectWrap");
  wrap.innerHTML = "";
  wrap.hidden = !editing;
  if (editing) {
    wrap.appendChild(makeAddBtn("Add project", () => {
      data.projects.push({ id: uid(), title: "New project", tag: "Category", description: "Short description.", image: "", link: "#" });
      persist(); renderProjects();
    }));
  }
}

function makeAddBtn(label, onClick) {
  const b = document.createElement("button");
  b.className = "add-dashed";
  b.innerHTML = svg.plus + " " + label;
  b.addEventListener("click", onClick);
  return b;
}

function renderContact() {
  const grid = document.getElementById("contactGrid");
  grid.innerHTML = "";
  const rows = [
    { icon: svg.mail, key: "email" },
    { icon: svg.phone, key: "phone" },
    { icon: svg.pin, key: "location" }
  ];
  rows.forEach(({ icon, key }) => {
    const row = document.createElement("div");
    row.className = "contact-row";
    const ic = document.createElement("div"); ic.className = "contact-icon"; ic.innerHTML = icon; row.appendChild(ic);
    const val = makeEditable(data[key], false, (v) => { data[key] = v; persist(); if (key === "email") syncEmail(); }, "", "div");
    val.style.flex = "1"; val.style.fontSize = "0.875rem"; val.style.fontWeight = "500";
    row.appendChild(val);
    grid.appendChild(row);
  });
}

function syncEmail() {
  const cta = document.getElementById("ctaEmail");
  if (cta) cta.href = "mailto:" + data.email;
}

/* ---------- Theme ---------- */
function applyTheme() {
  document.documentElement.classList.toggle("dark", data.theme === "dark");
  const icon = document.getElementById("iconTheme");
  if (icon) icon.outerHTML = (data.theme === "dark" ? svg.sun : svg.moon).replace("<svg ", '<svg id="iconTheme" ');
}

/* ---------- Toolbar actions ---------- */
function bindToolbar() {
  document.querySelector('[data-action="theme"]').addEventListener("click", () => {
    data.theme = data.theme === "dark" ? "light" : "dark";
    persist(); applyTheme();
  });
  document.querySelector('[data-action="edit"]').addEventListener("click", () => {
    editing = !editing; applyEditMode();
  });
  document.querySelector('[data-action="reset"]').addEventListener("click", () => {
    if (!confirm("Reset portfolio to defaults?")) return;
    localStorage.removeItem(KEY);
    data = JSON.parse(JSON.stringify(defaultData));
    applyTheme(); bindEditables(); renderAll();
    document.querySelectorAll(".editable[data-bind]").forEach((el) => {
      const k = el.getAttribute("data-bind");
      if (k && k in data && typeof data[k] === "string") el.textContent = data[k];
    });
  });
  document.querySelector('[data-action="export"]').addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `portfolio-${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click(); URL.revokeObjectURL(url);
  });
  const importInp = document.getElementById("importInput");
  document.querySelector('[data-action="import"]').addEventListener("click", () => importInp.click());
  importInp.addEventListener("change", () => {
    const f = importInp.files && importInp.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const parsed = JSON.parse(String(r.result));
        data = Object.assign({}, defaultData, parsed);
        persist(); applyTheme();
        document.querySelectorAll(".editable[data-bind]").forEach((el) => {
          const k = el.getAttribute("data-bind");
          if (k && k in data && typeof data[k] === "string") el.textContent = data[k];
        });
        renderAll();
      } catch (_) { alert("Invalid portfolio JSON file."); }
    };
    r.readAsText(f);
    importInp.value = "";
  });

  // Avatar
  const avatarBtn = document.getElementById("avatarBtn");
  const avatarInp = document.getElementById("avatarInput");
  avatarBtn.addEventListener("click", () => avatarInp.click());
  avatarInp.addEventListener("change", () => {
    const f = avatarInp.files && avatarInp.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { data.avatar = String(r.result); persist(); renderAvatar(); };
    r.readAsDataURL(f);
  });
}

/* ---------- Section accents + reveal ---------- */
function setupSections() {
  document.querySelectorAll(".section[data-accent]").forEach((s) => {
    const dot = s.querySelector(".dot");
    if (dot) dot.style.setProperty("--accent-color", s.getAttribute("data-accent"));
    if (dot) dot.style.background = s.getAttribute("data-accent");
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { rootMargin: "-80px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Render aggregator ---------- */
function renderAll() {
  renderStats();
  renderAvatar();
  renderSocials();
  renderExperience();
  renderEducation();
  renderSkills();
  renderProjects();
  renderContact();
  syncEmail();
}

/* ---------- Bootstrap ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  bindEditables();
  bindToolbar();
  setupSections();
  renderAll();
});
