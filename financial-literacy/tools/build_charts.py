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

# 8. NEW: fraud types (full OECD report, section 3.2)
simple_bar("08_fraud_types_latvia_2026", "Adults who became victims, by type of fraud, past two years (% of adults)",
           ["Purchase scam (goods never arrive, fake invoices)", "Phishing", "Investment fraud", "Unauthorised payment",
            "Gave PIN, password or Smart-ID to a fraudster", "Friend-in-need or romance scam"],
           [15, 8, 6.5, 6, 5, 4.5],
           "Source: OECD (2026), Improving Adults' Resilience Against Financial Scams and Frauds in Latvia, section 3.2 (Kantar survey, n = 1,400, Jul–Sep 2025). Money mules: under 2%.",
           hi=(0,), horizontal=True)

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

# 15. NEW: online fraud losses reported to police
simple_bar("15_fraud_losses_police", "Online fraud losses reported to the State Police (€ million)",
           ["2023", "2024", "2025"], [8.5, 16.1, 23.7],
           "Source: State Police data presented at the Riga workshop (April 2026), in OECD (2026), section 3.1.1. 2025: +47% on 2024.",
           hi=(2,), fmt="€{:.1f}m", nf='"€"0.0"m"')

# 16. NEW: police-recorded fraud events
simple_bar("16_fraud_cases_police", "Fraud events recorded by the State Police",
           ["2024", "2025"], [4000, 8701],
           "Source: OECD (2026), section 3.1.1. 2024 is approximate (\"around 4 000\"); 2025 = 3,165 events with losses + 5,536 attempts.",
           hi=(1,), fmt="{:,.0f}", nf="#,##0")

# 17. NEW: bank fraud prevented vs realised
grouped("17_bank_fraud_prevented_realised", "Fraud at the four largest banks: prevented vs realised (€ million)",
        ["2022", "2025"], [("Prevented", [5.6, 14.0]), ("Realised (money lost)", [12.0, 12.2])],
        "Source: Finance Latvia Association data (April 2026 workshop), in OECD (2026), section 3.1.1.",
        fmt="€{:.1f}m", nf='"€"0.0"m"')

# 18. NEW: warning signs recognised
simple_bar("18_warning_signs_recognised", "Warning signs recognised by adults who were targeted (%)",
           ["Foreign phone number", "Caller speaks another language", "Suspicious links", "Grammar mistakes",
            "Offer too good to be true", "Pressure to act urgently"],
           [63, 57, 54, 38, 31, 29],
           "Source: OECD (2026), section 3.7.4. Only 8% of targeted adults reported the attempt to the police.",
           hi=(5,), horizontal=True)

# 19. NEW: Peru knowledge gains (Frisancho 2021/2023)
grouped("19_peru_knowledge_gains", "Peru: gain in financial knowledge (SD), offered vs took part",
        ["All students", "Grade 9", "Grade 10", "Grade 11", "Teachers"],
        [("Offered (ITT)", [0.16, 0.17, 0.11, 0.20, 0.32]), ("Teacher trained / taught (ATT)", [0.20, 0.21, 0.14, 0.25, 0.46])],
        "Source: Frisancho (2021 manuscript; Economic Journal 2023), Tables 1, 10, A.11, A.18.",
        fmt="+{:.2f}", nf='"+"0.00')

# 20. NEW: Peru teacher take-up
simple_bar("20_peru_teacher_takeup", "Peru: teacher take-up in programme schools (% of teachers)",
           ["Attended at least 1 training session", "Attended all 5 training sessions", "Taught all lessons", "Taught some lessons", "Taught none of the lessons"],
           [73, 43, 48, 21, 31],
           "Source: Frisancho (2021 manuscript), section 2.6. 'None' is about one third.", hi=(4,), horizontal=True)

# 21. NEW: Peru behaviour effects
simple_bar("21_peru_behaviour_effects", "Peru: effects on behaviour (percentage points vs comparison group)",
           ["Teachers: saves in a bank", "Teachers: saves", "Students grade 9: saves", "Students grade 11: saves",
            "Grade 9: in credit bureau (2019)", "Grade 9 taught twice (Piura): in credit bureau (2019)", "Teachers: late loan payments (2018)"],
           [14, 8.7, 3.5, 2.3, -6.5, -15, -7.7],
           "Source: Frisancho (2021 manuscript), Tables 5, 8, 9, 11, 13. Negative = less debt / fewer late payments.",
           hi=(0,), fmt="{:+.1f}", nf='+0.0;-0.0')

# 22. NEW: hours in tested school programmes
simple_bar("22_school_programme_hours", "Hours of financial education in experimentally tested school programmes",
           ["Bruhn et al. 2016 (Brazil, 72–144)", "Peru 2016 (16–32, average)", "Batty et al. 2020 (USA)", "Becchetti et al. 2013 (Italy)",
            "Alan & Ertac 2018 (Turkey)", "Hinojosa et al. 2009 (USA)", "Bover et al. 2018 (Spain)", "Lührmann et al. 2018 (Germany)", "Batty et al. 2015 (USA)"],
           [108, 24, 20, 16, 16, 15, 10, 4.5, 4],
           "Source: Frisancho (2021 manuscript), Table A.3 (midpoints for ranges).", hi=(1,), fmt="{:g}", nf="0.#", horizontal=True)

# ---------------------------------------------------------------- ORIGINAL charts from the source reports
from openpyxl.drawing.image import Image as XLImage
ORIG = "financial-literacy/presentation/source-figures/"
originals = [
    ("O1 EU overall score", "eb_overall_score_by_country.png", "Overall financial literacy score by country (EU-27), 2023", "European Commission, Flash Eurobarometer 525 (2023), figure F3, p. 17. Latvia (LV) is second from the right: 11% high score."),
    ("O2 EU emergency savings", "eb_emergency_savings_by_country.png", "How long people could cover living expenses after losing income, 2023", "European Commission, Flash Eurobarometer 525 (2023), Q8, p. 26. Latvia (LV) is the last column."),
    ("O3 LV index trend", "lb2022_index_trend.png", "Latvian financial literacy index vs OECD average", "Latvijas Banka, Latvijas iedzīvotāju finanšu pratības aptauja 2022, p. 7."),
    ("O4 LV index by age", "lb2022_index_by_age.png", "Financial literacy index by gender and age, 2022", "Latvijas Banka, financial literacy survey 2022 (n = 1,007), p. 8."),
    ("O5 LV knowledge score", "lb2022_knowledge_score.png", "Financial knowledge score out of 7, 2015 vs 2022", "Latvijas Banka, financial literacy survey 2022, p. 9."),
    ("O6 LV simple interest", "lb2022_simple_interest.png", "Simple interest question: correct answers (red), 2015 / 2019 / 2022", "Latvijas Banka, financial literacy survey 2022, p. 52."),
    ("O7 LV compound interest", "lb2022_compound_interest.png", "Compound interest question: correct answers (red), 2015 / 2019 / 2022", "Latvijas Banka, financial literacy survey 2022, p. 52."),
    ("O8 LV financial shocks", "lb2022_financial_shocks.png", "Could you cover an expense equal to a month's income without borrowing?", "Latvijas Banka, financial literacy survey 2022, p. 24."),
    ("O9 9th grade index", "lb9_index.png", "9th-grade financial literacy index, 2025", "Latvijas Banka / RAIT, 9th-grade financial literacy assessment 2025 (n = 1,159), slide 7."),
    ("O10 9th grade info", "lb9_info_sources.png", "Where 9th graders get information about money, 2025", "Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 15."),
    ("O11 9th grade risks", "lb9_risky_situations.png", "9th graders' experience with risky or fraudulent situations, 2025", "Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 25."),
    ("O12 9th grade family", "lb9_family_decisions.png", "Who makes everyday money decisions in the family (9th graders), 2025", "Latvijas Banka / RAIT, 9th-grade assessment 2025, slide 13."),
    ("O13 Peru timeline", "peru_fig1_timeline.png", "Peru school financial education pilot: study timeline", "Frisancho (2021 manuscript), Figure 1."),
    ("O14 Peru literacy-behaviour", "peru_fig4_literacy_behaviour.png", "Peru: financial literacy vs saving and budgeting at baseline", "Frisancho (2021 manuscript), Figure 4."),
    ("O15 Peru meta-analysis", "peru_fig5_meta_analysis.png", "Experimental evidence on youth financial education: effects on knowledge", "Frisancho (2021 manuscript), Figure 5."),
]
orig_index = wb.create_sheet("Original charts", 1)
orig_index["A1"] = "Original charts from the source reports (reproduced with source and page)"
orig_index["A1"].font = Font(bold=True, size=13, color=hexx(INK))
orig_index.append([])
orig_index.append(["Sheet", "Chart", "Source"])
for c in orig_index[3]:
    c.font = Font(bold=True, color="FFFFFF")
    c.fill = PatternFill("solid", fgColor=hexx(INK))
orig_index.column_dimensions["A"].width = 26
orig_index.column_dimensions["B"].width = 70
orig_index.column_dimensions["C"].width = 95
for pos, (sheet, file, title, source) in enumerate(originals):
    ws = wb.create_sheet(sheet[:31], 2 + pos)
    ws["A1"] = title
    ws["A1"].font = Font(bold=True, size=13, color=hexx(INK))
    ws["A2"] = "Source: " + source
    ws["A2"].font = Font(italic=True, size=9, color=hexx(SEC))
    im = XLImage(ORIG + file)
    scale = 900 / im.width
    im.width, im.height = int(im.width * scale), int(im.height * scale)
    ws.add_image(im, "A4")
    ws.column_dimensions["A"].width = 12
    orig_index.append([sheet, title, source])

wb.save(XLSX)
print("saved", XLSX)
