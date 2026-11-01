# Verification status — 1 November 2026

Progress report on the local-machine verification pass requested in `impact-case/research/LOCAL-RESEARCH-PROMPT.md`. This pass had live internet and a logged-in EBSCO session; the earlier cloud-based research round did not.

## Done — verified against primary sources

### Eurostat
- **Major correction**: the report's headline "Riga is the poorest EU capital, ~77% of EU average" does not hold up. Riga's NUTS3 code changed from **LV006 to LV00A** under the 2021 NUTS classification — LV006 now returns no data, which is almost certainly why the earlier round couldn't check this against a Eurostat table.
- Riga's latest available year is **2023** (Eurostat hasn't published Latvia's 2024 regional figure yet, unlike Lithuania/Estonia). 2023 figures: Riga 38,700 PPS/capita = **101% of EU27 average** (slightly *above* average, not 77% below); Vilnius 50,100 PPS = 131%; Tallinn (Põhja-Eesti) 41,000 PPS = 107%.
- Ranking all 27 EU capital-region NUTS3 units for 2023: **Riga is 2nd-poorest, not poorest.** Cyprus's capital region (97%) is actually the poorest; Riga (101%) is just ahead of it.
- Vilnius is ~29.5% richer than Riga on this data, not 36% (that 36% figure, per the report's own [S] flag, came from a Luminor economist's preliminary 2024 estimate of unclear methodology — not comparable to the Eurostat NUTS3 series).
- R&D intensity, tertiary attainment (25–34) pulled for LV/LT/EE, 2015/1998–2024/2025. Minor refinement: Latvia R&D intensity 2023 = 0.82%, 2024 = 0.94% (report said 0.83%/0.92% — close but not exact).
- Full data: `research_notes/data/eurostat_*.csv`.

### Statistics Latvia (CSB)
- Riga population 2000–2026 pulled via PxWeb API. **2026 figure (588,911) confirms the report's "~589,000" exactly.**
- National tertiary enrolment and international-student totals pulled 1998–2025. **CSB's public API has no per-institution breakdown** (only state/private and field of study) — the per-university LU/RTU/RSU/RISEBA/BA Turība numbers in the report don't come from CSB and still need checking elsewhere.
- Full data: `research_notes/data/csb_*.csv` / `.json`, with method notes in `research_notes/data/README.md`.

### European Innovation Scoreboard 2026
- Downloaded and read all three country-profile PDFs directly from the European Commission. **All three headline figures confirmed exactly**: Latvia 61.0% (25th), Estonia 108.6% (11th), Lithuania 86.6% (18th).

### QS Best Student Cities 2027
- Read live from the official source. **Riga #105 and Vilnius =#114 confirmed exactly.** **Correction: Tallinn is =#135, not #129** as stated in the report.

### Oxford Economics Global Cities Index 2026
- Read live from the official city-search tool. **All three confirmed exactly**: Riga #351, Vilnius #264, Tallinn #207.

### likumi.lv (full consolidated texts, not snippets)
- MK No. 240: confirmed compulsory (≥60 KP) and restricted-choice (≥30 KP) minimums; **confirmed there genuinely is no minimum set for the free-choice part** (not just "not found in a snippet" — it isn't there).
- MK No. 793: confirmed in force to 2028; confirmed the free-choice part is explicitly excluded from academic-staff-workload calculations.
- MK No. 795: confirmed it governs joint-programme licensing.
- MK No. 252: **the patent/article weighting is in the funding formula itself, not a separate annex.** Exact coefficients confirmed — international patent = Q1 journal article = peer-reviewed monograph (all coefficient 3); Q2 article = coefficient 2; EU Framework project funding gets its own, separate ×2 multiplier; licences and spin-offs appear nowhere in the formula at all.
- Zinātniskās darbības likums (2024 amendment, in force 2025): confirmed ownership and commercialisation-strategy provisions; confirmed the law itself does **not** mandate an auction — it just requires "market-equivalent" remuneration. Found a hard deadline: implementing MK regulations were due **30 June 2025**.
- Publiskas personas mantas atsavināšanas likums: confirmed Art. 3(2) sets auction as the **default** disposal method for public property, and confirmed Art. 2(2)(1)'s carve-out for "mantiskas tiesības" is genuinely ambiguous on whether it covers IP — the text itself doesn't resolve the question LaSER and the 2023–2025 TAP consultation were arguing about.
- Full detail and citations: `research_notes/Riga Knowledge Mile impact case/latvian_regulation_and_actors.md` (new "Verification update" section).

## Papers read in full (user sent PDFs directly, saved to `papers/`)

5 of 12 core papers read and findings confirmed against the report's claims:

1. **Boschma (2005)**, *Regional Studies* 39(1), 61–74. Confirmed DOI 10.1080/0034340052000320887. Five dimensions of proximity (cognitive, organizational, social, institutional, geographical); geographical proximity alone is neither necessary nor sufficient for interactive learning — exactly the framework the report cites for why the Knowledge Mile's geographic proximity hasn't produced collaboration.
2. **Catalini (2018)**, *Management Science* 64(9), 4348–4364. **The "3.5×" figure in the report is exact**: "colocation increases the likelihood that two labs will collaborate by 3.5 times" (Jussieu campus asbestos-relocation natural experiment). Effect driven by lab pairs with higher search costs ex ante.
3. **Delgado, Porter & Stern (2014)**, *Research Policy* 43(10), 1785–1799. Confirms cluster-agglomeration effects on regional employment/patenting growth net of convergence; a one-SD increase in cluster strength → ~1.3pp higher annual employment growth.
4. **Boudreau et al. (2017)**, *Review of Economics and Statistics* 99(4), 565–576. **Confirmed exactly**: random assignment to the same 90-minute breakout room raised the probability of co-applying for a grant by 75% (0.16%→0.28%). Effect concentrated among pairs in the same clinical area — directly analogous to a Knowledge Mile cross-enrolment/shared-space intervention.
5. **Toivanen & Väänänen (2016)**, *Review of Economics and Statistics* 98(2), 382–396. Using distance-to-nearest-technical-university as an instrument: university engineering education has a positive causal effect on patenting; counterfactual shows Finland's 3 new technical universities raised national USPTO patents by ~20%. Useful analogy for "more/closer higher-education capacity → more invention."

## Not done yet

- **7 of the 12 core papers** still unread: Valero & Van Reenen (2019), Hvide & Jones (2018), Andrews (2023), Russo/van den Berg/Lavanga (2007), Martin & Sunley (2003), Etzkowitz & Leydesdorff (2000), Nathan (2022). Three more PDFs were sent by the user and sit in `papers/` unread (`EBSCO-FullText-11_01_2026 (4).pdf`, `(5).pdf`, and `1-s2.0-S0048733320302134-main.pdf`) — these should be read next.
- The EBSCO search for 5–10 new papers on innovation-district governance, Baltic science parks, university–city partnerships, and international-student retention — not started.
- `papers_full_text.md` reading notes — not started (depends on the above).
- Augstskolu likums Art. 50, 55, 55.¹ (student rights / programme structure / joint programmes) — not pulled.
- Current Minister for Education and Science, and current rectors of LU, RSU, RISEBA and BA Turība — not checked.
- Status of draft MK regulation 25-TA-879 (IP commercialisation) on the TAP portal — attempted, blocked (its annotation is a .docx that downloads rather than renders).
- Per-institution student and international-student counts for LU, RTU, RSU, RISEBA and BA Turība — not available via CSB's public API; needs another source (each university's own published statistics, or a secondary compiler).
- Updating the evidence register and fixing the wrong numbers in `reports/Riga Knowledge Mile impact case.md`, `impact-case/01-case-description.md` and `impact-case/02-presentation-7min.md` — not started. All the verified figures above are ready to drop in; this is the next step once the papers are in hand.
- Regenerating the Word version via pandoc.

## Corrections ready to apply to the evidence register

| Report claim | Status | Correct figure |
| --- | --- | --- |
| Vilnius +36% vs Riga, Riga ~77% of EU average | **Corrected** | Riga 2023 = 101% of EU avg (38,700 PPS); Vilnius 2023 = 131% (50,100 PPS); Vilnius is ~29.5% richer than Riga, not 36% |
| "Poorest EU capital" | **Corrected** | Riga is 2nd-poorest of 27 EU capital regions (2023); Cyprus's capital region is poorest |
| EIS 2026: LV 61.0% (25th), EE 108.6% (11th), LT 86.6% (18th) | **Verified exactly** | No change |
| QS Best Student Cities 2027: 105 / 114 / 129 | **Partly corrected** | Riga 105 ✓, Vilnius =114 ✓, Tallinn =135 (not 129) |
| Oxford Economics 351 / 264 / 207 | **Verified exactly** | No change |
| Riga population ~589,000 (2026) | **Verified exactly** | 588,911 |
| R&D 0.92% (2024) vs 0.83% (2023) | **Verified, minor refinement** | 0.94% (2024) vs 0.82% (2023) |
| MK No. 240 free-choice minimum | **Verified: none exists** | No minimum stated in the regulation |
| MK No. 252 weighting (patent = Q1 article, etc.) | **Verified exactly** | Confirmed; see detail above |
