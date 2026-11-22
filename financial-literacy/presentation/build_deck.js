// Build the final presentation: node financial-literacy/presentation/build_deck.js  (run from repo root)
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/fd1e9380-3bd3-4d14-839f-605e7ac2a022_76a180bd-a304-4552-9a75-461dfc5f3add/pptx/scripts/apply_theme.js");

const OUT = "financial-literacy/presentation/Financial literacy in Latvia - presentation.pptx";
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
const HEX = { green: "2D6A4F", amber: "E9A23B", grey: "C9C8C3", dark: "16352B", muted: "5F6B66", grid: "E3E8E5", red: "B23A48" };

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
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.6, w: 11.7, h: 1.4, fontFace: "Cambria", fontSize: 40, bold: true, color: C.background1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.1, w: 11.7, h: 1.2, fontSize: 18, color: C.accent3, valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 12.2, y: 7.05, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});

// ---------- helpers
const src = (s, text) => s.addText(text, { x: 0.6, y: 6.62, w: 12.1, h: 0.36, fontSize: 10, color: C.accent6, italic: true, margin: 0, valign: "top", isTextBox: true, objectName: "Source" });
function card(s, x, y, w, h, fill = C.background2, name = "Card") {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { type: "none" }, rectRadius: 0.12, objectName: name });
}
function stat(s, x, y, w, h, big, label, color = C.accent1, fill = C.background2) {
  card(s, x, y, w, h, fill, "Stat card");
  s.addText(big, { x: x + 0.3, y: y + 0.2, w: w - 0.6, h: 1.1, fontFace: "Cambria", fontSize: 54, bold: true, color, margin: 0, valign: "middle", isTextBox: true, objectName: "Stat value" });
  s.addText(label, { x: x + 0.3, y: y + 1.35, w: w - 0.6, h: h - 1.5, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Stat label" });
}
function num(s, x, y, n, fill = C.accent1, d = 0.55) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: "Number circle" });
  s.addText(String(n), { x, y, w: d, h: d, fontFace: "Cambria", fontSize: 18, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Number" });
}
function bullets(s, items, x, y, w, h, size = 15) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 8 } })),
    { x, y, w, h, fontSize: size, color: C.text1, valign: "top", margin: 0, isTextBox: true, objectName: "Bullets" });
}
const chartBase = (extra) => Object.assign({
  catAxisLabelColor: HEX.muted, valAxisLabelColor: HEX.muted, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
  catAxisLabelFontSize: 12, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: "1B1F1D", dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", dataLabelFontBold: true,
  showTitle: true, titleFontFace: "+mn-lt", titleFontSize: 14, titleColor: "16352B", barGapWidthPct: 60,
}, extra);
let sec = "";
const slide = (master, section) => { if (section !== sec) { pres.addSection({ title: section }); sec = section; } return pres.addSlide({ masterName: master, sectionTitle: section }); };

// ======================= 1. Title
let s = slide("TITLE_DARK", "Opening");
s.addText("Compulsory on paper, missing in practice", { placeholder: "title" });
s.addText("Making financial education work for young people in Latvia", { placeholder: "body" });
s.addText("Jaunie Ekonomisti  |  SSE Riga elective: Impact Making for the Competitiveness and Data-Driven Decisions  |  November 2026", { placeholder: "foot" });
s.addNotes("Open with the paradox: financial literacy is compulsory in every Latvian school, yet young Latvians are the least financially literate group in one of the least financially literate countries in the EU.");

// ======================= 2. (i) the issue
s = slide("CONTENT", "(i) The issue");
s.addText("Latvia is joint last in the EU on financial literacy", { placeholder: "title" });
stat(s, 0.6, 1.6, 3.85, 2.8, "11%", "of Latvian adults have high financial literacy: joint last in the EU (EU 18%, Estonia 23%)");
stat(s, 4.74, 1.6, 3.85, 2.8, "26%", "have no emergency savings: the highest share in the EU (EU 16%)", C.accent5);
stat(s, 8.88, 1.6, 3.85, 2.8, "27%", "of adults fell victim to financial fraud in two years; 74% faced an attempt", C.accent2);
s.addText("The problem is not only knowledge: Latvia ranks 26th of 27 on financial behaviour and joint last on investing (9% own funds, stocks or bonds).",
  { x: 0.6, y: 4.75, w: 12.1, h: 1.2, fontSize: 20, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "Takeaway" });
src(s, "Sources: Flash Eurobarometer 525 (European Commission, 2023), data annex; OECD & Latvijas Banka, Kantar survey of 1,400 adults (presented 20.11.2026).");
s.addNotes("Three numbers frame the problem: low literacy, no buffer, and high exposure to fraud. All three are EU-worst or near-worst.");

// ======================= 3. (i) young people
s = slide("CONTENT", "(i) The issue");
s.addText("The youngest adults are the least financially literate", { placeholder: "title" });
s.addChart(pres.charts.BAR, [{ name: "Index (0–20)", labels: ["18–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70–79"], values: [8.0, 11.0, 12.6, 13.1, 11.9, 12.7, 11.9] }],
  chartBase({ x: 0.6, y: 1.5, w: 7.0, h: 4.9, barDir: "col", title: "Latvijas Banka financial literacy index by age, 2022 (all adults: 12.2)", showLegend: false, dataLabelFormatCode: "0.0",
    chartColors: [HEX.green, HEX.green, HEX.grey, HEX.grey, HEX.grey, HEX.grey, HEX.grey], valAxisMinVal: 0, valAxisMaxVal: 15, objectName: "Index by age chart" }));
card(s, 8.0, 1.5, 4.73, 4.9);
s.addText([
  { text: "5.1 → 3.9", options: { fontFace: "Cambria", fontSize: 32, bold: true, color: C.accent5, breakLine: true } },
  { text: "adult knowledge score (of 7), 2015 → 2022", options: { fontSize: 14, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "40%", options: { fontFace: "Cambria", fontSize: 32, bold: true, color: C.accent1, breakLine: true } },
  { text: "of 18–19-year-olds can calculate simple interest (all adults: 58%)", options: { fontSize: 14, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "11%", options: { fontFace: "Cambria", fontSize: 32, bold: true, color: C.accent1, breakLine: true } },
  { text: "of 18–19-year-olds could cover a month's income in unexpected costs", options: { fontSize: 14 } },
], { x: 8.3, y: 1.7, w: 4.2, h: 4.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Key numbers" });
src(s, "Source: Latvijas Banka, financial literacy survey 2022 (n = 1,007; OECD/INFE method). The 18–19 group is small (~30); ages 20–29 (11.0) confirm the pattern.");
s.addNotes("Knowledge fell on every question since 2015; the flat headline index hides it because attitudes improved. Young adults score lowest.");

// ======================= 4. (i) school gap
s = slide("CONTENT", "(i) The issue");
s.addText("School is where teenagers learn least about money", { placeholder: "title" });
s.addChart(pres.charts.BAR, [
  { name: "Always or often", labels: ["Family", "Internet", "Friends", "School and clubs"], values: [63, 46, 18, 9] },
  { name: "Never", labels: ["Family", "Internet", "Friends", "School and clubs"], values: [3, 8, 18, 36] }],
  chartBase({ x: 0.6, y: 1.5, w: 7.2, h: 4.9, barDir: "col", title: "9th graders: where do you learn about money? (%)", showLegend: true, legendPos: "t", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.muted,
    chartColors: [HEX.green, HEX.grey], dataLabelFormatCode: '0"%"', valAxisMinVal: 0, valAxisMaxVal: 75, objectName: "Sources chart" }));
const rows4 = [["36%", "of 9th graders never learn about money at school; 31% only rarely"],
  ["Weak", "teachers' own knowledge of simple and compound interest is insufficient (Latvijas Banka, 2024)"],
  ["0", "minimum lessons: finance is one topic inside social studies, taught \"superficially\" (LSM, 2026)"]];
rows4.forEach((r, i) => {
  const y = 1.5 + i * 1.68;
  card(s, 8.1, y, 4.63, 1.5);
  s.addText(r[0], { x: 8.3, y: y + 0.15, w: 1.4, h: 1.2, fontFace: "Cambria", fontSize: 28, bold: true, color: C.accent5, margin: 0, valign: "middle", isTextBox: true, objectName: "Fact value" });
  s.addText(r[1], { x: 9.75, y: y + 0.12, w: 2.85, h: 1.26, fontSize: 14, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Fact text" });
});
src(s, "Sources: Latvijas Banka, 9th-grade assessment 2025 (n = 1,159, 75 schools); Brikše (Latvijas Banka), Saeima conference 2025; LSM 18.02.2026; Skola2030.");
s.addNotes("Financial literacy became compulsory with Skola2030, but as a topic inside social studies, without a minimum number of lessons and with under-prepared teachers.");

// ======================= 5. (i) why now
s = slide("CONTENT", "(i) The issue");
s.addText("Why now: teenagers are already targets of fraud", { placeholder: "title" });
const t5 = [["48%", "of 9th graders were offered \"easy money\" online by strangers", C.accent2],
  ["18%", "were asked to pass money through their account: the money-mule pattern", C.accent5],
  ["29%", "of 15–16-year-olds gambled for money in the past year; 6.4% excessively", C.accent1],
  ["€7.8m", "lost to fraud in the first half of 2026; online loans grew 32% in 2025", C.accent5]];
t5.forEach((t, i) => {
  const x = 0.6 + i * 3.08;
  card(s, x, 1.55, 2.9, 3.0);
  s.addText(t[0], { x: x + 0.25, y: 1.7, w: 2.4, h: 1.0, fontFace: "Cambria", fontSize: 40, bold: true, color: t[2], margin: 0, valign: "middle", isTextBox: true, objectName: "Tile value" });
  s.addText(t[1], { x: x + 0.25, y: 2.75, w: 2.4, h: 1.7, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Tile text" });
});
card(s, 0.6, 4.8, 12.13, 1.6, C.text2, "Window card");
s.addText([
  { text: "Our issue: ", options: { bold: true, color: C.accent2 } },
  { text: "compulsory financial education that is not delivered, while the risks grow. ", options: { color: C.background1 } },
  { text: "The window is open: ", options: { bold: true, color: C.accent2 } },
  { text: "the national strategy ends in 2027, the OECD proposed an action plan for Latvia (Nov 2026), a fraud-prevention plan is being drafted, and PISA 2025 was Latvia's weakest ever.", options: { color: C.background1 } },
], { x: 0.9, y: 4.95, w: 11.6, h: 1.3, fontSize: 16, margin: 0, valign: "middle", isTextBox: true, objectName: "Window text" });
src(s, "Sources: Latvijas Banka 9th-grade assessment 2025; ESPAD 2024 (SPKC); Finance Latvia Association via LSM 21.07.2026; PTAC (2026); OECD (2026); OECD PISA 2025.");
s.addNotes("Fraud makes this urgent: the first financial decisions of today's teenagers are being made on social media, and criminals are recruiting them as money mules.");

// ======================= 6. (ii) research
s = slide("CONTENT", "(ii) Research and data");
s.addText("Research: school financial education works when it is intensive", { placeholder: "title" });
s.addChart(pres.charts.BAR, [{ name: "Effect (SD)", labels: ["Meta-analysis (37 studies)", "Brazil RCT (892 schools)", "Peru RCT (300 schools)", "Online game RCT (4 countries)"], values: [0.33, 0.25, 0.15, 0.31] }],
  chartBase({ x: 0.6, y: 1.5, w: 6.6, h: 4.9, barDir: "col", title: "Effect of school financial education on knowledge (standard deviations)", showLegend: false, chartColors: [HEX.green], dataLabelFormatCode: "+0.00", valAxisMinVal: 0, valAxisMaxVal: 0.4, catAxisLabelFontSize: 11, objectName: "Effects chart" }));
const lessons = [["Intensity matters", "dedicated lessons beat scattered mentions (Kaiser & Menkhoff 2017, 2020)"],
  ["Teachers matter", "trained teachers are the key ingredient (Compen et al. 2019)"],
  ["Timing matters", "link lessons to real decisions: cards, scams, first salary"],
  ["A mandate alone fails", "US mandates without real teaching had no effect (Cole et al. 2016): Latvia's risk today"]];
lessons.forEach((l, i) => {
  const y = 1.55 + i * 1.2;
  num(s, 7.55, y + 0.12, i + 1, i === 3 ? C.accent5 : C.accent1);
  s.addText([{ text: l[0], options: { bold: true, breakLine: true } }, { text: l[1] }], { x: 8.3, y, w: 4.43, h: 1.1, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Lesson" });
});
src(s, "Sources: Kaiser & Menkhoff (2020) Econ. of Education Review; Bruhn et al. (2016) AEJ: Applied; Frisancho (2020) IDB; Cannistrà et al. (2024) J. Comparative Economics; Kaiser et al. (2022) JFE (76 RCTs).");
s.addNotes("Knowledge effects are solid; behaviour effects are smaller (about +0.07 SD) and appear over years. Design for intensity, trained teachers and real decisions.");

// ======================= 7. (ii) activity vs results
s = slide("CONTENT", "(ii) Research and data");
s.addText("Latvia has lots of activity, but knowledge is falling", { placeholder: "title" });
s.addChart(pres.charts.BAR, [
  { name: "2015", labels: ["Interest-free loan", "Simple interest", "Compound interest", "Inflation"], values: [89, 72, 48, 68] },
  { name: "2022", labels: ["Interest-free loan", "Simple interest", "Compound interest", "Inflation"], values: [76, 58, 26, 41] }],
  chartBase({ x: 0.6, y: 1.5, w: 6.6, h: 4.9, barDir: "col", title: "Latvian adults answering correctly (%)", showLegend: true, legendPos: "t", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.muted,
    chartColors: [HEX.grey, HEX.red], dataLabelFormatCode: '0"%"', valAxisMinVal: 0, valAxisMaxVal: 100, objectName: "Knowledge decline chart" }));
card(s, 7.55, 1.5, 5.18, 2.3);
bullets(s, ["230+ activities by strategy partners since 2021", "Money Day reached 78% of schools", "But only ~9% of activities target teachers"], 7.85, 1.7, 4.7, 1.9, 15);
card(s, 7.55, 4.05, 5.18, 2.35, C.text2, "Estonia card");
s.addText([
  { text: "Estonia: ", options: { bold: true, color: C.accent2 } },
  { text: "PISA 547, best in the world; finance built into teacher training.", options: { color: C.background1, breakLine: true } },
  { text: "England: ", options: { bold: true, color: C.accent2 } },
  { text: "compulsory since 2014, yet only 38% recall it; now being strengthened.", options: { color: C.background1 } }],
  { x: 7.85, y: 4.2, w: 4.7, h: 2.1, fontSize: 14, paraSpaceAfter: 8, margin: 0, valign: "top", isTextBox: true, objectName: "Estonia text" });
src(s, "Sources: Latvijas Banka surveys 2015/2022 and strategy evaluation 2025; OECD PISA 2018; Estonian Ministry of Finance; APPG on Financial Education / Young Enterprise (UK).");
s.addNotes("The strategy counts events, not learning. Latvia doesn't need more one-off events; it needs intensive classroom learning by trained teachers.");

// ======================= 8. (iii) strategy
s = slide("CONTENT", "(iii) Strategy");
s.addText("Our strategy: five steps from paper to practice", { placeholder: "title" });
const steps = [["Module", "10–12 ready-to-teach lessons in grades 9 and 11: interest, scams, money mules, crypto, gambling odds, online loans"],
  ["Teacher training", "certify Latvijas Banka's new seminar cycle (2026) so it counts in teachers' 36 required hours"],
  ["Gamified practice", "Olympiad (ours: ~200 students, 30+ schools), escape-room games, bank volunteers, all year"],
  ["Family tasks", "homework that involves parents in a real money decision (73% of pupils are left out today)"],
  ["Measure", "Latvijas Banka 9th-grade survey every 2 years; join PISA 2029 financial literacy"]];
steps.forEach((st, i) => {
  const x = 0.6 + i * 2.45;
  card(s, x, 1.6, 2.28, 4.75);
  num(s, x + 0.25, 1.85, i + 1, i === 4 ? C.accent2 : C.accent1);
  s.addText(st[0], { x: x + 0.25, y: 2.6, w: 1.85, h: 0.75, fontFace: "Cambria", fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "Step title" });
  s.addText(st[1], { x: x + 0.25, y: 3.4, w: 1.85, h: 2.8, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Step text" });
});
src(s, "Design follows the evidence: intensity (steps 1, 3), teachers (2), teachable moments (1, 4) and measurement (5).");
s.addNotes("Each step maps to a research finding. Steps 1 and 2 are the core; 3 and 4 increase reach; 5 makes it accountable.");

// ======================= 9. (iii) stakeholders
s = slide("CONTENT", "(iii) Strategy");
s.addText("Who we work with, and how", { placeholder: "title" });
const quad = [["Policy makers", "IZM and VISC; Saeima Education Committee; Interior Ministry fraud plan", "we send an evidence brief and draft amendments, and request a Saeima hearing"],
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
src(s, "Our role as Jaunie Ekonomisti: bring the evidence, the youth voice and a working gamified format (Olympiad: ~200 students from 30+ schools).");
s.addNotes("We are not asking for a new institution. We plug into the existing Latvijas Banka working group and the government's fraud plan.");

// ======================= 10. (iii) roadmap
s = slide("CONTENT", "(iii) Strategy");
s.addText("Roadmap 2026–2030", { placeholder: "title" });
const road = [["Dec 2026 – Feb 2027", "Evidence brief; meetings with Latvijas Banka, IZM, VISC and Finance Latvia"],
  ["March 2027", "Launch at Financial Literacy Week: media campaign, Olympiad, op-eds"],
  ["Spring 2027", "Pilot module and teacher course in 10 schools; measure before and after"],
  ["Autumn 2027", "Proposals into the post-2027 strategy and the standards amendments"],
  ["2028 – 2030", "National rollout; biennial 9th-grade survey; PISA 2029 financial literacy"]];
s.addShape(pres.shapes.LINE, { x: 0.9, y: 3.0, w: 11.5, h: 0, line: { color: THEME.colors.accent3, width: 2 }, objectName: "Timeline line" });
road.forEach((r, i) => {
  const x = 0.6 + i * 2.45;
  num(s, x + 0.85, 2.72, i + 1, i < 2 ? C.accent2 : C.accent1);
  s.addText(r[0], { x, y: 1.6, w: 2.3, h: 0.9, fontFace: "Cambria", fontSize: 16, bold: true, color: C.text2, align: "center", valign: "bottom", margin: 0, isTextBox: true, objectName: "Milestone date" });
  card(s, x, 3.55, 2.3, 2.8);
  s.addText(r[1], { x: x + 0.2, y: 3.7, w: 1.9, h: 2.5, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Milestone text" });
});
src(s, "Timing matches the end of the 2021–2027 strategy, the EU's 2027 mid-term review and the next PISA financial literacy option (2029).");
s.addNotes("Quick wins first (evidence, media, pilot), then lock them into regulation in autumn 2027 when the new strategy is drafted.");

// ======================= 11. (iv) expected results
s = slide("CONTENT", "(iv) Expected results");
s.addText("Expected results: new rules by 2028, better skills by 2030", { placeholder: "title" });
const hdr = { bold: true, color: C.background1, fill: { color: THEME.colors.dk2 } };
card(s, 0.6, 1.5, 4.1, 4.95, C.text2, "Policy results card");
s.addText([
  { text: "1. Policy results (by 2028)", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent2, breakLine: true } },
  { text: "Regulations No. 747, 416 and 569 amended", options: { bullet: true, breakLine: true } },
  { text: "School pillar with youth targets in the 2028+ national strategy", options: { bullet: true, breakLine: true } },
  { text: "Latvijas Banka's teacher seminars accredited", options: { bullet: true, breakLine: true } },
  { text: "Latvia joins PISA 2029 financial literacy", options: { bullet: true } },
], { x: 0.9, y: 1.7, w: 3.55, h: 4.6, fontSize: 15, color: C.background1, margin: 0, valign: "top", paraSpaceAfter: 10, isTextBox: true, objectName: "Policy results" });
s.addText("2. Learning results (by 2030)", { x: 4.95, y: 1.5, w: 4.6, h: 0.45, fontFace: "Cambria", bold: true, fontSize: 18, color: C.accent1, margin: 0, isTextBox: true, objectName: "Learning heading" });
s.addTable([
  [{ text: "KPI", options: hdr }, { text: "Now", options: hdr }, { text: "Base", options: hdr }, { text: "Stretch", options: hdr }],
  ["9th-grade index (of 20)", "12.3", "13.2", "14.0"],
  ["9th graders who calculate simple interest", "57%", "68%", "75%"],
  ["9th graders who never learn about money at school", "36%", "15%", "< 10%"],
  ["Social-studies teachers trained", "–", "60%", "80%"],
], { x: 4.95, y: 2.05, w: 4.6, colW: [2.2, 0.75, 0.75, 0.9], fontSize: 14, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, rowH: [0.45, 0.85, 0.85, 0.95, 0.75], valign: "middle", objectName: "KPI table" });
card(s, 9.8, 1.5, 2.93, 4.95, C.background2, "Cost card");
s.addText([
  { text: "3. Cost", options: { fontFace: "Cambria", bold: true, fontSize: 18, color: C.text2, breakLine: true } },
  { text: "€0.2–0.35m", options: { fontFace: "Cambria", bold: true, fontSize: 26, color: C.accent1, breakLine: true } },
  { text: "one-off set-up", options: { fontSize: 14, breakLine: true } },
  { text: "€0.1–0.2m", options: { fontFace: "Cambria", bold: true, fontSize: 26, color: C.accent1, breakLine: true } },
  { text: "a year", options: { fontSize: 14, breakLine: true } },
  { text: "≈1% of one year's fraud losses", options: { fontSize: 14, color: C.accent6 } },
], { x: 10.05, y: 1.7, w: 2.5, h: 4.6, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true, objectName: "Cost text" });
src(s, "Baselines: Latvijas Banka 9th-grade assessment 2025. Base = +0.3 SD (research effect sizes); stretch ≈ +0.5 SD. Costs illustrative (Frisancho 2020; Bruhn et al. 2016); to be checked with IZM.");
s.addNotes("Lead with the institutional result: the rules change, so it does not depend on one minister. Then learning gains within the range research shows is realistic. Behaviour follows more slowly.");

// ======================= 12. (v) regulation
s = slide("CONTENT", "(v) Regulation");
s.addText("Four regulatory changes that make it stick", { placeholder: "title" });
s.addTable([
  [{ text: "Instrument", options: hdr }, { text: "Proposed change", options: hdr }, { text: "Owner", options: hdr }],
  ["Basic and secondary education standards (Cabinet Regulations No. 747 and No. 416)", "Explicit, assessed financial-literacy outcomes (compound interest, inflation, risk, digital fraud) and a minimum block of lessons in grades 7–9 and 10–12", "IZM, VISC"],
  ["Teacher training rules (Cabinet Regulation No. 569: 36 hours per 3 years)", "Make financial and digital financial literacy a required topic for social-studies teachers. Precedent: a 2024 amendment added sexual and reproductive health", "IZM"],
  ["National Financial Literacy Strategy 2028+", "Outcome targets for young people and a school pillar, linked to the OECD action plan and the government's fraud-prevention plan", "Latvijas Banka, Cabinet"],
  ["International benchmark", "Commit Latvia to the PISA 2029 financial literacy option (missed in 2022)", "IZM"],
  [{ text: "Quick wins (now)", options: { bold: true, color: C.accent1 } }, "Accredit Latvijas Banka's teacher seminars under No. 569; tighten youth-targeted gambling advertising", "IZM; Ministry of Finance"],
], { x: 0.6, y: 1.45, w: 12.13, colW: [3.6, 6.53, 2.0], fontSize: 13, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, rowH: [0.42, 0.95, 0.95, 0.8, 0.55, 0.65], valign: "middle", objectName: "Regulation table" });
s.addText([{ text: "EU tailwind: ", options: { bold: true, color: C.accent1 } },
  { text: "the European Parliament voted 502–46 (April 2026) for financial education in school curricula; the Commission strategy (2025) asks member states to start in schools; new EU payment rules make banks liable for weak fraud prevention." }],
  { x: 0.6, y: 5.98, w: 12.13, h: 0.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "EU note" });
src(s, "Sources: likumi.lv (MK No. 747, 416, 569); LV portāls 2024 (MK 569 amendment) and 2026 (gambling ads study); EP resolution TA-10-2026-0156; COM(2025) 681; EP 27.11.2025.");
s.addNotes("None of these needs a new law; all are Cabinet regulations or strategy decisions, so they are achievable within one policy cycle.");

// ======================= 13. closing
s = slide("SECTION_DARK", "Closing");
s.addText("Make compulsory financial education real", { placeholder: "title" });
s.addText([
  { text: "IZM and VISC: ", options: { bold: true, color: C.accent2 } }, { text: "set outcomes, minimum lessons and teacher training in regulation", options: { breakLine: true } },
  { text: "Latvijas Banka: ", options: { bold: true, color: C.accent2 } }, { text: "put a school pillar with youth targets into the next strategy", options: { breakLine: true } },
  { text: "Banks and Finance Latvia: ", options: { bold: true, color: C.accent2 } }, { text: "co-fund teacher training and send volunteer finance coaches" },
], { placeholder: "body" });
s.addNotes("End with three concrete asks, one per stakeholder.");

// ======================= Appendix
s = slide("SECTION_DARK", "Appendix");
s.addText("Appendix", { placeholder: "title" });
s.addText("Extra data, fraud evidence, regulatory timeline and methodology", { placeholder: "body" });

const eu = [["Netherlands", 28], ["Slovenia", 27], ["Sweden", 27], ["Denmark", 27], ["Germany", 24], ["Luxembourg", 23], ["Estonia", 23], ["Austria", 21], ["Slovakia", 20], ["Malta", 20], ["Croatia", 20], ["Belgium", 20], ["Ireland", 19], ["Italy", 18], ["EU-27", 18], ["France", 17], ["Finland", 17], ["Czechia", 17], ["Lithuania", 16], ["Hungary", 16], ["Greece", 16], ["Poland", 15], ["Cyprus", 15], ["Bulgaria", 15], ["Spain", 13], ["Romania", 12], ["Portugal", 11], ["Latvia", 11]];
s = slide("CONTENT", "Appendix");
s.addText("A1. High financial literacy across the EU, 2023", { placeholder: "title" });
s.addChart(pres.charts.BAR, [{ name: "High score (%)", labels: eu.map(e => e[0]), values: eu.map(e => e[1]) }],
  chartBase({ x: 0.6, y: 1.45, w: 12.13, h: 5.0, barDir: "col", title: "Share of adults with a high overall financial literacy score (%)", showLegend: false, catAxisLabelFontSize: 10, catAxisLabelRotate: -60, dataLabelFontSize: 10,
    chartColors: eu.map(e => e[0] === "Latvia" ? HEX.red : (e[0] === "Estonia" || e[0] === "Lithuania") ? HEX.green : e[0] === "EU-27" ? HEX.dark : HEX.grey), valAxisMinVal: 0, valAxisMaxVal: 32, objectName: "EU ranking chart" }));
src(s, "Source: Flash Eurobarometer 525 (2023), data annex; high = 9–10 on the combined knowledge and behaviour scale. Latvia is joint last with Portugal.");

s = slide("CONTENT", "Appendix");
s.addText("A2. Resilience and investing: Latvia vs Baltics and EU, 2023", { placeholder: "title" });
const lab2 = ["No emergency savings", "Could live 6+ months without income", "Own funds, stocks or bonds", "Own crypto-assets"];
s.addChart(pres.charts.BAR, [{ name: "Latvia", labels: lab2, values: [26, 19, 9, 10] }, { name: "Estonia", labels: lab2, values: [15, 32, 24, 12] }, { name: "Lithuania", labels: lab2, values: [17, 36, 14, 11] }, { name: "EU-27", labels: lab2, values: [16, 33, 24, 6] }],
  chartBase({ x: 0.6, y: 1.45, w: 12.13, h: 5.0, barDir: "col", title: "% of adults", showLegend: true, legendPos: "t", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.muted, dataLabelFontSize: 11,
    chartColors: [HEX.red, HEX.green, "95B8A3", HEX.dark], dataLabelFormatCode: '0"%"', valAxisMinVal: 0, valAxisMaxVal: 42, objectName: "Resilience chart" }));
src(s, "Source: Flash Eurobarometer 525 (2023), Q8 and Q9.");

s = slide("CONTENT", "Appendix");
s.addText("A3. New OECD evidence: fraud among Latvian adults (2026)", { placeholder: "title" });
s.addChart(pres.charts.BAR, [{ name: "% of adults", labels: ["Purchase fraud", "Phishing", "Investment fraud", "Unauthorised transactions"], values: [15, 8, 6.5, 5.6] }],
  chartBase({ x: 0.6, y: 1.45, w: 6.8, h: 4.9, barDir: "bar", title: "Most common fraud types, past two years (% of adults)", showLegend: false, chartColors: [HEX.amber], dataLabelFormatCode: '0.0"%"', valAxisMinVal: 0, valAxisMaxVal: 18, catAxisOrientation: "maxMin", objectName: "Fraud types chart" }));
card(s, 7.75, 1.45, 4.98, 4.9);
bullets(s, ["74% faced a fraud attempt; 27% became victims", "55% of victims lost money; others gave away data or access", "37% told no one, mostly because \"it would change nothing\"",
  "OECD proposes a digital financial literacy action plan, coordinated by Latvijas Banka", "OECD/INFE 2023: 18% of Latvian adults were fraud victims (Lithuania 14%)"], 8.05, 1.7, 4.45, 4.5, 15);
src(s, "Sources: OECD (2026), Improving Adults' Resilience Against Financial Scams and Frauds in Latvia; Kantar survey n = 1,400, ages 18–79 (via Latvijas Banka and LSM, 20.11.2026); OECD/INFE 2023.");

s = slide("CONTENT", "Appendix");
s.addText("A4. 9th graders: exposure to risk and fraud, 2025", { placeholder: "title" });
const lab4 = ["Offered 'easy money' online", "Think Bitcoin is legal tender", "Asked to be a money mule", "Scammed buying online", "Bought crypto themselves", "Gave away password or PIN"];
s.addChart(pres.charts.BAR, [{ name: "% of 9th graders", labels: lab4, values: [48, 31, 18, 16, 12, 6] }],
  chartBase({ x: 0.6, y: 1.45, w: 7.4, h: 4.9, barDir: "bar", title: "% of 9th graders (age ~15)", showLegend: false, chartColors: [HEX.red], dataLabelFormatCode: '0"%"', valAxisMinVal: 0, valAxisMaxVal: 58, catAxisOrientation: "maxMin", objectName: "Risk chart" }));
card(s, 8.3, 1.45, 4.43, 4.9);
bullets(s, ["Only 44% agree that a higher return means higher risk", "43% think car insurance is voluntary", "40% can't work out the VAT in a price", "Only 15% regularly change passwords"], 8.6, 1.7, 3.9, 4.5, 15);
src(s, "Source: Latvijas Banka, 9th-grade financial literacy assessment, Feb–Apr 2025 (n = 1,159 pupils, 75 schools; RAIT).");

s = slide("CONTENT", "Appendix");
s.addText("A5. International models: what other countries do", { placeholder: "title" });
s.addTable([
  [{ text: "Country", options: hdr }, { text: "Approach", options: hdr }, { text: "Lesson for Latvia", options: hdr }],
  ["United States", "30 states require a standalone personal finance course (39 incl. integrated)", "Dedicated courses improved credit scores; paper mandates did not"],
  ["England", "Statutory since 2014 in citizenship and maths; strengthened from 2025", "Only 38% recall it: a mandate needs delivery"],
  ["Estonia", "Money Smart Estonia 2021–2030; finance in a 6-month teacher programme", "PISA 547, best in the world"],
  ["Czechia", "Embedded in maths and civics; national strategy", "PISA 2022: 507 (OECD 498), 5th of 20"],
  ["Slovakia", "National Standard of Financial Literacy since 2008", "Explicit outcomes across subjects"],
  ["Portugal", "National plan 2026–2030; framework from pre-school; 'Todos Contam' school competition", "Framework plus recurring competition"],
], { x: 0.6, y: 1.45, w: 12.13, colW: [2.0, 5.6, 4.53], fontSize: 13, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, rowH: 0.65, valign: "middle", objectName: "Models table" });
src(s, "Sources: NGPF 2026; CEE 2026; APPG/Young Enterprise; Estonian Ministry of Finance; OECD PISA; Czech National Bank; Cedefop; Todos Contam.");

s = slide("CONTENT", "Appendix");
s.addText("A6. Can education protect against scams?", { placeholder: "title" });
s.addTable([
  [{ text: "Study", options: hdr }, { text: "Design", options: hdr }, { text: "Result", options: hdr }],
  ["Burke et al. (2021)", "RCT, US adults; short online module on investment fraud", "Lower susceptibility to fraud; effect decays over time"],
  ["Prebunking videos (US, 2021)", "Randomised experiment", "Willingness to invest in scams −44%; fades over 6 months, a booster restores it"],
  ["BIT Canada and OSC (2025)", "RCT, AI-enabled investment scams", "Works immediately; not significant after 10 days"],
  ["ShieldUp! (2025)", "RCT, 3,000 participants; scam-spotting game", "Significantly better scam detection than awareness-only"],
], { x: 0.6, y: 1.45, w: 12.13, colW: [3.0, 4.6, 4.53], fontSize: 14, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, rowH: [0.45, 0.9, 0.9, 0.9, 0.9], valign: "middle", objectName: "Scam evidence table" });
s.addText([{ text: "Lesson: ", options: { bold: true, color: C.accent1 } }, { text: "one campaign is not enough. Scam resilience needs active practice, repetition and timing close to the risk." }],
  { x: 0.6, y: 5.75, w: 12.13, h: 0.6, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Lesson" });
src(s, "Sources: Burke, Kieffer, Mottola & Perez-Arce (2021), GFLEC; Ontario Securities Commission (2025); ShieldUp! (arXiv 2503.12341).");

s = slide("CONTENT", "Appendix");
s.addText("A7. Regulatory and policy timeline", { placeholder: "title" });
s.addTable([
  [{ text: "Date", options: hdr }, { text: "Event", options: hdr }, { text: "Relevance", options: hdr }],
  ["2020–2023", "Skola2030: financial literacy becomes part of compulsory social studies", "Compulsory, but no minimum lessons"],
  ["2021", "National Financial Literacy Strategy 2021–2027; Latvijas Banka coordinator from 2022", "Ends in 2027; successor open"],
  ["2024", "MK No. 569 amended: new required topic in teacher training", "Precedent for our proposal"],
  ["30.09.2025", "EU Financial Literacy Strategy, COM(2025) 681", "Asks member states to start in schools"],
  ["27.11.2025", "EU Payment Services Regulation agreed", "Banks liable for weak fraud prevention"],
  ["16.03.2026", "28-partner memorandum: pupils and teachers a priority to 2027", "Ready-made coalition"],
  ["31.07.2026", "Proposals due for the Interior Ministry fraud-prevention plan", "Link fraud plan to schools"],
  ["08.09.2026", "PISA 2025: Latvia's weakest results ever", "Pressure on education policy"],
  ["20.11.2026", "OECD action plan on digital financial literacy for Latvia", "Youth pillar needed"],
  ["2027 / 2029", "EU strategy review and new Eurobarometer; PISA financial literacy option", "Measure the change"],
], { x: 0.6, y: 1.4, w: 12.13, colW: [1.6, 6.33, 4.2], fontSize: 12, color: C.text1, border: { type: "solid", pt: 0.5, color: "D5DDD8" }, rowH: 0.43, valign: "middle", objectName: "Timeline table" });
src(s, "Sources: Skola2030; Latvijas Banka; likumi.lv; European Commission; European Parliament; Cabinet of Ministers; OECD.");

s = slide("CONTENT", "Appendix");
s.addText("A8. Methodology and key sources", { placeholder: "title" });
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
src(s, "Full references and the evidence register are in the accompanying research report.");

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("saved", OUT);
})();
