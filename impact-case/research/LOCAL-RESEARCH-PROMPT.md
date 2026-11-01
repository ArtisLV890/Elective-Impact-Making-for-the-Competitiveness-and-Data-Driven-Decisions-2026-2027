# Prompt for a Claude session on my own computer

Paste the text below into Claude Code on your computer. Run it in the folder where this repo is cloned, with the **Claude in Chrome** extension connected, so it can use your EBSCO login and reach Eurostat.

---

You are continuing research for my SSE Riga elective impact case on the **Riga Knowledge Mile**. Everything done so far is in this repo:
- `reports/Riga Knowledge Mile impact case.md`, the main report. Its section "Evidence register: figures to re-check before 3 November" is the to-do list.
- `research_notes/Riga Knowledge Mile impact case/`, the raw notes.
- `impact-case/research/`, with `starred-papers.md`, `sources.md` and `laser-knowledge-mile-summary.md`.
- `impact-case/01-case-description.md` and `impact-case/02-presentation-7min.md`, the drafts.

The earlier research ran in the cloud, where Eurostat, likumi.lv, EBSCO and the publisher sites were blocked, so most figures came from search snippets. **Your job is to verify everything against primary sources using my Chrome browser, read the key papers in full, and fix the files.**

## 1. Real data: open the actual tables
- **Eurostat, `nama_10r_3gdp`:** GDP per inhabitant in PPS (and as % of the EU27 average) for **LV006 Riga, LT011 Vilnius and EE001 Tallinn**, 2000–latest. Save it as a CSV in `research_notes/data/`. Check:
  - the "Vilnius about 36% richer than Riga (2024)" claim;
  - whether Riga is the **poorest EU capital region** (rank all capital NUTS3 regions).
- **Eurostat:** R&D intensity (`rd_e_gerdtot`) for LV, LT and EE, 2015–latest. Tertiary attainment of 25–34-year-olds (`edat_lfse_03`).
- **Statistics Latvia (data.stat.gov.lv):** Riga population 2000–2026. Number of students and international students by university (LU, RTU, RSU, RISEBA, BA Turība).
- **European Innovation Scoreboard 2026:** the LV, EE and LT country profiles (summary index, rank, business R&D, venture capital).
- **QS Best Student Cities 2027** (topuniversities.com): the ranks of Riga, Vilnius and Tallinn. **Oxford Economics Global Cities Index 2026**, if accessible.
- **likumi.lv:**
  - Augstskolu likums;
  - MK No. 240 (the free-choice part minimum);
  - MK No. 793 and 795;
  - MK No. 252 annex (how patents, licences and spin-offs are weighted);
  - Zinātniskās darbības likums;
  - the public-property disposal law (IP auction).
  
  Also check the status of draft act **25-TA-879** on tapportals.mk.gov.lv.

## 2. Read these papers in full (EBSCO, or the publisher site via my university login)
Extract the exact design, data, main effect sizes (with table or page numbers) and limitations of each:
1. Boschma (2005), *Regional Studies* 39(1)
2. Catalini (2018), *Management Science* 64(9). Confirm or correct the "3.5×" figure.
3. Boudreau et al. (2017), *REStat* 99(4)
4. Delgado, Porter & Stern (2014), *Research Policy* 43(10)
5. Toivanen & Väänänen (2016), *REStat* 98(2)
6. Valero & Van Reenen (2019), *Economics of Education Review* 68
7. Hvide & Jones (2018), *AER* 108(7)
8. Andrews (2023), *AEJ: Policy* 15(2)
9. Russo, van den Berg & Lavanga (2007), *JPER* 27(2)
10. Martin & Sunley (2003), *JEG* 3(1)
11. Etzkowitz & Leydesdorff (2000), *Research Policy* 29(2)
12. Nathan (2022), *Research Policy* 51(9) (London Tech City)

Also search EBSCO (Business Source, EconLit) for:
- peer-reviewed studies on **innovation district / knowledge district governance**;
- **Baltic science parks or innovation ecosystems** (Riga, Vilnius, Tallinn, Tartu);
- **university–city partnerships**;
- **international student retention in Latvia or the Baltics**.

Add the 5–10 best new papers you find.

## 3. Output
- Save a per-paper reading note to `research_notes/Riga Knowledge Mile impact case/papers_full_text.md`, with exact quotes and page numbers for the key claims.
- Save the data to `research_notes/data/*.csv`, with a `README` that lists each source URL and the download date.
- Update the evidence register in the report. Mark each row **verified**, **corrected (old → new)** or **still unverified**.
- Fix any wrong numbers in the report, `impact-case/01-case-description.md` and `impact-case/02-presentation-7min.md`.
- Regenerate the Word version: `pandoc "reports/Riga Knowledge Mile impact case.md" -o "reports/Riga Knowledge Mile impact case.docx"`
- Commit and push to `main`.
