const fs = require("fs");
// Build the final presentation: node financial-literacy/presentation/build_deck.js  (run from repo root)
// Charts are the ORIGINAL figures from the source reports (cropped into presentation/source-figures/).
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/fd1e9380-3bd3-4d14-839f-605e7ac2a022_76a180bd-a304-4552-9a75-461dfc5f3add/pptx/scripts/apply_theme.js");

const OUT = "financial-literacy/presentation/Financial literacy in Latvia - presentation.pptx";
const FIG = "financial-literacy/presentation/source-figures/";
const THEME = {
  name: "Jaunie Ekonomisti",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1F1D", lt1: "FFFFFF", dk2: "16352B", lt2: "EDF3EF",
    accent1: "2D6A4F", accent2: "E9A23B", accent3: "95B8A3", accent4: "C9C8C3",
    accent5: "B23A48", accent6: "52796F", hlink: "2D6A4F", folHlink: "52796F",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.author = "Jaunie Ekonomisti";
pres.title = "Financial literacy in Latvia: compulsory on paper, missing in practice";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

// ---------- layouts
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: THEME.colors.dk2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.0, w: 11.7, h: 1.7, fontFace: "Cambria", fontSize: 44, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.9, w: 11.7, h: 1.0, fontSize: 20, color: C.accent3, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "foot", type: "body", x: 0.8, y: 6.3, w: 11.7, h: 0.6, fontSize: 12, color: C.background2, valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: THEME.colors.lt1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.95, fontFace: "Cambria", fontSize: 30, bold: true, color: C.text2, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { text: { text: "Jaunie Ekonomisti  |  Financial literacy in Latvia", options: { x: 0.6, y: 7.05, w: 7, h: 0.3, fontSize: 10, color: C.accent6, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 7.05, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
});
pres.defineSlideMaster({
  title: "SECTION_DARK",
  background: { color: THEME.colors.dk2 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.9, w: 11.7, h: 0.6, fontFace: "Cambria", fontSize: 22, bold: true, color: C.accent2, valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.6, w: 11.7, h: 1.6, fontFace: "Cambria", fontSize: 38, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.4, w: 11.7, h: 1.4, fontSize: 18, color: C.accent3, valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 12.2, y: 7.05, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});

// ---------- helpers
const src = (s, text) => s.addText(text, { x: 0.6, y: 6.62, w: 12.1, h: 0.36, fontSize: 10, color: C.accent6, italic: true, margin: 0, valign: "top", isTextBox: true, objectName: "Source" });
function card(s, x, y, w, h, fill = C.background2, name = "Card") {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { type: "none" }, rectRadius: 0.12, objectName: name });
}
function num(s, x, y, n, fill = C.accent1, d = 0.55) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: "Number circle" });
  s.addText(String(n), { x, y, w: d, h: d, fontFace: "Cambria", fontSize: 18, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Number" });
}
function bullets(s, items, x, y, w, h, size = 15) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 8 } })),
    { x, y, w, h, fontSize: size, color: C.text1, valign: "top", margin: 0, isTextBox: true, objectName: "Bullets" });
}
function pngSize(file) { const b = fs.readFileSync(FIG + file); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; }
// white card of the given box; the original chart is fitted inside it without distortion
function img(s, file, x, y, w, h, alt, label) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "FFFFFF" }, line: { color: "D5DDD8", width: 0.75 }, objectName: "Chart frame" });
  let top = y + 0.12, avail = h - 0.24;
  if (label) {
    s.addText(label, { x: x + 0.15, y: y + 0.08, w: w - 0.3, h: 0.34, fontSize: 12, bold: true, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Chart label" });
    top = y + 0.46; avail = h - 0.58;
  }
  const { w: pw, h: ph } = pngSize(file), r = pw / ph;
  let iw = w - 0.24, ih = iw / r;
  if (ih > avail) { ih = avail; iw = ih * r; }
  s.addImage({ path: FIG + file, x: x + (w - iw) / 2, y: top + (avail - ih) / 2, w: iw, h: ih, altText: alt, objectName: "Original chart" });
}
// right-hand column of stacked key numbers next to a chart
function callouts(s, x, y, w, items, gap = 0.18) {
  const h = (4.95 - gap * (items.length - 1)) / items.length;
  items.forEach((it, i) => {
    const yy = y + i * (h + gap);
    card(s, x, yy, w, h, it.dark ? C.text2 : C.background2);
    s.addText(it.big, { x: x + 0.25, y: yy + 0.12, w: w - 0.5, h: 0.62, fontFace: "Cambria", fontSize: 28, bold: true, color: it.color || C.accent5, margin: 0, valign: "middle", isTextBox: true, objectName: "Callout value" });
    s.addText(it.text, { x: x + 0.25, y: yy + 0.76, w: w - 0.5, h: h - 0.85, fontSize: 13, color: it.dark ? C.background1 : C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Callout text" });
  });
}
const hdr = { bold: true, color: C.background1, fill: { color: THEME.colors.dk2 } };
const tbl = (extra) => Object.assign({ fontSize: 13, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, valign: "middle" }, extra);
let sec = "";
const slide = (master, section) => { if (section !== sec) { pres.addSection({ title: section }); sec = section; } return pres.addSlide({ masterName: master, sectionTitle: section }); };
function divider(section, kicker, title, body) {
  const d = slide("SECTION_DARK", section);
  d.addText(kicker, { placeholder: "kicker" });
  d.addText(title, { placeholder: "title" });
  d.addText(body, { placeholder: "body" });
  return d;
}
let s;

// ======================= Title
s = slide("TITLE_DARK", "Opening");
s.addText("Compulsory on paper, missing in practice", { placeholder: "title" });
s.addText("Making financial education work for young people in Latvia", { placeholder: "body" });
s.addText("Jaunie Ekonomisti  |  SSE Riga elective: Impact Making for the Competitiveness and Data-Driven Decisions  |  November 2026", { placeholder: "foot" });
s.addNotes("Open with the paradox: financial literacy is compulsory in every Latvian school, yet 36% of 9th graders say they never learn about money at school. Or the Telegram money-mule story.");

// ======================= Overview
s = slide("CONTENT", "Opening");
s.addText("Our case in one slide", { placeholder: "title" });
card(s, 0.6, 1.45, 6.6, 4.95, C.text2, "Message card");
s.addText([
  { text: "Three messages", options: { fontFace: "Cambria", bold: true, fontSize: 20, color: C.accent2, breakLine: true } },
  { text: "The problem is real and urgent: ", options: { bold: true, color: C.background1 } },
  { text: "Latvia is joint last in the EU, knowledge is falling, and teenagers are targets of fraud.", options: { color: C.background1, breakLine: true } },
  { text: "We know what works: ", options: { bold: true, color: C.background1 } },
  { text: "intensive teaching by trained teachers, not one-off events or mandates on paper.", options: { color: C.background1, breakLine: true } },
  { text: "The fix is cheap and doable now: ", options: { bold: true, color: C.background1 } },
  { text: "Cabinet-level changes, no new law, and the policy window is open until 2027.", options: { color: C.background1 } },
], { x: 0.95, y: 1.7, w: 5.9, h: 4.5, fontSize: 17, margin: 0, valign: "top", paraSpaceAfter: 14, isTextBox: true, objectName: "Messages" });
const agenda = [["(i)", "The issue and why it matters"], ["(ii)", "What research and data say"], ["(iii)", "Our strategy: steps and partners"], ["(iv)", "Expected results"], ["(v)", "Regulatory changes"]];
agenda.forEach((a, i) => {
  const y = 1.5 + i * 0.98;
  card(s, 7.5, y, 5.23, 0.82);
  s.addText(a[0], { x: 7.7, y, w: 0.9, h: 0.82, fontFace: "Cambria", fontSize: 20, bold: true, color: C.accent1, margin: 0, valign: "middle", isTextBox: true, objectName: "Agenda number" });
  s.addText(a[1], { x: 8.6, y, w: 4.0, h: 0.82, fontSize: 17, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Agenda item" });
});
s.addNotes("Give the audience the three messages up front, then walk through the five questions in order.");

// ======================= (i) divider
divider("(i) The issue", "(i)", "What issue are we solving, and why is it important?", "Latvians are among the least financially literate in the EU, the youngest are the weakest, and school is where they learn least about money.");

// Slide: EU ranking (Eurobarometer F3)
s = slide("CONTENT", "(i) The issue");
s.addText("Latvia is joint last in the EU on financial literacy", { placeholder: "title" });
img(s, "eb_overall_score_by_country.png", 0.6, 1.45, 9.3, 4.95, "Eurobarometer 525 figure F3: overall financial literacy score by country; Latvia and Portugal have the lowest high-score share (11%)");
callouts(s, 10.2, 1.45, 2.53, [
  { big: "11%", text: "of Latvians have high financial literacy (far right): joint last" },
  { big: "18%", text: "EU average; Estonia 23%, Lithuania 16%", color: C.accent1 },
  { big: "46%", text: "reach the OECD minimum score (OECD 58%)" },
]);
src(s, "Chart: European Commission, Flash Eurobarometer 525 (2023), figure F3, p. 17 (dark blue = high score). OECD/INFE 2023 via Latvijas Banka.");
s.addNotes("Point to the far right of the chart: LV, 11% with a high score, joint last with Portugal.");

// Slide: Emergency savings (Eurobarometer Q8)
s = slide("CONTENT", "(i) The issue");
s.addText("Latvians have the thinnest financial buffers in the EU", { placeholder: "title" });
img(s, "eb_emergency_savings_by_country.png", 0.6, 1.45, 9.3, 4.95, "Eurobarometer 525 Q8: how long people could cover living expenses after losing income; Latvia has the highest share with no emergency savings");
callouts(s, 10.2, 1.45, 2.53, [
  { big: "26%", text: "have no emergency savings: the highest in the EU (EU 16%)" },
  { big: "19%", text: "could live 6+ months without income: the lowest in the EU" },
  { big: "26th", text: "of 27 on financially savvy behaviour", color: C.accent1 },
]);
src(s, "Chart: European Commission, Flash Eurobarometer 525 (2023), Q8, p. 26. Latvia is the last column (LV): dark blue = 6+ months, purple = no emergency savings.");
s.addNotes("The gap is behaviour: planning and buffers. Latvia is last on the dark-blue bar and highest on the purple bar.");

// Slide: youngest weakest (LB p.8)
s = slide("CONTENT", "(i) The issue");
s.addText("The youngest adults are the least financially literate", { placeholder: "title" });
img(s, "lb2022_index_by_age.png", 0.6, 1.45, 8.6, 4.95, "Latvijas Banka 2022: financial literacy index by gender and age; ages 18-19 score 8.0 of 20, all adults 12.2");
callouts(s, 9.5, 1.45, 3.23, [
  { big: "8.0 / 20", text: "ages 18–19 (\"18–19 gadu\"); all adults 12.2 (\"Kopā\")" },
  { big: "11.0", text: "ages 20–29: the pattern holds in a larger group", color: C.accent1 },
  { big: "40%", text: "of 18–19-year-olds can calculate simple interest (all adults 58%)" },
]);
src(s, "Chart: Latvijas Banka, Latvijas iedzīvotāju finanšu pratības aptauja 2022 (n = 1,007, OECD/INFE method), p. 8. \"Vecums\" = age; the 18–19 group is small (~30).");
s.addNotes("Read the age block: 8.0 for 18-19-year-olds, then it rises to 13.1 at 40-49.");

// Slide: knowledge falling (LB p.52 + p.9)
s = slide("CONTENT", "(i) The issue");
s.addText("Financial knowledge has fallen since 2015", { placeholder: "title" });
img(s, "lb2022_knowledge_score.png", 0.6, 1.45, 9.1, 1.85, "Latvijas Banka 2022: knowledge sub-index 5.1 (2015) to 3.9 (2022) out of 7", "Financial knowledge score, out of 7");
img(s, "lb2022_compound_interest.png", 0.6, 3.48, 9.1, 2.92, "Latvijas Banka 2022: compound interest question, correct answers (red) 48% in 2015, 46% in 2019, 26% in 2022", "Compound interest question: red = correct answer");
callouts(s, 10.0, 1.45, 2.73, [
  { big: "5.1 → 3.9", text: "knowledge score out of 7, 2015 → 2022" },
  { big: "72 → 58%", text: "simple interest correct (appendix A1)" },
  { big: "48 → 26%", text: "compound interest correct (bottom chart, red)" },
]);
src(s, "Charts: Latvijas Banka, financial literacy survey 2022, pp. 9 and 52. The headline index stayed flat (63% → 61%) only because attitudes improved.");
s.addNotes("Top: the knowledge score fell from 5.1 to 3.9. Bottom: red bars = correct answers on compound interest, almost halved.");

// Slide: 9th-grade index
s = slide("CONTENT", "(i) The issue");
s.addText("15-year-olds score no better than adults", { placeholder: "title" });
img(s, "lb9_index.png", 0.6, 1.45, 8.8, 4.95, "Latvijas Banka 9th-grade assessment 2025: financial literacy index 12.33 of 20 (61.7%)", "Financial literacy index of 9th graders: distribution and levels");
callouts(s, 9.7, 1.45, 3.03, [
  { big: "12.33 / 20", text: "9th-grade index (61.7%), the same as adults (61%)", color: C.accent1 },
  { big: "57%", text: "can calculate simple interest; adults 58%" },
  { big: "29%", text: "score high on financial behaviour and skills" },
]);
src(s, "Chart: Latvijas Banka / RAIT, 9th-grade financial literacy assessment, Feb–Apr 2025 (n = 1,159 pupils, 75 schools), slide 7.");
s.addNotes("Nine years of compulsory schooling, and 15-year-olds score at the adult level, which is itself near the bottom of the EU.");

// Slide: sources of information (9th grade)
s = slide("CONTENT", "(i) The issue");
s.addText("School is where teenagers learn least about money", { placeholder: "title" });
img(s, "lb9_info_sources.png", 0.6, 1.45, 8.8, 4.95, "Latvijas Banka 9th-grade assessment 2025: sources of information about money; school and clubs lowest", "How often do you get information about money from... (%)");
callouts(s, 9.7, 1.45, 3.03, [
  { big: "36%", text: "never learn about money at school (bottom row); 31% rarely" },
  { big: "9%", text: "learn at school always or often; internet 46%, family 63%", color: C.accent1 },
  { big: "0", text: "minimum finance lessons: one topic inside social studies" },
]);
src(s, "Chart: Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 15 (bottom row = \"skolā, pulciņos\", at school or in clubs). LSM 18.02.2026: teaching is \"superficial\".");
s.addNotes("Bottom row: school. Not teachers' fault: no guaranteed hours, and the central bank found teachers unsure about interest.");

// Slide: teens and fraud (9th grade)
s = slide("CONTENT", "(i) The issue");
s.addText("Teenagers are already targets of fraud", { placeholder: "title" });
img(s, "lb9_risky_situations.png", 0.6, 1.45, 8.8, 4.95, "Latvijas Banka 9th-grade assessment 2025: experience with risky or fraudulent situations", "Has this ever happened to you? (%; blue = yes)");
callouts(s, 9.7, 1.45, 3.03, [
  { big: "48%", text: "offered \"easy money\" online by strangers (top row)" },
  { big: "18%", text: "asked to pass money through their account: the money-mule pattern" },
  { big: "16%", text: "already scammed when buying online" },
]);
src(s, "Chart: Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 25 (blue = yes). Police detained money mules including minors, recruited via Telegram (2025–2026).");
s.addNotes("Blue bars are 'yes'. Almost one in five 15-year-olds has been asked to act as a money mule, which can mean a criminal record.");

// Slide: why now (1) fraud statistics, native charts
const K = THEME.colors;
function chartCard(s, x, y, w, h, label, type, data, opts) {
  card(s, x, y, w, h, "FFFFFF", "Chart card");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { type: "none" }, line: { color: "D5DDD8", width: 0.75 }, rectRadius: 0.12, objectName: "Chart border" });
  s.addText(label, { x: x + 0.2, y: y + 0.1, w: w - 0.4, h: 0.5, fontSize: 13, bold: true, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Chart label" });
  s.addChart(type, data, Object.assign({ x: x + 0.1, y: y + 0.62, w: w - 0.2, h: h - 0.72, showLegend: false, showValue: true,
    dataLabelFontSize: 11, dataLabelColor: K.dk1, catAxisLabelFontSize: 10.5, catAxisLabelColor: K.dk1, valAxisHidden: true,
    valGridLine: { style: "none" }, catAxisLineShow: false, barGapWidthPct: 45, objectName: "Native chart" }, opts));
}
s = slide("CONTENT", "(i) The issue");
s.addText("Why now: fraud is rising fast, and teenagers are already targets", { placeholder: "title" });
chartCard(s, 0.6, 1.45, 3.9, 3.4, "Online fraud losses reported to police (€m)", pres.charts.BAR,
  [{ name: "Losses", labels: ["2023", "2024", "2025"], values: [8.5, 16.1, 23.7] }],
  { barDir: "col", chartColors: [K.accent4, K.accent4, K.accent5], dataLabelFormatCode: '"€"0.0"m"', catAxisLabelFontSize: 12 });
chartCard(s, 4.72, 1.45, 3.9, 3.4, "Adults who became victims, by type (%)", pres.charts.BAR,
  [{ name: "Victims", labels: ["Friend / romance scam", "Gave PIN or Smart-ID", "Unauthorised payment", "Investment fraud", "Phishing", "Purchase scam"], values: [4.5, 5, 6, 6.5, 8, 15] }],
  { barDir: "bar", chartColors: [K.accent3, K.accent3, K.accent3, K.accent3, K.accent3, K.accent1], dataLabelFormatCode: '0.#"%"', catAxisLabelFontSize: 10 });
chartCard(s, 8.83, 1.45, 3.9, 3.4, "9th graders who have... (%)", pres.charts.BAR,
  [{ name: "Yes", labels: ["Given passwords or PIN", "Opened strangers' files", "Been scammed online", "Been asked to be a money mule", "Been offered \"easy money\""], values: [6, 11, 16, 18, 48] }],
  { barDir: "bar", chartColors: [K.accent3, K.accent3, K.accent3, K.accent5, K.accent5], dataLabelFormatCode: '0"%"', catAxisLabelFontSize: 10 });
const t5 = [["74% / 27%", "of adults were targeted / became victims in two years", C.accent2],
  ["×2", "police-recorded fraud cases: about 4,000 → 8,700 (2024 → 2025)", C.accent2],
  ["37%", "of those who lost money told no one; 57% think reporting changes nothing", C.accent2],
  ["29% vs 70%", "reach the minimum digital financial literacy vs rate themselves as good", C.accent2]];
card(s, 0.6, 5.05, 12.13, 1.42, C.text2, "Stats band");
t5.forEach((t, i) => {
  const x = 0.8 + i * 3.0;
  s.addText(t[0], { x, y: 5.13, w: 2.8, h: 0.6, fontFace: "Cambria", fontSize: 24, bold: true, color: t[2], margin: 0, valign: "middle", isTextBox: true, objectName: "Band value" });
  s.addText(t[1], { x, y: 5.73, w: 2.75, h: 0.68, fontSize: 11.5, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Band text" });
});
src(s, "Sources: State Police data and OECD/Kantar survey of 1,400 adults (Jul–Sep 2025), in OECD (2026), Improving Adults' Resilience Against Financial Scams and Frauds in Latvia, pp. 22–36; Latvijas Banka / RAIT 9th-grade assessment 2025 (n = 1,159).");
s.addNotes("Losses almost tripled in two years. The most common fraud is the simplest: paying for goods that never arrive. And it starts early: half of 15-year-olds have been offered easy money online, almost one in five asked to be a money mule. If asked: the OECD found 35-64-year-olds more likely to be victims than 18-24-year-olds, which is why prevention has to happen before adulthood.");

// Slide: why now (2) the policy window
s = slide("CONTENT", "(i) The issue");
s.addText("Why now: the policy window is open, and it closes in 2027", { placeholder: "title" });
// why the window is open: four drivers
const drivers = [["Cycles end", "Strategy and education guidelines both expire in 2027"],
  ["New evidence", "OECD plan for Latvia (Nov 2026); PISA 2025 worst ever"],
  ["Political will", "Saeima subcommittee and IZM course redesign in progress"],
  ["Money is set", "2028–31 budget and 2028–34 EU funds decided in 2027"]];
drivers.forEach((d, i) => {
  const x = 0.6 + i * 3.06;
  card(s, x, 1.36, 2.95, 0.66, i === 2 ? C.text2 : C.background2, "Driver card");
  num(s, x + 0.1, 1.46, i + 1, i === 2 ? K.accent2 : K.accent1, 0.46);
  s.addText([{ text: d[0], options: { bold: true, breakLine: true, color: i === 2 ? K.accent2 : K.dk1 } }, { text: d[1], options: { fontSize: 9.5 } }],
    { x: x + 0.66, y: 1.38, w: 2.22, h: 0.62, fontSize: 11.5, color: i === 2 ? "FFFFFF" : K.dk1, margin: 0, valign: "middle", isTextBox: true, objectName: "Driver text" });
});
const X0 = 4.05, YR = 1.43, xOf = (yr) => X0 + (yr - 2025) * YR; // axis 2025.0 to 2031.0
const TOP = 2.1, LH = 0.42, NL = 8, BOT = TOP + 0.3 + NL * LH;
s.addShape(pres.shapes.RECTANGLE, { x: xOf(2027), y: TOP, w: YR, h: BOT - TOP, fill: { color: K.accent2, transparency: 78 }, line: { type: "none" }, objectName: "Window band" });
for (let yr = 2025; yr <= 2030; yr++) {
  s.addText(yr === 2027 ? "2027: THE WINDOW" : String(yr), { x: xOf(yr), y: TOP, w: YR, h: 0.28, fontSize: yr === 2027 ? 10.5 : 11.5, bold: true, color: yr === 2027 ? "8A5A12" : K.dk1, align: "center", margin: 0, isTextBox: true, objectName: "Year" });
  s.addShape(pres.shapes.LINE, { x: xOf(yr), y: TOP + 0.3, w: 0, h: BOT - TOP - 0.3, line: { color: "D5DDD8", width: 0.75, dashType: "dash" }, objectName: "Year line" });
}
s.addShape(pres.shapes.LINE, { x: xOf(2026.9), y: TOP + 0.3, w: 0, h: BOT - TOP - 0.3, line: { color: K.accent5, width: 2 }, objectName: "Now line" });
s.addText("NOW", { x: xOf(2026.9) - 0.55, y: TOP, w: 0.5, h: 0.28, fontSize: 10, bold: true, color: K.accent5, align: "right", margin: 0, isTextBox: true, objectName: "Now label" });
const DEV = "dev";
const lanes = [
  { name: "National Financial Literacy Strategy", owner: "Latvijas Banka + 28 partners", bars: [[2025, 2028, "2021–2027: ends", K.accent4], [2028, 2031, "2028+ strategy: drafted in 2027", K.accent1]] },
  { name: "Education Development Guidelines", owner: "IZM; steer budget and EU funds", bars: [[2025, 2028, "2021–2027: ends", K.accent4], [2028, 2031, "2028+: budget 2028–31, EU funds 2028–34", K.accent1]] },
  { name: "Social-studies course", owner: "IZM / VIAA · in progress", dev: true, bars: [[2025.7, 2026.9, "LB: restructure topics", K.accent3], [2026.9, 2028.6, "Course being rebuilt", DEV]] },
  { name: "Saeima financial literacy subcommittee", owner: "Saeima · in progress", dev: true, bars: [[2025.7, 2026.5, "Saeima conference (2025)", K.accent3], [2026.5, 2028, "Working on new regulation", DEV]] },
  { name: "OECD action plan for Latvia", owner: "Latvijas Banka coordinates", bars: [[2026.88, 2028, "Published 20.11.2026", K.accent6], [2028, 2031, "Folded into the 2028+ strategy", K.accent1]] },
  { name: "Fraud-prevention plan", owner: "Interior Ministry", bars: [[2026, 2027.6, "Drafting: no school measure yet", K.accent5]] },
  { name: "EU push", owner: "Commission, Parliament", bars: [[2025.3, 2026.85, "EU strategy; EP vote 502–46", K.accent6], [2027, 2028, "EU review", K.accent3]] },
  { name: "Test and measure", owner: "IZM, Latvijas Banka", bars: [[2026.0, 2027, "PISA 2025: worst ever", K.accent5], [2027, 2029.3, "Decide on PISA 2029 financial literacy", K.accent3]] },
];
lanes.forEach((l, i) => {
  const y = TOP + 0.32 + i * LH;
  if (l.dev) s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: y - 0.01, w: 12.13, h: LH - 0.02, fill: { color: K.accent2, transparency: 88 }, line: { type: "none" }, objectName: "Dev lane" });
  s.addText([{ text: l.name, options: { bold: true, breakLine: true } }, { text: l.owner, options: { fontSize: 9, color: l.dev ? "8A5A12" : K.accent6, bold: !!l.dev } }],
    { x: 0.68, y, w: 3.3, h: LH - 0.04, fontSize: 10.5, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Lane label" });
  l.bars.forEach((b) => {
    const isDev = b[3] === DEV, dark = [K.accent1, K.accent5, K.accent6].includes(b[3]);
    const bx = xOf(b[0]) + 0.03, bw = xOf(b[1]) - xOf(b[0]) - 0.06;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: y + 0.04, w: bw, h: LH - 0.12, fill: { color: isDev ? "FFFFFF" : b[3] },
      line: isDev ? { color: K.accent2, width: 1.75, dashType: "dash" } : { type: "none" }, rectRadius: 0.07, objectName: isDev ? "Dev bar" : "Plan bar" });
    s.addText(b[2], { x: bx + 0.07, y: y + 0.04, w: bw - 0.14, h: LH - 0.12, fontSize: 9.5, bold: true, color: isDev ? "8A5A12" : (dark ? "FFFFFF" : K.dk1), margin: 0, valign: "middle", fit: "shrink", isTextBox: true, objectName: "Bar text" });
  });
});
// legend
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.55, y: BOT + 0.06, w: 0.3, h: 0.16, fill: { color: "FFFFFF" }, line: { color: K.accent2, width: 1.25, dashType: "dash" }, rectRadius: 0.03, objectName: "Legend swatch" });
s.addText("= in progress now", { x: 10.9, y: BOT + 0.02, w: 1.85, h: 0.24, fontSize: 9, color: K.dk1, margin: 0, valign: "middle", isTextBox: true, objectName: "Legend" });
card(s, 0.6, BOT + 0.33, 12.13, 0.44, C.text2, "Message band");
s.addText([{ text: "Everything that decides school financial education is open at once. ", options: { color: C.background1 } },
  { text: "Miss 2027, and the next chance is around 2034.", options: { bold: true, color: C.accent2 } }],
  { x: 0.8, y: BOT + 0.33, w: 11.8, h: 0.44, fontSize: 14, margin: 0, valign: "middle", isTextBox: true, objectName: "Message" });
src(s, "Sources: Latvijas Banka (2025); Cabinet Order No. 436; OECD (2026), ch. 4.6; Interior Ministry; Saeima; IZM; COM(2025) 681; EP 30.04.2026; PISA 2025. \"2034\": seven-year cycle.");
s.addNotes("Start with the four reasons along the top. Then the timeline: the strategy and the education guidelines both end in 2027 and their successors are written next year. Two things are not official yet but are moving: the Ministry of Education is considering rebuilding the social-studies course, and a Saeima subcommittee on financial literacy is working on new regulation. If financial literacy is built into the new course and the new regulation now, it is there for the next seven years.");

// ======================= (ii) divider
divider("(ii) Research and data", "(ii)", "How do research and data support our intention?", "School financial education works when it is intensive, taught by trained teachers and linked to real decisions. A mandate on paper is not enough.");

// Slide: research evidence
s = slide("CONTENT", "(ii) Research and data");
s.addText("School financial education works when it is intensive", { placeholder: "title" });
s.addTable([
  [{ text: "Study", options: hdr }, { text: "Design", options: hdr }, { text: "Effect on knowledge", options: hdr }],
  ["Kaiser & Menkhoff (2020)", "Meta-analysis, 37 school studies", "+0.33 SD (RCTs +0.15)"],
  ["Kaiser et al. (2022), JFE", "Meta-analysis, 76 RCTs, 160,000+ people", "≈ +0.2 SD (behaviour ≈ +0.1)"],
  ["Bruhn et al. (2016), AEJ", "RCT, Brazil, 892 schools", "+0.25 SD"],
  ["Frisancho (2023), Econ. Journal", "RCT, Peru, 300 schools", "+0.14 SD; teachers +0.32; ~20% fewer arrears"],
  ["Cannistrà et al. (2024), JCE", "RCT, 4 countries, online game", "+0.31 SD"],
], tbl({ x: 0.6, y: 1.5, w: 6.8, colW: [2.3, 2.6, 1.9], rowH: [0.45, 0.85, 0.85, 0.85, 0.85, 0.85] }));
const lessons = [["Intensity matters", "dedicated lessons beat scattered mentions (Kaiser & Menkhoff 2017, 2020)"],
  ["Teachers matter", "trained teachers are the key ingredient (Compen et al. 2019)"],
  ["Timing matters", "link lessons to real decisions; scam lessons fade without repetition"],
  ["A mandate alone fails", "US mandates without real teaching had no effect (Cole et al. 2016): Latvia's risk today"]];
lessons.forEach((l, i) => {
  const y = 1.55 + i * 1.2;
  num(s, 7.75, y + 0.12, i + 1, i === 3 ? C.accent5 : C.accent1);
  s.addText([{ text: l[0], options: { bold: true, breakLine: true } }, { text: l[1] }], { x: 8.45, y, w: 4.28, h: 1.1, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Lesson" });
});
src(s, "Also: Urban et al. (2020) Economics of Education Review; Cole et al. (2016) Journal of Human Resources. Behaviour effects are smaller (about +0.07 SD).");
s.addNotes("Knowledge effects are solid; behaviour effects are smaller and slower, so we stay realistic.");

// Slide: Peru case
s = slide("CONTENT", "(ii) Research and data");
s.addText("Peru already did what we propose, and it worked", { placeholder: "title" });
card(s, 0.6, 1.45, 4.15, 3.55);
s.addText([
  { text: "What Peru did (2016)", options: { fontFace: "Cambria", bold: true, fontSize: 17, color: C.accent1, breakLine: true } },
  { text: "Finance lessons inside the existing History, Geography and Economics course", options: { bullet: true, breakLine: true } },
  { text: "Ready-made workbooks and teacher guides", options: { bullet: true, breakLine: true } },
  { text: "16–32 lesson hours per grade; 20 hours of teacher training", options: { bullet: true, breakLine: true } },
  { text: "Ministry + regulator + banks + insurers", options: { bullet: true, breakLine: true } },
  { text: "Certificate counted toward teacher evaluation", options: { bullet: true, breakLine: true } },
  { text: "Randomised trial: 300 public schools", options: { bullet: true } },
], { x: 0.85, y: 1.6, w: 3.7, h: 3.3, fontSize: 13, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Peru design" });
chartCard(s, 4.95, 1.45, 4.0, 3.55, "Gain in financial literacy (SD)", pres.charts.BAR,
  [{ name: "Gain", labels: ["Students", "Students, teacher trained", "Teachers", "Teachers who taught"], values: [0.16, 0.20, 0.32, 0.46] }],
  { barDir: "col", chartColors: [K.accent3, K.accent3, K.accent1, K.accent2], dataLabelFormatCode: '"+"0.00', catAxisLabelFontSize: 10.5 });
callouts(s, 9.15, 1.45, 3.58, [
  { big: "−15 pp", text: "chance of being in debt 3 years later (9th graders taught twice); fewer late payments for poorer students and girls" },
  { big: "+14 pp", text: "teachers saving formally; late payments −40% after two years", color: C.accent1 },
  { big: "$4.8", text: "per student, plus $56k once for workbooks; no harm to other subjects", color: C.accent1 },
], 0.15);
card(s, 0.6, 5.15, 8.35, 1.3, C.text2, "Lesson band");
s.addText([
  { text: "The warning: ", options: { bold: true, color: C.accent2 } },
  { text: "only 43% of teachers did all the training and a third taught none of the lessons, because it was not a required part of the course. When funding stopped in 2017, so did training. The author's conclusion: make it a mandatory part of the course. That is our ask.", options: { color: C.background1 } },
], { x: 0.85, y: 5.2, w: 7.9, h: 1.2, fontSize: 13.5, margin: 0, valign: "middle", isTextBox: true, objectName: "Lesson text" });
src(s, "Source: Frisancho (2023), Economic Journal 133(651); author manuscript (2021), Tables 1, 8–11, 13, A.2, A.11, A.18 and section 4.3. \"Teacher trained\" and \"who taught\" are treatment-on-the-treated estimates.");
s.addNotes("Peru is the closest real-world version of our proposal: same idea, inside an existing social-science course. Students gained, teachers gained twice as much, and borrowers had a fifth less bad debt years later. The catch: only 43% did all the training and a third never taught it, because it was voluntary. The author herself concludes it should be a mandatory part of the course. Latvia today has the same risk.");

// Slide: Latvia activity vs results
s = slide("CONTENT", "(ii) Research and data");
s.addText("Latvia has lots of activity, but not results", { placeholder: "title" });
const act = [["230+", "activities by strategy partners since 2021", C.accent1], ["78%", "of schools reached by Money Day", C.accent1], ["~9%", "of activities target teachers, the group that matters most", C.accent5]];
act.forEach((a, i) => {
  const x = 0.6 + i * 4.1;
  card(s, x, 1.5, 3.93, 2.2);
  s.addText(a[0], { x: x + 0.3, y: 1.65, w: 3.3, h: 0.85, fontFace: "Cambria", fontSize: 40, bold: true, color: a[2], margin: 0, valign: "middle", isTextBox: true, objectName: "Activity value" });
  s.addText(a[1], { x: x + 0.3, y: 2.55, w: 3.3, h: 1.0, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Activity text" });
});
card(s, 0.6, 3.95, 12.13, 2.45, C.text2, "Benchmark card");
s.addText([
  { text: "Yet knowledge fell (5.1 → 3.9). ", options: { bold: true, color: C.accent2 } },
  { text: "The strategy counts events, not learning.", options: { color: C.background1, breakLine: true } },
  { text: "Estonia: ", options: { bold: true, color: C.accent2 } },
  { text: "PISA 547, best in the world; finance built into a 6-month teacher programme.", options: { color: C.background1, breakLine: true } },
  { text: "England: ", options: { bold: true, color: C.accent2 } },
  { text: "compulsory since 2014, yet only 38% of young people recall it; being strengthened from 2025.", options: { color: C.background1, breakLine: true } },
  { text: "Lesson: ", options: { bold: true, color: C.accent2 } },
  { text: "more events won't fix it; intensive teaching by trained teachers will.", options: { color: C.background1 } },
], { x: 0.95, y: 4.1, w: 11.5, h: 2.2, fontSize: 16, margin: 0, valign: "middle", paraSpaceAfter: 6, isTextBox: true, objectName: "Benchmark text" });
src(s, "Sources: Latvijas Banka annual reports and strategy evaluation 2025; OECD PISA 2018; Estonian Ministry of Finance; APPG on Financial Education / Young Enterprise (UK).");

// Slide: international models
s = slide("CONTENT", "(ii) Research and data");
s.addText("What other countries do", { placeholder: "title" });
s.addTable([
  [{ text: "Country", options: hdr }, { text: "Approach", options: hdr }, { text: "Lesson for Latvia", options: hdr }],
  ["United States", "30 states require a standalone personal finance course (39 incl. integrated)", "Dedicated courses improved credit scores; paper mandates did not"],
  ["England", "Statutory since 2014 in citizenship and maths; strengthened from 2025", "Only 38% recall it: a mandate needs delivery"],
  ["Estonia", "Money Smart Estonia 2021–2030; finance in a 6-month teacher programme", "PISA 547, best in the world"],
  ["Czechia", "Embedded in maths and civics; national strategy", "PISA 2022: 507 (OECD 498), 5th of 20"],
  ["Slovakia", "National Standard of Financial Literacy since 2008", "Explicit outcomes across subjects"],
  ["Portugal", "National plan 2026–2030; framework from pre-school; 'Todos Contam' school competition", "Framework plus recurring competition"],
], tbl({ x: 0.6, y: 1.45, w: 12.13, colW: [2.0, 5.6, 4.53], rowH: 0.68, fontSize: 14 }));
src(s, "Sources: NGPF 2026; CEE 2026; APPG/Young Enterprise; Estonian Ministry of Finance; OECD PISA; Czech National Bank; Cedefop; Todos Contam.");

// Slide: scam education evidence
s = slide("CONTENT", "(ii) Research and data");
s.addText("Can education protect against scams? Yes, if it is repeated", { placeholder: "title" });
s.addTable([
  [{ text: "Study", options: hdr }, { text: "Design", options: hdr }, { text: "Result", options: hdr }],
  ["Burke et al. (2021)", "RCT, US adults; short online module on investment fraud", "Lower susceptibility to fraud; effect decays over time"],
  ["Prebunking videos (US, 2021)", "Randomised experiment", "Willingness to invest in scams −44%; fades over 6 months, a booster restores it"],
  ["BIT Canada and OSC (2025)", "RCT, AI-enabled investment scams", "Works immediately; not significant after 10 days"],
  ["ShieldUp! (2025)", "RCT, 3,000 participants; scam-spotting game", "Significantly better scam detection than awareness-only"],
], tbl({ x: 0.6, y: 1.45, w: 12.13, colW: [3.0, 4.6, 4.53], rowH: [0.45, 0.9, 0.9, 0.9, 0.9], fontSize: 14 }));
card(s, 0.6, 5.65, 12.13, 0.8, C.background2, "Lesson card");
s.addText([{ text: "Lesson: ", options: { bold: true, color: C.accent1 } }, { text: "one campaign is not enough. Scam resilience needs active practice, repetition and timing close to the risk." }],
  { x: 0.9, y: 5.65, w: 11.6, h: 0.8, fontSize: 16, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Lesson" });
src(s, "Sources: Burke, Kieffer, Mottola & Perez-Arce (2021), GFLEC; Ontario Securities Commission (2025); ShieldUp! (arXiv 2503.12341).");

// ======================= (iii) divider
divider("(iii) Strategy", "(iii)", "What is our strategy?", "Five steps from paper to practice, delivered with policymakers, the central bank, banks, schools and the media.");

// Slide: the package (six elements)
s = slide("CONTENT", "(iii) Strategy");
s.addText("Our strategy: a six-part package from paper to practice", { placeholder: "title" });
const steps = [["Module", "about 10–12 ready-to-teach lessons across grades 7–9, more in secondary; each tied to a real decision"],
  ["Training that counts", "Latvijas Banka seminars run via VIAA or a university, so they count in teachers' 36 hours"],
  ["Required training", "12 hours every 3 years for social-studies teachers, within the 36 hours (swimming precedent, 2025)"],
  ["Outcomes and time", "add fraud, money mules and compound interest to the standard; minimum lessons in the sample programme"],
  ["Maths link", "interest, percentages and loans in maths lessons: the skills behind financial decisions"],
  ["Measure and fund", "9th-grade survey every 2 years; PISA 2029; a budget line in the 2028+ strategy"]];
steps.forEach((st, i) => {
  const x = 0.6 + i * 2.04;
  card(s, x, 1.5, 1.9, 4.9, i === 2 ? C.text2 : C.background2);
  num(s, x + 0.2, 1.72, i + 1, i === 2 ? C.accent2 : (i === 5 ? C.accent2 : C.accent1));
  s.addText(st[0], { x: x + 0.2, y: 2.45, w: 1.55, h: 0.85, fontFace: "Cambria", fontSize: 16, bold: true, color: i === 2 ? C.accent2 : C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "Step title" });
  s.addText(st[1], { x: x + 0.2, y: 3.35, w: 1.55, h: 2.9, fontSize: 12.5, color: i === 2 ? C.background1 : C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Step text" });
});
src(s, "What is taught (1, 4, 5), who can teach it (2, 3) and proof it works (6). Legal basis: Cabinet Regulations No. 569 (point 20.1 precedent), 747 and 416.");
s.addNotes("Today teachers choose their own training freely; the only topic required of every teacher is child-rights protection (6 hours). Since 2025, PE teachers who teach swimming must take a 24-hour course. We ask for the same for social-studies teachers and money: 12 hours every 3 years, inside the 36 hours they already owe. Social studies in grades 7-9 has only about one lesson a week, so the module is spread across grades 7-9 and backed by maths.");

// Slide: module content
s = slide("CONTENT", "(iii) Strategy");
s.addText("The module: 12 lessons built around real decisions", { placeholder: "title" });
const lessonsM = [["Budget and first income", "My first salary or pocket money"], ["Interest and compounding", "Saving €20 a month from age 15"], ["Inflation", "Why prices change"], ["Cards and online shopping", "Safe online purchases"],
  ["Scams and phishing", "Spot the fake message"], ["Money mules and the law", "\"Easy money\" offers on social media"], ["Credit and online loans", "Quick loans vs a bank loan"], ["Risk and diversification", "Shares vs a savings account"],
  ["Crypto, finfluencers, gambling odds", "Is Bitcoin legal tender? Who pays the influencer?"], ["Taxes, VAT and the pension pillar", "What happens to my first salary"], ["Project with parents", "Family budget or savings plan"], ["Assessed test", "Knowledge check, as in the 9th-grade survey"]];
lessonsM.forEach((l, i) => {
  const col = Math.floor(i / 6), row = i % 6;
  const x = 0.6 + col * 6.13, y = 1.45 + row * 0.83;
  card(s, x, y, 6.0, 0.72, [4, 5, 8].includes(i) ? "F6EDDB" : C.background2);
  s.addText(String(i + 1), { x: x + 0.15, y, w: 0.5, h: 0.72, fontFace: "Cambria", fontSize: 18, bold: true, color: C.accent1, margin: 0, valign: "middle", isTextBox: true, objectName: "Lesson number" });
  s.addText([{ text: l[0], options: { bold: true, breakLine: true } }, { text: l[1], options: { color: C.accent6 } }], { x: x + 0.7, y: y + 0.03, w: 5.2, h: 0.66, fontSize: 13, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Lesson text" });
});
src(s, "Aligned with the EU/OECD financial competence framework for children and youth. Highlighted lessons respond directly to the fraud and money-mule data.");

// Slide: stakeholders
s = slide("CONTENT", "(iii) Strategy");
s.addText("Who we work with, and what we do", { placeholder: "title" });
const quad = [["Policymakers", "IZM and VIAA; Saeima Education Committee; Interior Ministry fraud plan", "we send an evidence brief and draft amendments, and request a Saeima hearing"],
  ["Central bank and industry", "Latvijas Banka's 28-partner working group; Finance Latvia and banks", "we join the working group; we ask banks to co-fund training and send volunteers (EU rules make them liable for weak fraud prevention)"],
  ["Schools and families", "Social-studies teachers; 10 pilot schools; parents", "we recruit pilot schools, run the Olympiad and design the family tasks"],
  ["Media", "LSM, Delfi, TVNet; Financial Literacy Week (March); teen social media", "we publish op-eds with our data and make scam-awareness content with student creators"]];
quad.forEach((q, i) => {
  const x = 0.6 + (i % 2) * 6.13, y = 1.5 + Math.floor(i / 2) * 2.5;
  card(s, x, y, 6.0, 2.35);
  s.addText(q[0], { x: x + 0.3, y: y + 0.18, w: 5.4, h: 0.45, fontFace: "Cambria", fontSize: 18, bold: true, color: C.accent1, margin: 0, isTextBox: true, objectName: "Group" });
  s.addText([{ text: "Who: ", options: { bold: true } }, { text: q[1], options: { breakLine: true } }, { text: "What we do: ", options: { bold: true, color: C.accent1 } }, { text: q[2] }],
    { x: x + 0.3, y: y + 0.7, w: 5.4, h: 1.55, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Group text" });
});
src(s, "Two tracks: inside (working group, VIAA, comments on draft rules) and outside (media, pilot results). Never blame teachers: it is a system design gap.");

// Slide: roadmap
s = slide("CONTENT", "(iii) Strategy");
s.addText("Roadmap 2026–2030", { placeholder: "title" });
const road = [["Dec 2026 – Feb 2027", "Evidence brief; meetings with Latvijas Banka, IZM, VIAA and Finance Latvia"],
  ["March 2027", "Launch at Financial Literacy Week: media campaign, Olympiad, op-eds"],
  ["Spring 2027", "Pilot in 10 schools plus 10 comparison schools; test before and after"],
  ["Autumn 2027", "Proposals into the 2028+ strategy, the Education Development Guidelines and the regulations"],
  ["2028 – 2030", "Regulations adopted; rollout by region; PISA 2029"]];
s.addShape(pres.shapes.LINE, { x: 0.9, y: 3.0, w: 11.5, h: 0, line: { color: THEME.colors.accent3, width: 2 }, objectName: "Timeline line" });
road.forEach((r, i) => {
  const x = 0.6 + i * 2.45;
  num(s, x + 0.85, 2.72, i + 1, i < 2 ? C.accent2 : C.accent1);
  s.addText(r[0], { x, y: 1.6, w: 2.3, h: 0.9, fontFace: "Cambria", fontSize: 16, bold: true, color: C.text2, align: "center", valign: "bottom", margin: 0, isTextBox: true, objectName: "Milestone date" });
  card(s, x, 3.55, 2.3, 2.85);
  s.addText(r[1], { x: x + 0.2, y: 3.7, w: 1.9, h: 2.55, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Milestone text" });
});
src(s, "Timing matches the end of the 2021–2027 strategy, the 2028 budget cycle, the EU's 2027 review and PISA 2029.");

// ======================= (iv) divider
divider("(iv) Expected results", "(iv)", "What results do we expect?", "First the rules change (by 2028), then measurable learning gains (by 2030), then behaviour over the following years.");

// Slide: expected results
s = slide("CONTENT", "(iv) Expected results");
s.addText("New rules by 2028, better skills by 2030", { placeholder: "title" });
card(s, 0.6, 1.5, 4.1, 4.9, C.text2, "Policy results card");
s.addText([
  { text: "1. Policy results (by 2028)", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent2, breakLine: true } },
  { text: "Regulations No. 747, 416 and 569 amended", options: { bullet: true, breakLine: true } },
  { text: "Financial literacy in the Education Development Guidelines 2028+", options: { bullet: true, breakLine: true } },
  { text: "School pillar with youth targets in the 2028+ national strategy", options: { bullet: true, breakLine: true } },
  { text: "Latvijas Banka's teacher seminars accredited; Latvia in PISA 2029", options: { bullet: true } },
], { x: 0.9, y: 1.7, w: 3.55, h: 4.55, fontSize: 15, color: C.background1, margin: 0, valign: "top", paraSpaceAfter: 10, isTextBox: true, objectName: "Policy results" });
s.addText("2. Learning results (by 2030)", { x: 4.95, y: 1.5, w: 7.78, h: 0.45, fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent1, margin: 0, isTextBox: true, objectName: "Learning heading" });
s.addTable([
  [{ text: "KPI", options: hdr }, { text: "Now", options: hdr }, { text: "Base", options: hdr }, { text: "Stretch", options: hdr }],
  ["9th-grade financial literacy index (of 20)", "12.3", "13.2", "14.0"],
  ["9th graders who calculate simple interest", "57%", "68%", "75%"],
  ["9th graders who never learn about money at school", "36%", "15%", "< 10%"],
  ["Know Bitcoin is not legal tender", "69%", "80%", "90%"],
  ["Social-studies teachers trained", "–", "60%", "80%"],
], tbl({ x: 4.95, y: 2.05, w: 7.78, colW: [4.48, 1.1, 1.1, 1.1], rowH: [0.45, 0.78, 0.78, 0.78, 0.78, 0.78], fontSize: 14 }));
src(s, "Baselines: Latvijas Banka 9th-grade assessment 2025. Base = +0.3 SD (research effect sizes); stretch ≈ +0.5 SD. Behaviour follows more slowly (≈ +0.07 SD).");
s.addNotes("Lead with the institutional result: the rules change, so it does not depend on one minister. Then realistic learning gains.");

// Slide: value for money
s = slide("CONTENT", "(iv) Expected results");
s.addText("Cheap compared with the problem it addresses", { placeholder: "title" });
const vm = [["€0.2–0.35m", "one-off set-up: module plus training about 1,000 teachers", C.accent1],
  ["€0.1–0.2m", "a year to deliver to about 20,000 pupils per cohort", C.accent1],
  ["€2,770", "average loss per successful fraud (H1 2026: €7.83m / 2,829 cases)", C.accent5],
  ["55–100", "prevented frauds a year would cover the full cost (about 1–2% of cases)", C.accent2]];
vm.forEach((v, i) => {
  const x = 0.6 + (i % 2) * 6.13, y = 1.5 + Math.floor(i / 2) * 2.0;
  card(s, x, y, 6.0, 1.8);
  s.addText(v[0], { x: x + 0.3, y: y + 0.15, w: 5.4, h: 0.8, fontFace: "Cambria", fontSize: 36, bold: true, color: v[2], margin: 0, valign: "middle", isTextBox: true, objectName: "Value" });
  s.addText(v[1], { x: x + 0.3, y: y + 1.0, w: 5.4, h: 0.7, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Value text" });
});
card(s, 0.6, 5.55, 12.13, 0.85, C.text2, "Benchmark card");
s.addText([{ text: "Benchmarks: ", options: { bold: true, color: C.accent2 } }, { text: "Peru delivered school financial education for US$6.6 per pupil; Brazil's programme paid for itself through lower borrowing costs within about 5 years.", options: { color: C.background1 } }],
  { x: 0.9, y: 5.55, w: 11.6, h: 0.85, fontSize: 15, margin: 0, valign: "middle", isTextBox: true, objectName: "Benchmark text" });
src(s, "Illustrative estimates; cost assumptions (teacher and pupil numbers) to be checked with IZM. Sources: Finance Latvia via LSM 21.07.2026; Frisancho (2020); Bruhn et al. (2016).");

// ======================= (v) divider
divider("(v) Regulation", "(v)", "What regulatory changes should be applied?", "Four Cabinet-level changes plus two quick wins. None needs a new law.");

// Slide: four changes
s = slide("CONTENT", "(v) Regulation");
s.addText("Four regulatory changes that make it stick", { placeholder: "title" });
s.addTable([
  [{ text: "Instrument", options: hdr }, { text: "Proposed change", options: hdr }, { text: "Owner", options: hdr }],
  ["Education standards (Cabinet Regulations No. 747 and 416) and their sample programmes", "Explicit, assessed outcomes (compound interest, inflation, risk, digital fraud, money mules); a minimum block of about 10 lessons in grades 7–9 and 10–12", "IZM, VIAA"],
  ["Teacher training rules (Cabinet Regulation No. 569: 36 hours every 3 years)", "A required financial and digital literacy course for social-studies teachers, within the 36 hours. Precedent: the 2025 swimming rule (point 20.1)", "IZM"],
  ["Education Development Guidelines 2028+ (Cabinet-approved)", "Financial literacy among target skills, with an indicator and a teacher-training budget line", "IZM, Cabinet"],
  ["National Financial Literacy Strategy 2028+ (partnership)", "School pillar with youth outcome targets; absorb the OECD action plan as its digital component (as the OECD proposes)", "Latvijas Banka"],
  [{ text: "Quick wins (now)", options: { bold: true, color: C.accent1 } }, "Latvijas Banka seminars delivered as an approved course (via VIAA or a university); join PISA 2029; tighter youth-targeted gambling ads", "IZM; Ministry of Finance"],
], tbl({ x: 0.6, y: 1.45, w: 12.13, colW: [3.9, 6.23, 2.0], rowH: [0.42, 0.95, 0.85, 0.75, 0.75, 0.75] }));
s.addText([{ text: "EU tailwind: ", options: { bold: true, color: C.accent1 } },
  { text: "the European Parliament voted 502–46 (April 2026) for financial education in school curricula; the Commission strategy (2025) asks member states to start in schools." }],
  { x: 0.6, y: 6.0, w: 12.13, h: 0.55, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "EU note" });
src(s, "Sources: likumi.lv (No. 747, 416, 569; Cabinet Order No. 436); Latvijas Vēstnesis 2024/207.5; EP resolution TA-10-2026-0156; COM(2025) 681.");
s.addNotes("None of this needs a new law: Cabinet regulations and strategy decisions, achievable in one policy cycle.");

// Slide: OECD action plan
s = slide("CONTENT", "(v) Regulation");
s.addText("The OECD's new plan for Latvia already asks for this", { placeholder: "title" });
const pil = [["I", "Raise awareness", "Central fraud website; campaigns against victim stigma and purchase scams"],
  ["II", "Target at-risk groups", "Workplaces, bank apps, social services; middle-aged and low-income adults"],
  ["III", "Practise in risky situations", "Scam and investment simulations: learning by doing"],
  ["IV", "Cross-cutting", "Coordination, one reporting point, regular data, and Action 4: digital financial literacy in primary and secondary education"]];
pil.forEach((p, i) => {
  const y = 1.45 + i * 1.24;
  card(s, 0.6, y, 6.9, 1.1, i === 3 ? C.text2 : C.background2);
  s.addText(p[0], { x: 0.75, y, w: 0.75, h: 1.1, fontFace: "Cambria", fontSize: 24, bold: true, color: i === 3 ? C.accent2 : C.accent1, margin: 0, valign: "middle", align: "center", isTextBox: true, objectName: "Pillar number" });
  s.addText([{ text: p[1], options: { bold: true, breakLine: true } }, { text: p[2] }], { x: 1.6, y: y + 0.08, w: 5.75, h: 0.94, fontSize: 13, color: i === 3 ? C.background1 : C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Pillar text" });
});
card(s, 7.78, 1.45, 4.95, 4.95);
s.addText([
  { text: "The gap we fill", options: { fontFace: "Cambria", bold: true, fontSize: 20, color: C.accent1, breakLine: true } },
  { text: "The OECD calls school-level digital financial literacy \"essential\", but Action 4 has no owner, timeline or KPI.", options: { bullet: true, breakLine: true } },
  { text: "Pillar III asks for practice; our module and games deliver it in class.", options: { bullet: true, breakLine: true } },
  { text: "The OECD proposes folding the plan into the 2028+ national strategy, where we ask for a school pillar.", options: { bullet: true, breakLine: true } },
  { text: "Owner: Latvijas Banka's Financial Literacy Working Group, which includes IZM and VIAA.", options: { bullet: true } },
], { x: 8.05, y: 1.65, w: 4.45, h: 4.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 8, isTextBox: true, objectName: "Gap text" });
src(s, "Source: OECD (2026), Improving Adults' Resilience Against Financial Scams and Frauds in Latvia, ch. 4 (sections 4.5.4, 4.6) and Annex B.");
s.addNotes("This is not a new idea from students: the OECD recommended it to Latvia on 20 November 2026. We offer to make Action 4 concrete. Be honest if asked: the OECD found 35-64-year-olds more likely to be victims than 18-24-year-olds; schools are about prevention before habits form.");

// Slide: how the change happens
s = slide("CONTENT", "(v) Regulation");
s.addText("How the change happens, and when", { placeholder: "title" });
const proc = [["Draft", "IZM and VIAA draft the amendments with our evidence and pilot data"], ["Consult", "Public consultation on the TAP portal: we and partners comment"], ["Coordinate", "Announced at the State Secretaries' meeting; ministries agree"], ["Adopt", "Cabinet adopts; applies from 1 September 2028"]];
proc.forEach((p, i) => {
  const x = 0.6 + i * 3.08;
  card(s, x, 1.5, 2.9, 2.35);
  num(s, x + 0.25, 1.7, i + 1, C.accent1);
  s.addText(p[0], { x: x + 0.95, y: 1.7, w: 1.8, h: 0.55, fontFace: "Cambria", fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: "Process step" });
  s.addText(p[1], { x: x + 0.25, y: 2.45, w: 2.45, h: 1.3, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Process text" });
});
card(s, 0.6, 4.1, 5.95, 2.3, C.text2, "Precedent card");
s.addText([{ text: "Precedent", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent2, breakLine: true } },
  { text: "Since 1 September 2025, PE teachers who teach swimming must complete 24 hours of training in swimming instruction and water safety (Regulation No. 569, point 20.1). We ask for the same for social-studies teachers in financial literacy.", options: { color: C.background1 } }],
  { x: 0.9, y: 4.25, w: 5.4, h: 2.0, fontSize: 15, margin: 0, valign: "top", isTextBox: true, objectName: "Precedent text" });
card(s, 6.78, 4.1, 5.95, 2.3);
s.addText([{ text: "Budget timing", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent1, breakLine: true } },
  { text: "Spring 2027: request teacher-training funds as a priority measure for the 2028 budget.", options: { bullet: true, breakLine: true } },
  { text: "2027: comment on the Education Development Guidelines 2028+, which steer the 2028–2031 budget and 2028–2034 EU funds.", options: { bullet: true } }],
  { x: 7.08, y: 4.25, w: 5.4, h: 2.05, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Budget text" });
src(s, "Sources: Cabinet Regulation No. 606 (Cabinet rules of procedure); TAP portal; Latvijas Vēstnesis 2024/207.5; Cabinet Order No. 436 (2021).");

// ======================= Close
s = slide("SECTION_DARK", "Closing");
s.addText("Our asks", { placeholder: "kicker" });
s.addText("Make compulsory financial education real", { placeholder: "title" });
s.addText([
  { text: "IZM and VIAA: ", options: { bold: true, color: C.accent2 } }, { text: "outcomes, minimum lessons and teacher training in regulation", options: { breakLine: true } },
  { text: "Latvijas Banka: ", options: { bold: true, color: C.accent2 } }, { text: "a school pillar with youth targets in the next strategy", options: { breakLine: true } },
  { text: "Banks and Finance Latvia: ", options: { bold: true, color: C.accent2 } }, { text: "co-fund teacher training and send volunteer finance coaches" },
], { placeholder: "body" });
s.addNotes("Closing line: We already made financial literacy compulsory. Now let's make it real, before the scammers teach our teenagers first.");

// ======================= Appendix
divider("Appendix", "Appendix", "Extra data, evidence and regulatory detail", "Use these slides for questions.");

s = slide("CONTENT", "Appendix");
s.addText("A1. Adults: index, simple interest and financial shocks", { placeholder: "title" });
img(s, "lb2022_index_trend.png", 0.6, 1.45, 5.95, 2.35, "Latvijas Banka 2022: financial literacy index 63% (2015), 61% (2022), OECD average 62%", "Financial literacy index, % of maximum");
img(s, "lb2022_simple_interest.png", 0.6, 4.0, 5.95, 2.4, "Latvijas Banka 2022: simple interest question, correct answers 72% (2015), 74% (2019), 58% (2022)", "Simple interest question: red = correct");
img(s, "lb2022_financial_shocks.png", 6.78, 1.45, 5.95, 4.95, "Latvijas Banka 2022: share able to cover an expense equal to a month's income without borrowing, 2015 to 2022", "Could you cover a month's income without borrowing?");
src(s, "Charts: Latvijas Banka, financial literacy survey 2022, pp. 7, 52 and 24. Only 43% could cover an expense equal to a month's income without borrowing (red, \"Jā\").");

s = slide("CONTENT", "Appendix");
s.addText("A2. Who decides about money at home? (9th graders)", { placeholder: "title" });
img(s, "lb9_family_decisions.png", 0.6, 1.45, 8.8, 4.95, "Latvijas Banka 9th-grade assessment 2025: who makes everyday money decisions in the family", "Who makes everyday money decisions in your family? (%)");
callouts(s, 9.7, 1.45, 3.03, [
  { big: "73%", text: "say only adults make money decisions at home" },
  { big: "21%", text: "decide together with their family", color: C.accent1 },
  { big: "Higher", text: "scores for pupils involved in family decisions", color: C.accent1 },
]);
src(s, "Chart: Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 13. This is why the strategy includes family tasks.");

s = slide("CONTENT", "Appendix");
s.addText("A3. New OECD evidence: fraud among Latvian adults (2026)", { placeholder: "title" });
s.addTable([
  [{ text: "Indicator (past two years)", options: hdr }, { text: "Latvia", options: hdr }],
  ["Faced a fraud attempt", "74%"], ["Became a victim", "27%"], ["Victims who lost money", "55%"],
  ["Purchase fraud / phishing", "15% / 8%"], ["Investment fraud / unauthorised transactions", "6.5% / 6%"], ["Victims who told no one", "37%"],
], tbl({ x: 0.6, y: 1.45, w: 6.8, colW: [4.9, 1.9], rowH: 0.62, fontSize: 14 }));
card(s, 7.75, 1.45, 4.98, 4.9);
bullets(s, ["Only 29% reach the OECD minimum for digital financial literacy, yet about 70% rate their own knowledge as high", "More likely victims: ages 35–64, women, city residents, self-employed, low incomes. 18–24-year-olds are less likely victims", "Literacy did not lower victimisation directly, but it raised protective action: the case for practice", "Police-recorded fraud doubled (about 4,000 to 8,000 cases, 2024–2025); losses €23.7m (+47%)"], 8.05, 1.7, 4.45, 4.5, 14);
src(s, "Sources: OECD (2026), Improving Adults' Resilience Against Financial Scams and Frauds in Latvia; Kantar survey n = 1,400, July–September 2025; State Police data, pp. 22–28.");

s = slide("CONTENT", "Appendix");
s.addText("A4. Regulatory and policy timeline", { placeholder: "title" });
s.addTable([
  [{ text: "Date", options: hdr }, { text: "Event", options: hdr }, { text: "Relevance", options: hdr }],
  ["2020–2023", "Skola2030: financial literacy becomes part of compulsory social studies", "Compulsory, but no minimum lessons"],
  ["June 2021", "Education Development Guidelines 2021–2027 (Cabinet Order No. 436)", "Successor 2028+ to be drafted"],
  ["2021", "National Financial Literacy Strategy 2021–2027 (FKTK; Latvijas Banka from 2022)", "Ends 2027; partnership, not Cabinet"],
  ["01.09.2025", "Regulation No. 569: 24-hour required course for PE teachers who teach swimming", "Precedent for a subject-specific requirement"],
  ["30.09.2025", "EU Financial Literacy Strategy, COM(2025) 681", "Asks member states to start in schools"],
  ["27.11.2025", "EU Payment Services Regulation agreed", "Banks liable for weak fraud prevention"],
  ["16.03.2026", "28-partner memorandum: pupils and teachers a priority to 2027", "Ready-made coalition"],
  ["30.04.2026", "European Parliament resolution on financial literacy (502–46)", "Financial education in school curricula"],
  ["08.09.2026", "PISA 2025: Latvia's weakest results ever", "Pressure on education policy"],
  ["20.11.2026", "OECD action plan for Latvia: four pillars, 13 actions", "Calls for financial literacy in schools"],
], tbl({ x: 0.6, y: 1.4, w: 12.13, colW: [1.6, 6.33, 4.2], rowH: 0.45, fontSize: 12 }));
src(s, "Sources: Skola2030; likumi.lv; Latvijas Banka; European Commission; European Parliament; OECD.");

s = slide("CONTENT", "Appendix");
s.addText("A5. Methodology and key sources", { placeholder: "title" });
card(s, 0.6, 1.45, 5.95, 4.95);
s.addText([{ text: "Data", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent1, breakLine: true } },
  { text: "Flash Eurobarometer 525 (2023, 27 countries, ~1,000 per country, online)", options: { bullet: true, breakLine: true } },
  { text: "Latvijas Banka adult survey 2022 (n = 1,007, face-to-face, OECD/INFE method)", options: { bullet: true, breakLine: true } },
  { text: "Latvijas Banka 9th-grade assessment 2025 (n = 1,159, 75 schools)", options: { bullet: true, breakLine: true } },
  { text: "OECD–Latvijas Banka fraud survey 2026 (Kantar, n = 1,400)", options: { bullet: true, breakLine: true } },
  { text: "OECD PISA 2018 and 2025; Finance Latvia and State Police fraud data", options: { bullet: true } }],
  { x: 0.9, y: 1.65, w: 5.4, h: 4.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Data list" });
card(s, 6.78, 1.45, 5.95, 4.95);
s.addText([{ text: "Frameworks and evidence", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent1, breakLine: true } },
  { text: "OECD/INFE: literacy = knowledge + behaviour + attitudes", options: { bullet: true, breakLine: true } },
  { text: "Lusardi & Mitchell (2014, 2023): financial literacy as human capital", options: { bullet: true, breakLine: true } },
  { text: "Meta-analyses: Kaiser & Menkhoff (2017, 2020); Kaiser et al. (2022); Fernandes et al. (2014)", options: { bullet: true, breakLine: true } },
  { text: "RCTs: Bruhn et al. (2016); Frisancho (2020); Cannistrà et al. (2024)", options: { bullet: true, breakLine: true } },
  { text: "Limitations: small 18–19 subgroup; fraud surveys differ in wording; costs are illustrative", options: { bullet: true } }],
  { x: 7.08, y: 1.65, w: 5.4, h: 4.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Framework list" });
src(s, "Charts in this deck are reproduced from the original reports, with source and page under each.");

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("saved", OUT);
})();
