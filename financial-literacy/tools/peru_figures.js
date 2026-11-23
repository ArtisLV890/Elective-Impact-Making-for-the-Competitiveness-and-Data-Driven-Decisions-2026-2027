// Native charts for the Peru case study (data from Frisancho 2021 manuscript / Economic Journal 2023).
// Run from repo root: NODE_PATH=... node financial-literacy/tools/peru_figures.js  -> renders via soffice in build step
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "FIG", width: 10, height: 5.6 });
pres.layout = "FIG";
const K = { dk: "1B1F1D", g1: "2D6A4F", g2: "95B8A3", amber: "E9A23B", red: "B23A48", grey: "C9C8C3", teal: "52796F" };
const base = { x: 0.3, y: 0.75, w: 9.4, h: 4.6, fontFace: "Calibri", catAxisLabelFontSize: 13, catAxisLabelColor: K.dk,
  valAxisHidden: true, valGridLine: { style: "none" }, showValue: true, dataLabelFontSize: 12, dataLabelColor: K.dk, barGapWidthPct: 40 };
function fig(title, type, data, opts) {
  const s = pres.addSlide(); s.background = { color: "FFFFFF" };
  s.addText(title, { x: 0.3, y: 0.15, w: 9.4, h: 0.55, fontFace: "Calibri", fontSize: 18, bold: true, color: K.dk, margin: 0 });
  s.addChart(type, data, Object.assign({}, base, opts));
}
// 1. knowledge effects ITT vs ATT
fig("Gain in financial knowledge (standard deviations)", pres.charts.BAR,
  [{ name: "Offered the programme (ITT)", labels: ["All students", "Grade 9", "Grade 10", "Grade 11", "Teachers"], values: [0.16, 0.17, 0.11, 0.20, 0.32] },
   { name: "Teacher trained / taught (ATT)", labels: ["All students", "Grade 9", "Grade 10", "Grade 11", "Teachers"], values: [0.20, 0.21, 0.14, 0.25, 0.46] }],
  { barDir: "col", barGrouping: "clustered", chartColors: [K.g2, K.g1], showLegend: true, legendPos: "t", legendFontSize: 12, dataLabelFormatCode: '"+"0.00' });
// 2. teacher take-up
fig("How many teachers took part (% of teachers in programme schools)", pres.charts.BAR,
  [{ name: "Teachers", labels: ["Taught none of the lessons", "Taught some lessons", "Taught all lessons", "Attended all 5 training sessions", "Attended at least 1 training session"], values: [31, 21, 48, 43, 73] }],
  { barDir: "bar", chartColors: [K.red, K.amber, K.g1, K.g2, K.g2], dataLabelFormatCode: '0"%"', showLegend: false });
// 3. behaviour and credit effects (percentage points)
fig("Effects on behaviour (percentage points vs control group)", pres.charts.BAR,
  [{ name: "Effect", labels: ["Teachers: late loan payments (2018)", "Grade 9, taught twice (Piura): in credit bureau (2019)", "Grade 9: in credit bureau (2019)", "Students, grade 11: saves", "Students, grade 9: saves", "Teachers: saves", "Teachers: saves in a bank"],
     values: [-7.7, -15, -6.5, 2.3, 3.5, 8.7, 14] }],
  { barDir: "bar", chartColors: [K.teal, K.teal, K.teal, K.g1, K.g1, K.g1, K.g1], dataLabelFormatCode: '+0.0;-0.0', showLegend: false, catAxisLabelFontSize: 11.5, catAxisLabelPos: "low" });
// 4. intensity across school programmes
fig("Hours of financial education in tested school programmes", pres.charts.BAR,
  [{ name: "Hours", labels: ["Batty et al. 2015 (USA)", "Lührmann et al. 2018 (Germany)", "Bover et al. 2018 (Spain)", "Hinojosa et al. 2009 (USA)", "Alan & Ertac 2018 (Turkey)", "Becchetti et al. 2013 (Italy)", "Batty et al. 2020 (USA)", "Peru 2016 (16–32, average)", "Bruhn et al. 2016 (Brazil, 72–144)"],
     values: [4, 4.5, 10, 15, 16, 16, 20, 24, 108] }],
  { barDir: "bar", chartColors: [K.grey, K.grey, K.grey, K.grey, K.grey, K.grey, K.grey, K.amber, K.grey], dataLabelFormatCode: "0.#", showLegend: false, catAxisLabelFontSize: 11.5 });
pres.writeFile({ fileName: process.argv[2] }).then(() => console.log("saved"));
