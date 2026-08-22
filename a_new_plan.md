# A New Plan for Farhan Segujja's Portfolio

**Document status:** Baseline proposal for review  
**Prepared:** 5 August 2026  
**Implementation status:** Not started  
**Decision rule:** Farhan's notes in the clearly marked appendix at the bottom of this document will be treated as amendments to this baseline. Before implementation, the baseline and the appended notes must be reconciled explicitly.

---

## 1. Executive direction

The current website is a polished placeholder. It identifies Farhan Segujja as a Computer Science student and aspiring full-stack developer, links to GitHub and email, and communicates that a fuller portfolio is coming. The replacement should preserve that factual foundation while changing the experience from “coming soon” into a credible record of work already underway.

The new portfolio will present Farhan as:

> A Computer Science student building useful web experiences and Python systems, with a current focus on practical frontend work, machine-learning deployment, and a community website campaign.

This is intentionally narrower and more credible than a generic “full-stack engineer building digital solutions” claim. It reflects the public repositories and leaves room for growth without overstating professional seniority.

The portfolio's core job is to help a visitor answer four questions quickly:

1. Who is Farhan?
2. What has he actually built?
3. How does he think and work?
4. How can I inspect the work or contact him?

The visual direction will be an **editorial developer notebook**: warm, typographic, structured, evidence-led, and recognizably personal. It will not resemble a generic dark SaaS landing page. The work—not decorative effects—will provide the visual interest.

The first release should use only vanilla HTML, CSS, and JavaScript. No React, Tailwind, UI framework, component library, CMS, or runtime dependency will be introduced.

---

## 2. Research findings that inform the design

### 2.1 Current portfolio repository

The current repository contains:

- `index.html`: the full semantic content and basic metadata.
- `style.css`: a centered dark glass-style hero card with blue and green radial glows.
- `script.js`: a three-second rotation through four development-status messages.
- `CNAME`: the custom domain `farhansegujja.com`.

Useful content to preserve:

- Name: Farhan Segujja.
- Current positioning: Computer Science student and aspiring full-stack developer.
- Interest in projects, technical skills, a learning journey, and software engineering work.
- GitHub profile: `https://github.com/Al-Farhan-Seg`.
- Contact email: `farhan.segujja@gmail.com`.
- Custom domain: `farhansegujja.com`.

Elements to retire:

- The “coming soon” framing.
- The rotating status copy.
- The decorative green status dot, which does not represent an actionable system state.
- The full-page glass card and radial glow background, because these now strongly resemble generic AI-generated portfolio styling.
- The unimported `Inter` declaration.

### 2.2 Current GitHub profile

The public profile currently has nine repositories. The profile name is “Farhan Segujja,” the website field points to the portfolio domain, and the bio, location, and company fields are empty. The repository history shows a useful progression from coursework and guided practice toward deployed applications and campaign infrastructure.

Current public repositories and proposed portfolio treatment:

| Repository | What it demonstrates | Portfolio role |
|---|---|---|
| `c23-digital-spotlight` | Campaign strategy, frontend design, forms, accessibility, multi-site deployment architecture, Cloudflare Worker routing | Flagship case study |
| `traffic-sign-recognition-app` | Python, Streamlit, TensorFlow/Keras, model-to-web integration, deployment | Featured technical project |
| `roadmap.sh-builds` | Consistent frontend practice with HTML, CSS, and vanilla JavaScript; live subdomain | Featured collection |
| `sacco-mgt-system` | Object-oriented Python modeling of members, accounts, savings, loans, staff, and withdrawals | Supporting project |
| `oop-practice` | Progressive practice in classes, encapsulation, inheritance, and system modeling | Learning archive |
| `wesbos-javascript-30` | DOM, events, browser APIs, and vanilla JavaScript practice | Learning archive |
| `asabeneh-js-challenges` | JavaScript fundamentals, ES6+, DOM work, and documented exercises | Learning archive |
| `farhansegujja` | The portfolio itself | Mention only in source/footer, not as featured work |
| `Al-Farhan-Seg` | GitHub profile README repository | Not a project card |

This hierarchy avoids the common portfolio mistake of presenting every repository as equally mature. It also distinguishes original, deployed work from guided learning exercises.

### 2.3 Developer portfolio reference collection

The `emmabostian/developer-portfolios` repository describes itself as an inspiration collection and currently lists approximately 1,897 portfolios. It is useful as a comparative library, not as a template source.

How it will be used:

- Compare portfolios by information hierarchy, project depth, navigation clarity, responsive behavior, and contact flow.
- Sample across student, full-stack, frontend, Python, and machine-learning portfolios rather than copying one visual style.
- Record patterns that repeatedly help visitors: an immediate role statement, selected work near the top, visible source/live links, concise project context, clear responsibility, and easy contact.
- Reject superficial trends even when they are common in the collection.
- Do not reproduce another portfolio's layout, copy, illustration, or distinctive interaction.

The collection's size is itself a warning: “looks like a developer portfolio” is not a sufficient design objective. Farhan's campaign work and learning trajectory must create the specific point of view.

Reference: <https://github.com/emmabostian/developer-portfolios>

### 2.4 C23 Digital Spotlight deep dive

The C23 repository is more substantial than its missing GitHub description suggests. It was created on 29 July 2026 and is designed as a four-week pilot for Farhan's secondary-school alumni community.

Campaign proposition:

- One free starter website roughly every seven days.
- Alternating between an alumna and an alumnus.
- A campaign hub at `c23.farhansegujja.com` acts as the public source of truth.
- Participants apply or nominate someone through a dedicated application page.
- Each participant site is intended to be an independent, one-page, plain HTML/CSS/JS website.

Engineering structure:

- A multi-site repository where each `sites/<slug>/` folder is an independent website.
- Vite is used as a build tool, but participant sites remain framework-free.
- Build scripts automatically discover sites and generate `dist/<slug>/` output.
- A Cloudflare Worker maps approved hostnames to site slugs.
- Unknown hostnames receive a hard 404 instead of falling through to arbitrary assets.
- Existing subdomains are deliberately protected from campaign routing.
- Redirect locations are rewritten to prevent slug duplication after Cloudflare asset canonicalization.
- The hub uses a safe flat `apply.html` exception while participant websites retain a one-page constraint.

Campaign-hub UX and frontend work:

- A branded campaign homepage and a separate application page.
- Responsive navigation, active-section tracking, an FAQ accordion with deep linking, horizontal content scrolling, and a hero image carousel.
- A first-visit intro splash that accounts for session storage, Chrome prerendering, back/forward cache restoration, font loading, skip behavior, and fail-safe removal.
- Motion is disabled or shortened for visitors who prefer reduced motion.
- The carousel pauses in hidden tabs and does not run when reduced motion is requested.
- A multi-part application form with conditional school-stream fields, referral fields, a character counter, custom validation, focus management, explicit loading/success/error states, a honeypot, hCaptcha, and Web3Forms submission.
- Design tokens based on a paper/ink foundation with green, blue, and orange accents; Fredoka, Source Sans 3, and Lora provide distinct display, interface, and editorial voices.

Why this belongs at the center of the portfolio:

- It connects technical execution to a real community and a time-bound public initiative.
- It demonstrates systems thinking beyond the visible homepage.
- It contains specific browser and deployment problems with documented solutions.
- It gives the portfolio a story that is uniquely Farhan's.
- It is evolving, which allows the case study to gain real outcomes as weekly sites launch.

Important truth constraint:

At the time of this plan, the Worker allowlist shown publicly contains only the campaign hub. The portfolio must not claim four launches, participant outcomes, conversion figures, testimonials, or campaign impact until those facts exist and can be linked or evidenced.

Reference: <https://github.com/Al-Farhan-Seg/c23-digital-spotlight>

---

## 3. Audience and product goals

### Primary audiences

1. **Internship or junior-role reviewers** who need fast evidence of foundations, growth, and judgment.
2. **Potential collaborators or community members** who want to understand the C23 campaign or Farhan's ability to build practical sites.
3. **Developers and mentors** who may inspect source code and evaluate implementation choices.
4. **Peers and classmates** who may discover projects or follow the learning journey.

### Primary conversion

The main visitor action is:

> Inspect a selected project.

The main homepage button should therefore be **“See selected work”**, linking to the featured-work section.

### Secondary conversions

- Visit a live project.
- Review a source repository.
- Read the C23 case study.
- Email Farhan.

### Non-goals for version one

- Pretending to be a software agency.
- Selling undefined services.
- Displaying fabricated social proof.
- Adding a blog with no existing articles.
- Adding a contact form when a direct email action is sufficient.
- Showing GitHub statistics as a proxy for project quality.
- Claiming proficiency based only on technologies named in metadata.

---

## 4. Brand and narrative strategy

### Brand qualities

The site should feel:

- Curious, not self-important.
- Precise, not sterile.
- Ambitious, not inflated.
- Warm, not gimmicky.
- Technical, but readable by a non-developer.
- Clearly made by a student who already ships real work.

### Narrative arc

The homepage should read as a progression:

1. **Identity:** Farhan is a Computer Science student building practical software.
2. **Proof:** Selected projects show deployed frontend, Python, and machine-learning work.
3. **Depth:** C23 shows the reasoning and infrastructure behind a real campaign.
4. **Trajectory:** Learning repositories show deliberate skill development without competing with original work.
5. **Invitation:** Visitors can inspect the source, follow the campaign, or get in touch.

### Copy voice

- First person, plain language, short sentences.
- Concrete nouns and verbs: “built,” “deployed,” “mapped,” “validated,” “documented.”
- Explain the user or problem before listing technology.
- Use “I” for individual work and “we” only when a project was genuinely collaborative.
- Credit collaborators on group work.
- Acknowledge the learning objective when a project is coursework or guided practice.
- Do not use phrases such as “crafting digital experiences,” “turning ideas into reality,” “passionate developer,” “innovative solutions,” or “building the future.”
- Avoid excessive em dashes and slogan fragments.

### Proposed homepage hero copy

Eyebrow:

> Computer Science student · Kampala time zone

Heading:

> I build useful websites and Python systems.

Supporting copy:

> I'm Farhan Segujja, an aspiring full-stack developer learning by shipping. My recent work includes a community website campaign, a traffic-sign classifier, and a growing collection of frontend builds.

Primary action:

> See selected work

Secondary action:

> Email Farhan

The Kampala reference should only ship if Farhan confirms that this is an appropriate public location description. Until then, the current facts do not establish a location and the eyebrow should simply read “Computer Science student.”

---

## 5. Information architecture

### Page model

Use a small static multi-page site:

- `/index.html` — portfolio overview.
- `/work/c23/index.html` — detailed C23 case study.
- `/404.html` — useful recovery page for GitHub Pages.

Other projects remain concise on the homepage until enough original material exists for dedicated case studies. This avoids empty project-detail templates.

### Homepage section order

1. **Site header**
   - Text wordmark: “Farhan Segujja.”
   - Links: Work, About, Learning, Contact.
   - No floating translucent navigation capsule.

2. **Hero**
   - Specific role and one-sentence direction.
   - Primary and secondary actions.
   - A small text note about the current campaign, not an animated status indicator.

3. **Selected work index**
   - Three deliberately different project compositions rather than a grid of identical cards.
   - C23 occupies the dominant first row.
   - Traffic Sign Recognition and roadmap.sh builds form supporting entries.

4. **C23 preview**
   - Short campaign premise.
   - Farhan's role.
   - Three concrete engineering decisions.
   - Campaign image or carefully captured interface screenshot.
   - Links to the detailed case study, source, and live site only after live verification.

5. **Other work**
   - SACCO Management System as a compact project entry.
   - Clear label if it is coursework or collaborative.

6. **About / working approach**
   - Two short paragraphs, not a biography wall.
   - A factual capability list organized by what Farhan can do, not a logo cloud.
   - Suggested groups: “Interfaces,” “Python systems,” “Tools and deployment.”

7. **Learning log**
   - OOP practice, JavaScript30, and 30 Days of JavaScript shown as a chronological learning trail.
   - State why each collection exists and what has changed in Farhan's work because of it.

8. **Contact**
   - A direct invitation to discuss an internship, collaboration, or project.
   - Email and GitHub only, unless Farhan supplies real additional links.

9. **Footer**
   - Name, year, email, source link, and a short build note: “Built with semantic HTML, CSS, and JavaScript.”

### C23 case-study structure

1. Case-study header: project, date, role, status, and links.
2. The campaign premise and intended community.
3. The constraint: one site per week, multiple subdomains, one deployment system.
4. Farhan's responsibilities, clearly separated from any collaborators.
5. Campaign flow from application to launch.
6. Architecture explanation with a small semantic HTML/CSS diagram rather than a decorative illustration.
7. Selected frontend decisions: form states, accessibility, motion preferences, and browser lifecycle handling.
8. Challenges and resolutions:
   - Multi-site hostname routing.
   - Cloudflare redirect prefix behavior.
   - First-visit splash under prerendering and bfcache.
   - hCaptcha/Web3Forms payload handling.
9. Current status and verified outcomes.
10. What Farhan would improve next.
11. Source and live links.

---

## 6. Project presentation rules

Every featured project must answer these questions in this order:

1. What problem or learning objective existed?
2. Who was the project for?
3. What did Farhan personally do?
4. What technical decision is worth discussing?
5. What works now?
6. What remains incomplete?
7. Where can the visitor verify it?

### Featured project 1: C23 Digital Spotlight

Proposed label:

> Community campaign · Frontend and deployment architecture · 2026

Proposed summary:

> A four-week alumni campaign offering one free starter website each week. I built the public campaign hub, application flow, and a multi-site Cloudflare deployment system designed to add each participant as an independent vanilla website.

Evidence to show:

- Campaign hub screenshot.
- Application form screenshot with a real state such as validation or success—not a fake mockup.
- Simplified hostname-to-site architecture.
- Links to relevant source files.
- A launch timeline that begins with actual dates and remains empty for future weeks until launches happen.

### Featured project 2: Traffic Sign Recognition App

Proposed label:

> Machine learning deployment · Python, Streamlit, TensorFlow/Keras · 2026

Proposed summary:

> A web application that accepts a traffic-sign image and returns a model classification. The project focused on connecting a trained Keras model to a usable Streamlit interface and mapping predictions to readable labels.

Evidence to show:

- Real app screenshot.
- Live demo and source links.
- Clear note that it is a practice/deployment project.
- Current limitations from the repository: confidence display, stronger invalid-upload handling, and sample test images.
- Group attribution if other people contributed to the model or assignment.

### Featured project 3: roadmap.sh Builds

Proposed label:

> Frontend practice collection · HTML, CSS, JavaScript · Ongoing

Proposed summary:

> A growing set of roadmap.sh challenges used to practise semantic HTML, layout, responsive design, and interface components without a frontend framework.

Evidence to show:

- A composed contact sheet of three materially different builds.
- Link to the live collection and source repository.
- A short “what improved” note rather than claiming each exercise is a standalone product.

### Supporting project: SACCO Management System

Show as a concise code-focused entry. Explain the financial operations modeled, the object-oriented structure, and the collaborative context. Do not use finance-themed stock imagery.

### Learning archive

Do not turn every learning repository into a card. Use a compact dated list with repository link, learning focus, and completion status. This is more honest and visually calmer.

---

## 7. Visual design system

### Design concept: “Field notes from a builder”

The portfolio should resemble a carefully edited project journal, with strong typographic hierarchy, numbered work entries, margin notes, understated rules, and real screenshots. It should not resemble a startup landing-page template.

### Color direction

Proposed roles, subject to contrast testing:

- **Paper:** warm off-white background, approximately `#F4F0E8`.
- **Ink:** near-black green/charcoal, approximately `#17201C`.
- **Muted ink:** desaturated grey-green for secondary text.
- **Rule:** warm grey for dividers and figure borders.
- **Signal accent:** restrained clay/orange, approximately `#C44E32`, used only for links, active states, and selected details.
- **Project-specific colors:** permitted inside real project imagery, but not turned into arbitrary interface accents.

Rules:

- No purple-to-blue gradient.
- No neon palette.
- No decorative aurora/radial glows.
- No text gradients.
- The accent color has a defined job and is not scattered for decoration.
- Color never carries meaning alone.

### Typography

Use two purposeful, open-source type families at most:

- **Source Serif 4** or an equivalent editorial serif for major headings and selected pull statements.
- **IBM Plex Sans** or an equivalent humanist/technical sans for body copy, labels, navigation, and code-adjacent information.

Fonts should be self-hosted in efficient WOFF2 subsets if licenses and files are confirmed. Fallbacks must preserve readability. The typography system should include a documented scale rather than one-off sizes.

Approximate roles:

- Display heading: fluid but capped; never fills the entire viewport.
- Section heading: visually distinct without oversized marketing typography.
- Body: approximately 17–19px desktop and 16–18px mobile.
- Metadata: never below a comfortably readable size.
- Paragraph measure: approximately 60–72 characters.

### Grid and spacing

- Desktop: 12-column editorial grid.
- Tablet: 6-column grid.
- Mobile: 4-column grid that usually resolves to a single reading column.
- Content width: approximately 1120–1200px, with readable text constrained separately.
- Spacing scale: 4, 8, 12, 20, 32, 48, 72, 112.
- Sections use whitespace and rules for grouping before containers.
- Breakpoints are introduced where content needs them, not to target named devices.

### Shapes and surfaces

- Default radius: 0–4px.
- Larger radius: no more than approximately 12px and only for media or a genuinely bounded control.
- No pill-shaped labels unless the content genuinely represents a compact state or filter.
- No nested cards.
- No shadow by default; use a single restrained elevation treatment only where interaction or layering requires it.

### Imagery

- Prefer real screenshots, diagrams, and supplied photographs.
- Do not generate fake product interfaces or fictional project scenes.
- Avoid laptop/device mockups that make screenshots smaller and less legible.
- Give every meaningful image useful alternative text; decorative images receive empty alt text.
- Set intrinsic image dimensions to prevent layout shift.
- Provide modern formats with sensible fallbacks where beneficial.

### Icons

- Use icons only where they improve scanning or identify a familiar action.
- Use one consistent, open-source outline icon system or small custom inline SVG set.
- No emojis as interface icons.
- No oversized icon tiles.
- Text labels remain visible for important actions.

### Motion

- No autoplay hero carousel on the portfolio.
- No cursor follower, 3D tilt, parallax, floating blobs, or constant background motion.
- No scroll-reveal system that hides content until JavaScript runs.
- Hover/focus transitions: generally 120–220ms with restrained easing.
- Movement should communicate hover, expansion, focus, or navigation continuity.
- `prefers-reduced-motion` must remove nonessential movement.

---

## 8. Anti–vibe-code charter

This section is a binding quality gate for implementation.

### 8.1 Strategy gate

- Every page has one primary audience and one primary next action.
- Every section must support understanding, evidence, trust, or action.
- No section may exist only because portfolios “usually have one.”
- Every visible claim must be supported by the current site, a public repository, a live project, or information Farhan appends below.
- Where evidence is incomplete, use honest language such as “practice project,” “pilot,” “ongoing,” or “planned.”

### 8.2 Visual-authorship gate

Do not ship any of the following by default:

- Purple/blue gradients.
- Neon-on-dark palettes.
- Radial glow backgrounds.
- Glassmorphism.
- Floating gradient blobs.
- Giant headline plus tiny body-copy hero compositions.
- Generic bento grids.
- Three identical cards under every heading.
- Cards nested inside cards.
- Excessive rounded rectangles.
- Meaningless status dots.
- Decorative multicolored side bars.
- Sparkles or emojis as visual filler.
- Huge icons with weak relationship to content.
- Generic “modern” dashboards or fake browser chrome.

For every nontrivial visual treatment, implementation must be able to answer: **What content, user need, or brand quality does this support?** If the answer is only “it looks modern,” remove it.

### 8.3 Copy and proof gate

- No generic motivational hero copy.
- No fake testimonials, employers, clients, user counts, accuracy metrics, stars, awards, or impact statistics.
- No “trusted by” section without real organizations and permission.
- No vague calls to action such as “Learn more” when a specific label is possible.
- No placeholder links or empty social icons.
- No technology claims inferred only from a repository description if the source does not support them.
- No hiding incompleteness; note meaningful constraints and next steps.

### 8.4 System-consistency gate

- One documented token system for colors, spacing, type, borders, radii, and motion.
- Same action type means same visual treatment.
- The same component cannot drift in padding, radius, icon size, or hover behavior between pages.
- Project layouts may differ in composition, but shared controls remain consistent.
- Each responsive state must be designed deliberately, not left as a desktop layout that wraps accidentally.

### 8.5 Interaction gate

- Every control works with pointer and keyboard input.
- Every external link resolves to the intended destination.
- Every asynchronous action has loading, success, error, and disabled behavior.
- Menu state exposes `aria-expanded` and manages focus appropriately.
- No decorative controls, fake toggles, nonfunctional carousels, or click targets with no feedback.
- JavaScript is progressive enhancement; core content and navigation remain available when scripts fail.

### 8.6 Code-quality gate

- Semantic elements before generic `<div>` elements.
- Native HTML behavior before custom JavaScript behavior.
- CSS custom properties for the design system.
- Small, named JavaScript functions with guarded DOM access where code is page-specific.
- No dead selectors, copied framework conventions, unexplained magic values, or duplicated components.
- No dependency for behavior that can be clearly implemented in a few lines of platform code.
- Comments explain non-obvious constraints, not obvious syntax.

### 8.7 Final anti-vibe audit

Before release, inspect the entire site—not isolated components—and ask:

1. Does it look specifically connected to Farhan's work?
2. Is the hierarchy obvious within five seconds?
3. Is any visual effect pretending to carry meaning?
4. Are identical containers making unrelated content feel the same?
5. Is any copy interchangeable with another developer's portfolio?
6. Is every project claim verifiable?
7. Does mobile feel intentionally designed?
8. Does the site still communicate clearly without animation?
9. Can every action be completed with a keyboard?
10. Are there any placeholders, dead links, console errors, or unfinished states?

Source material for this charter:

- <https://www.reddit.com/r/SaaS/comments/1miq0ea/if_youre_vibe_coding_a_website_look_out_for_these/>
- <https://www.reddit.com/r/VibeCodeDevs/comments/1p5vnqq/plz_avoid_these_obvious_signs_your_website_is/>
- <https://www.sinton.agency/blog/how-to-spot-a-vibe-coded-website>
- <https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui>

---

## 9. Vanilla frontend architecture

Proposed repository structure:

```text
/
├── index.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── work/
│   └── c23/
│       └── index.html
└── assets/
    ├── css/
    │   └── site.css
    ├── js/
    │   └── site.js
    ├── fonts/
    ├── icons/
    └── images/
        ├── profile/
        ├── projects/
        └── social/
```

### HTML plan

- Use landmarks: `header`, `nav`, `main`, `section`, `article`, `aside` where appropriate, and `footer`.
- One descriptive `h1` per page with a logical heading hierarchy below it.
- Add a visible-on-focus skip link.
- Use lists for project metadata and the learning log.
- Use `figure` and `figcaption` for screenshots and architecture diagrams.
- Use descriptive link text and preserve standard link behavior.
- Mark dates with `time` elements.

### CSS plan

- Begin with a small reset and sensible inherited defaults.
- Define all visual tokens in `:root`.
- Use cascade layers only if they genuinely improve organization; do not introduce complexity for fashion.
- Prefer Grid for page composition and Flexbox for one-dimensional control groups.
- Use `clamp()` selectively for fluid typography and gutters.
- Use logical properties where they improve adaptability.
- Include print styles for the case study if the result remains clean.
- Include reduced-motion and forced-colors considerations.

### JavaScript plan

JavaScript should be limited to useful enhancement:

- Mobile navigation state.
- Current-section navigation highlighting if it remains stable and accessible.
- Optional screenshot viewer only if a native link is not sufficient.
- Current year only if needed; static text is also acceptable.

Avoid client-side rendering, project data fetched from GitHub at runtime, theme-toggle complexity, and animation libraries. Project content should exist directly in HTML so it is fast, accessible, and indexable.

### Hosting plan

- Preserve GitHub Pages and the existing `CNAME` unless Farhan appends a hosting change.
- Use relative paths that work on the custom domain and GitHub Pages preview.
- Keep the production site functional without a build step.
- Do not alter C23 or its Cloudflare deployment from this portfolio repository.

---

## 10. Current UI/UX and frontend quality targets

### Accessibility

Target WCAG 2.2 Level AA, including:

- Sufficient text and non-text contrast.
- Visible focus states.
- Keyboard access and logical focus order.
- Focus not hidden behind a sticky header.
- Minimum target-size considerations.
- Reflow without two-dimensional scrolling at narrow widths.
- Text resizing and 200% zoom support.
- Useful headings, labels, error identification, and status messages.
- No reliance on color, hover, or animation alone.

Accessibility requires manual review in addition to automated checks.

Primary reference: <https://www.w3.org/TR/WCAG22/>

### Performance

Target good Core Web Vitals at the 75th percentile:

- LCP at or below 2.5 seconds.
- INP at or below 200 milliseconds.
- CLS at or below 0.1.

Supporting budgets:

- Keep initial HTML, CSS, and JavaScript deliberately small.
- Avoid production JavaScript dependencies.
- Compress and correctly size screenshots.
- Lazy-load below-the-fold project media.
- Preload only a genuinely critical self-hosted font subset, if used.
- Give images dimensions and avoid font/layout shifts.
- No third-party analytics in the first release unless requested.

Primary reference: <https://web.dev/articles/vitals>

### Responsive behavior

Manually review at minimum:

- 320px narrow phone.
- 375–430px common phone range.
- 768px tablet.
- 1024px small laptop/tablet landscape.
- 1366–1440px desktop.
- 1920px wide desktop.

Also test content rather than only widths: long project titles, missing images, focus outlines, zoomed text, and reduced motion.

### SEO and sharing

- Unique title and description per page.
- Canonical URLs.
- Open Graph and social preview metadata.
- A purpose-built 1200×630 social image based on the site's actual design.
- `Person`, `WebSite`, and appropriate project/creative-work structured data using only verified facts.
- `robots.txt` and `sitemap.xml`.
- Complete favicon set and web manifest where useful.
- No keyword stuffing or generic AI-written biography padding.

### Privacy and security

- Keep contact to the already-public email unless Farhan supplies an alternative.
- Use `rel="noopener noreferrer"` for new-tab external links.
- Do not embed secret keys, private analytics identifiers, or unneeded third-party scripts.
- Do not copy private applicant data or campaign submissions into the portfolio.
- Use only project screenshots that do not expose personal information.

---

## 11. Implementation phases after approval

### Phase 0: Reconcile this document

1. Read this baseline from top to bottom.
2. Read Farhan's appendix from top to bottom.
3. Produce a short reconciliation table with:
   - Baseline decision.
   - Farhan's amendment.
   - Final implementation decision.
4. Treat explicit appended instructions as authoritative unless they create a security, privacy, accessibility, or factual problem.
5. Flag any genuine conflict before editing website files.

### Phase 1: Content and evidence inventory

1. Recheck public repositories because C23 is active and may have changed.
2. Record current live URLs and whether they load successfully.
3. Identify project authorship and collaborators.
4. Capture real screenshots at consistent, useful viewport sizes.
5. Remove or redact any personal application data.
6. Confirm the public bio, location wording, availability, and contact links from the appendix.
7. Draft final copy using verified material only.

### Phase 2: Low-fidelity structure

1. Build the semantic document outline before decorative styling.
2. Validate section order on mobile first.
3. Confirm that selected work appears before the longer biography.
4. Confirm that C23 reads as the flagship project without making other work invisible.
5. Check the contact path and project-link hierarchy.

### Phase 3: Design system

1. Establish type, spacing, color, border, radius, and interaction tokens.
2. Create a plain HTML pattern sheet for shared controls and project treatments.
3. Test contrast before expanding the palette.
4. Test the type system with real project copy, not placeholder text.
5. Compare the complete system against the anti-vibe charter.

### Phase 4: Homepage implementation

1. Replace the placeholder with the new semantic layout.
2. Implement the editorial grid and responsive states.
3. Add real project media and verified links.
4. Add minimal progressive JavaScript.
5. Preserve `CNAME` and existing domain behavior.

### Phase 5: C23 case study

1. Build the project narrative from public evidence.
2. Add the architecture diagram in semantic HTML/CSS or accessible SVG.
3. Document browser and Cloudflare challenges concisely.
4. Add current campaign status without inventing outcomes.
5. Link to the repository and confirmed live page.

### Phase 6: Metadata and resilience

1. Add per-page metadata, social image, sitemap, robots file, favicon assets, and structured data.
2. Add the 404 page.
3. Confirm behavior with JavaScript disabled.
4. Confirm missing-image fallbacks do not destroy layout.

### Phase 7: Verification

1. Validate HTML and inspect CSS/JavaScript for errors.
2. Test all internal, external, email, source, and live-demo links.
3. Test keyboard navigation and visible focus.
4. Test screen-reader names and heading/landmark structure.
5. Test reduced motion, 200% zoom, narrow screens, wide screens, and common browsers.
6. Run performance and accessibility audits.
7. Fix all material issues before calling the site complete.
8. Compare the finished site against both this baseline and Farhan's appendix.
9. Report exactly what was tested and any limitations that remain.

---

## 12. Definition of done

The portfolio is complete only when:

- The “coming soon” page has been fully replaced.
- The site communicates Farhan's current level honestly.
- C23 is presented as a deep, evidence-backed case study.
- Featured, supporting, and learning work have visibly different hierarchy.
- Every public claim can be verified.
- Every visible action works.
- The site is intentionally responsive from 320px through wide desktop.
- Keyboard and reduced-motion experiences are complete.
- WCAG 2.2 AA issues found during review are resolved where the site controls them.
- Core Web Vitals are in the good range in representative testing or any exception is documented.
- There are no placeholder links, fake testimonials, meaningless status dots, arbitrary gradients, nested-card layouts, or decorative UI controls.
- The implementation uses vanilla HTML, CSS, and JavaScript.
- GitHub Pages and the custom domain still work.
- The final implementation has been compared against both parts of this document.

---

## 13. Research sources

### Farhan and project sources

- Current portfolio: <https://farhansegujja.com/>
- GitHub profile: <https://github.com/Al-Farhan-Seg>
- C23 Digital Spotlight: <https://github.com/Al-Farhan-Seg/c23-digital-spotlight>
- Traffic Sign Recognition App: <https://github.com/Al-Farhan-Seg/traffic-sign-recognition-app>
- roadmap.sh Builds: <https://github.com/Al-Farhan-Seg/roadmap.sh-builds>
- SACCO Management System: <https://github.com/Al-Farhan-Seg/sacco-mgt-system>

### Inspiration and anti-pattern sources

- Developer portfolio collection: <https://github.com/emmabostian/developer-portfolios>
- r/SaaS anti-pattern discussion: <https://www.reddit.com/r/SaaS/comments/1miq0ea/if_youre_vibe_coding_a_website_look_out_for_these/>
- r/VibeCodeDevs anti-pattern discussion: <https://www.reddit.com/r/VibeCodeDevs/comments/1p5vnqq/plz_avoid_these_obvious_signs_your_website_is/>
- Sinton Agency, “How to Spot a Vibe Coded Website”: <https://www.sinton.agency/blog/how-to-spot-a-vibe-coded-website>
- Fountain Institute, “7 Signs a UI Has Been Vibe Coded”: <https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui>

### Standards and current frontend guidance

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Web Vitals: <https://web.dev/articles/vitals>
- MDN, accessible HTML: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML>
- MDN, reduced motion: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion>

---

# ⬇️ FARHAN: APPEND YOUR CHANGES BELOW THIS LINE ⬇️

**Please do not edit the baseline above. Add every correction, preference, missing fact, or requested change below. You can write in any format. Explicit instructions here will be compared against the baseline before implementation.**

Helpful information you may want to add:

- Preferred public bio and exact role wording.
- University/program and expected graduation year, if public.
- Location wording, if public.
- Availability for internships, freelance work, collaboration, or employment.
- A profile photograph or instruction not to use one.
- Additional social/contact links that are real and active.
- Project collaborators and exactly what you personally built.
- C23 launch updates, participants, dates, or outcomes that can be verified.
- Visual preferences or anything in the proposed direction you dislike.
- Sections to add, remove, or reorder.
- Any information that must remain private.

## Farhan's amendments

<!-- START WRITING ON THE NEXT LINE. Leave this marker in place. -->


For **c23 spotlight** I have so far deployed the following under the worker;
```javascript
const HOSTNAME_TO_SLUG = {
  'c23.farhansegujja.com': 'c23',
  'nimu-timber.farhansegujja.com': 'nimu-timber',
  'nutking.farhansegujja.com': 'nutking',
  'modestmuse.farhansegujja.com': 'modestmuse',
};
```
this can be found in `https://github.com/Al-Farhan-Seg/c23-digital-spotlight/blob/main/worker/index.js`

I have also been an intern at Embiro Technologies from _March 2026 to Present_ where I have contributed to a number of website builds hosted under the organisations subdomain; 
```markdown
## Custom / Paid Domains

* https://ikorushoneystore.com
* https://readusafrica.org
* https://yourafricanneighbour.com
* https://sapondo.com

## Major Embiro-Hosted Client Projects

* https://nextmedia.embiro.tech/
* https://kin.embiro.tech/

## #SheBuilds — Embiro Subdomains

* https://iffah.embiro.tech
* https://fastalabs.embiro.tech
* https://bracy.embiro.tech
* https://eclatee.embiro.tech
* https://ivy.embiro.tech
* https://giftaura.embiro.tech
* https://kuzimba.embiro.tech
* https://yofarm.embiro.tech
* https://mario.embiro.tech
* https://munnange.embiro.tech
* https://dripra.embiro.tech
* https://afroniceties.embiro.tech
* https://agasia.embiro.tech
* https://enerforte.embiro.tech
* https://mackie.embiro.tech
* https://geriatric.embiro.tech
* https://hegs.embiro.tech
* https://aprica.embiro.tech
* https://awh.embiro.tech
* https://restore.embiro.tech
* https://renak.embiro.tech
```

Under EMBIRO Technologies, i was also part of the QA an UAT of the organisations internal operations platform identifying bugs and suggesting features which I was later tasked to implement and arecurrently used.
```markdown
### Embiro Operations Platform — QA, UAT & Engineering Contributions

Beyond client website development, I contributed to the **Embiro Operations Platform (EOP)**, an internal system used to manage clients, projects, invoices, payments, staff activity, requests, and other operational workflows.

My involvement began with **QA and User Acceptance Testing (UAT)**. I tested the platform from a real user's perspective, documented bugs, identified security and permission issues, and proposed features through Embiro's internal bug-and-feature bounty system.

This work went beyond reporting issues. Several findings were later assigned back to me for implementation, giving me experience across the full cycle of:

**identify → document → reproduce → implement → test → review → demonstrate → pull request**

#### Selected Issues I Identified

Some of the stronger issues I discovered included:

- **Broken invoice PDF downloads** — invoice PDF actions opened blank pages instead of producing usable invoice documents.
- **Viewer/Intern authorization issues** — lower-permission users could perform actions such as editing client information, creating requests, and creating projects or assigning work to higher-privileged staff.
- **Non-functional client editing controls** — an `EDIT →` action existed in the Client Profile interface but performed no action.
- **Invoice workflow failures** — payment confirmation and invoice creation controls could appear interactive while failing to perform the expected action or explain insufficient permissions.
- **Incorrect Sales Pipeline filtering** — report filters could return identical results even when different or invalid date ranges were supplied.
- **Incorrect CSV exports** — exported Client Portfolio data contained invalid or null values in fields such as Account Manager, Days Since Contact, and Last Activity.
- **Incomplete activity logging** — changes to client information were not consistently represented in the platform's activity history.
- **Bug-report upload failure** — screenshot uploads during bug reporting were blocked by a CORS-related request failure.
- **Authentication setup failure** — email/password registration fields were exposed while the corresponding authentication method was not enabled.
- **Project interface responsiveness issues** — project information could become compressed or difficult to read at constrained viewport sizes.

#### Features I Proposed

Testing also exposed opportunities where the platform could be improved rather than simply repaired. My accepted feature proposals included:

- **Configurable idle-session timeout** to automatically expire inactive staff sessions.
- **Two-factor authentication (2FA)** for staff accounts handling sensitive company and client information.
- **Logout from all devices** to allow staff to terminate other active sessions when a device is lost or compromised.
- **Improved audit logs** that identify which user performed an action.
- **Staff @mentions and notifications** inside client notes.
- **Clickable billing email addresses and telephone numbers** for faster communication.
- **Permission feedback for invoice creation**, rather than leaving restricted users with controls that appear non-functional.
- **Per-entry bounty points breakdown**, showing how accepted bug and feature reports contributed to bounty earnings.

#### From Finding Problems to Shipping Fixes

Later in the internship, I moved from primarily identifying issues to **implementing fixes and features directly in the EOP codebase**.

Selected engineering work included:

- **Session idle timeout** — implemented configurable inactivity-based session expiration and audit logging.
- **Staff two-factor authentication** — implemented TOTP-based 2FA with enrollment, verification, backup codes, session-level enforcement, disabling, and administrator-assisted reset.
- **Invoice PDF functionality** — worked on restoring functional invoice PDF generation/download behavior.
- **Responsive project and pipeline improvements** — corrected layouts that overflowed or became difficult to use at smaller viewport sizes.
- **Client Profile editing** — connected a previously non-functional edit control to the existing client-editing workflow without duplicating the underlying edit logic.

The implementation phase introduced me to a more mature engineering workflow involving **Git branches, pull requests, code review, TypeScript checking, linting, manual verification, and responsive testing**.

I also learned to use **Loom** to record concise demonstrations of completed changes before submitting pull requests, making it easier for reviewers to understand the original problem, inspect the solution, and verify the resulting behavior.

#### AI-Assisted Development

Some of the later EOP work was completed using **Claude Code** as an AI-assisted development tool. Unlike full-build tools that abstract much of the implementation, this workflow exposed the actual repository, source files, diffs, database changes, and application architecture.

AI-generated changes were not treated as automatically correct. I was required to **review the code being introduced, understand how it interacted with the existing system, test the resulting behavior, and verify changes before submitting them for review**.

This experience strengthened my understanding of AI-assisted software development as an engineering tool rather than a replacement for understanding the code.
```

## Additional Portfolio Architecture and Implementation Amendments

> **Important:** Everything in this section is an amendment to the baseline proposal above. Where these instructions conflict with an earlier baseline decision, **these instructions take precedence**.
>
> Do not rewrite or delete the earlier planning document. Reconcile it against these amendments before implementation.

---

# 1. Revised Frontend Technology Decision

The earlier proposal specifies that the first release should use vanilla HTML, CSS, and JavaScript.

**I am overriding that decision.**

The portfolio should instead be implemented using:

* **Vite**
* **React**
* **Tailwind CSS**
* **React Router**, where routing is required
* Modern JavaScript / JSX
* GitHub Pages with the existing custom domain unless another hosting decision is made later

The portfolio should **not** be built as a plain HTML/CSS website that will later need to be rewritten into React.

The purpose of this decision is to make the portfolio itself part of my React learning journey while ensuring that the architecture can later be migrated into **Next.js** without having to redesign or rewrite the entire product from scratch.

The preferred progression is:

```text
Planning and content architecture
        ↓
React learning and practice
        ↓
Vite + React + Tailwind portfolio
        ↓
Continuous improvement as my React knowledge grows
        ↓
Possible Next.js migration when there is a real technical reason
```

The current implementation should therefore be designed as a **well-structured React application**, not as a temporary prototype.

---

# 2. Important Development Principle

Codex should assist with implementation, but the resulting codebase must remain understandable and maintainable by me.

Do not generate unnecessary abstractions simply because they are technically possible.

The code should favour:

* clear React components;
* understandable props;
* explicit data flow;
* small reusable components;
* predictable routing;
* readable Tailwind classes;
* central project data;
* simple state management;
* native browser behaviour where possible;
* minimal dependencies.

Avoid:

* unnecessary global state;
* Redux or similar state libraries;
* complicated context architecture;
* premature abstraction;
* large generic component systems;
* unnecessary custom hooks;
* animation libraries where CSS/Tailwind transitions are sufficient;
* libraries that solve problems already handled well by the platform.

The portfolio should also serve as a codebase I can study while learning React.

If two implementations are equally capable, prefer the one that is easier to understand.

---

# 3. Tailwind CSS Replaces Traditional Site CSS

The site should use **Tailwind CSS as the primary styling system**.

Do not implement the design using a traditional large `style.css` file.

A global CSS file may still exist where technically required for:

* importing Tailwind;
* defining global theme variables;
* font declarations;
* base document behaviour;
* accessibility helpers;
* unavoidable browser-specific behaviour.

However, layout, spacing, typography, responsive behaviour, borders, states, colors, and component styling should primarily be expressed through Tailwind utilities.

The visual design system proposed earlier should still be respected.

The design remains:

> **Field notes from a builder / editorial developer notebook**

The migration to React and Tailwind must **not** turn the website into a generic SaaS dashboard.

Continue avoiding:

* purple/blue gradients;
* glowing backgrounds;
* glassmorphism;
* generic bento-grid layouts;
* excessive cards;
* excessive rounded corners;
* fake dashboards;
* huge icons;
* meaningless status dots;
* decorative UI that does not support content.

---

# 4. Tailwind Design Tokens

Do not scatter arbitrary values throughout components.

Create a small design system for:

* background;
* foreground;
* muted foreground;
* borders;
* accent;
* spacing;
* content widths;
* typography;
* focus states;
* section spacing.

The earlier visual direction should remain the starting point:

```text
Paper / background:
Warm off-white

Primary text:
Near-black charcoal / green-black

Secondary text:
Muted grey-green

Borders:
Warm subtle grey

Signal accent:
Restrained clay / orange
```

The exact colors may be refined during implementation after contrast testing.

The Tailwind implementation should make these roles reusable rather than repeating raw hexadecimal values throughout JSX.

---

# 5. Proposed React Application Architecture

Use an understandable application structure similar to:

```text
/
├── public/
│   ├── favicon/
│   ├── images/
│   │   ├── projects/
│   │   ├── embiro/
│   │   ├── c23/
│   │   └── profile/
│   ├── robots.txt
│   └── social/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageShell.jsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── DesktopNavigation.jsx
│   │   │   └── MobileNavigation.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectEntry.jsx
│   │   │   ├── ProjectMeta.jsx
│   │   │   ├── ProjectLinks.jsx
│   │   │   └── ProjectEvidence.jsx
│   │   │
│   │   ├── experience/
│   │   │   ├── ExperienceEntry.jsx
│   │   │   ├── EngineeringHighlight.jsx
│   │   │   └── WorkflowStep.jsx
│   │   │
│   │   └── ui/
│   │       ├── SectionHeading.jsx
│   │       ├── ExternalLink.jsx
│   │       └── Figure.jsx
│   │
│   ├── data/
│   │   ├── projects.js
│   │   ├── experience.js
│   │   ├── skills.js
│   │   └── learning.js
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── C23CaseStudy.jsx
│   │   ├── EmbiroCaseStudy.jsx
│   │   ├── NextMediaCaseStudy.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── CNAME
```

This structure is directional rather than absolute.

Do not create empty components merely to match the structure.

Create files only when they improve clarity or reuse.

---

# 6. Future Next.js Migration Must Influence Architecture

The Vite implementation should be written so that a future migration into Next.js is reasonably straightforward.

Do not introduce architecture that unnecessarily couples content to Vite.

Prefer:

* reusable React components;
* route-level page components;
* project content separated from presentation;
* static data stored in dedicated modules;
* semantic React structure;
* minimal direct DOM manipulation;
* no Vite-specific application logic unless necessary.

The eventual migration should mostly involve moving:

```text
React components
project data
Tailwind design tokens
images
case-study content
```

into a Next.js project rather than redesigning the entire portfolio.

Do **not**, however, imitate Next.js inside Vite or add unnecessary complexity in preparation for an uncertain future migration.

Build the best Vite + React implementation first.

---

# 7. Routing

Use React Router for meaningful project and experience routes.

Preferred structure:

```text
/
├── /
├── /work/c23
├── /work/next-media
├── /experience/embiro
└── /404
```

The Embiro page may contain anchored subsections such as:

```text
/experience/embiro#shebuilds
/experience/embiro#next-media
/experience/embiro#kin-kariisa
/experience/embiro#eop
```

The route structure should not become unnecessarily large.

Projects with insufficient material for a dedicated case study should remain homepage entries.

Because the site currently uses GitHub Pages, direct navigation to React Router routes must be tested.

Do not consider routing complete if:

```text
click navigation works
```

but:

```text
refreshing /work/c23 returns a GitHub Pages 404
```

Implement an appropriate GitHub Pages SPA fallback strategy and test direct loading of every public route.

---

# 8. Revised Portfolio Content Hierarchy

The portfolio should no longer be structured primarily around repositories.

It should be structured around **evidence of engineering growth and useful work**.

The hierarchy should approximately be:

```text
C23 Digital Spotlight
        ↓
Embiro Technologies professional experience
        ↓
Next Media client project
        ↓
Embiro Operations Platform engineering
        ↓
#SheBuilds website delivery
        ↓
Traffic Sign Recognition
        ↓
roadmap.sh Builds
        ↓
Supporting projects
        ↓
Learning archive
```

Not every item needs the same visual size.

Hierarchy is intentional.

---

# 9. Homepage Narrative

The homepage should tell a story rather than behave like a project grid.

Preferred flow:

```text
Identity
↓
Selected Work
↓
Professional Experience
↓
Engineering Highlights
↓
Currently Building
↓
Technical Capabilities
↓
Learning Journey
↓
About / Working Approach
↓
Contact
```

---

# 10. Hero Section

Keep the hero concise.

It should establish:

* Computer Science student;
* developer who ships real work;
* frontend strength;
* growing full-stack experience;
* current practical work.

Avoid exaggerated claims such as:

```text
Full-Stack Software Engineer
Senior Developer
Expert React Developer
Software Architect
```

unless they become factually appropriate later.

The hero should communicate **trajectory**, not seniority.

The primary CTA should continue to be:

> **See selected work**

A secondary CTA may be:

> **GitHub**

or:

> **Email Farhan**

Do not add an “Available for work” badge unless availability has explicitly been confirmed.

Do not publicly expose a location unless explicitly approved.

---

# 11. Professional Experience Must Become a Major Portfolio Section

Embiro Technologies should not appear merely as a list of websites.

It represents a major part of my development progression and should be presented as a professional experience.

Create a clear experience entry:

```text
Embiro Technologies
Software Engineering Intern
March 2026 — Present
```

The page should explain the progression rather than simply list responsibilities.

Use approximately this narrative:

```text
AI-assisted website implementation
        ↓
Direct React/Vite/Tailwind source-code development
        ↓
Client project responsibility
        ↓
CMS and external-data integrations
        ↓
QA and UAT
        ↓
Bug and feature discovery
        ↓
Full-stack codebase contribution
        ↓
Git / pull-request workflow
        ↓
Code-level AI-assisted engineering
```

This progression is one of the strongest stories available in the portfolio and should be clearly visible.

---

# 12. #SheBuilds Should Demonstrate Shipping Volume

The twenty-five #SheBuilds websites should demonstrate **breadth and repeated delivery**, not become twenty-five identical project cards.

Give priority to the custom-domain deployments:

```text
https://ikorushoneystore.com
https://readusafrica.org
https://yourafricanneighbour.com
https://sapondo.com
```

These should receive stronger visual treatment.

The remaining Embiro-hosted projects may be presented through:

* a compact website index;
* a screenshot contact sheet;
* a horizontally scrollable gallery;
* or another restrained portfolio treatment.

An appropriate heading might communicate:

> **25 websites implemented during the #SheBuilds campaign**

But do not imply that I independently handled client acquisition, content gathering, or client management.

My role was primarily **engineering implementation based on requirements collected by other team members**.

---

# 13. Next Media Must Become a Featured Client Case Study

Next Media should not be buried inside the Embiro experience page.

Create a dedicated case study at:

```text
/work/next-media
```

Live deployment:

```text
https://nextmedia.embiro.tech/
```

The case study should explain:

### Context

Embiro Technologies was contracted to redesign the Next Media corporate website.

### My Role

I handled the majority of the engineering implementation while collaborating with another intern who contributed smaller changes and reviewed parts of the work.

Do not phrase this as:

> “I built the entire website alone.”

### Technologies

Include only technologies genuinely used:

```text
React
Vite
Tailwind CSS
React Router
Swiper.js
Framer Motion
shadcn/ui
Supabase
RSS
```

### Work Worth Showing

Examples:

* responsive interface development;
* navigation restructuring;
* leadership pages;
* brand presentation;
* profile components;
* carousels;
* animations;
* CMS integration;
* job/opening content;
* dynamic news content;
* NilePost RSS integration;
* client-feedback iterations.

### Important Professional Point

I became the main engineering contact for technical implementation concerns raised by the Next Media team.

This is worth communicating because it demonstrates responsibility beyond merely receiving programming tasks.

### Evidence

Where possible use:

* real website screenshots;
* live project link;
* CMS dashboard screenshot;
* brief descriptions of implementation challenges;
* before/after examples where useful.

Do not use fake browser mockups.

---

# 14. Kin Kariisa Should Be Presented as a Supporting Client Project

Live deployment:

```text
https://kin.embiro.tech/
```

The project should sit close to the Next Media case study because both originated from the same client relationship.

Highlight:

* responsive redesign;
* typography;
* navigation;
* content hierarchy;
* animation;
* blog/Insights migration;
* branding consistency.

Do not give it equal visual weight to Next Media unless the available case-study material justifies it.

---

# 15. Embiro Operations Platform Should Become an Engineering Case Study

EOP represents a different type of experience from the marketing/client websites.

Present it as:

> **QA, UAT, debugging, security thinking and full-stack engineering inside an existing application.**

Do not expose private company information, client data, credentials, database values, internal URLs, or confidential source code.

The page should clearly communicate that my involvement happened in stages.

---

# 16. EOP Stage One — Testing and Product Evaluation

Explain that I first participated through:

```text
QA
User Acceptance Testing
bug discovery
permission testing
workflow testing
responsive testing
feature proposals
```

An internal bug-and-feature bounty system was used to document findings.

Do not make the bounty payment amount a major portfolio feature.

The important signal is **engineering observation and product thinking**, not money earned from bounty submissions.

---

# 17. EOP Stage Two — From Finding Problems to Implementing Solutions

This should become one of the strongest technical presentation patterns on the website.

Use a repeated structure similar to:

```text
Problem
↓
What I observed
↓
Why it mattered
↓
What I implemented
↓
How I verified it
```

Use approximately four or five strong examples.

---

# 18. Engineering Highlight — Session Idle Timeout

### Problem

Staff sessions remained authenticated after long periods of inactivity.

### Why It Mattered

The platform exposes operational information including client records, invoices, payment information and internal communication.

### Contribution

I first identified and proposed a configurable inactivity timeout during platform testing.

I was later assigned to implement the feature.

### Engineering Work

The implementation included:

* configurable timeout settings;
* administrative controls;
* server-side session enforcement;
* session expiration;
* security audit logging.

### Evidence

Where available:

* bounty report;
* pull request;
* Loom demonstration.

This is a particularly strong portfolio example because it demonstrates:

```text
observation
security reasoning
backend behaviour
database interaction
testing
technical communication
```

---

# 19. Engineering Highlight — Staff Two-Factor Authentication

### Problem

Staff accounts containing sensitive operational information could authenticate through convenient one-tap login methods without an additional verification factor.

### Contribution

I proposed adding staff 2FA and later implemented the feature.

### Implementation

The implementation included:

* TOTP enrolment;
* authenticator verification;
* QR/manual secret setup;
* backup codes;
* backup-code reuse protection;
* disabling/re-enabling 2FA;
* session-level verification;
* administrator-assisted reset.

### Evidence

Show:

* sanitized implementation screenshot if appropriate;
* PR evidence;
* Loom demonstration.

Do not expose:

* active secrets;
* QR codes containing usable credentials;
* backup codes;
* private database records.

---

# 20. Engineering Highlight — Invoice PDF Functionality

Present the invoice work in a concise debugging format.

```text
Observed:
Invoice PDF downloads produced blank/failed results.

Investigation:
The expected download route was missing or incomplete.

Implementation:
Existing PDF-generation functionality was reused instead of creating duplicate rendering logic.

Result:
The download workflow was restored while respecting existing access rules.
```

Evidence may include:

* issue description;
* pull request;
* Loom demonstration.

---

# 21. Engineering Highlight — Responsive Project / Pipeline Work

Use this to demonstrate practical debugging rather than simply saying:

> “Made it responsive.”

Explain examples such as:

* overflowing Kanban columns;
* hard-coded minimum widths;
* project-detail layouts;
* mobile tab navigation;
* Tailwind orientation-selector problems;
* forecast-card overflow.

The important skill is:

> **finding the actual reason the layout failed rather than applying random CSS fixes.**

---

# 22. Engineering Highlight — Reusing Existing Application Logic

The Client Profile edit bug is useful because it demonstrates judgment.

Explain:

```text
Problem:
A visible EDIT action did nothing.

Investigation:
A complete edit workflow already existed elsewhere in the page.

Decision:
Do not create a second edit implementation.

Solution:
Connect the existing control to the existing EditClientSheet workflow.
```

This demonstrates:

* understanding an unfamiliar codebase;
* component reuse;
* state flow;
* avoiding duplicated logic.

---

# 23. EOP Evidence Rules

Where available, each EOP engineering highlight should provide combinations of:

```text
Issue report
Pull request
Loom demo
Sanitized screenshot
Short technical explanation
```

Do not claim that a PR was merged unless that status is verified.

Safe language includes:

```text
Submitted through the team's pull-request workflow.
```

or:

```text
Implemented and submitted for review.
```

Where a feature is confirmed to be currently used, that may be stated.

---

# 24. Loom Should Be Presented as Part of the Engineering Workflow

Loom should appear as a professional-development skill, not merely as an external link.

Explain that I learned to record short demonstrations before submitting significant pull requests.

The workflow should be visually communicated as:

```text
Understand
↓
Implement
↓
Test
↓
Record Loom walkthrough
↓
Submit pull request
↓
Peer review
↓
Senior review
```

Where relevant, include a:

> **Watch implementation demo**

link beside an engineering highlight.

Do not autoplay embedded Loom videos.

Prefer links or user-triggered embeds to avoid unnecessary performance cost.

---

# 25. Git and Pull Requests Must Be Treated as Engineering Evidence

Git should not appear only under a generic skill list.

The Embiro/EOP case study should show that I gained practical experience with:

* feature branches;
* bug-fix branches;
* commits;
* pull requests;
* peer review;
* reviewing other interns' PRs;
* responding to review;
* type checking;
* linting;
* manual verification.

Where screenshots are shown, focus on useful information such as:

```text
PR title
branch name
problem summary
test plan
review state
```

Avoid presenting walls of code simply to make the portfolio look technical.

---

# 26. AI-Assisted Development Should Become a Distinct Story

One of the portfolio's more unusual stories is the progression between different kinds of AI-assisted development.

Present it carefully.

### Phase One — Lovable

Lovable exposed me to rapid full-product building.

It helped me learn:

* translating requirements into interfaces;
* iterative prompting;
* responsive review;
* product presentation;
* shipping websites.

However, it initially abstracted much of the underlying implementation.

### Phase Two — Direct Source-Code Development

The Next Media and Kin Kariisa work moved me closer to the underlying stack through direct interaction with:

```text
React
Vite
Tailwind
routing
components
libraries
backend integrations
```

### Phase Three — Claude Code / Code-Level AI Assistance

Later EOP work introduced AI operating directly inside an existing repository.

This required me to inspect:

* source files;
* diffs;
* components;
* migrations;
* database code;
* authentication code;
* application architecture.

The important principle was:

> **AI-generated code still had to be reviewed, understood and tested before acceptance.**

The portfolio must not present AI as having done the engineering for me.

Present AI as a development tool used under human technical review.

---

# 27. Engineering Workflow Section

Add a concise visual section communicating how I approach development.

Suggested sequence:

```text
01 Understand
    Understand the requirement or reproduce the problem.

02 Investigate
    Inspect the existing implementation before changing it.

03 Implement
    Make the smallest appropriate change.

04 Test
    Verify normal, edge-case and responsive behaviour.

05 Review
    Inspect the resulting code and generated changes.

06 Demonstrate
    Record the working behaviour when useful.

07 Submit
    Open the change through the project's Git workflow.

08 Iterate
    Respond to feedback and improve the implementation.
```

This should be understated.

Do not create eight giant cards.

A timeline, numbered list or editorial sequence is more appropriate.

---

# 28. Evidence-Based Skills Section

Do not create skill percentage bars.

Do not use:

```text
React 90%
Python 85%
Git 95%
```

No meaningful evidence supports those percentages.

Instead organise skills by capability.

### Interfaces

```text
React
JavaScript
HTML
Tailwind CSS
responsive design
React Router
Framer Motion
Swiper.js
shadcn/ui
```

### Data and Application Integration

```text
Supabase
PostgreSQL / Neon
CMS integration
RSS feeds
REST/web integrations
webhooks
```

### Engineering Workflow

```text
Git
GitHub
branches
pull requests
code review
debugging
QA
UAT
responsive testing
Loom
```

### Deployment

```text
Cloudflare
Vercel
GitHub Pages
custom domains
Cloudflare Workers
```

### AI-Assisted Development

```text
Claude Code
Codex
Lovable
```

Each skill group should link conceptually back to projects where it was actually applied.

---

# 29. Add a “Currently Building” Section

C23 Digital Spotlight is an evolving project and should be treated differently from completed work.

Add a section such as:

> **Currently Building**

C23 should occupy this position prominently.

Show verified current deployments only.

Current Worker routes already supplied above include:

```text
c23.farhansegujja.com
nimu-timber.farhansegujja.com
nutking.farhansegujja.com
modestmuse.farhansegujja.com
```

Do not display future participants or projected impact as completed work.

This section should evolve as new sites launch.

---

# 30. C23 Should Remain the Flagship Personal Project

Do not reduce C23's importance because professional experience is being added.

The distinction should be clear:

```text
C23:
Flagship independently initiated/community project.

Embiro:
Flagship professional experience.

Next Media:
Flagship client web project.

EOP:
Flagship software-engineering / debugging case study.
```

These represent different dimensions of my development.

---

# 31. Project Cards Should Not All Look the Same

Do not place every project inside:

```text
same rounded rectangle
same icon
same technology chips
same screenshot position
same CTA arrangement
```

Featured work should have intentionally different editorial compositions.

For example:

```text
C23
Large editorial case-study preview.

Embiro
Timeline / professional experience composition.

Next Media
Large website imagery with technical context.

EOP
Problem → solution engineering evidence.

Traffic Sign Recognition
Compact technical project entry.

Learning projects
Simple chronological list.
```

Shared buttons and metadata can remain consistent while project compositions differ.

---

# 32. Real Screenshots Over Decorative Mockups

Whenever project imagery is used:

Prefer:

```text
real interface screenshot
real deployed website
real dashboard screenshot
real architecture diagram
real GitHub evidence
```

Avoid:

```text
fake laptop frames
fake browser windows
AI-generated UI screenshots
fictional analytics
stock images
generic coding backgrounds
```

Screenshots should remain large enough to inspect.

---

# 33. Project Evidence Pattern

For major projects, use a consistent information hierarchy:

```text
Context
Who / what was the project for?

Problem
What needed to be solved?

My Role
What did I personally do?

Technical Decisions
What engineering choices mattered?

Challenges
What went wrong or required investigation?

Result
What works now?

Evidence
Live site / source / demo / PR where available.
```

This should form the foundation of project case studies.

---

# 34. About Section Direction

The About section should be short and factual.

Do not write a long motivational biography.

The main story is:

> I am a Computer Science student whose development has progressed through repeatedly building real projects, learning unfamiliar technologies when projects required them, testing software, debugging issues and gradually taking responsibility for more complex engineering work.

The About section should communicate curiosity and self-directed learning without using generic phrases such as:

```text
passionate developer
technology enthusiast
innovative problem solver
turning ideas into reality
```

---

# 35. Learning Should Remain Visible

Do not remove learning repositories simply because stronger professional work now exists.

They show progression.

However, learning work should have a lower hierarchy.

Examples:

```text
roadmap.sh Builds
JavaScript30
30 Days of JavaScript
OOP Practice
SACCO Management System
```

A chronological learning trail is preferable to another project-card grid.

Show what each collection was intended to teach.

---

# 36. Contact Section

Keep the contact section simple.

Primary actions:

```text
Email
GitHub
```

Additional social platforms should only appear when active URLs are explicitly supplied.

Do not add:

* non-functional contact forms;
* fake booking systems;
* WhatsApp links without approval;
* social icons with empty URLs.

---

# 37. React Component Quality Rules

React should be used because it improves structure and maintainability, not merely because the technology name is desirable.

Components should have clear responsibilities.

Prefer:

```jsx
<ProjectEntry project={project} />
```

over duplicating an entire project structure repeatedly.

But avoid creating abstractions such as:

```jsx
<UniversalPolymorphicDynamicContentRenderer />
```

for simple portfolio content.

Use props when data varies.

Keep components readable.

Avoid excessive prop drilling where a clearer layout is available.

Do not introduce Context merely to avoid passing two or three ordinary props.

---

# 38. Content Data Should Be Centralised

Project metadata should not be duplicated across different sections.

For example:

```javascript
{
  slug: 'next-media',
  title: 'Next Media Website Redesign',
  category: 'Client project',
  year: 2026,
  role: 'Frontend engineering',
  liveUrl: 'https://nextmedia.embiro.tech/',
  technologies: [
    'React',
    'Vite',
    'Tailwind CSS',
    'Supabase'
  ]
}
```

The exact schema may evolve.

The important requirement is that common metadata should have one source of truth.

Long case-study narratives can remain inside page components if that improves readability.

Do not convert every paragraph into JSON purely for abstraction.

---

# 39. Accessibility Requirements for React Components

The move to React must not reduce the accessibility standards in the original proposal.

Maintain:

* semantic HTML;
* logical heading order;
* visible focus;
* keyboard navigation;
* skip link;
* meaningful alt text;
* reduced-motion support;
* accessible menu state;
* adequate target sizes;
* proper labels;
* sufficient contrast.

React components should render semantic HTML rather than excessive nested `div` structures.

---

# 40. Mobile Navigation

The mobile navigation must:

* work with keyboard input;
* expose `aria-expanded`;
* close predictably;
* manage focus sensibly;
* not trap the user;
* remain usable without animation;
* avoid covering page content unexpectedly.

Do not create a full-screen animated menu simply for visual impact.

---

# 41. Motion

Motion should remain restrained.

Use Tailwind transitions or small React enhancements where appropriate.

Do not add an animation library merely because React is now used.

Framer Motion may only be introduced if an interaction meaningfully benefits from it.

Avoid:

* page-wide reveal animations;
* mouse-follow effects;
* 3D project cards;
* constant floating movement;
* parallax;
* animated backgrounds;
* autoplay media.

Respect:

```css
prefers-reduced-motion
```

---

# 42. Performance Expectations

The use of React must not be an excuse for a heavy portfolio.

Keep:

* dependency count low;
* JavaScript bundle small;
* project screenshots optimized;
* below-the-fold images lazy loaded;
* image dimensions defined;
* fonts limited;
* third-party scripts minimal.

Do not fetch GitHub repositories dynamically on every homepage visit.

Repository and project information can be maintained locally and linked to GitHub.

---

# 43. SEO

Because this is a React application, explicitly verify:

* document title;
* meta description;
* canonical URL;
* Open Graph metadata;
* social preview image;
* favicon;
* sitemap;
* robots file;
* structured data where appropriate.

Each major routed case study should have appropriate document metadata.

If React Router is used, ensure metadata changes correctly between routes rather than leaving every page with the homepage title.

---

# 44. GitHub Pages Requirements

Preserve:

```text
farhansegujja.com
```

and the existing GitHub Pages deployment unless explicitly changed later.

Ensure:

* Vite base configuration works with the custom domain;
* `CNAME` survives production builds;
* asset paths work;
* direct route refresh works;
* 404 behaviour works;
* deep links do not break;
* HTTPS remains valid.

Deployment is not considered complete until the production domain has been tested.

---

# 45. Development Scripts

The resulting project should provide understandable npm scripts such as:

```text
npm run dev
npm run build
npm run preview
npm run lint
```

Use ESLint with sensible React rules.

Do not introduce an excessive lint/tooling stack that becomes harder to understand than the portfolio itself.

---

# 46. Implementation Order for Codex

Do not immediately start styling isolated components.

Implementation should happen approximately in this order:

```text
1. Reconcile baseline and amendments.

2. Convert repository architecture to Vite + React.

3. Configure Tailwind CSS.

4. Preserve the existing custom-domain configuration.

5. Establish project data and route structure.

6. Build semantic page/layout components.

7. Implement homepage information hierarchy.

8. Implement C23 case study.

9. Implement Embiro professional-experience case study.

10. Implement Next Media case study.

11. Add EOP engineering highlights.

12. Add supporting projects and learning archive.

13. Add responsive behaviour.

14. Add restrained interaction and motion.

15. Add metadata and SEO.

16. Verify GitHub Pages routing.

17. Perform accessibility review.

18. Perform performance review.

19. Test every link and live project.

20. Run the final anti-vibe audit.
```

---

# 47. Do Not Fabricate Missing Information

Where information has not been supplied, do not invent it.

This includes:

* employment availability;
* graduation date;
* testimonials;
* project statistics;
* performance metrics;
* user counts;
* business revenue;
* project impact;
* team sizes;
* client quotes;
* campaign conversion rates;
* awards;
* EOP production data;
* private repository links.

Use honest placeholders in planning only.

Do not publish placeholders on the live portfolio.

---

# 48. Privacy Rule for Embiro/EOP Material

EOP is an internal operations platform.

The portfolio may discuss:

* the engineering problem;
* my reasoning;
* my implementation;
* technologies;
* workflow;
* sanitized screenshots;
* Loom demonstrations where permitted;
* pull-request evidence where appropriate.

It must not expose:

* client records;
* invoice contents;
* payment information;
* private emails;
* authentication secrets;
* `.env` values;
* API keys;
* database URLs;
* backup codes;
* user tokens;
* confidential company communication;
* private source code unless publication has been explicitly approved.

When uncertain, redact or omit.

---

# 49. Final Portfolio Identity

The completed site should communicate approximately this:

> Farhan is a Computer Science student who is developing strong frontend engineering skills while expanding into full-stack software development. His work demonstrates a progression from rapid website delivery, to direct React development, to client projects, testing, debugging, security-oriented product thinking, source-control collaboration, and contribution to larger software systems.

The portfolio should make that conclusion evident through the work itself rather than through exaggerated claims.

---

# 50. Updated Definition of Done

The portfolio should not be considered complete until all of the following are true:

* [ ] The old “coming soon” experience has been fully replaced.
* [ ] The project runs through Vite.
* [ ] React is the application UI layer.
* [ ] Tailwind CSS is the primary styling system.
* [ ] Traditional large custom CSS files have not been introduced.
* [ ] The existing custom domain continues to work.
* [ ] GitHub Pages deployment works correctly.
* [ ] Direct React Router URLs can be refreshed without failure.
* [ ] C23 is clearly presented as the flagship personal/community project.
* [ ] Embiro Technologies is clearly presented as professional experience.
* [ ] Next Media has a substantial client-project presentation.
* [ ] Kin Kariisa is appropriately credited as related client work.
* [ ] #SheBuilds demonstrates breadth without creating twenty-five repetitive project cards.
* [ ] EOP demonstrates QA, UAT, debugging and engineering progression.
* [ ] Strong EOP examples use problem → investigation → implementation → verification.
* [ ] AI-assisted development is described accurately and responsibly.
* [ ] Loom is represented as part of the development/review workflow.
* [ ] Git and pull-request experience is evidenced rather than merely listed as a skill.
* [ ] Skills are evidence-based and do not use meaningless percentages.
* [ ] Learning repositories remain visible but are clearly secondary to original/professional work.
* [ ] Real screenshots are used wherever useful.
* [ ] No fake testimonials, impact figures, employers, statistics or project outcomes are present.
* [ ] No private Embiro/EOP information is exposed.
* [ ] The site works from 320px through wide desktop displays.
* [ ] Keyboard navigation works throughout.
* [ ] Reduced-motion preferences are respected.
* [ ] Focus styles are clearly visible.
* [ ] Every external project link has been tested.
* [ ] Every route has appropriate metadata.
* [ ] The production build completes without errors.
* [ ] ESLint does not report material implementation problems.
* [ ] Browser console errors are resolved.
* [ ] The final implementation passes the anti-vibe audit defined in the baseline.
* [ ] The resulting React code is sufficiently clear that I can continue studying, debugging and extending it myself.
* [ ] The architecture does not make a future Next.js migration unnecessarily difficult.

---

# 51. Final Instruction to Codex

Before changing implementation files, read:

1. the complete baseline proposal;
2. every amendment already written under Farhan's section;
3. these additional architecture and portfolio amendments.

Produce a reconciliation of conflicting decisions internally before implementation.

The most important override is:

```text
OLD DECISION:
Vanilla HTML + CSS + JavaScript.

FINAL DECISION:
Vite + React + Tailwind CSS.
```

The most important product change is:

```text
OLD PORTFOLIO EMPHASIS:
A student portfolio centred mainly on public repositories.

FINAL PORTFOLIO EMPHASIS:
An evidence-led developer portfolio showing progression across
personal projects, professional client work, QA/UAT, debugging,
security-oriented engineering, full-stack exposure, deployment,
Git collaboration and continuous learning.
```

The goal is not merely to make the portfolio **look more professional**.

The goal is to make the site accurately demonstrate **how I have progressed as a developer, what I have actually shipped, how I approach engineering problems, and where the work can be verified**.


## Education, Availability and Profile Media Amendments

The following details should be treated as confirmed public information and incorporated into the portfolio.

---

# 1. Education

My current education details are:

```text
Institution:
Islamic University in Uganda

Campus:
Kampala Campus

Programme:
Bachelor of Science in Computer Science

Graduation:
December 2027
```

## Public Presentation

The portfolio should avoid wording that becomes outdated immediately after graduation.

Do **not** make the main public wording depend heavily on phrases such as:

> Currently studying...

or:

> Expected to graduate in December 2027...

Instead, prefer durable wording such as:

> **Bachelor of Science in Computer Science · Islamic University in Uganda · Class of 2027**

Where additional detail is appropriate:

> **Islamic University in Uganda — Kampala Campus**
> Bachelor of Science in Computer Science · Class of 2027

This wording is intentionally future-friendly because it remains factually useful before and after graduation.

If a more descriptive sentence is needed before December 2027, it may say:

> I am pursuing a Bachelor of Science in Computer Science at the Islamic University in Uganda, Kampala Campus, as part of the Class of 2027.

However, avoid repeating this wording throughout the portfolio.

---

# 2. Education Data Should Have One Source of Truth

Do not hard-code education details separately across multiple React components.

Store them centrally in portfolio data/configuration.

For example:

```javascript
export const education = {
  institution: 'Islamic University in Uganda',
  campus: 'Kampala Campus',
  degree: 'Bachelor of Science in Computer Science',
  graduationYear: 2027,
  graduationMonth: 'December',
  displayClass: 'Class of 2027',
};
```

Components should consume this data rather than duplicating it.

This will allow future changes to be made in one location if ever necessary.

---

# 3. Education Should Support Progressive Presentation

The portfolio architecture should allow education information to become richer later without redesigning the site.

For example, the same education section may eventually support:

* degree completion;
* selected coursework;
* academic projects;
* achievements;
* university activities;
* final-year project;
* graduation status.

Do not add those items now unless verified information is supplied.

The initial implementation should remain clean and minimal.

---

# 4. Preferred Public Positioning

My public positioning should combine my current academic stage with demonstrated practical experience.

A suitable direction is:

> **Computer Science student building practical web applications, client websites and software systems while growing from frontend engineering into full-stack development.**

A shorter version suitable for compact areas is:

> **Computer Science student · Frontend-focused developer · Growing full-stack engineer**

Do not present me as a senior engineer or established expert.

The portfolio should communicate technical growth through evidence rather than inflated titles.

---

# 5. Availability

I am currently publicly available for:

* **Freelance work**
* **Collaboration**
* **Employment opportunities**

This may be communicated publicly.

A suitable portfolio statement is:

> **Open to freelance work, collaboration and employment opportunities.**

A slightly more conversational Contact-section version may be:

> I'm open to freelance projects, collaborations and employment opportunities. If my work looks relevant to something you're building, feel free to get in touch.

---

# 6. Availability Must Be Configurable

Availability should not be hard-coded independently across the Hero, About section, Contact section and metadata.

Create one central configuration source.

For example:

```javascript
export const availability = {
  freelance: true,
  collaboration: true,
  employment: true,
};
```

The site may derive appropriate wording from this configuration.

This is important because availability is naturally something that may change later.

If one category becomes unavailable, I should be able to change a single value rather than search through multiple page components.

Do not create an overly complex availability system.

A simple data/configuration object is sufficient.

---

# 7. Availability UI

Availability should be communicated quietly and professionally.

Good placements include:

* the Contact section;
* a small line near the end of the About section;
* optionally a restrained line near the Hero.

Do not create:

* a flashing availability badge;
* a green pulsing dot;
* an animated “Hire me” banner;
* a large recruitment-style CTA;
* fake urgency.

The primary purpose of the portfolio remains showing the work.

Availability should support that purpose rather than dominate it.

---

# 8. Contact Section Update

The Contact section should clearly support the three opportunity types.

Suggested structure:

```text
Let's work together.

I'm open to freelance projects, collaborations and employment opportunities.

Email Farhan
GitHub
```

The exact final copy may be refined during implementation, but it should remain direct and factual.

---

# 9. Profile Photograph Decision

For the initial live release:

> **Do not use a profile photograph.**

This is an intentional decision, not missing content.

Do not:

* generate an AI portrait;
* use a stock photograph;
* create an illustrated avatar;
* use initials inside a fake profile-photo circle;
* reserve a large empty portrait frame;
* insert a generic developer image.

The design should work fully without a photograph.

---

# 10. Future Photograph Support

Although no photograph should appear now, the architecture should make it possible to introduce one later without redesigning the portfolio.

The layout should therefore avoid depending on either:

```text
photo present
```

or:

```text
photo absent
```

for its overall balance.

If profile information is centrally configured, it may support something similar to:

```javascript
export const profile = {
  name: 'Farhan Segujja',
  photo: null,
};
```

A future image could then be introduced by changing:

```javascript
photo: null
```

to an approved asset path.

Components should only render the photograph when that value exists.

Example conceptually:

```jsx
{profile.photo && (
  <img
    src={profile.photo}
    alt="Farhan Segujja"
  />
)}
```

Do not display an empty placeholder when `photo` is `null`.

---

# 11. Design Without a Portrait

Since no profile photograph will initially be used, visual identity should come from:

* typography;
* project screenshots;
* engineering evidence;
* strong editorial composition;
* project-specific imagery;
* architectural diagrams;
* code/workflow evidence where useful;
* restrained use of color.

This supports the broader design principle that **the work itself should provide the visual personality of the portfolio**.

---

# 12. Central Public Profile Configuration

To prevent personal information from becoming scattered throughout the codebase, create a small central configuration module.

A structure similar to this is appropriate:

```javascript
export const profile = {
  name: 'Farhan Segujja',

  education: {
    institution: 'Islamic University in Uganda',
    campus: 'Kampala Campus',
    degree: 'Bachelor of Science in Computer Science',
    graduationMonth: 'December',
    graduationYear: 2027,
    displayClass: 'Class of 2027',
  },

  availability: {
    freelance: true,
    collaboration: true,
    employment: true,
  },

  photo: null,
};
```

The exact implementation may differ if a cleaner project structure is identified.

The principle is more important than the exact schema:

> **Personal facts that may appear in several places should have one source of truth.**

---

# 13. Future-Proofing Principle

Where possible, choose public wording that remains useful over time.

Prefer:

> **Bachelor of Science in Computer Science · Class of 2027**

over:

> **Second-year Computer Science student**

Prefer:

> **Software Engineering experience at Embiro Technologies**

over permanently embedding temporary internship-status language in many unrelated sections.

Prefer centrally configured availability over writing:

> **Currently looking for work**

inside multiple components.

The portfolio should evolve mainly through **data and project additions**, not repeated redesigns caused by time-sensitive wording.

---

# 14. Final Confirmed Decisions

For implementation purposes, the following decisions are now confirmed:

```text
EDUCATION
Islamic University in Uganda
Kampala Campus
Bachelor of Science in Computer Science
Class of 2027
Graduation: December 2027

PUBLIC AVAILABILITY
Freelance work: Yes
Collaboration: Yes
Employment opportunities: Yes

PROFILE PHOTOGRAPH
Initial release: No photograph
Future support: Yes, without redesign
```

These decisions should be incorporated when reconciling the baseline proposal with all amendments before implementation.
