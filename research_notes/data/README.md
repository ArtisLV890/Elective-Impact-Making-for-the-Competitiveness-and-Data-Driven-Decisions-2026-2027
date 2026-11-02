# Data sources — Riga Knowledge Mile impact case

All files below were pulled directly from primary-source APIs/sites on **1 November 2026**, from a local machine with full internet access (not the cloud sandbox used for the earlier research round, which could not reach Eurostat, Statistics Latvia, or likumi.lv).

## Eurostat (ec.europa.eu/eurostat/api/dissemination)

| File | Source | Notes |
| --- | --- | --- |
| `eurostat_gdp_pps_baltic_capitals_timeseries.csv` | Dataset `nama_10r_3gdp`, geo=LV00A/LT011/EE001, units PPS_EU27_2020_HAB and PPS_HAB_EU27_2020, 2000–2024 | **Riga's NUTS3 code changed from LV006 to LV00A under the 2021 NUTS classification.** LV006 returns no data. Latvia's 2024 regional figure is not yet published by Eurostat; Riga's latest year is 2023. |
| `eurostat_gdp_pps_eu_capital_regions_2023_ranking.csv` | Same dataset, all 27 EU member-state capital-region NUTS3 codes, 2023 (latest common year) | Capital NUTS3 codes assembled manually (documented in the script); flagged two corrections mid-build: Netherlands is NL32B (Groot-Amsterdam), not NL329; Portugal is PT1A0 (Grande Lisboa), not PT170. |
| `eurostat_rd_intensity_gdp_pct.csv` | Dataset `rd_e_gerdtot`, geo=LV/LT/EE, sectperf=TOTAL, unit=PC_GDP, 1998–2024 | |
| `eurostat_tertiary_attainment_25_34.csv` | Dataset `edat_lfse_03`, geo=LV/LT/EE, age=Y25-34, sex=T, all ISCED levels, 1998–2025 | Filter to `isced11_code == 'ED5-8'` and `sex_code == 'T'` for the standard "tertiary attainment" headline figure. |

## Statistics Latvia / CSB (data.stat.gov.lv, PxWeb API)

| File | Source | Notes |
| --- | --- | --- |
| `csb_riga_population_2000_2026.csv` | Tables `IRS031` (2012–2026, current post-2021-ATR boundaries) and `IRS030` (archive, pre-2021-ATR boundaries) | Riga's AREA code is `LV0001000` in both tables but the two tables use different methodologies/boundaries for overlapping years (e.g. 2012: 649,853 archive vs 636,933 current) — this is a genuine methodology break in the source, not a data-entry error. |
| `csb_national_tertiary_enrolment_1980_2025.json` | Table `IGP010`, indicator `ENRA_BEG` (enrolment at beginning of school year) | National total only. **CSB's public API does not break enrolment down by individual institution** (only by STATE/PRIVATE and by field of education) — the per-university figures for LU/RTU/RSU/RISEBA/BA Turība in the report come from another source (LaSER/each university), not from CSB, and still need checking against each institution's own published statistics. |
| `csb_national_international_students_2014_2025.json` | Table `IGA050`, "mobile students" (COUNTRY=TOTAL vs COUNTRY=MOBS), education level ED5-8 | National total only, same institution-breakdown limitation as above. 2025: 11,895 / 76,384 = 15.6% international; 2023: 10,425/74,017 = 14.1%. The report's "13.4%" figure is in the right range but doesn't exactly match any single year in this series — flag for the evidence register. |

## European Innovation Scoreboard 2026

PDFs downloaded directly from `ec.europa.eu/assets/rtd/eis/2026/ec_rtd_eis-country-profile-{lv,ee,lt}.pdf` (not re-saved into this folder — read in place and figures transcribed into the evidence register). All three headline figures (LV 61.0/25th, EE 108.6/11th, LT 86.6/18th) matched the report exactly.

## QS Best Student Cities 2027

Read live from `topuniversities.com/city-rankings` (search filter per city), 1 November 2026. Riga #105 (score 59.7), Vilnius =#114 (score 56.1), Tallinn =#135 (score 50.6, **not #129 as in the report — correction**).

## Oxford Economics Global Cities Index 2026

Read live from `oxfordeconomics.com/global-cities-index/` (city search tool), 1 November 2026. Riga #351, Vilnius #264, Tallinn #207 — all matched the report exactly.

## likumi.lv

Read live, full consolidated text, 1 November 2026 (not saved as separate files — see the updated `research_notes/Riga Knowledge Mile impact case/latvian_regulation_and_actors.md` for citations and exact article text):
- MK Noteikumi Nr. 240 (likumi.lv/ta/id/266187)
- MK Noteikumi Nr. 793 (likumi.lv/ta/id/303956)
- MK Noteikumi Nr. 795 (likumi.lv/ta/id/303957)
- MK Noteikumi Nr. 252 (likumi.lv/ta/id/331784)
- Grozījumi Zinātniskās darbības likumā, 2024 (likumi.lv/ta/id/357463)
- Publiskas personas mantas atsavināšanas likums (likumi.lv/ta/id/68490)

## World Bank (via the datasets/gdp and datasets/population mirrors on GitHub)

| File | Source | Notes |
| --- | --- | --- |
| `worldbank_gdp_population_baltics_2000_2023.csv` | World Bank WDI GDP (current US$, `NY.GDP.MKTP.CD`) and population (`SP.POP.TOTL`), as republished under CC-BY 4.0 at `github.com/datasets/gdp` (last updated 2026-04-08) and `github.com/datasets/population`; downloaded 1 November 2026 | Country level, 2000–2023. Nominal US dollars, so year-to-year changes include exchange-rate effects (e.g. the 2015 euro–dollar drop). Eurostat's country-level PPS series (`tec00114` / `nama_10_pc`) could not be reached from the cloud session. |

## QS Best Student Cities 2027 (European cities)

| File | Source | Notes |
| --- | --- | --- |
| `qs_best_student_cities_2027_europe.csv` | QS Quacquarelli Symonds, *QS Best Student Cities 2027* (published 21 July 2026), table copied by the user from topuniversities.com/city-rankings on 2 November 2026 | 57 European cities (38 in EU member states) with global rank, overall score and six indicator scores. The last three indicator column names (desirability, affordability, rankings) are inferred from the QS layout; check them on the site. Wroclaw's last three indicators were missing from the copied data. |
