# Salesforce hiring-as-priority signal — US corporate openings

**Snapshot:** 2026-09-20 PT  
**Source:** Workday CXS `POST /wday/cxs/salesforce/External_Career_Site/jobs`  
**Portal:** https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site  
**Filter:** United States of America country facet (`bc33aa3152ec42d4995f4791a106ed09`)  
**N jobs:** 498 unique requisitions (API total_reported=498; deduped by JR id)  
**Method:** Paginated list API (limit=20); clustered by title keywords (multi-label). Did not apply, sign in, or message anyone.

## Workday Job Category facets (US-filtered response)

| Job Category | Count |
|--------------|------:|
| Sales | 148 |
| Software Engineering | 92 |
| Customer Success | 88 |
| Marketing & Communications | 31 |
| Product | 24 |
| Employee Success | 24 |
| Finance | 18 |
| Enterprise Technology & Infrastructure | 17 |
| Operations | 15 |
| Program & Project Management | 13 |
| User Experience | 8 |
| Global Affairs | 7 |
| Fixed Term & Temporary | 5 |
| Development & Strategy | 2 |
| Data | 2 |
| Corporate Functions | 2 |
| Compliance | 2 |

*Facet totals reflect Workday’s taxonomy on the same US query; useful as an official volume check vs keyword themes below.*

## Theme volume (title/keyword multi-label)

| Theme | Count | % of sample | Fresh ≤7d | Example titles |
|-------|------:|------------:|----------:|----------------|
| GTM / Sales / AE / SE / CSM | 152 | 30.5% | 35 | Qualified Success Architect, University; Named Account Executive; Data Cloud Success Architect (U.S. Citizen) |
| Engineering / Platforms / Infrastructure | 125 | 25.1% | 30 | Senior backend Engineer - Java; Senior Software Engineer; Senior Cloud Platform Engineer (SMTS) |
| Public Sector / Missionforce | 44 | 8.8% | 7 | Manager, Compliance - Public Sector Contracts; Summer 2027 Intern - Sales Development, Public Sector; Engagement Delivery Leader - Public Sector |
| Agentforce / AI Agents | 41 | 8.2% | 12 | Member of Technical Staff — Machine Learning & Agent Security Engineering; Senior Solution Architect (Marketing, Data360 or Agentforce Contact Center); Architect, Data Platform — AgentExchange |
| Data Cloud / Analytics / Tableau | 41 | 8.2% | 10 | Data Cloud Success Architect (U.S. Citizen); Senior Solution Architect (Marketing, Data360 or Agentforce Contact Center); Commercial Account Executive - Data Foundation (MuleSoft + Informatica) |
| Security / Trust / Compliance | 41 | 8.2% | 12 | Security Practices Director; Manager, Compliance - Public Sector Contracts; Member of Technical Staff — Machine Learning & Agent Security Engineering |
| Industry Clouds / Vertical | 33 | 6.6% | 9 | Customer Success Manager, Senior Manager - Healthcare; Account Partner (Auto, Energy, Utilities); Summer 2027 Intern - Sales Development, Nonprofit |
| Marketing / Communications / Creative | 31 | 6.2% | 7 | Senior Solution Architect (Marketing, Data360 or Agentforce Contact Center); Manager/Sr Product Marketing Manager Agentforce; Product Marketing Lead - Keynote Demos |
| Talent / HR / Employee Success | 31 | 6.2% | 11 | Summer 2027 Intern - Recruiting Data Intelligence; Corporate Recruiter (Contract); Summer 2027 Intern - Sales Development, Public Sector |
| MuleSoft / Integration | 27 | 5.4% | 5 | Commercial Account Executive - Data Foundation (MuleSoft + Informatica); Customer Success Manager, MuleSoft; Consumption Lead, Mulesoft |
| Slack / Collaboration | 19 | 3.8% | 6 | API Field Specialist, Slack; Slack Field CTO; Slack Strategic Operations Senior Director |
| Partner / AppExchange / Marketplace / Ecosystem | 18 | 3.6% | 3 | Architect, Data Platform — AgentExchange; SMB/Commercial Account Executive - Partner Cloud, PRM, & Channel Revenue Management; Partner Engagements Manager |
| Product Management | 16 | 3.2% | 1 | Sr. Product Manager, Enterprise Security Technology; Senior Product Manager, Finance Systems – Workday; Director, Product Management, Slackforce Architecture |
| UX / Design | 10 | 2.0% | 4 | SVP, Research & Insights - Experience Design; SVP, Experience Strategy & Studio - Experience Design; Senior Experience Architect |
| Sales / Service / Marketing / Commerce Cloud | 7 | 1.4% | 1 | Director, Customer Success Management - Commerce Cloud; Success Architect - Commerce Cloud (PredictSpring/POS); Technical Support Engineer - Service Cloud |
| Internal IT / Finance / DET | 7 | 1.4% | 0 | Senior Product Manager, Finance Systems – Workday; Senior Technical Program Manager, IT Experience Engineering; ES Workday Operations Analyst |

Notes on reading the table:

- Themes are **multi-label** (one job can count in Agentforce + Public Sector + GTM). Percentages can sum >100%.
- **Partner / AppExchange / Marketplace** excludes Salesforce AE title “Account Partner” and HR “Employee Success Business Partner”; those sit under GTM / Talent instead.
- **GTM** and **Engineering** dominate absolute volume; strategic product bets show up as smaller but named clusters (Agentforce, Slack, MuleSoft, Partner ecosystem).

## What hiring says (evidence-based)

1. US external openings concentrate in GTM capacity (152 titles touching Sales/AE/SE/CSM) and Software Engineering (125), matching Workday Job Category facets: Sales 148, Software Engineering 92, Customer Success 88 — vs Product only 24.

2. Agentforce / AI is a clear product bet in staffing: 41 US openings explicitly reference Agentforce, agentic workflows, AgentExchange, ML/AI research, or AI architects — with 12 posted in the last ~7 days (PMM, Success Architects, Agent Security eng, AgentExchange data platform).

3. Partner/ecosystem staffing is real but mostly GTM/alliances, not Product: 18 openings after excluding AE “Account Partner” and HR “Business Partner” (Partner Cloud/PRM AE, ISV PAM, Alliances, Marketplace BD, Partner Engagements, AgentExchange architect, Partner Experience SPM). Only ~2 are Product Manager–titled (Partner Experience + Search/Personalization for AgentExchange).


4. Public sector / Missionforce is a sustained cluster (44 titles) spanning AE, compliance, delivery, and Agentforce Public Sector PM — not a one-off req.

5. Slack remains an active hiring brand inside Salesforce Workday (19 titles) including Director PM Slackforce Architecture, Field CTO, API specialists — evidence of continued Slack↔Salesforce integration investment.

6. MuleSoft + Informatica / Data Foundation show up as a bundled GTM motion (27 titles), plus an SVP PM for MuleSoft Agent Fabric — integration + agents treated as one growth narrative in openings.

7. Classic CRM-cloud-named reqs are thin relative to Agentforce: Sales/Service/Marketing/Commerce Cloud explicit titles only 7; Heroku 0; AppExchange exact-title 0. Tableau still has ~11 US titles (mostly AE/CSM/instructor/architect), and Data 360 / Data Cloud naming appears alongside Agentforce. External posting language prioritizes agents + data platform over classic Sales/Service Cloud branding.


8. Product Management IC/lead openings are sparse (16 in US sample; Job Category Product=24 including non-PM). Freshness is weak (many 30+ days) except Enterprise Security SPM (6d) and Finance Systems SPM (10d). Implies either filled quietly, internal mobility, or slow external PM hiring vs GTM/Eng.

### Heavy vs thin (concrete contrasts from this snapshot)

| Signal | Evidence in US openings |
|--------|-------------------------|
| **Heavy: Agentforce / AI** | 41 titled roles; fresh PMM, Success Architects, Agent Security MTS, AgentExchange data architect, Forward Deployed Engineer — Agentforce Orchestration |
| **Heavy: GTM + CS capacity** | Job Category Sales 148 + Customer Success 88; keyword GTM cluster 152 |
| **Heavy: Public sector** | 44 roles incl. Missionforce Agentforce SPM, SLED AEs, PubSec architects, compliance |
| **Active: Slack integration** | 19 incl. Director PM Slackforce Architecture |
| **Active: MuleSoft + data foundation GTM** | 27 incl. Informatica-bundled AE + SVP PM Agent Fabric |
| **Thin: Classic CRM-cloud-named titles** | Only 7 explicit Sales/Service/Marketing/Commerce Cloud titles; Heroku 0; AppExchange exact 0. Tableau ~11 (mostly GTM/enablement). Data 360/Agentforce naming dominates newer product language |
| **Thin: External Product Management IC** | Job Category Product=24; keyword PM=16; few fresh Senior→Director PM reqs |
| **Thin: AppExchange-branded Product** | No “AppExchange” PM title; marketplace/agent exchange signal lives in Search & Personalization (JR351543) + Partner Experience (JR353143) + AgentExchange architect |

## PM apply shortlist (Senior PM → Director, US, Salesforce corporate)

Ranked for Ross (partner experience / Agent Exchange). Reused and re-verified against today’s Workday US snapshot; all 12 prior shortlist JRs still open.

| # | Title | Location | Posted | Req | Why it fits | URL |
|---|-------|----------|--------|-----|-------------|-----|
| 1 | Senior Product Manager, Search and Personalization | 2 Locations | Posted 30+ Days Ago | JR351543 | Best ecosystem fit: AgentExchange Marketplace Experience — search/personalization for Agentforce agents + AppExchange apps. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Senior-Product-Manager--Search-and-Personalization_JR351543 |
| 2 | Senior Product Manager, Partner Experience | New York - New York | Posted 30+ Days Ago | JR353143 | Direct partner-ecosystem PM: reimagining how partners engage/grow across Salesforce partner ecosystem. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/New-York---New-York/Senior-Product-Manager--Partner-Experience_JR353143 |
| 3 | Director, Product Management, Slackforce Architecture | California - San Francisco | Posted 12 Days Ago | JR356455 | Director-level platform PM owning Slack↔Salesforce integration architecture — Senior→Director target. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Director--Product-Management--Slackforce-Architecture_JR356455-1 |
| 4 | Director, Product Management — Campaign Brief Agent | California - San Francisco | Posted 26 Days Ago | JR355350 | Director PM on agentic messaging (Campaign Brief Agent); level match + AI/agent product work. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Director--Product-Management---Campaign-Brief-Agent_JR355350 |
| 5 | Missionforce - Senior Product Manager, Agentforce Public Sector | 2 Locations | Posted 30+ Days Ago | JR356268 | Senior PM on Agentforce for public sector; US hubs/remote. Flag: US citizen / screening. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Virginia---Herndon/Missionforce---Senior-Product-Manager--Agentforce-Public-Sector_JR356268 |
| 6 | Senior Product Manager, Emerging Technology | 3 Locations | Posted 20 Days Ago | JR355248 | Senior PM turning emerging tech into customer-facing products; multi-hub US. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/New-York---New-York/Senior-Product-Manager--Emerging-Technology_JR355248 |
| 7 | Senior Product Manager | California - San Francisco | Posted 30+ Days Ago | JR352033 | Senior PM on agentic marketing (Piper AI SDR / website experience); SF hub. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Senior-Product-Manager_JR352033 |
| 8 | Sr. Product Manager, Enterprise Security Technology | Washington - Bellevue | Posted 6 Days Ago | JR359178 | Fresh Senior PM in Bellevue; enterprise security product — level OK, less ecosystem flavor. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Washington---Bellevue/Sr-Product-Manager--Enterprise-Security-Technology_JR359178-1 |
| 9 | Product Manager, Enterprise AI & Portfolio Management Platforms | 5 Locations | Posted 30+ Days Ago | JR354037 | US multi-hub AI platform PM. Flag: title is Product Manager (not Senior/Director). | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Washington---Seattle/Product-Manager--Enterprise-AI---Portfolio-Management-Platforms_JR354037 |
| 10 | Senior Product Manager, Finance Systems – Workday | 4 Locations | Posted 10 Days Ago | JR355801 | Senior PM with strong US remote; internal Finance/Workday — level/location fit, not partner. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Virginia---Remote/Senior-Product-Manager--Finance-Systems---Workday_JR355801 |
| 11 | Senior Product Manager, IT Finance | 3 Locations | Posted 30+ Days Ago | JR351635 | Senior PM US hubs; internal Finance tech — solid corporate PM, weaker ecosystem alignment. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Senior-Manager-Product--IT-Finance_JR351635 |
| 12 | Senior Product Manager, Project & Program Management, Emerging Technology | 2 Locations | Posted 30+ Days Ago | JR344487 | Senior title + US hubs, but supports PMs (0→1 enablement) rather than owning portfolio; oldest req. | https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/New-York---New-York/Senior-Product-Manager--Project---Program-Management--Emerging-Technology_JR344487 |

### Stretch / note (not top apply targets)

- **SVP, Product Management – MuleSoft Agent Fabric & AI Control Plane** (`JR353560`) — SVP above Director target; MuleSoft Agent Fabric & AI Control Plane — domain interesting.  
  https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/SVP--Product-Management---MuleSoft-Agent-Fabric---AI-Control-Plane_JR353560

- **Product Manager, Customer Success** (`JR354315`) — Likely below Senior/Director band; Customer Success tooling.  
  https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Indiana---Indianapolis/Product-Manager--Customer-Success_JR354315

- **Product Manager Senior Specialist** (`JR349769`) — Title/level ambiguous vs Senior PM–Director; GTM Innovation specialist.  
  https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/Texas---Dallas/Product-Manager-Senior-Specialist_JR349769-1

Prior detailed shortlist also at `/workspace/salesforce-pm-jobs-20260920.md`.

## Caveats

- External Workday postings ≠ approved headcount; includes backfills and evergreen reqs.
- Some reqs appear with multi-location cards; we deduped by JR id (498 unique of 498 US rows).
- Title keyword clustering is imperfect (multi-label; Account Partner ≠ ecosystem Partner).
- Contractor / intern / fixed-term noise exists (Job Type facet: Regular 491, Intern 5, Contractor 2 under US filter context).
- Posted dates are relative strings from API (Posted X Days Ago / 30+ Days); startDate requires per-job detail fetch.
- Job Category facet counts are from the US-filtered response and should sum near total; theme multi-label counts can exceed N.

## Raw artifacts

- `/workspace/sf_us_jobs_normalized.json` — full US job list (title, location, postedOn, req, url)
- `/workspace/sf_facets_us.json` — Workday facets from US query
- `/workspace/salesforce-hiring-signal-20260920.json` — machine-readable summary
