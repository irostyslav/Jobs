/* Salesforce Hiring Signal Dashboard — static client */
(() => {
  "use strict";

  const DATA = {
    signal: null,
    jobs: null,
    relationships: null,
    pm: null,
  };

  const COLORS = [
    "#0176d3", "#00d4aa", "#a78bfa", "#f5b942", "#f07178",
    "#3dd68c", "#00a1e0", "#fb923c", "#67e8f9", "#c084fc",
  ];

  const NARRATIVE_CLAIMS = [
    {
      title: "Agentforce as digital labor platform",
      text: "Salesforce positions Agentforce as unifying agents, data, apps, and metadata — citing 8,000+ customers signed up to deploy Agentforce and rapid agent usage growth (Slack Workforce Index).",
      source: "Salesforce press release — Agentforce 3 (Jun 23, 2025)",
      url: "https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement/",
      themes: ["Agentforce / AI Agents"],
    },
    {
      title: "Data Cloud / Data 360 as AI foundation",
      text: "Public narrative frames Data 360 / Data Cloud as the real-time data foundation for agentic solutions, including GA packaging for ISVs to build and monetize agentic apps with Agentforce.",
      source: "Salesforce Blog — Data 360 for ISVs is GA",
      url: "https://www.salesforce.com/blog/data-360-for-isvs-is-ga-everything-you-need-to-know/",
      themes: ["Data Cloud / Analytics / Tableau"],
    },
    {
      title: "Partners / AgentExchange ecosystem",
      text: "Salesforce calls opening Agentforce 360 to builders the most significant platform expansion for ISVs since Force.com — citing 160k+ ecosystem companies, 5,000 ISVs, 7,000 SIs, and AgentExchange MCP partners (AWS, Box, Google Cloud, IBM, etc.).",
      source: "Salesforce — Opening Agentforce 360 to Builders; Agentforce 3 PR",
      url: "https://www.salesforce.com/uk/news/stories/opening-agentforce-360-to-builders/",
      themes: ["Partner / AppExchange / Marketplace / Ecosystem", "Agentforce / AI Agents"],
    },
    {
      title: "Partner delivery capacity",
      text: "Agentforce 3 messaging highlights the partner ecosystem (Accenture, Deloitte Digital, PwC, etc.) aiding thousands of deployments with 272,000 certified specialists.",
      source: "Salesforce press release — Agentforce 3 (Jun 23, 2025)",
      url: "https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement/",
      themes: ["Partner / AppExchange / Marketplace / Ecosystem", "GTM / Sales / AE / SE / CSM"],
    },
  ];

  async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return res.json();
  }

  function themeCount(name) {
    const t = DATA.signal.themes.find((x) => x.theme === name);
    return t ? t.count : 0;
  }

  function shortTheme(name) {
    return name.split(" / ")[0];
  }

  function parsePostedDays(postedOn) {
    if (!postedOn) return null;
    const s = String(postedOn);
    if (/30\+/.test(s)) return 31;
    const m = s.match(/(\d+)\s*Days?/i);
    return m ? parseInt(m[1], 10) : null;
  }

  /* ---------- Overview ---------- */
  function renderOverview() {
    const s = DATA.signal;
    document.getElementById("stat-n").textContent = String(s.n_jobs_us);
    document.getElementById("stat-date").textContent = s.snapshot_date;
    document.getElementById("stat-gtm").textContent = String(themeCount("GTM / Sales / AE / SE / CSM"));
    document.getElementById("stat-agent").textContent = String(themeCount("Agentforce / AI Agents"));

    document.getElementById("overview-lede").textContent =
      `N=${s.n_jobs_us} unique US requisitions (${s.timezone_note}). ` +
      `GTM/Sales and Engineering dominate absolute volume; Agentforce, Public Sector, Data Cloud, and Slack show named strategic clusters. ` +
      `Product Management IC/lead openings are sparse vs GTM.`;

    const insights = (s.insights || []).slice(0, 5);
    const ul = document.getElementById("insights-list");
    ul.innerHTML = insights
      .map((ins, i) => {
        const text = typeof ins === "string" ? ins : ins.text || ins.summary || JSON.stringify(ins);
        return `<li><strong>${i + 1}.</strong> ${escapeHtml(text)}</li>`;
      })
      .join("");
  }

  /* ---------- Charts ---------- */
  function renderCharts() {
    const themes = [...DATA.signal.themes].sort((a, b) => b.count - a.count);
    const cats = [...DATA.signal.job_category_facets_us_context].sort((a, b) => b.count - a.count);

    const themeColors = themes.map((_, i) => COLORS[i % COLORS.length]);

    new Chart(document.getElementById("chart-themes"), {
      type: "bar",
      data: {
        labels: themes.map((t) => shortTheme(t.theme)),
        datasets: [
          {
            label: "Openings (multi-label)",
            data: themes.map((t) => t.count),
            backgroundColor: themeColors,
            borderRadius: 6,
            maxBarThickness: 22,
          },
        ],
      },
      options: chartOpts("Theme count"),
    });

    new Chart(document.getElementById("chart-categories"), {
      type: "bar",
      data: {
        labels: cats.map((c) => c.name),
        datasets: [
          {
            label: "Job Category facet",
            data: cats.map((c) => c.count),
            backgroundColor: cats.map((_, i) => COLORS[(i + 3) % COLORS.length]),
            borderRadius: 6,
            maxBarThickness: 22,
          },
        ],
      },
      options: chartOpts("Category count"),
    });
  }

  function chartOpts(title) {
    return {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => {
              const i = items[0].dataIndex;
              // full label from original if available via chart — keep short
              return items[0].label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(36,48,73,.8)" },
          ticks: { color: "#9aa8c0", font: { size: 11 } },
          title: { display: true, text: title, color: "#9aa8c0" },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#e8eef9", font: { size: 11 } },
        },
      },
    };
  }

  /* ---------- Relationships ---------- */
  function renderRelationships() {
    const rel = DATA.relationships;
    const legend = document.getElementById("graph-legend");
    legend.innerHTML = rel.nodes
      .map(
        (n, i) =>
          `<span class="pill" style="border-color:${COLORS[i % COLORS.length]};color:${COLORS[i % COLORS.length]}">${escapeHtml(shortTheme(n.id))} · ${n.count}</span>`
      )
      .join("");

    initForceGraph(rel);
    renderMatrix(rel);

    document.querySelectorAll("[data-rel-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-rel-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.getAttribute("data-rel-tab");
        document.getElementById("rel-graph-panel").hidden = tab !== "graph";
        document.getElementById("rel-matrix-panel").hidden = tab !== "matrix";
      });
    });
  }

  function renderMatrix(rel) {
    const themes = rel.all_nodes.map((n) => n.id);
    const matrix = rel.matrix;
    let max = 1;
    themes.forEach((a) =>
      themes.forEach((b) => {
        if (a !== b) max = Math.max(max, (matrix[a] && matrix[a][b]) || 0);
      })
    );

    const heat = (v) => {
      if (!v) return "heat-0";
      const r = v / max;
      if (r < 0.15) return "heat-1";
      if (r < 0.3) return "heat-2";
      if (r < 0.5) return "heat-3";
      if (r < 0.75) return "heat-4";
      return "heat-5";
    };

    let html = `<table class="matrix-table"><thead><tr><th class="row-label"></th>`;
    themes.forEach((t) => {
      html += `<th title="${escapeAttr(t)}">${escapeHtml(shortTheme(t).slice(0, 10))}</th>`;
    });
    html += `</tr></thead><tbody>`;
    themes.forEach((row) => {
      html += `<tr><td class="row-label" title="${escapeAttr(row)}">${escapeHtml(shortTheme(row))}</td>`;
      themes.forEach((col) => {
        const v = row === col ? "—" : (matrix[row] && matrix[row][col]) || 0;
        const cls = row === col ? "heat-0" : heat(typeof v === "number" ? v : 0);
        html += `<td class="${cls}" title="${escapeAttr(row)} × ${escapeAttr(col)}">${v || ""}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById("matrix-wrap").innerHTML = html;
  }

  function initForceGraph(rel) {
    const canvas = document.getElementById("graph-canvas");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(460 * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect.width;
    }

    let width = resize();
    const height = 460;

    const nodes = rel.nodes.map((n, i) => ({
      ...n,
      x: width / 2 + Math.cos((i / rel.nodes.length) * Math.PI * 2) * 140,
      y: height / 2 + Math.sin((i / rel.nodes.length) * Math.PI * 2) * 120,
      vx: 0,
      vy: 0,
      color: COLORS[i % COLORS.length],
      r: 10 + Math.sqrt(n.count) * 2.2,
    }));
    const idMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const edges = rel.edges
      .filter((e) => idMap[e.source] && idMap[e.target])
      .map((e) => ({
        source: idMap[e.source],
        target: idMap[e.target],
        weight: e.weight,
      }));
    const maxW = Math.max(1, ...edges.map((e) => e.weight));

    let drag = null;
    let hover = null;

    function simStep() {
      // repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          let dx = a.x - b.x,
            dy = a.y - b.y;
          let dist = Math.hypot(dx, dy) || 0.01;
          const force = 1800 / (dist * dist);
          dx = (dx / dist) * force;
          dy = (dy / dist) * force;
          a.vx += dx;
          a.vy += dy;
          b.vx -= dx;
          b.vy -= dy;
        }
      }
      // springs
      edges.forEach((e) => {
        const dx = e.target.x - e.source.x;
        const dy = e.target.y - e.source.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const ideal = 90 + (1 - e.weight / maxW) * 80;
        const f = (dist - ideal) * 0.02;
        const fx = (dx / dist) * f;
        const fy = (dy / dist) * f;
        e.source.vx += fx;
        e.source.vy += fy;
        e.target.vx -= fx;
        e.target.vy -= fy;
      });
      // center gravity
      nodes.forEach((n) => {
        n.vx += (width / 2 - n.x) * 0.005;
        n.vy += (height / 2 - n.y) * 0.005;
        if (drag !== n) {
          n.vx *= 0.85;
          n.vy *= 0.85;
          n.x += n.vx;
          n.y += n.vy;
        }
        n.x = Math.max(n.r + 8, Math.min(width - n.r - 8, n.x));
        n.y = Math.max(n.r + 8, Math.min(height - n.r - 8, n.y));
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      edges.forEach((e) => {
        const t = e.weight / maxW;
        ctx.beginPath();
        ctx.moveTo(e.source.x, e.source.y);
        ctx.lineTo(e.target.x, e.target.y);
        ctx.strokeStyle = `rgba(1,118,211,${0.15 + t * 0.55})`;
        ctx.lineWidth = 1 + t * 5;
        ctx.stroke();
        // weight label mid
        if (e.weight >= 3) {
          const mx = (e.source.x + e.target.x) / 2;
          const my = (e.source.y + e.target.y) / 2;
          ctx.fillStyle = "#9aa8c0";
          ctx.font = "10px Inter, sans-serif";
          ctx.fillText(String(e.weight), mx + 4, my - 4);
        }
      });
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = hover && hover !== n ? 0.45 : 1;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(255,255,255,.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#e8eef9";
        ctx.font = "600 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(shortTheme(n.id), n.x, n.y + n.r + 14);
        ctx.fillStyle = "rgba(232,238,249,.85)";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillText(String(n.count), n.x, n.y + 4);
      });
      if (hover) {
        ctx.fillStyle = "rgba(11,18,32,.92)";
        ctx.strokeStyle = hover.color;
        const label = `${hover.full} · ${hover.count} openings · ${hover.fresh_7d} fresh ≤7d`;
        ctx.font = "12px Inter, sans-serif";
        const tw = ctx.measureText(label).width + 20;
        const tx = Math.min(width - tw - 8, Math.max(8, hover.x - tw / 2));
        const ty = Math.max(28, hover.y - hover.r - 28);
        roundRect(ctx, tx, ty - 16, tw, 24, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#e8eef9";
        ctx.textAlign = "left";
        ctx.fillText(label, tx + 10, ty);
      }
    }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function nodeAt(x, y) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (Math.hypot(n.x - x, n.y - y) <= n.r + 4) return n;
      }
      return null;
    }

    function pos(evt) {
      const rect = canvas.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    canvas.addEventListener("mousedown", (e) => {
      const p = pos(e);
      drag = nodeAt(p.x, p.y);
      if (drag) {
        drag.vx = 0;
        drag.vy = 0;
      }
    });
    window.addEventListener("mouseup", () => {
      drag = null;
    });
    canvas.addEventListener("mousemove", (e) => {
      const p = pos(e);
      hover = nodeAt(p.x, p.y);
      canvas.style.cursor = hover || drag ? "grab" : "default";
      if (drag) {
        drag.x = p.x;
        drag.y = p.y;
        drag.vx = 0;
        drag.vy = 0;
      }
    });

    window.addEventListener("resize", () => {
      width = resize();
    });

    function loop() {
      for (let i = 0; i < 2; i++) simStep();
      draw();
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- Narrative ---------- */
  function renderNarrative() {
    const box = document.getElementById("narrative-claims");
    box.innerHTML = NARRATIVE_CLAIMS.map(
      (c) => `
      <div class="claim">
        <h4>${escapeHtml(c.title)}</h4>
        <p>${escapeHtml(c.text)}</p>
        <cite><a href="${escapeAttr(c.url)}" target="_blank" rel="noopener">${escapeHtml(c.source)}</a></cite>
      </div>`
    ).join("");

    const focusAlloc = [
      "GTM / Sales / AE / SE / CSM",
      "Engineering / Platforms / Infrastructure",
      "Public Sector / Missionforce",
      "Agentforce / AI Agents",
      "Data Cloud / Analytics / Tableau",
      "Partner / AppExchange / Marketplace / Ecosystem",
      "Slack / Collaboration",
      "Product Management",
      "Sales / Service / Marketing / Commerce Cloud",
    ];
    const max = Math.max(...focusAlloc.map(themeCount));
    document.getElementById("narrative-alloc").innerHTML = focusAlloc
      .map((name) => {
        const c = themeCount(name);
        const pct = max ? (c / max) * 100 : 0;
        return `<div class="alloc-row">
          <span style="min-width:7.5rem">${escapeHtml(shortTheme(name))}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          <span class="val">${c}</span>
        </div>`;
      })
      .join("");

    const caveats = (DATA.signal.caveats || []).join(" ");
    document.getElementById("narrative-caveat").textContent =
      "Caveat: " +
      (caveats ||
        "External Workday postings ≠ approved headcount; includes backfills and evergreen reqs. Title keyword clustering is multi-label and imperfect.");

    document.getElementById("narrative-contrast").innerHTML = `
      <h3>Contrast highlights (from this snapshot)</h3>
      <ul class="insights" style="margin-top:.75rem">
        <li><strong>Aligned:</strong> Agentforce narrative is matched by staffing — ${themeCount("Agentforce / AI Agents")} US titles explicitly reference Agentforce/agents/AI (12 fresh ≤7d in report).</li>
        <li><strong>Aligned:</strong> Data Cloud / analytics naming appears in ${themeCount("Data Cloud / Analytics / Tableau")} openings alongside Agentforce in GTM and architecture roles.</li>
        <li><strong>Gap:</strong> Partner/ecosystem is loud in PR (AgentExchange, ISV GA, 160k companies) but Partner-theme openings are only ${themeCount("Partner / AppExchange / Marketplace / Ecosystem")} after exclusions — mostly GTM/alliances, not Product. Classic AppExchange-branded PM titles: thin.</li>
        <li><strong>Gap:</strong> Classic CRM-cloud-named titles are thin (${themeCount("Sales / Service / Marketing / Commerce Cloud")}) vs Agentforce naming — external language prioritizes agents + data platform.</li>
        <li><strong>Structure:</strong> Capacity is GTM (${themeCount("GTM / Sales / AE / SE / CSM")}) + Eng (${themeCount("Engineering / Platforms / Infrastructure")}); Job Category Product facet = ${DATA.signal.job_category_facets_us_context.find((c) => c.name === "Product")?.count ?? "—"}; keyword PM = ${themeCount("Product Management")}.</li>
      </ul>`;
  }

  /* ---------- PM Board ---------- */
  function renderPM() {
    const shortlist = DATA.signal.pm_apply_shortlist || DATA.pm.ranked || [];
    const grid = document.getElementById("pm-grid");
    grid.innerHTML = shortlist
      .map(
        (j) => `
      <article class="pm-card">
        <div class="rank">#${j.rank} · ${escapeHtml(j.req)}</div>
        <h3>${escapeHtml(j.title)}</h3>
        <div class="meta">${escapeHtml(j.location || "")} · ${escapeHtml(j.postedOn || j.posted || "")}</div>
        <div class="why">${escapeHtml(j.why_fit || j.why || "")}</div>
        <div class="actions">
          <a class="btn btn-primary" href="${escapeAttr(j.url)}" target="_blank" rel="noopener">Open in Workday</a>
        </div>
      </article>`
      )
      .join("");

    const stretch = DATA.signal.pm_stretch || DATA.pm.stretch || [];
    if (stretch.length) {
      document.getElementById("pm-stretch").innerHTML = `
        <details>
          <summary>Stretch / note (not top apply targets) — ${stretch.length}</summary>
          <ul class="stretch-list">
            ${stretch
              .map(
                (s) =>
                  `<li><strong>${escapeHtml(s.title)}</strong> (${escapeHtml(s.req)}) — ${escapeHtml(s.note || s.why || "")}
                   · <a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">Workday</a></li>`
              )
              .join("")}
          </ul>
        </details>`;
    }
  }

  /* ---------- Explorer ---------- */
  let themeByReq = {};

  function renderExplorer() {
    const jobs = DATA.jobs.jobs || DATA.jobs;
    (DATA.relationships.job_theme_index || []).forEach((row) => {
      themeByReq[row.req] = row.themes;
    });

    const themeSelect = document.getElementById("job-theme-filter");
    DATA.signal.themes.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.theme;
      opt.textContent = `${shortTheme(t.theme)} (${t.count})`;
      themeSelect.appendChild(opt);
    });

    const search = document.getElementById("job-search");
    const fresh = document.getElementById("job-fresh-filter");
    const tbody = document.getElementById("jobs-tbody");
    const countEl = document.getElementById("job-count");

    function apply() {
      const q = search.value.trim().toLowerCase();
      const th = themeSelect.value;
      const fr = fresh.value;
      const filtered = jobs.filter((j) => {
        if (q) {
          const blob = `${j.title} ${j.location} ${j.req}`.toLowerCase();
          if (!blob.includes(q)) return false;
        }
        if (th) {
          const themes = themeByReq[j.req] || [];
          if (!themes.includes(th)) return false;
        }
        if (fr) {
          const days = parsePostedDays(j.postedOn);
          if (fr === "30plus") {
            if (!(days === null || days >= 30 || /30\+/.test(j.postedOn || ""))) return false;
          } else {
            const lim = parseInt(fr, 10);
            if (days === null || days > lim) return false;
          }
        }
        return true;
      });

      countEl.textContent = `${filtered.length} of ${jobs.length} jobs`;
      if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="loading">No matches</td></tr>`;
        return;
      }
      // virtualize lightly: show first 200 then note
      const show = filtered.slice(0, 250);
      tbody.innerHTML =
        show
          .map((j) => {
            const themes = themeByReq[j.req] || [];
            const tags = themes
              .slice(0, 4)
              .map((t) => `<span class="theme-tag">${escapeHtml(shortTheme(t))}</span>`)
              .join("");
            return `<tr>
              <td><a href="${escapeAttr(j.url)}" target="_blank" rel="noopener">${escapeHtml(j.title)}</a></td>
              <td>${escapeHtml(j.location || "")}</td>
              <td>${escapeHtml(j.postedOn || "")}</td>
              <td class="req">${escapeHtml(j.req)}</td>
              <td><div class="theme-tags">${tags}</div></td>
            </tr>`;
          })
          .join("") +
        (filtered.length > show.length
          ? `<tr><td colspan="5" class="loading">Showing first ${show.length} of ${filtered.length} — refine search to narrow</td></tr>`
          : "");
    }

    search.addEventListener("input", apply);
    themeSelect.addEventListener("change", apply);
    fresh.addEventListener("change", apply);
    apply();
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  async function main() {
    try {
      const [signal, jobs, relationships, pm] = await Promise.all([
        loadJSON("./data/salesforce-hiring-signal-20260920.json"),
        loadJSON("./data/sf_us_jobs_normalized.json"),
        loadJSON("./data/theme_relationships.json"),
        loadJSON("./data/salesforce-pm-jobs-20260920.json"),
      ]);
      DATA.signal = signal;
      DATA.jobs = jobs;
      DATA.relationships = relationships;
      DATA.pm = pm;

      // Normalize insights if objects
      if (signal.insights && signal.insights.length && typeof signal.insights[0] === "object") {
        signal.insights = signal.insights.map((i) => i.text || i.summary || i.insight || JSON.stringify(i));
      }

      renderOverview();
      renderCharts();
      renderRelationships();
      renderNarrative();
      renderPM();
      renderExplorer();
    } catch (err) {
      console.error(err);
      document.getElementById("overview-lede").innerHTML =
        `<span class="error">Failed to load data: ${escapeHtml(err.message)}</span>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
