const params = new URLSearchParams(window.location.search);
const requestedPlate = params.get("plate") || "analytics-workspace";
const plates = [...document.querySelectorAll("[data-plate]")];
const activePlate = plates.find((plate) => plate.dataset.plate === requestedPlate) || plates[0];

activePlate.classList.add("is-active");
document.title = `${activePlate.dataset.plate} · Boho Evidence Plates`;

const COLORS = {
  ink: "#111214",
  muted: "#596163",
  grid: "rgba(17, 18, 20, 0.15)",
  green: "#1e5e5b",
  coral: "#d97850",
};

function fitCanvas(canvas) {
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.round(canvas.clientWidth);
  const height = Math.round(canvas.clientHeight);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { context, width, height };
}

function drawTrend(canvas, rows, field, options) {
  const { context: ctx, width, height } = fitCanvas(canvas);
  const margin = { top: 17, right: 44, bottom: 34, left: 67 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const values = rows.map((row) => Number(row[field]));
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const spread = Math.max(rawMax - rawMin, rawMax * 0.05, 1);
  const min = rawMin - spread * 0.15;
  const max = rawMax + spread * 0.15;
  const x = (index) => margin.left + (index / (rows.length - 1)) * plotWidth;
  const y = (value) => margin.top + ((max - value) / (max - min)) * plotHeight;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = COLORS.grid;
  ctx.fillStyle = COLORS.muted;
  ctx.font = "11px SFMono-Regular, Consolas, monospace";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  for (let step = 0; step <= 4; step += 1) {
    const value = min + ((max - min) * step) / 4;
    const py = y(value);
    ctx.beginPath();
    ctx.moveTo(margin.left, py);
    ctx.lineTo(width - margin.right, py);
    ctx.stroke();
    ctx.fillText(options.axisFormat(value), margin.left - 10, py);
  }

  ctx.strokeStyle = COLORS.ink;
  ctx.beginPath();
  ctx.moveTo(margin.left, margin.top);
  ctx.lineTo(margin.left, height - margin.bottom);
  ctx.lineTo(width - margin.right, height - margin.bottom);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  rows.forEach((row, index) => {
    ctx.fillStyle = COLORS.muted;
    ctx.fillText(row.week, x(index), height - margin.bottom + 10);
  });

  ctx.fillStyle = options.fill;
  ctx.beginPath();
  ctx.moveTo(x(0), height - margin.bottom);
  values.forEach((value, index) => ctx.lineTo(x(index), y(value)));
  ctx.lineTo(x(values.length - 1), height - margin.bottom);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = options.color;
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  values.forEach((value, index) => {
    if (index === 0) ctx.moveTo(x(index), y(value));
    else ctx.lineTo(x(index), y(value));
  });
  ctx.stroke();

  values.forEach((value, index) => {
    ctx.beginPath();
    ctx.arc(x(index), y(value), index === values.length - 1 ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = index === values.length - 1 ? COLORS.ink : options.color;
    ctx.fill();
  });

  const last = values.at(-1);
  ctx.fillStyle = COLORS.ink;
  ctx.font = "700 13px SFMono-Regular, Consolas, monospace";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(options.valueFormat(last), width - margin.right, y(last) - 10);
}

function createQueryLedger(rows) {
  const container = document.querySelector("#query-rows");
  if (!container) return;

  rows.forEach((row) => {
    const article = document.createElement("article");
    article.className = "query-row";

    const top = document.createElement("div");
    top.className = "query-row__top";

    const identity = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = row.query;
    const route = document.createElement("code");
    route.textContent = row.page;
    identity.append(title, route);

    const action = document.createElement("span");
    action.className = "query-row__action";
    action.textContent = row.action;
    top.append(identity, action);

    const metrics = document.createElement("dl");
    const fields = [
      ["Impr.", row.impressions.toLocaleString("en-US")],
      ["Clicks", String(row.clicks)],
      ["CTR", `${row.ctr.toFixed(2)}%`],
      ["Pos.", row.position.toFixed(1)],
    ];
    fields.forEach(([label, value]) => {
      const item = document.createElement("div");
      const term = document.createElement("dt");
      const definition = document.createElement("dd");
      term.textContent = label;
      definition.textContent = value;
      item.append(term, definition);
      metrics.append(item);
    });

    article.append(top, metrics);
    container.append(article);
  });
}

async function prepareGscPlate() {
  if (activePlate.dataset.plate !== "gsc-opportunity") return;
  const response = await fetch("data/gsc-opportunity.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load the versioned GSC demo fixture.");
  const data = await response.json();
  const impressions = document.querySelector("#impressions-chart");
  const ctr = document.querySelector("#ctr-chart");

  drawTrend(impressions, data.weeks, "impressions", {
    color: COLORS.green,
    fill: "rgba(84, 169, 157, 0.18)",
    axisFormat: (value) => `${Math.round(value / 100) / 10}k`,
    valueFormat: (value) => Math.round(value).toLocaleString("en-US"),
  });
  drawTrend(ctr, data.weeks, "ctr", {
    color: COLORS.coral,
    fill: "rgba(217, 120, 80, 0.16)",
    axisFormat: (value) => `${value.toFixed(1)}%`,
    valueFormat: (value) => `${value.toFixed(2)}%`,
  });
  createQueryLedger(data.queries);
}

function waitForImages() {
  const images = [...activePlate.querySelectorAll("img")];
  return Promise.all(images.map((image) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve, reject) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", () => reject(new Error(`Image failed: ${image.src}`)), { once: true });
    });
  }));
}

await prepareGscPlate();
await Promise.all([waitForImages(), document.fonts?.ready || Promise.resolve()]);
document.documentElement.dataset.renderReady = "true";
