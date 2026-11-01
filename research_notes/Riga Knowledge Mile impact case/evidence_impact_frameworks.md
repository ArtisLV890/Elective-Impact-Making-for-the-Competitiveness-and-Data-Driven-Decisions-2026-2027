# Evidence base: expected impact, why proximity fails, and frameworks/methods for the Riga Knowledge Mile impact case

**Scope and verification status (read first).** These notes cover four things: (1) what the causal literature says about the impact of universities and clusters; (2) why co-location alone does not produce interaction; (3) evidence on governance and coordination, talent retention, risks and counter-evidence; and (4) frameworks and methods for the appendix. Compiled 1 November 2026.

**How the citations were checked.**
- The fetch tool could not reach most primary hosts. These returned ENOTFOUND: nber.org, ideas.repec.org, cepr.org, repec.cepr.org, cep.lse.ac.uk, brookings.edu, aeaweb.org and researchonline.lse.ac.uk. **No full text was opened.**
- Every figure below comes from search-engine snippets of publisher or repository abstracts, working-paper abstracts, or press and blog summaries. The type of source is stated for each one.
- **"Abstract-level"** means the figure appears in the paper's own abstract (journal or working-paper version), as surfaced by search.
- **"Secondary"** means a press release, blog or third-party summary. Treat those figures as provisional and check them against the PDF before final use.
- Background files were read and are extended here: `impact-case/research/starred-papers.md` and `impact-case/research/laser-knowledge-mile-summary.md`.

---

## Q1. What impact can we expect? Effect sizes of universities and clusters on growth and innovation (with Riga back-of-envelope)

### Takeaway
The causal literature consistently finds that universities and strong clusters raise local output, wages, patenting and firm entry. The effects are **modest per unit of input** (elasticities of roughly 0.04–0.05 for GDP or labour income), **local** (they decay with distance), and **larger when firms are technologically close and research is strong**.

For Riga, the relevant counterfactual is not "build a university" but "make existing universities interact". So the closest evidence comes from matching and coordination interventions (Q2/Q3): a structured matchmaking session raised collaboration by 75%, and cutting face-to-face meetings by a quarter cut citations by 8%. Headline "new university" effects (+62% patents, about +20% national patents) are upper-bound context, not forecasts.

### Cited findings, paper by paper

**Valero, A. & Van Reenen, J. (2019).** "The economic impact of universities: Evidence from across the globe." *Economics of Education Review*, 68, 53–67. (NBER WP 22501 / CEPR DP11462, 2016.)
- **Data:** about 15,000 universities in about 1,500 sub-national regions of 78 countries, 1950–2010.
- **Method:** regional panel with fixed effects and controls for regional trends. The design is associational, not a natural experiment.
- **Finding:** doubling the number of universities per capita is associated with **over 4% higher future GDP per capita** in the region, with **spillovers to neighbouring regions** ([LSE CEP summary via search](https://cep.lse.ac.uk/_NEW/NEWS/abstract.asp?index=5849); [NBER WP page via search](https://www.nber.org/papers/w22501)).
- **Mechanisms:** the effect is not just university, staff and student spending. Part runs through **human capital supply and innovation, but those magnitudes are "not large"** ([NBER](https://www.nber.org/papers/w22501)).
- **UK illustration (secondary):** one extra university per region raises national income by about 0.7% ([europeansources summary](https://www.europeansources.info/record/growth-multiplier-how-university-expansion-increases-national-income/)).
- **Unconfirmed:** the brief's "10% more universities gives +0.4% GDP per capita" was **not found verbatim** in any snippet. It is arithmetically consistent with the doubling result (an elasticity of about 0.04–0.06) but should be phrased as "doubling gives about 4%" unless checked against the PDF.
- **Limitations:** observational, so reverse causality is only partly addressed through lags and trends. The unit is the *number* of universities, not their connectedness.

**Delgado, M., Porter, M. E. & Stern, S. (2014).** "Clusters, convergence, and economic performance." *Research Policy*, 43(10), 1785–1799. (NBER WP 18250.)
- **Data:** US Cluster Mapping Project, 177 economic areas, 41 traded clusters, 589 industries, 1990–2005.
- **Method:** panel regressions that separate convergence (mean reversion of an industry's own size) from cluster-driven agglomeration.
- **Finding:** after controlling for convergence, industries in a **strong cluster** have higher growth in **employment, wages, number of establishments and patenting**. Growth also rises with the strength of **related clusters in the region** and **similar clusters in adjacent regions**, and new industries emerge where clusters are strong ([NBER WP abstract via search](https://nber.org/papers/w18250); [MIT News](https://news.mit.edu/2014/industrial-clusters-fuel-jobs-innovation-1219)).
- **Secondary:** a one-standard-deviation increase in specialisation is linked to about **+1.3 pp annual employment growth** ([WEF summary](https://www.weforum.org/stories/2014/12/how-industrial-clusters-boost-growth/)). Verify before use.
- **Limitations:** US data at the industry-region level, conditional correlations. The paper is about industry clusters, not universities.

**Toivanen, O. & Väänänen, L. (2016).** "Education and invention." *Review of Economics and Statistics*, 98(2), 382–396. (CEPR DP8537, 2011.)
- **Data:** Finnish inventors on USPTO patents, linked to Finnish register data.
- **Method:** IV, using **distance to the nearest technical university** as the instrument for M.Sc. engineering education.
- **Finding:** a positive causal effect of engineering education on the propensity to patent. The OLS bias is negative, so OLS understates the effect.
- **The ~20% figure is confirmed at abstract level.** In the counterfactual, establishing **three new technical universities** (post-war) **raised USPTO patents by Finnish inventors by about 20%** ([Aalto research portal](https://research.aalto.fi/en/publications/education-and-invention/); [CEPR DP abstract via Causal Claims](https://causalclaims.trfetzer.com/paper/DP8537.html)). The authors' VoxEU column states the same result in reverse: without the new universities, patents would have been about 20% lower ([VoxEU/CEPR](https://cepr.org/voxeu/columns/does-education-lead-more-innovation-0)).
- **Limitations:** the effect operates through *more engineers*, not through university–industry interaction. Distance-IV validity relies on university location being unrelated to unobserved family background.
- **Not retrieved:** the exact marginal effect per graduate.

**Cowan, R. & Zinovyeva, N. (2013).** "University effects on regional innovation." *Research Policy*, 42(3), 788–800. (Earlier versions: UNU-MERIT WP 2007-037 / BETA WP 2008-02, "Short-term effects of new universities on regional innovation"; FEDEA 2009-20.)
- **Data:** Italian university expansion of 1985–2000, with new science, medicine and engineering departments opening across regions.
- **Method:** regional panel. The timing of openings works as a quasi-natural experiment.
- **Finding (working-paper abstract):** opening a new department raised regional **industry patenting by about 10% on average**, with effects appearing **within 3–4 years**. That is too fast to be explained by more or better graduates. Academic research outputs (publications, patents) explain only **about 30%** of the effect ([UNU-MERIT abstract via search](https://www.merit.unu.edu/publications/working-papers/abstract/?id=3017)).
- **Journal abstract:** the effect is driven mainly by **high-quality scientific research** brought by new schools ([Maastricht CRIS](https://cris.maastrichtuniversity.nl/en/publications/university-effects-on-regional-innovation)).
- **Flag:** the ~10% comes from the WP abstract. The 2013 journal abstract's exact number was not retrieved.
- **Limitations:** Italian regions are large units, the measure is patents only, and openings were not random.

**Kantor, S. & Whalley, A. (2014).** "Knowledge spillovers from research universities: Evidence from endowment value shocks." *Review of Economics and Statistics*, 96(1), 171–188. (NBER WP 15299, 2009, "Do universities generate agglomeration spillovers?")
- **Data:** US counties with research universities.
- **Method:** IV. Endowment payout rules mean stock-market shocks interacted with initial endowment size shift university spending exogenously.
- **Finding (WP abstract):** a **10% increase in university spending raises local non-education labour income by about 0.5%**, an elasticity of about 0.05, "no larger than" general agglomeration spillovers. Effects persist **at least 5 years** ([NBER WP via search](https://www.nber.org/papers/w15299)).
- **Published abstract:** effects are **significantly larger when universities are research-intensive or local firms are technologically close** ([UC Merced news](https://news.ucmerced.edu/news/2014/research-universities-create-economic-spillover-study-shows)).
- **Secondary (UC Merced press release):** **$1 of extra university spending gives about 89 cents of extra local non-education labour income.**
- **Flag:** the published-version elasticity was not retrieved, and "0.08" is unconfirmed.
- **Limitations:** US research universities, spending shocks only, no network measure.

**Hausman, N. (2022).** "University innovation and local economic growth." *Review of Economics and Statistics*, 104(4), 718–735. DOI 10.1162/rest_a_01027. (Census CES WP 12-10.)
- **Data:** US establishment-level microdata.
- **Method:** diff-in-diff around the **1980 Bayh-Dole Act**, a shock to universities' incentives to commercialise. Exposure is defined by industries technologically linked to a nearby university's research strengths.
- **Finding:** **faster growth in employment, wages and corporate innovation** near universities in university-linked industries. **Federal research funding amplified** the effect. Spillovers **strengthen with geographic proximity, density and local skills**. Growth is driven by **nearby entry in university-linked industries, especially multi-unit expansions** ([HUJI CRIS abstract via search](https://cris.huji.ac.il/en/publications/university-innovation-and-local-economic-growth/)).
- **Flag:** exact magnitudes were not retrieved.
- **Limitations:** a single US national policy shock, and Bayh-Dole's effect on university patenting is itself disputed (2017 WP version).

**Andrews, M. J. (2023).** "How do institutions of higher education affect local invention? Evidence from the establishment of U.S. colleges." *American Economic Journal: Economic Policy*, 15(2), 1–41. DOI 10.1257/pol.20200320.
- **Data:** historical US college site-selection decisions, 1839–1954.
- **Method:** diff-in-diff, using **runner-up counties** that were shortlisted but not chosen as the counterfactual.
- **Finding (the 62% vs 48% puzzle resolved):** the **published AEJ abstract** says establishing a college causes **62% more patents per year**, and only **12%** of the county's patents came from the college's alumni or faculty. An **earlier repository version** (UMBC/MD-SOAR) says **48%** and **5%** ([AEA research highlight](https://www.aeaweb.org/research/local-invention-runner-up-colleges-us); [MD-SOAR repository](https://mdsoar.org/handle/11603/21720)). **Cite 62% and 12%.**
- **Mechanism:** **population growth** may be the most important channel. There are only small differences between colleges and other institutions (e.g. asylums, prisons) and between technical and non-technical colleges.
- **Limitations:** historical and US-based. The effect of *establishing* an institution is not the effect of coordinating existing ones.

**Moretti, E. (2004).** "Estimating the social return to higher education: Evidence from longitudinal and repeated cross-sectional data." *Journal of Econometrics*, 121(1–2), 175–212.
- **Data:** NLSY panel plus US Census, cities.
- **Method:** IV, using the lagged city demographic structure and the presence of a **land-grant college**.
- **Finding:** a **1 pp increase in the college-graduate share** raises wages of **high-school dropouts by 1.9%**, **high-school graduates by 1.6%** and **college graduates by 0.4%** ([Moretti PDF via search](https://eml.berkeley.edu/~moretti/socret.pdf); [NBER WP 9108](https://www.nber.org/papers/w9108)).
- **Limitations:** US cities. Part of the effect may be imperfect substitution rather than pure spillover, which the paper discusses.

**Valero (2021) "universities and growth" review.**
- A CEP Discussion Paper titled **"Education and economic growth" (Anna Valero, CEP DP 1764)** exists in Valero's RePEc listing ([RePEc author page](https://authors.repec.org/pro/pva940/)). Its date, abstract and content were **not retrieved**.
- The other 2021 Valero item found is "Education and management practices", *Oxford Review of Economic Policy* 37(2), 302–322, which is not a universities-growth review.

### Riga back-of-envelope estimates (clearly labelled illustrations, not forecasts)
All of these are **transfers of effect sizes from other contexts** (US, Finland, Italy, Harvard). They use LaSER and brief inputs: **about 30,000 Knowledge Mile (KM) students and about 4,000 researchers; 54,000+ Riga students; about €385m a year of international student spending at about €15,780 per student; Latvian R&D of about €323m (0.83% of GDP).** Present them as orders of magnitude.

1. **Collaboration from structured matchmaking (Boudreau et al. 2017).**
   - The treatment raised pair-level co-application from **0.16% to 0.28%**, i.e. **+0.12 pp per pair**.
   - A single cross-university session of **100 researchers** creates 4,950 possible pairs, so 4,950 × 0.0012 ≈ **6 additional collaborating pairs** (versus about 8 at baseline).
   - If **10% of KM researchers (about 400)** took part each year: 79,800 pairs × 0.0012 ≈ **about 95 additional collaborating pairs a year**.
   - **Caveats:** pairs are not projects (one grant can involve several pairs). The context is a single elite medical school with a grant call attached. The effect may not scale linearly.
2. **Knowledge flows from more face-to-face contact (Atkin, Chen & Popov 2022).**
   - A 25% cut in meetings gives about 8% fewer citations, an implied elasticity of about **0.3**.
   - So if the KM coordinator, Student House and shared spaces raised cross-organisation face-to-face meetings by **10%**, expect knowledge flows (citations) to rise by roughly **3%**.
   - **Caveat:** Silicon Valley firms, not universities, and the result is a working paper.
3. **Local income from extra university or research spending (Kantor & Whalley).**
   - On the secondary press-release ratio of about €0.89 per €1, an extra **€10m** a year of KM research spending (≈3% of Latvia's €323m R&D) implies **≈€9m** of extra local non-education labour income.
   - On the WP elasticity (0.05), a 3% rise in spending gives about **+0.15% local non-education labour income**.
   - **Caveat:** US research universities. The spending must be *additional*, not reallocated.
4. **Size of the prize from universities overall (Valero & Van Reenen).**
   - The elasticity is about 0.04 (doubling gives about 4%).
   - The KM does not add universities. Use this only to say that the university presence plausibly accounts for **a few percent of regional GDP per capita**, and that coordination aims to raise the *yield* of that presence.
5. **Student-city spending.**
   - At LaSER's €15,780 a year per international student, **+1,000 international students gives about €15.8m a year of direct spending**, and +10% on the €385m base gives about **€38.5m a year**.
   - **Internal inconsistency to flag:** €385m ÷ €15,780 implies about 24,400 international students. That is far more than "a third of 30,000" (about 10,000) in the KM. The €385m probably includes indirect or multiplier effects, or a different student base. Verify with LaSER before using both numbers together.
6. **Graduate retention and wage spillovers (Moretti 2004).**
   - For each **1 pp rise in the graduate share** of Riga's workforce, Moretti's US estimates imply **+1.6–1.9% wages for workers without degrees**.
   - Illustration only: if better integration lifted the 5-year stay rate of international graduates by **10 pp** on a cohort of **X** graduates a year, Riga retains 0.1X more graduates a year. Riga's workforce and graduate-cohort sizes were **not sourced here** and must be added.
7. **Cluster programme effect (Falck et al. 2010, Bavaria).**
   - If a coordinated KM cluster programme performed like the Bavarian one, firms in targeted industries would be **4.6–5.7 pp more likely to innovate**.
   - **Caveat:** that programme had substantial funding, and target-industry R&D spending fell by about 19%.

### Inferences
- The robust, transferable message is directional and qualitative. Universities raise local innovation and incomes, and **the effect is larger with technological closeness, research quality, density and interaction**. Those are exactly the things the KM lacks.
- Use **"new-university" effects (Andrews 62%, Toivanen-Väänänen 20%, Cowan-Zinovyeva 10%) as context only**. The Riga intervention is coordination, so the matchmaking and face-to-face evidence (Boudreau, Catalini, Atkin et al.) is the right anchor for expected impact.
- Andrews' population mechanism and Moretti's spillovers together make **student attraction and retention** a credible impact channel for Riga, and the most measurable one (enrolments, stay rates, spending).

### Gaps
- Full texts not opened, so these were not verified against the journal versions: Valero & Van Reenen's "10% gives 0.4%" wording; Kantor & Whalley's published elasticity; Hausman's magnitudes; and Cowan & Zinovyeva's journal-version number.
- No causal estimates exist for Baltic or CEE university districts. No evaluation of Tallinn's Ülemiste City or Vilnius's Sunrise Valley was found (not searched in depth).
- Riga's workforce size and annual graduate cohort are not in these notes and are needed for estimate 6.

---

## Q2. Why geographic proximity alone fails, and what makes interaction happen

### Takeaway
Co-location is a **necessary-but-not-sufficient enabler**. Collaboration requires lowering **search and matching costs**, through micro-proximity, structured encounters and shared spaces, plus **cognitive, organisational and institutional proximity**.

The best causal evidence comes from three studies:
- **Catalini** (a Paris campus natural experiment): co-located labs were about 3.5× more likely to collaborate.
- **Boudreau et al.** (an RCT at Harvard): a 90-minute structured session gave +75% co-applications even among scientists in the *same* institution.
- **Atkin, Chen & Popov** (smartphone data from Silicon Valley): face-to-face meetings causally drive knowledge flows.

Riga's five universities sit about 3 km apart. They have **geographic proximity without micro-proximity, shared spaces or a convening organisation**.

### Cited findings, paper by paper

**Boschma, R. (2005).** "Proximity and innovation: A critical assessment." *Regional Studies*, 39(1), 61–74.
- **Framework:** five proximity dimensions: **cognitive, organisational, social, institutional and geographical**.
- **Abstract:** too little and **too much** proximity can both harm learning (**lock-in**). Some dimensions solve coordination problems, while others keep actors open ([IDEAS listing via search](https://ideas.repec.org/a/taf/regstd/v39y2005i1p61-74.html); [PDF copy at uth.gr via search](https://eclass.uth.gr/modules/document/file.php/PRD_P_171/%CE%A3%CE%A5%CE%9D%CE%9F%CE%94%CE%95%CE%A5%CE%A4%CE%99%CE%9A%CE%9F%20%CE%A5%CE%9B%CE%99%CE%9A%CE%9F/BOSCHMA%20%28Proximity%20and%20Innovation%20A%20Critical%20Assessment%29.pdf)).
- **Flag:** the phrase "geographical proximity per se is neither a necessary nor a sufficient condition for learning" is attributed to p. 62 **only by a secondary source** ([Prace KGP](https://prace-kgp.uken.krakow.pl/article/download/20801653.324.14/4373/15544)). Check before quoting.
- **Method:** conceptual and theoretical review.

**D'Este, P., Guy, F. & Iammarino, S. (2013).** "Shaping the formation of university–industry research collaborations: What type of proximity does really matter?" *Journal of Economic Geography*, 13(4), 537–558. DOI 10.1093/jeg/lbs010.
- **Data:** UK EPSRC collaborative research grants (university–firm partnerships).
- **Method:** econometric models of partnership formation as a function of geographic distance, **firm co-location in clusters** and **technological complementarity** ([Birkbeck BIROn](https://eprints.bbk.ac.uk/view/people/d=27Este=3AP=2E=3A=3A.html); [INGENIO abstract](https://www.ingenio.upv.es/va/investigacion/publicaciones/shaping-formation-university-industry-research-collaborations-what-type)).
- **Flag:** detailed coefficients were not retrieved. The common reading, that clustering and technological complementarity condition the role of distance and that research excellence draws partners from further away, comes from a related WP ("The spatial profile of university-business research partnerships") and memory. Verify against the paper.

**Catalini, C. (2018).** "Microgeography and the direction of inventive activity." *Management Science*, 64(9), 4348–4364. DOI 10.1287/mnsc.2017.2798.
- **Setting:** Jussieu campus, Paris. **Asbestos removal** forced quasi-random relocation of labs.
- **Method:** natural experiment comparing lab pairs that were co-located or separated by the relocation constraints.
- **Finding:** **co-located labs were about 3.5× more likely to collaborate**, with the effect concentrated in pairs with **high prior search costs**. **Separation did not hurt existing collaborations.** Co-located labs became **more similar in topics and cited literature**, while separated labs diverged ([MIT DSpace record](https://dspace.mit.edu/handle/1721.1/120163); [INFORMS](https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2017.2798)).
- **Flag:** "3.5×" was reported in a search summary of the abstract. A second search could not re-find the string, so verify in the PDF (open access on MIT DSpace).
- **Limitations:** one campus, academic labs only, and the outcome is co-authorship.

**Boudreau, K. J., Brady, T., Ganguli, I., Gaule, P., Guinan, E., Hollenberg, A. & Lakhani, K. R. (2017).** "A field experiment on search costs and the formation of scientific collaborations." *Review of Economics and Statistics*, 99(4), 565–576.
- **Design:** an **RCT at Harvard Medical School**. Scientists were randomly assigned to **90-minute structured information-sharing sessions** tied to a grant call.
- **Finding:** co-application probability for a pair rose by **75%, from 0.16% to 0.28%**. The effect was larger for **same-specialisation** pairs. **Even co-located scientists in the same institution face matching frictions** ([Bristol research portal via search](https://research-information.bris.ac.uk/en/publications/a-field-experiment-on-search-costs-and-the-formation-of-scientifi/); [IDEAS](https://ideas.repec.org/a/tpr/restat/v99y2017i4p565-576.html)). Confirmed at abstract level.
- **Limitations:** a single elite institution, a grant incentive attached, and a low absolute base rate.

**Roche, M. P. (2020).** "Taking innovation to the streets: Microgeography, physical structure, and innovation." *Review of Economics and Statistics*, 102(5), 912–928. DOI 10.1162/rest_a_00866.
- **Method:** US neighbourhoods, with **historic street plans as instruments** for street-network density.
- **Finding (abstract, qualitative):** denser and more walkable street networks foster knowledge exchange and innovation, and may explain regional differences ([MIT Press abstract](https://direct.mit.edu/rest/article-abstract/102/5/912/96766/Taking-Innovation-to-the-Streets-Microgeography)).
- **Secondary and conflicting magnitudes:** one blog reports that a 10% increase in street density gives **about 0.04%** more patents ("tiny"). Another reports **about 0.4%** in blocks with at least 5 cafés, bars or restaurants ([New Things Under the Sun](https://www.newthingsunderthesun.com/pub/szb3t7cb/)). **Do not cite a number without checking the paper.**

**Atkin, D., Chen, M. K. & Popov, A. (2022).** "The returns to face-to-face interactions: Knowledge spillovers in Silicon Valley." **NBER Working Paper 30147** (also CEPR DP17377). This is a working paper. No journal publication was found in the search, so check whether it has since been published.
- **Data:** granular **smartphone geolocation** used to infer meetings between workers of different establishments, linked to patent citations.
- **Method:** IV, using meetings between workers of **adjacent firms in unconnected industries**, which captures serendipitous encounters.
- **Finding:** **eliminating a quarter of face-to-face meetings would cut citations by about 8%**. The results are consistent with Jane Jacobs-style serendipity ([NBER WP page via search](https://www.nber.org/papers/w30147); [Causal Claims summary](https://causalclaims.trfetzer.com/paper/w30147.html)).

**Kerr, W. R. & Robert-Nicoud, F. (2020).** "Tech clusters." *Journal of Economic Perspectives*, 34(3), 50–76. (NBER WP 27421; CEPR DP14143.)
- A review of what tech clusters are, how they work internally, and **how far policy can deliberately build them**. It stresses that leading tech centres shift over time and that clusters face strains and backlash, including costs ([HKS listing](https://www.hks.harvard.edu/centers/cid/publications/tech-clusters); [AEA issue](https://aeaweb.org/issues/602)).
- **Not retrieved:** the exact policy conclusions. From memory (unverified), they are sceptical of building clusters from scratch and more favourable to supporting existing seeds, often anchored by universities.

### Inferences
- For Riga, the evidence supports a **"lower search costs" intervention logic**: a coordinator, regular cross-university matchmaking, shared physical "third places" (Student House), and pedestrian links such as a Zunda canal bridge and bus 57.
- These are **cheap relative to capital investment**, and each has a causal study behind its mechanism.
- Catalini's asymmetry is useful for framing. Once ties form they persist, so a one-off push in convening can have lasting effects.
- Boschma's lock-in warning also argues for opening the KM to **business and international partners**, not just to the existing universities.

### Gaps
- Exact D'Este et al. coefficients, Roche magnitudes, Kerr & Robert-Nicoud policy text, and the publication status of Atkin et al.

---

## Q3. Governance and coordination evidence, talent retention, and risks/counter-evidence

### Takeaway
**Governance and coordination.** Practitioner frameworks (Triple Helix, Brookings/GIID) stress that **organisation, governance and coordinated finance** separate working innovation districts from mere co-location. Causal evaluations of cluster *programmes* are mixed: Bavaria was positive on innovation, the French LPS programme was null, and London's Tech City grew the cluster but had weak firm effects. Science-park reviews find weak and inconsistent evidence.

**Talent retention.** Studying in a region modestly raises the chance of staying. Most Finnish graduates do not leave their study region within 10 years, and growth centres retain best. International-student 5-year stay rates vary from under 15% to over 60% across OECD countries.

**Risks.** Studentification and gentrification, and the general "feeble case" critique of cluster policy.

### Cited findings: governance and coordination
**Etzkowitz, H. & Leydesdorff, L. (2000).** "The dynamics of innovation: From National Systems and 'Mode 2' to a Triple Helix of university–industry–government relations." *Research Policy*, 29(2), 109–123. DOI 10.1016/S0048-7333(99)00055-4 ([citation confirmed via search](https://facweb.ischool.illinois.edu/sigmetrics/2003-January/000876.html)).
- **Conceptual:** innovation emerges from overlapping university, industry and government spheres, with hybrid organisations at the interfaces. The abstract text was not retrieved.

**Katz, B. & Wagner, J. (2014).** *The Rise of Innovation Districts: A New Geography of Innovation in America.* Brookings Institution, June 2014.
- **Definition:** geographic areas where leading-edge anchor institutions and companies cluster and connect with start-ups, incubators and accelerators. They are physically compact, transit-accessible, and offer housing, office and retail ([Brookings release](https://www.brookings.edu/news-releases/a-new-geography-of-innovation/)).
- **Three-asset model:**
  - **Economic assets:** firms, institutions and organisations that drive, cultivate or support innovation.
  - **Physical assets:** public and private spaces, buildings, and connections such as transit and IT.
  - **Networking assets:** relationships between actors that generate and accelerate ideas.
  - Combined with a **supportive, risk-taking culture**, these form an innovation ecosystem ([Brookings PDF via search](https://www.brookings.edu/wp-content/uploads/2016/07/InnovationDistricts1.pdf); [GIID feature PDF](https://giid.org/app/uploads/2014/11/Rise-of-innovation-Districts-Feature.pdf)).
- **Method:** case studies and practitioner synthesis, with no counterfactual.

**Wagner, J., Katz, B. & Osha, T. (2019).** *The Evolution of Innovation Districts: The New Geography of Global Innovation.* Global Institute on Innovation Districts (GIID), June 2019 ([GIID PDF](https://giid.org/app/uploads/2019/06/the-evolution-of-innovation-districts.pdf)).
- Successful districts rely on **organisational strategies and structures, particularly a strong governance model and coordinated finance** ([GIID summary](https://giid.org/research/evolution-of-innovation-districts/)).
- **Later GIID work:** the 2023 brief "Why governance matters" and a reported **seven factors for effective governance** (e.g. co-design and co-investment, the right degree of independence, financial sustainability). It contrasts **"dominant player" vs "multi-stakeholder"** models ([IO+](https://ioplus.nl/archive/en/governance-is-a-key-factor-in-the-success-of-innovation-districts/)). Whether these come from the 2019 report or later briefs is uncertain.

**Russo, A. P., van den Berg, L. & Lavanga, M. (2007).** "Toward a sustainable relationship between city and university: A stakeholdership approach." *Journal of Planning Education and Research*, 27(2), 199–216. DOI 10.1177/0739456X07307208.
- Universities drive urban development **only if cities embed knowledge in local social and economic networks**. This depends on balanced exchange among **students and academics, entrepreneurs and local communities**.
- **Method:** a model tested against **nine European city case studies** ([HAW Hamburg repository](https://reposit.haw-hamburg.de/handle/20.500.12738/13693); [UvA DARE](https://dare.uva.nl/id/1856ed91-c7fc-4fd4-a905-ae43302d5210)).

**Goddard, J. & Vallance, P. (2013).** *The University and the City.* Routledge (232 pp.).
- Universities are "much more than economic actors". The book includes **case studies of four UK cities** ([Newcastle staff profile](https://www.ncl.ac.uk/gps/staff/profile/johngoddard.html); [THE review](https://www.timeshighereducation.com/books/the-university-and-the-city-by-john-goddard-and-paul-vallance/2002445.article)).
- The civic university concept is developed in Goddard (2009, NESTA provocation "Reinventing the Civic University") and Goddard, Hazelkorn, Kempton & Vallance (eds., 2016), *The Civic University: The Policy and Leadership Challenges* (Edward Elgar) ([UCL news](https://www.ucl.ac.uk/research-innovation/news/2017/jan/civic-university-policy-and-leadership-challenges)).

**Lecluyse, L., Knockaert, M. & Spithoven, A. (2019).** "The contribution of science parks: A literature review and future research agenda." *Journal of Technology Transfer*, 44(2), 559–595 ([IDEAS](https://ideas.repec.org/a/kap/jtecht/v44y2019i2d10.1007_s10961-018-09712-x.html)).
- A review of **175 articles (1988–2018)** using an **Input–Mediator–Outcome** framework. It finds **critical methodological and theoretical deficiencies** in the literature.
- **DOI hyphenation differs** between sources (s10961-018-09712-x vs s10961-018-9712-x).

**Squicciarini, M. (2008).** "Science Parks' tenants versus out-of-Park firms: who innovates more? A duration model." *Journal of Technology Transfer*, 33(1), 45–71 ([IDEAS](https://ideas.repec.org/a/kap/jtecht/v33y2008i1p45-71.html)).
- A related 2009 *Small Business Economics* 32(2), 169–190 paper ("Science parks: seedbeds of innovation?") studies **252 Finnish park tenants** with a duration model of patenting over 33 years ([VTT](https://cris.vtt.fi/en/publications/science-parks-seedbeds-of-innovation-a-duration-analysis-of-firms/)).
- **Not retrieved:** the findings. From memory (unverified), the result is that tenants show higher patenting after entry.

**Cluster-programme evaluations (causal):**
- **Falck, O., Heblich, S. & Kipar, S. (2010).** "Industrial innovation: Direct evidence from a cluster-oriented policy." *Regional Science and Urban Economics*, 40(6), 574–582.
  - **Method:** triple-difference (DDD) evaluation of the Bavarian cluster policy using Ifo Innovation Survey data.
  - **Finding:** the probability of being an innovator rose by **4.6–5.7 pp**, while **R&D spending fell by about 19.4%** in target industries. The WP version (4–7 pp) says the effect is driven by large firms ([IDEAS](https://ideas.repec.org/a/eee/regeco/v40y2010i6p574-582.html); [CESifo WP 2463](https://www.cesifo.org/DocDL/cesifo1_wp2463.pdf)).
- **Martin, P., Mayer, T. & Mayneris, F. (2011).** "Public support to clusters: A firm level study of French 'Local Productive Systems'." *Regional Science and Urban Economics*, 41(2), 108–123.
  - **Method:** firm-level diff-in-diff with selection controls.
  - **Finding:** the programme **did not reverse the relative productivity decline** of targeted firms and had **no robust effect on employment or exports**. The programme selected declining firms ([Mayneris PDF](https://perso.uclouvain.be/florian.mayneris/papers/MMM_rsue.pdf); [HAL](https://hal-sciencespo.archives-ouvertes.fr/hal-01066195)).
- **Nathan, M. (2022).** "Does light touch cluster policy work? Evaluating the Tech City programme." *Research Policy*, 51(9), 104138. DOI 10.1016/j.respol.2020.104138.
  - **Method:** synthetic controls with placebo tests on Business Structure Database microdata.
  - **Finding:** the policy **grew and densified the cluster** but had **much weaker, partial effects on tech-firm performance**, and **most "effects" began before rollout**. Shoreditch also got **more expensive** ([IZA DP 12631](https://www.iza.org/publications/dp/12631/does-light-touch-cluster-policy-work-evaluating-the-tech-city-programme); [UCL Discovery](https://discovery-pp.ucl.ac.uk/id/eprint/10111525); [Research Professional](https://www.researchprofessionalnews.com/?p=123059)).

### Cited findings: talent retention and international students
**Groen, J. A. (2004).** "The effect of college location on migration of college-educated labor." *Journal of Econometrics*, 121(1–2), 125–142.
- **Data:** two samples of US undergraduates.
- **Method:** controls for selection using the **set of colleges students applied to**.
- **Finding:** attending college in a state has a **small** positive effect on later working there, too small to justify merit-scholarship programmes on retention grounds alone ([IDEAS](https://ideas.repec.org/a/eee/econom/v121y2004i1-2p125-142.html); [Cornell eCommons WP](https://ecommons.cornell.edu/entities/publication/50d17486-b208-4046-9294-484635b1f547)).
- **Not retrieved:** the exact percentage points. From memory (unverified), about 10 pp in one sample and less in the other.

**Haapanen, M. & Tervo, H. (2012).** "Migration of the highly educated: Evidence from residence spells of university graduates." *Journal of Regional Science*, 52(4), 587–605.
- **Data:** Finnish register data, 1991–2003.
- **Method:** duration (hazard) models.
- **Finding:** **most graduates do not leave their region of study within 10 years**. Out-migration ("brain drain") is **much higher from peripheral universities than from growth centres, especially Helsinki**. Migration is more likely for those who studied away from their home region ([JYX accepted manuscript](https://jyx.jyu.fi/handle/123456789/48941)).
- **Relevance:** Riga is Latvia's growth centre, analogous to Helsinki.

**Winters, J. V. (2011).** "Human capital and population growth in nonmetropolitan U.S. counties: The importance of college student migration." *Economic Development Quarterly*, 25(4), 353–365.
- **Finding:** **student migration accounts for almost all of the extra in-migration** into highly educated non-metro counties ([MPRA WP](https://mpra.ub.uni-muenchen.de/25592); [IDEAS](https://ideas.repec.org/a/sae/ecdequ/v25y2011i4p353-365.html)).

**Venhorst, V. A. (and Van Dijk & Van Wissen).**
- Dutch graduate mobility research (PhD "Smart move?", Groningen 2012) finds **job-market opportunities are the main driver** of where graduates locate ([RUG](https://www.rug.nl/about-ug/latest-news/news/archief2012/promoties_oraties/smart-move_-the-spatial-mobility-of-higher-education-graduates)).
- The exact article "Do the best graduates leave the peripheral areas of the Netherlands?" (*TESG*, 2010) was **not confirmed** in search.

**OECD stay rates.**
- *International Migration Outlook 2022*: of students given a first study permit in 2015, the share still present 5 years later was **over 60% in Canada and Germany**, **about half in Australia, Estonia and New Zealand**, about 2 in 5 in France and Japan, and **under 15% in Denmark, Slovenia, Italy and Norway** ([OECD IMO 2022](https://www.oecd.org/en/publications/international-migration-outlook-2022_30fe16d2-en/full-report/component-11.html)).
- *International Students in Higher Education* (a later OECD report, on a different definition) gives **Canada and Germany 52%, Australia 34%, France 33%, Netherlands 19%, UK 7%** ([OECD](https://www.oecd.org/en/publications/international-students-in-higher-education_005ff28d-en/full-report/post-graduation-opportunities-and-possibilities_42892cac.html)).
- **Estonia's ~50% is the key Baltic benchmark.** No Latvian figure was found.

**Netherlands (Nuffic, 2025).** Five-year stay rates of international graduates by city: **Eindhoven 49%, Delft 39%, Utrecht 37%, Maastricht 12%** ([Nuffic](https://www.nuffic.nl/en/onderzoek-en-cijfers/onderzoeken/staying-after-graduation)).

**Economic contribution of international students (UK, London Economics for HEPI/UUKi/Kaplan, May 2023).**
- For the 2021/22 cohort: **gross benefits of £41.9bn**, public costs of **£4.4bn**, and **net impact of £37.4bn**, i.e. **about £96k per non-EU student and £125k per EU student** over their studies. The benefit-cost ratio is about **9.4**.
- The 2024/25 update gives **£40.4bn** net, about **£100k per student** ([HEPI](https://www.hepi.ac.uk/2023/05/16/international-students-boost-uk-economy-by-41-9-billion/); [London Economics](https://londoneconomics.co.uk/blog/publication/the-benefits-and-costs-of-international-higher-education-students-to-the-uk-economy-analysis-for-the-2021-22-cohort-may-2023/)).
- **Caveat:** these figures are dominated by UK tuition fees, so they are not transferable to Riga in level. Use the **benefit-cost structure** only.

### Cited findings: risks and counter-evidence
- **Martin, R. & Sunley, P. (2003).** "Deconstructing clusters: Chaotic concept or policy panacea?" *Journal of Economic Geography*, 3(1), 5–35. The cluster concept is vague, and the paper gives policy a "health warning" (citation as in the background file, not re-verified here).
- **Duranton, G. (2011).** "California Dreamin': The feeble case for cluster policies." *Review of Economic Analysis*, 3(1), 3–45. The case for cluster policy is **theoretically ambiguous and empirically very weak**. Even if done right, **the benefits of clustering are too small to justify significant and sustained efforts** ([Penn repository](https://repository.upenn.edu/real-estate_papers/2); [Waterloo OJS](https://openjournals.uwaterloo.ca/index.php/rofea/article/download/1375/1787)).
- **Duranton, G., Martin, P., Mayer, T. & Mayneris, F. (2010).** *The Economics of Clusters: Lessons from the French Experience.* Oxford University Press ([OUP](https://academic.oup.com/book/34422/chapter/292087139)). Agglomeration gains are modest: about a **0.4–0.5%** productivity effect from same-sector density, per the authors' VoxEU column cited in search.
- **Smith, D. P. & Holt, L. (2007).** "Studentification and 'apprentice' gentrifiers within Britain's provincial towns and cities: Extending the meaning of gentrification." *Environment and Planning A*, 39(1), 142–161. DOI 10.1068/a38476. Studentification is a form of gentrification, and student experiences may shape later gentrifier residential choices ([Reading CentAUR](https://centaur.reading.ac.uk/4111)).
- **Morisson, A. & Bevilacqua, C. (2019).** "Balancing gentrification in the knowledge economy: The case of Chattanooga's innovation district." *Urban Research & Practice*, 12(4), 472–492. DOI 10.1080/17535069.2018.1472799 (online 2018).
  - An exploratory case study. Innovation districts are criticised for **gentrification and income, social and racial polarisation**. The authors argue some gentrification can boost knowledge spillovers, but it needs balancing ([IDEAS](https://ideas.repec.org/a/taf/rurpxx/v12y2019i4p472-492.html)).
- **Nathan (2022)** again: Tech City made Shoreditch **"bigger, and more expensive"**, with weaker firm gains.

### Inferences
- The governance literature is **mostly practitioner and case-based**, while the causal programme evaluations are mixed. The honest claim is that "coordination is necessary for the mechanisms in Q2 to operate", not that "governance causes growth".
- The "light-touch" Tech City result is a direct warning for an Option-A coordinator. **Pre-register KPIs and a counterfactual** (e.g. synthetic control on Riga neighbourhoods, or a comparison with Tallinn and Vilnius) to avoid claiming credit for pre-existing trends.
- Retention evidence favours Riga as a growth centre (Haapanen & Tervo). The international-student stay-rate gap (Estonia about 50%, low performers under 15%) frames a measurable target.
- The housing evidence (studentification, Shoreditch costs) means LaSER's student housing proposal is a **risk mitigator**, not just an amenity.

### Gaps
- No rigorous counterfactual evaluation of an *innovation district governance body* as such (Barcelona 22@, Kendall Square, Amsterdam Science Park, etc.) was found in this pass.
- Exact Groen (2004) percentage points.
- Squicciarini's (2008) results.
- Venhorst's TESG article details.
- A Latvian stay rate for international graduates.

---

## Q4. Methodology appendix: conceptual frameworks and research methods

### Takeaway
The case combines **four complementary frameworks**, organised as diagnosis → design → actors → mission:
- **Proximity** for the diagnosis: what is missing.
- **Innovation-district three-asset model** for the design: what to build.
- **Triple Helix** for the actors: who must be at the table.
- **Civic university / stakeholdership** for the mission: why universities should engage.

The evidence draws on **natural experiments, an RCT, IV, diff-in-diff/DDD, synthetic control, panel fixed effects and case studies**. LaSER (2026) contributes **qualitative and descriptive** Riga-specific evidence.

### Frameworks (concise descriptions, with sources)
1. **Proximity framework (Boschma 2005, *Regional Studies* 39(1):61–74).**
   - Interactive learning depends on five proximities: cognitive (shared knowledge base), organisational (shared arrangements and control), social (trust-based ties), institutional (shared rules and norms) and geographical (physical distance).
   - Geographical proximity alone is insufficient, and too much proximity risks lock-in.
   - **Riga diagnosis:** high geographical proximity (5 universities within about 3 km²), but weak organisational proximity (no owner, no website, a 3-page memorandum without KPIs), weak institutional proximity (accreditation barriers to cross-enrolment, misaligned base-funding rules) and weak social proximity (students' mental maps).
2. **Triple Helix (Etzkowitz & Leydesdorff 2000, *Research Policy* 29(2):109–123).**
   - Innovation emerges from university–industry–government interaction and hybrid interface organisations.
   - **Riga diagnosis:** the 2024 memorandum covers city and universities only, with **industry absent** (a "double helix").
3. **Innovation-district three-asset model (Katz & Wagner 2014; Wagner, Katz & Osha 2019).**
   - Economic assets plus physical assets plus networking assets, combined with a risk-taking culture, make an ecosystem. Governance and coordinated finance are the organising layer.
   - **Riga:** strong economic assets (universities, hospitals, library, firms), partial physical assets (bus 57, missing "third places"), weak networking assets and **no governance**.
4. **Civic university / city–university stakeholdership (Goddard & Vallance 2013; Goddard et al. 2016; Russo, van den Berg & Lavanga 2007).**
   - Universities as place-based institutions with responsibilities to their city. Sustainable relationships require balanced exchange among students, academics, entrepreneurs and residents.
   - **Riga:** this addresses the LU complaint that the KM is "a municipal project that only benefits the city".
5. **Supporting theory.**
   - Localised knowledge spillovers (Jaffe, Trajtenberg & Henderson 1993; Audretsch & Feldman 1996; both from the background file).
   - Search and matching costs (Boudreau et al. 2017).
   - Jacobs-style serendipity (Atkin et al. 2022).

### Methods used in the key studies (for the appendix table)
| Method | Study | Identification idea | Main caveat |
|---|---|---|---|
| Randomised field experiment (RCT) | Boudreau et al. 2017 | Random assignment to 90-minute matchmaking sessions | One elite institution; low base rate |
| Natural experiment | Catalini 2018 | Asbestos removal constrained lab relocation at Jussieu | One campus; academic outcomes |
| Instrumental variables | Toivanen & Väänänen 2016 | Distance to technical university | Exclusion restriction |
| Instrumental variables | Kantor & Whalley 2014 | Endowment × stock-market shocks to spending | US research universities |
| Instrumental variables | Moretti 2004 | Land-grant colleges; lagged demographics | US cities |
| Instrumental variables | Roche 2020 | Historic street plans | Small magnitudes (secondary) |
| Instrumental variables | Atkin, Chen & Popov 2022 | Meetings between adjacent unrelated firms, from smartphone data | Working paper |
| Diff-in-diff with runner-up controls | Andrews 2023 | Shortlisted-but-not-chosen college sites | Historical US |
| Diff-in-diff (policy shock) | Hausman 2022 | Bayh-Dole × university-linked industries | Single national shock |
| Diff-in-diff / DDD | Falck et al. 2010; Martin et al. 2011 | Treated vs untreated industries/firms, before and after | Selection into programmes |
| Synthetic control | Nathan 2022 | Synthetic Shoreditch from donor areas | Pre-trends found |
| Regional panel with fixed effects | Valero & Van Reenen 2019; Delgado et al. 2014; Cowan & Zinovyeva 2013 | Within-region variation over time, trends | Observational |
| Duration/hazard models | Haapanen & Tervo 2012; Squicciarini 2008/09 | Time-to-migration; time-to-patent | Descriptive-causal |
| Qualitative case studies | Russo et al. 2007 (9 cities); Goddard & Vallance 2013 (4 UK cities); Katz & Wagner 2014; Morisson & Bevilacqua 2019 | Comparative and exploratory | Not generalisable |
| Systematic literature review | Lecluyse et al. 2019 (175 articles) | Input–Mediator–Outcome synthesis | Underlying studies weak |

### LaSER (2026) methods (from the background summary, LaSER *Rīgas Zināšanu jūdze 2.0*, Oct 2026)
- **Desk research and secondary data:** Eurostat; Oxford Economics; Mercer; QS Best Student Cities; European Innovation Scoreboard 2026; Rīgas satiksme ridership; IZM enrolment and dormitory data.
- **16 semi-structured interviews** on science commercialisation.
- **Summer 2026 interviews** with LU, RTU, RSU, RISEBA and Riga City Council deputies (governance chapter).
- **Student focus groups with mental mapping**: students drew their perceived city and university geography.
- **Spatial and descriptive analysis**: student density about 7,500/km² vs a Riga average of about 200; campus distances; transport links.
- **International comparison**: Amsterdam, London, Stockholm and Philadelphia governance models.
- **Limitations:** no causal or econometric analysis, focus group sizes not reported, and many recommendations (about 15).
- **Implication:** the impact case should use LaSER for the **problem diagnosis** and the academic studies above for **expected impact**.

### Suggested evaluation design for the case (inference, not sourced)
- **KPIs:**
  - Cross-university co-authorships and co-applications (Boudreau and Catalini outcomes).
  - Joint industry projects and licences (Perkmann et al. 2013 engagement measures).
  - International student enrolment, spending and 5-year stay rate (OECD metric).
  - Bus 57 and footfall data.
  - QS rank.
- **Counterfactual:** before-and-after comparison with Tallinn and Vilnius, or a synthetic control, and staggered roll-out of matchmaking events to allow a randomised or phased design as in Boudreau.

### Gaps
- Abstract wording for Etzkowitz & Leydesdorff and the exact Katz & Wagner report text were not retrieved because brookings.edu and ScienceDirect were blocked. The asset definitions above come from search snippets of the Brookings PDF.
- The number of LaSER focus groups and participants is unknown.
