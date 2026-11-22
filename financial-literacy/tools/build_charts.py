"""Build every financial-literacy chart as PNG and as native Excel charts in one workbook.

Run from the repository root:  python3 financial-literacy/tools/build_charts.py
Data are typed in below with their source, so every number can be traced.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.chart.marker import DataPoint
from openpyxl.chart.shapes import GraphicalProperties
from openpyxl.styles import Font, PatternFill, Alignment

FIG = "financial-literacy/reports/figures/"
XLSX = "financial-literacy/reports/FINAL - Financial literacy charts.xlsx"

# Palette (matches the Word template)
INK, SEC, RULE = "#1f2a37", "#5b6470", "#e4e3df"
ACC, ACC_L = "#2a78d6", "#9ec3ef"
G1, G2, G3 = "#c9c8c3", "#8d8c88", "#3c3b38"
hexx = lambda c: c.lstrip("#").upper()

wb = Workbook()
wb.remove(wb.active)
index = wb.create_sheet("Index")
index.append(["#", "Chart", "Sheet", "Source"])
for c in index[1]:
    c.font = Font(bold=True, color="FFFFFF")
    c.fill = PatternFill("solid", fgColor=hexx(INK))
index.column_dimensions["B"].width = 62
index.column_dimensions["C"].width = 24
index.column_dimensions["D"].width = 80


def _style(ax, horizontal=False):
    for s in ("top", "right", "left" if not horizontal else "bottom"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom" if not horizontal else "left"].set_color(RULE)
    ax.tick_params(length=0, colors=INK)


def _frame(fig, title, note):
    fig.text(0.03, 0.93, title, fontsize=13.5, fontweight="bold", color=INK)
    fig.text(0.03, 0.025, note, fontsize=8, color=SEC)


def _sheet(name, title, header, rows, note, nf):
    ws = wb.create_sheet(name[:31])
    ws["A1"] = title
    ws["A1"].font = Font(bold=True, size=13, color=hexx(INK))
    ws.append([])
    ws.append(header)
    for c in ws[3]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor=hexx(INK))
        c.alignment = Alignment(wrap_text=True)
    for r in rows:
        ws.append(r)
    for row in ws.iter_rows(min_row=4, max_row=3 + len(rows), min_col=2):
        for c in row:
            c.number_format = nf
    ws.cell(5 + len(rows), 1, note).font = Font(italic=True, size=9, color=hexx(SEC))
    ws.column_dimensions["A"].width = 44
    for col in "BCDE":
        ws.column_dimensions[col].width = 14
    n = len(index["A"])
    index.append([n, title, name[:31], note])
    return ws


def _xl_bar(ws, title, nrows, nser, hi=None, horizontal=False, colors=None, nf="0"):
    ch = BarChart()
    ch.type = "bar" if horizontal else "col"
    ch.title = title
    ch.add_data(Reference(ws, min_col=2, max_col=1 + nser, min_row=3, max_row=3 + nrows), titles_from_data=True)
    ch.set_categories(Reference(ws, min_col=1, min_row=4, max_row=3 + nrows))
    colors = colors or [hexx(ACC), hexx(G2), hexx(G1), hexx(G3)]
    for s, col in zip(ch.series, colors):
        s.graphicalProperties = GraphicalProperties(solidFill=col)
        s.dLbls = DataLabelList()
        s.dLbls.showVal = True
        s.dLbls.numFmt = nf
    if hi is not None and nser == 1:
        ch.series[0].graphicalProperties = GraphicalProperties(solidFill=hexx(G1))
        for i in hi:
            p = DataPoint(idx=i)
            p.graphicalProperties = GraphicalProperties(solidFill=hexx(ACC))
            ch.series[0].dPt.append(p)
    if nser == 1:
        ch.legend = None
        ch.varyColors = False
    else:
        ch.legend.position = "t"
    ch.y_axis.delete = True
    ch.y_axis.majorGridlines = None
    ch.x_axis.delete = False
    ch.gapWidth = 60
    ch.width, ch.height = 22, 10
    ws.add_chart(ch, "G3")


def simple_bar(key, title, cats, vals, note, hi=(0,), fmt="{:g}%", nf='0"%"', ylim=None, horizontal=False):
    if horizontal:
        order = np.argsort(vals)
        fig, ax = plt.subplots(figsize=(9, 0.55 * len(cats) + 1.8))
        fig.subplots_adjust(top=0.84, bottom=0.12, left=0.40, right=0.96)
        ax.barh([cats[i] for i in order], [vals[i] for i in order],
                color=[ACC if i in hi else G1 for i in order], height=0.6)
        for k, i in enumerate(order):
            ax.text(vals[i] + max(vals) * 0.015, k, fmt.format(vals[i]), va="center", fontsize=10.5, fontweight="bold", color=INK)
        ax.set_xticks([])
        ax.set_xlim(0, max(vals) * 1.18)
        _style(ax, horizontal=True)
    else:
        fig, ax = plt.subplots(figsize=(8.5, 4.4))
        fig.subplots_adjust(top=0.82, bottom=0.2, left=0.03, right=0.99)
        ax.bar(cats, vals, color=[ACC if i in hi else G1 for i in range(len(vals))], width=0.6)
        top = ylim or max(vals) * 1.15
        for i, v in enumerate(vals):
            ax.text(i, v + top * 0.015, fmt.format(v), ha="center", fontsize=11, fontweight="bold", color=INK)
        ax.set_yticks([])
        ax.set_ylim(0, top)
        _style(ax)
    _frame(fig, title, note)
    fig.savefig(FIG + key + ".png", dpi=220, facecolor="white")
    plt.close(fig)
    ws = _sheet(key, title, ["Category", "Value"], [[c.replace("\n", " "), v] for c, v in zip(cats, vals)], note, nf)
    _xl_bar(ws, title, len(cats), 1, hi=hi, horizontal=horizontal, nf=nf)


def grouped(key, title, cats, series, note, colors=None, fmt="{:g}%", nf='0"%"'):
    colors = colors or [ACC, G2, G1, G3]
    fig, ax = plt.subplots(figsize=(9, 4.6))
    fig.subplots_adjust(top=0.8, bottom=0.2, left=0.03, right=0.99)
    n = len(series)
    w = 0.8 / n
    x = np.arange(len(cats))
    top = max(max(v) for _, v in series) * 1.15
    for j, (lab, vals) in enumerate(series):
        ax.bar(x + (j - (n - 1) / 2) * w, vals, w * 0.92, color=colors[j], label=lab)
        for i, v in enumerate(vals):
            ax.text(x[i] + (j - (n - 1) / 2) * w, v + top * 0.012, fmt.format(v), ha="center", fontsize=8.5, color=INK)
    ax.set_xticks(x)
    ax.set_xticklabels(cats, fontsize=9.5)
    ax.set_yticks([])
    ax.set_ylim(0, top)
    _style(ax)
    ax.legend(frameon=False, fontsize=9, ncol=n, loc="upper left", bbox_to_anchor=(0, 1.08))
    _frame(fig, title, note)
    fig.savefig(FIG + key + ".png", dpi=220, facecolor="white")
    plt.close(fig)
    rows = [[c.replace("\n", " ")] + [v[i] for _, v in series] for i, c in enumerate(cats)]
    ws = _sheet(key, title, ["Indicator"] + [l for l, _ in series], rows, note, nf)
    _xl_bar(ws, title, len(cats), n, colors=[hexx(c) for c in colors], nf=nf)


# ---------------------------------------------------------------- data + charts
# 1. EU ranking: Flash Eurobarometer 525 data annex, "Overall financial literacy score", high (9-10)
eu = {"Netherlands": 28, "Slovenia": 27, "Sweden": 27, "Denmark": 27, "Germany": 24, "Luxembourg": 23, "Estonia": 23,
      "Austria": 21, "Slovakia": 20, "Malta": 20, "Croatia": 20, "Belgium": 20, "Ireland": 19, "Italy": 18, "EU-27": 18,
      "France": 17, "Finland": 17, "Czechia": 17, "Lithuania": 16, "Hungary": 16, "Greece": 16, "Poland": 15,
      "Cyprus": 15, "Bulgaria": 15, "Spain": 13, "Romania": 12, "Portugal": 11, "Latvia": 11}
names, vals = list(eu), list(eu.values())
key, title = "01_eu_high_financial_literacy_ranking", "Share of adults with a high overall financial literacy score, 2023 (%)"
note = "Source: Flash Eurobarometer 525 (European Commission, 2023), data annex. Latvia is joint last with Portugal."
cols = [ACC if n_ == "Latvia" else G2 if n_ in ("Estonia", "Lithuania") else G3 if n_ == "EU-27" else G1 for n_ in names]
fig, ax = plt.subplots(figsize=(11, 4.8))
fig.subplots_adjust(top=0.84, bottom=0.25, left=0.03, right=0.99)
ax.bar(range(len(vals)), vals, color=cols, width=0.7)
for i, v in enumerate(vals):
    ax.text(i, v + 0.4, str(v), ha="center", fontsize=8.5, color=INK, fontweight="bold" if names[i] in ("Latvia", "Estonia", "Lithuania", "EU-27") else "normal")
ax.set_xticks(range(len(vals)))
ax.set_xticklabels(names, rotation=60, ha="right", fontsize=8.5)
for lab in ax.get_xticklabels():
    if lab.get_text() in ("Latvia", "Estonia", "Lithuania", "EU-27"):
        lab.set_fontweight("bold")
ax.set_yticks([])
ax.set_ylim(0, 32)
_style(ax)
_frame(fig, title, note)
fig.savefig(FIG + key + ".png", dpi=220, facecolor="white")
plt.close(fig)
ws = _sheet(key, title, ["Country", "High score (%)"], [[n_, v] for n_, v in eu.items()], note, "0")
_xl_bar(ws, title, len(eu), 1, hi=[names.index("Latvia")], nf="0")

# 2. Resilience and investing: FL525 Q8, Q9
grouped("02_baltic_resilience_investing", "Financial resilience and investing, 2023 (% of adults)",
        ["No emergency\nsavings", "Could live 6+ months\nwithout income", "Own funds, stocks\nor bonds", "Own crypto-assets"],
        [("Latvia", [26, 19, 9, 10]), ("Estonia", [15, 32, 24, 12]), ("Lithuania", [17, 36, 14, 11]), ("EU-27", [16, 33, 24, 6])],
        "Source: Flash Eurobarometer 525 (2023), Q8 and Q9. Latvia: highest share with no emergency savings in the EU; lowest with 6+ months.")

# 3. Knowledge decline: Latvijas Banka surveys 2015, 2022
grouped("03_knowledge_decline_2015_2022", "Latvian adults answering correctly, 2015 vs 2022 (%)",
        ["Divide €1,000\nby 5", "Interest-free\nloan = 0%", "Simple interest\n(€102)", "Compound interest\n(> €110)", "Inflation:\n'buy less'"],
        [("2015", [93, 89, 72, 48, 68]), ("2022", [85, 76, 58, 26, 41])],
        "Source: Latvijas Banka financial literacy surveys (2022: n = 1,007). Knowledge sub-index 5.1 → 3.9 of 7. 2022 inflation item used 21% inflation.",
        colors=[G1, ACC])

# 4. Index by age: Latvijas Banka 2022
simple_bar("04_finlit_index_by_age_2022", "Financial literacy index by age, 2022 (out of 20; all adults 12.2)",
           ["18–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70–79"], [8.0, 11.0, 12.6, 13.1, 11.9, 12.7, 11.9],
           "Source: Latvijas Banka survey 2022 (n = 1,007). The 18–19 group is about 30 respondents (indicative).",
           hi=(0, 1), fmt="{:.1f}", nf="0.0")

# 5. Where 9th graders learn: Latvijas Banka 9th-grade assessment 2025
grouped("05_ninth_grade_sources_of_money_info", "9th graders: how often they learn about money from each source (%)",
        ["Family", "Internet", "Friends", "School and clubs"], [("Always or often", [63, 46, 18, 9]), ("Never", [3, 8, 18, 36])],
        "Source: Latvijas Banka, 9th-grade assessment 2025 (n = 1,159, 75 schools). A further 31% learn about money at school only rarely.",
        colors=[ACC, G1])

# 6. 9th-grade risk exposure
simple_bar("06_ninth_grade_risk_exposure_2025", "9th graders (age ~15): exposure to risk and fraud, 2025 (%)",
           ["Offered 'easy money' online by strangers", "Believe Bitcoin is legal tender in Latvia",
            "Asked to pass money via own account (money mule)", "Scammed when buying online", "Bought crypto themselves",
            "Gave away a password, card number or PIN"], [48, 31, 18, 16, 12, 6],
           "Source: Latvijas Banka, 9th-grade financial literacy assessment, Feb–Apr 2025 (n = 1,159).", hi=(2,), horizontal=True)

# 7. NEW: fraud funnel, OECD/Kantar survey presented 20 Nov 2026
simple_bar("07_fraud_funnel_latvia_2026", "Financial fraud among Latvian adults, past two years (% of all adults)",
           ["Faced a fraud\nattempt", "Became a\nvictim", "Lost money"],
           [74, 27, 15],
           "Source: OECD & Latvijas Banka, Kantar survey (n = 1,400, ages 18–79), presented 20 Nov 2026. Lost money = 55% of victims. 37% of victims told no one.",
           hi=(1,))

# 8. NEW: fraud types
simple_bar("08_fraud_types_latvia_2026", "Most common types of financial fraud in Latvia, past two years (% of adults)",
           ["Purchase fraud (goods never arrive, fake invoices)", "Phishing", "Investment fraud", "Unauthorised transactions"],
           [15, 8, 6.5, 5.6],
           "Source: OECD project survey with Latvijas Banka (2026), via Latvijas Banka press release.", hi=(0,), horizontal=True)

# 9. NEW: two surveys over time
simple_bar("09_fraud_victims_two_surveys", "Adults who were victims of financial fraud in the past two years (%)",
        ["OECD/INFE 2023\n(Latvia)", "OECD/INFE 2023\n(Lithuania)", "OECD–Kantar 2026\n(Latvia)"],
        [18, 14, 27],
        "Sources: OECD/INFE International Survey of Adult Financial Literacy 2023; OECD–Latvijas Banka project survey 2026. Different surveys and wording: not a strict trend.",
        hi=(0, 2))

# 10. Effects of school financial education
simple_bar("10_school_finance_education_effects", "Effect of school financial education on knowledge (standard deviations)",
           ["Meta-analysis\n(37 studies)", "Brazil RCT\n(892 schools)", "Peru RCT\n(300 schools)", "Online game RCT\n(4 countries)"],
           [0.33, 0.25, 0.15, 0.313],
           "Sources: Kaiser & Menkhoff (2020); Bruhn et al. (2016); Frisancho (2020); Cannistrà et al. (2024). Behaviour effects ~+0.07 SD.",
           hi=(0, 1, 2, 3), fmt="+{:.2f}", nf='"+"0.00')

# 11. PISA 2018
simple_bar("11_pisa2018_financial_literacy", "PISA 2018 financial literacy, 15-year-olds (score)",
           ["Latvia", "OECD average", "Estonia"], [501, 505, 547],
           "Source: OECD PISA 2018 Vol. IV; IZM. Latvia, Estonia and Lithuania did not take part in PISA 2022 financial literacy.",
           hi=(0,), fmt="{:.0f}", nf="0", ylim=620)

# 12. Regular savers
simple_bar("12_regular_savers_baltics", "Share who regularly save more than 10% of income, 2025 (%)",
           ["Latvia", "Estonia", "Lithuania"], [14, 17, 23],
           "Source: Luminor / Norstat Baltic survey, September 2025 (n = 3,002).", hi=(0,))

# 13. NEW: youth risk landscape (different populations, labelled)
simple_bar("13_youth_risk_landscape", "Young people's exposure to financial risks in Latvia (%)",
           ["15–16-year-olds: gambled for money in past year", "9th graders: offered 'easy money' online",
            "9th graders: asked to be a money mule", "9th graders: bought crypto themselves",
            "15–16-year-olds: gambling excessively", "Households headed by 16–34: have debt"],
           [29, 48, 18, 12, 6.4, 70],
           "Sources: ESPAD 2024 (SPKC); Latvijas Banka 9th-grade assessment 2025; Latvijas Banka household data via IR. Different populations; not additive.",
           hi=(0, 2), horizontal=True)

# 14. NEW: online (distance) non-bank loans
simple_bar("14_online_nonbank_loans", "New online (distance) non-bank consumer loans in Latvia (€ million)",
           ["2024", "2025"], [417, 550],
           "Source: PTAC non-bank consumer lending market review, H2 2025 (2025: €550.0m, +31.9%; 2024 derived). All new non-bank lending passed €1bn in 2025.",
           hi=(1,), fmt="€{:.0f}m", nf='"€"0"m"')

wb.save(XLSX)
print("saved", XLSX)
