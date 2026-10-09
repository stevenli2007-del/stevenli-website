# Phase 5 Plan — Resume-led content and Dev Log

**Status:** Planned after Phase 4 completion. This document records the proposed sequence; no resume or website copy has been rewritten yet.

## Goal

Use Steven's resume and confirmed project details to sharpen the bilingual website primarily for the two NVIDIA Ignite applications, while adding a Dev Log area for project lessons and reflections. Tesla is secondary because the internship's 12-week, full-time onsite commitment may not fit Steven's availability. Preserve every existing activity and achievement. Improve the framing, specificity, ordering, and connections between them; do not invent responsibilities, metrics, outcomes, or technical claims.

Phase 5 is the **content and design-spec phase**. Codex prepares and revises documentation only. After Steven reviews the content, Workbuddy implements the approved changes in the website.

## Current website inventory

Phase 4 is complete. About has been merged into Home, so the current five routes are:

1. Home (including About)
2. Projects
3. Experience
4. Art
5. Contact

Phase 5 adds **Dev Log** as a sixth navigation item and a dedicated `/dev-log` route. Keep the site's English/Chinese switch and URL-based `?lang=` behavior. The Dev Log must be static and lightweight; no backend, CMS, or animation is in scope.

Recommended navigation order:

`Home → Projects → Experience → Dev Log → Art → Contact`

## Target applications

Use the following postings to build a role-requirement matrix before tailoring any content. Job postings can change or close, so recheck their live details at the beginning of the resume review.

| Employer | Posting | Information verified on 2026-10-08 | Follow-up |
|---|---|---|---|
| NVIDIA — primary | [NVIDIA Ignite Internships: Software Engineering](https://jobs.nvidia.com/careers/job/893397948510) | Steven pasted the full Software Engineering Ignite description, Req. ID JR2026958. It targets first- or second-year US undergraduates, class of 2030/2029, with CS/CE/EE/Math or related majors, software fundamentals, and basic C/C++/Python/Perl/MATLAB; it values technical initiative and mentions Linux, PyTorch, VLSI, and architecture as differentiators. The program is 12 weeks onsite in Santa Clara. | Primary resume target. Use the pasted source as the current job-description reference; recheck the October 5–18, 2026 application window and availability. |
| NVIDIA — primary | [NVIDIA 2027 Ignite Internships: Hardware Engineering](https://jobs.nvidia.com/careers/job/893397961094) | Official page title confirms 2027 Ignite Hardware Engineering. Steven pasted hardware-track requirements: first-/second-year US undergraduates (class of 2030/2029), EE/CE/CS/Math or related, Hardware basics coursework, and basic C/C++/Python/Perl/MATLAB. Differentiators include VLSI, architecture, circuits, HDL, CAD, and CUDA/OpenCL. This Ignite program is 12 weeks onsite in Santa Clara. | Primary resume target. Use the pasted source as the current job-description reference; confirm its exact requisition ID and recheck availability. |
| Tesla — secondary / optional | [Internship, Program Manager, Energy Engineering (Winter/Spring 2027)](https://www.tesla.com/careers/search/job/internship-program-manager-energy-engineering-winter-spring-2027-284864) | Official page confirms Energy Engineering, Palo Alto, CA, Req. ID 284864. Steven's pasted Tesla body instead describes a **Power Systems Modeling Intern** role (RMS/EMT models, grid studies, Python, MATLAB/Simulink). Tesla internship terms commonly require 12 weeks, full-time onsite; Steven is unsure whether that duration fits. | Do not prioritize resume tailoring until Steven confirms which job description is intended and that the schedule is feasible. |

## Work sequence

Complete one task at a time. After each reviewable output, Steven confirms facts and wording before the next dependent step.

| Task | Work | Input needed | Output / review gate |
|---|---|---|---|
| 5-1 | Build the role matrix, prioritizing both NVIDIA Ignite tracks. Separate eligibility, track-specific technical signals, and shared competencies. Keep Tesla as an optional target pending job-description and schedule clarification. | User-pasted NVIDIA job descriptions; Tesla link and pasted description. Recheck live postings before application. | `docs/phase-5-role-matrix.md`. Steven verifies the matrix and confirms whether Tesla remains in scope. |
| 5-2 | Review the resume screenshots page by page. Transcribe each activity, project, award, course, role, date, tool, and measurable result into a factual inventory. Flag unreadable text and questions instead of guessing. | Steven sends resume screenshots in page order. | `docs/resume-fact-inventory.md`, with each item traceable to a screenshot/page and any open factual questions called out. Steven corrects the inventory. |
| 5-3 | Rewrite resume entries one project/activity at a time. Keep every activity. For each item, first establish the true work and evidence, then improve the action, scope, technical detail, result, and relevance to the two NVIDIA tracks. Tailor to Tesla only if Steven confirms it remains a feasible target. | Approved facts; answer to item-specific questions. | Revised resume copy saved in `docs/resume-content-v1.md` (or another format Steven requests). Steven approves each project before moving to the next. |
| 5-4 | Map the approved resume facts to the website. Decide which facts belong on Home, Projects, Experience, or Dev Log; identify redundancy and preserve all existing activities. Draft English and Chinese copy for every changed page. | Approved resume content and role matrix. | `docs/phase-5-site-content-spec.md`, with exact bilingual copy and page-by-page instructions for Workbuddy. Steven approves the whole handoff. |
| 5-5 | Define Dev Log content and its initial entries. Use lessons from projects Steven has actually completed; each entry needs a specific event, decision, result, and takeaway. | Steven's descriptions or screenshots of project notes, challenges, decisions, and lessons learned. | Add the `/dev-log` page and any entry-level content structure to the site content spec. No invented story or unpublished personal detail. |
| 5-6 | Hand off the approved spec to Workbuddy and review implementation against it. | Steven confirms the docs are ready to hand off. | Workbuddy implements; Steven and Codex review content accuracy, bilingual behavior, links, responsive states, accessibility, and Lighthouse Performance ≥ 90. Record accepted changes in Roadmap/Done Report. |

## Resume review method

For each screenshot and each activity:

1. Preserve the original facts and the activity itself.
2. Extract what Steven personally did, the problem or goal, methods/tools, collaborators, scope, and verifiable outcome.
3. Ask a focused question where the screenshot or resume leaves a meaningful gap. Do not fill the gap with a plausible-sounding claim.
4. Draft a concise resume version and a website version. The resume may be denser; the website should be faster to scan and should link to evidence where available.
5. Translate the approved English copy into Chinese without changing the claim or inflating impact.
6. Mark the item as approved before using it in the role matrix, website spec, or Dev Log.

Keep an evidence field in the working inventory, for example: screenshot page, published link, artifact, paper, or Steven-confirmed recollection. Do not expose private source evidence on the public site unless Steven asks for it.

## Dev Log direction

- Add one route `/dev-log` linked from the shared header; use the existing bilingual page shell and `?lang=` language behavior.
- The index should be a chronological list of short entries, newest first. Each entry preview shows a clear title, project/topic, date (only if confirmed), and a one-sentence takeaway.
- Use static content in the existing data layer. Keep entries readable without a CMS. A dedicated detail route per post is optional and should be decided after the first entry drafts exist; begin with a single index route unless the content length makes separate pages useful.
- Each post should answer: What was I trying to do? What did I try or decide? What changed or failed? What will I do differently next time?
- Initial topic candidates to validate with Steven: shipping and iterating the LinkedIn AI Assistant; building the automated contact-angle measurement platform; turning a repeated family-business workflow into a mini program; what changed between first using an SEM and later guiding students through an SEM visit. These are prompts for fact-finding, not approved post claims.
- Keep the writing concrete and reflective. No generic “lessons learned” filler, self-deprecation, emoji, or unsupported performance numbers.

## Similar early-undergraduate opportunities

- Use NVIDIA Ignite as the closest model: explicit first-/second-year eligibility and hands-on software or hardware exposure.
- Microsoft's [Explore program](https://careers.microsoft.com/students/us/en/us-explore-microsoft-results) is explicitly for first-/second-year students and focuses on software product development, but the US version is also 12 weeks. Keep it as a watchlist option only if Steven can commit to that duration; verify the active 2027 application before recommending it.
- AMD's [2027 Undergraduate Hardware Engineering internship/co-op](https://careers.amd.com/careers-home/jobs/90894?icims=1) lists San Jose/Santa Clara placements and full-time 40-hour terms. The posting does not clearly specify first-/second-year eligibility and its summer term is roughly 12 weeks. Treat it as a possible fit to verify, not a confirmed freshman/sophomore program.
- Filter future suggestions by academic year eligibility, location/work authorization, dates, and total required weeks before recommending. Do not assume an ordinary internship accepts freshmen just because it says undergraduate.

## Constraints and non-goals

- Keep all six existing parts/activities and the existing project, research, experience, art, and contact inventory. Reframing and prioritizing are allowed; removing an activity is not part of this plan.
- Preserve bilingual English/Chinese behavior and translate newly approved visible copy.
- Do not change website implementation during 5-1 through 5-5. Codex's work in this phase remains in `docs/` only.
- Do not write public Dev Log entries from imagined events. Draft only from resume evidence and Steven's additional recollections.
- Avoid adding images, external libraries, remote fonts, animations, or other performance-heavy presentation features as part of the content work.
- Maintain Lighthouse Performance ≥ 90 after Workbuddy implements the approved spec.

## Ready-to-handoff checklist

- [ ] Three job postings reviewed from current source text; role matrix approved.
- [ ] Resume screenshots transcribed into a fact inventory; uncertain claims resolved.
- [ ] Every resume activity retained and individually reviewed.
- [ ] Resume wording approved by Steven.
- [ ] Website page mapping and bilingual copy approved.
- [ ] Dev Log first entries use confirmed project facts and have approved copy.
- [ ] Workbuddy receives a single implementation-ready spec with exact page content and route/navigation requirements.
- [ ] Implementation reviewed against the approved spec; Lighthouse Performance remains ≥ 90.
