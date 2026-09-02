# Static Site Implementation Plan

## Document Purpose

This document is the authoritative implementation direction for rebuilding Farhan Segujja's portfolio as a static, evidence-led, multi-page website.

Read this document together with the full historical portfolio plan and its amendments. Preserve the research, project evidence, professional-experience narrative, privacy constraints, accessibility requirements, performance targets, SEO requirements, responsive-design expectations, and anti-vibe-code principles.

Where this document conflicts with earlier implementation-specific decisions, this document takes precedence.

The goal is **not** to demonstrate engineering ability through framework complexity.

The goal is to make the work itself convincing.

---

# 1. Final Technology Direction

Implement the portfolio using:

- **Vite** as the development and build tool.
- **Tailwind CSS** as the primary styling system.
- **Semantic HTML** as the primary content and document structure.
- **Minimal vanilla JavaScript** only where progressive enhancement is genuinely required.
- **Cloudflare Pages** as the production hosting target.

Do not use the following unless a concrete technical requirement emerges that cannot be handled cleanly by the platform:

- React.
- React Router.
- shadcn/ui.
- SPA architecture.
- client-side rendering.
- unnecessary component systems.
- unnecessary data abstraction.
- animation libraries.
- framework-style state management.

Do not add framework complexity merely because the portfolio belongs to a developer.

The implementation should remain understandable by reading the HTML, Tailwind classes, and small JavaScript modules directly.

---

# 2. Governing Principle

Use the following principle to resolve implementation decisions:

> **Static, evidence-first portfolio. Vite builds it. Tailwind styles it. HTML carries the content. JavaScript enhances only what genuinely needs interaction.**

When two technical solutions are equally capable, prefer the simpler implementation.

Do not use architecture as a substitute for content quality.

Do not create abstractions solely to make the codebase appear more sophisticated.

---

# 3. Preserve the Existing Research and Content Strategy

Do not discard or weaken the earlier portfolio research.

Preserve the following content hierarchy and evidence:

- **C23 Digital Spotlight** as the flagship independently initiated/community project.
- **Embiro Technologies** as the flagship professional experience.
- **Next Media** as the flagship client website project.
- **Embiro Operations Platform (EOP)** as the flagship QA/UAT/debugging/full-stack engineering case study.
- **#SheBuilds** as evidence of repeated website implementation and delivery volume.
- **Kin Kariisa** as supporting client work related to the Next Media engagement.
- **Traffic Sign Recognition** as evidence of Python, machine learning, model integration, and deployment.
- **roadmap.sh Builds** as evidence of deliberate frontend learning.
- JavaScript30, 30 Days of JavaScript, OOP practice, SACCO work, and other learning repositories as lower-hierarchy evidence of progression.
- real screenshots.
- architecture diagrams.
- Git and pull-request evidence where appropriate.
- Loom demonstrations where permitted.
- evidence-led skills presentation.
- truthful and verifiable claims.
- accessibility.
- responsive design.
- performance.
- SEO.
- privacy constraints around Embiro and EOP.
- the full anti-vibe-code charter.

Preserve the distinction between the four strongest dimensions of the portfolio:

```text
C23
Flagship independently initiated/community project.

Embiro Technologies
Flagship professional experience.

Next Media
Flagship client web project.

Embiro Operations Platform
Flagship software-engineering, QA, debugging and security-oriented case study.
```

Do not flatten these into identical project cards.

---

# 4. Superseded Architecture Decisions

Treat the following older implementation requirements as superseded by this plan:

- React as the portfolio UI layer.
- JSX.
- React Router.
- React Router route components.
- SPA navigation.
- GitHub Pages SPA fallback logic.
- shadcn/ui setup.
- Radix dependencies introduced through shadcn.
- `components/` structures created solely for React abstraction.
- `pages/*.jsx`.
- React hooks.
- React state management.
- React-specific accessibility implementation requirements.
- React-specific metadata handling.
- React-specific bundle architecture.
- Next.js-migration-driven architectural choices.
- client-side project rendering.
- runtime GitHub data fetching.
- GitHub Pages as the preferred production host.

Do not retain obsolete implementation complexity simply because it appears in earlier amendments.

Preserve the reasoning and content decisions behind those amendments where they still improve the portfolio.

---

# 5. Preserve Useful Principles from the React-Era Amendments

Some principles from the previous architecture remain valid even though React itself is removed.

Preserve these principles:

- avoid duplication.
- keep mutable public facts consistent.
- prefer clear data flow.
- prefer native browser behavior.
- keep dependencies minimal.
- do not create abstractions before real reuse exists.
- use semantic HTML.
- keep accessibility deliberate.
- treat Tailwind as a system rather than a collection of arbitrary values.
- keep the codebase understandable.
- maintain a strong evidence hierarchy.

Do not create a templating system only to avoid repeating a small amount of static content.

If repeated facts such as education or availability become difficult to maintain consistently, introduce the smallest build-time solution that solves the actual problem.

Do not introduce a framework pre-emptively.

---

# 6. Public Profile Facts to Preserve

Treat the following as confirmed public information unless a later instruction changes them:

## Education

```text
Islamic University in Uganda
Kampala Campus
Bachelor of Science in Computer Science
Class of 2027
Graduation: December 2027
```

Prefer durable wording such as:

> Bachelor of Science in Computer Science · Islamic University in Uganda · Class of 2027

Avoid repeatedly using temporary wording such as:

> Second-year student

or other phrasing that will quickly become outdated.

## Availability

The portfolio may state that Farhan is open to:

- freelance work.
- collaboration.
- employment opportunities.

Communicate this quietly and professionally.

Do not create:

- flashing availability indicators.
- pulsing dots.
- fake urgency.
- large recruitment banners.
- aggressive "Hire me" treatments.

## Profile Photograph

Do not use a profile photograph in the initial release.

Do not compensate with:

- AI portraits.
- stock photos.
- illustrated avatars.
- fake profile-photo circles.
- initials inside a portrait placeholder.
- generic developer photography.
- empty portrait frames.

The visual identity must come from the work itself.

---

# 7. Visual Redesign Objective

The previous direction became too text-heavy and too dependent on editorial typography.

Correct that.

The visual redesign must make **actual work** the primary source of visual interest.

Use prominently:

- real project screenshots.
- deployed-site screenshots.
- responsive interface evidence.
- architecture diagrams.
- sanitized engineering evidence.
- PR evidence.
- workflow evidence.
- before/after comparisons where useful.
- project results that can be verified.

Typography should support this content rather than dominate it.

Do not let the website become a typography showcase.

---

# 8. Visual Identity

The portfolio should feel:

- warm.
- technical.
- restrained.
- personal.
- evidence-led.
- authored.
- clearly connected to Farhan's real work.

Continue using the earlier paper/ink visual language as a starting point:

```text
Background:
Warm off-white / paper.

Primary text:
Near-black charcoal or green-black.

Secondary text:
Muted grey-green.

Borders:
Warm subtle grey.

Signal accent:
Restrained clay / orange.
```

Project-specific colors may appear naturally inside real screenshots.

Do not spread project colors into unrelated interface decoration.

---

# 9. Explicit Visual Anti-Patterns

Do not use:

- giant marketing headlines.
- generic portfolio templates.
- generic startup/SaaS layouts.
- repetitive card grids.
- bento grids.
- glassmorphism.
- gradients.
- radial glows.
- aurora effects.
- excessive rounded cards.
- nested cards.
- fake dashboards.
- decorative programming illustrations.
- generic code backgrounds.
- fake browser windows.
- fake laptop/device frames.
- oversized icons.
- decorative status dots.
- meaningless technology pills.
- animated backgrounds.
- unnecessary animation.
- scroll-reveal systems.
- parallax.
- mouse-follow effects.
- 3D cards.
- autoplay media.
- decorative UI controls with no functional purpose.

For every nontrivial visual treatment, be able to answer:

> What content, user need, evidence, or brand quality does this support?

If the answer is only:

> It looks modern.

remove it.

---

# 10. Recommended Visual Direction

Use the following visual direction:

## Project Proofbook with Evidence-Led Discipline

Treat the portfolio as a collection of proof rather than an editorial article collection.

Use large, inspectable evidence.

Typical project rhythm:

```text
Real screenshot or evidence
↓
Project title and context
↓
What Farhan did
↓
Technical decision or challenge
↓
Evidence / result
↓
Next project
```

Do not place every project into the same reusable card shape.

Allow each project type to determine its own composition.

### C23

Use:

- large campaign screenshot.
- participant-site evidence.
- hostname/deployment architecture.
- current verified deployment state.

### Next Media

Use:

- large website imagery.
- responsive screenshots.
- implementation context.
- CMS/integration evidence where appropriate.
- before/after comparisons where meaningful.

### EOP

Use:

- problem → investigation → implementation → verification.
- sanitized screenshots.
- PR evidence.
- Loom evidence where permitted.
- workflow diagrams.
- no private operational data.

### #SheBuilds

Use:

- a restrained screenshot contact sheet.
- a compact site index.
- stronger emphasis on custom-domain deployments.
- do not create twenty-five cards.

### Traffic Sign Recognition

Use:

- real application screenshot.
- model/deployment context.
- clear limitations.
- source/live evidence if available.

### Learning Work

Use:

- chronological entries.
- compact evidence.
- concise descriptions of what each learning collection was intended to teach.

Do not present learning repositories with the same visual weight as professional or original project work.

---

# 11. Homepage Information Hierarchy

Use the following homepage order:

1. **Header**
2. **Compact identity + lead evidence**
3. **Selected Work**
4. **Professional Experience: Embiro Technologies**
5. **Engineering Evidence: EOP**
6. **Shipping Breadth: #SheBuilds and related client work**
7. **Technical Project: Traffic Sign Recognition**
8. **Currently Building: C23 status**
9. **Learning and Progression**
10. **Technical Capabilities / Working Approach**
11. **Short About + Education**
12. **Contact**
13. **Footer**

Do not insert sections merely because developer portfolios commonly include them.

Every homepage section must support one of:

- understanding.
- evidence.
- trust.
- action.

---

# 12. Above-the-Fold Composition

The hero must be significantly shorter than the previous editorial direction.

A visitor should encounter real work immediately.

## Desktop

Above the fold should include:

### Header

Left:

```text
Farhan Segujja
```

Right:

```text
Work
Experience
About
Contact
```

Keep the header restrained.

Do not create a floating translucent navigation capsule.

### Identity Block

Use approximately 35–40% of the main horizontal composition.

Establish:

- Computer Science student.
- frontend-focused development experience.
- growing full-stack experience.
- real project delivery.
- current practical work.

Use:

- a small eyebrow or metadata line.
- a restrained heading.
- one concise supporting paragraph.
- primary action: **See selected work**.
- secondary action: **GitHub** or **Email Farhan**.

Do not use an enormous headline.

Do not let the heading fill most of the viewport.

### Lead Work Evidence

Use approximately 60–65% of the main composition.

Show a large real project screenshot.

Use **C23 Digital Spotlight** as the default lead candidate unless stronger current evidence clearly justifies another project.

Show the screenshot directly.

Do not wrap it in:

- fake browser chrome.
- laptop mockups.
- device frames.

Include concise project identification:

```text
C23 Digital Spotlight
Community campaign · frontend + deployment architecture
View case study →
```

Optionally include one restrained technical fact beneath the image.

The visitor should be able to see:

- identity.
- current level.
- actual work.

at the same time.

The bottom of the viewport should begin to reveal the Selected Work section on typical laptop screens.

## Mobile

Use this order:

```text
Identity
↓
Actions
↓
Lead C23 screenshot
↓
Screenshot caption
↓
Selected Work
```

Do not require the visitor to scroll through a long hero before encountering project evidence.

---

# 13. Selected Work Treatment

Place Selected Work immediately after the compact hero.

The first major entries should be deliberately different.

## C23

Use a large image-led feature.

Show:

- screenshot.
- concise context.
- architecture evidence.
- live/source/case-study links where verified.

## Next Media

Use a large website-evidence composition.

Possible media:

- desktop screenshot.
- mobile screenshot.
- key page screenshot.
- before/after comparison.
- CMS evidence where permitted.

## Embiro / EOP

Do not present this as another website screenshot card.

Use a professional progression or engineering sequence:

```text
QA / UAT
↓
Issue discovery
↓
Feature proposal
↓
Implementation
↓
Testing
↓
Loom demonstration
↓
Pull request / review
```

Surface one strong engineering example near this section.

---

# 14. Professional Experience: Embiro Technologies

Treat Embiro Technologies as a major professional-experience section.

Present clearly:

```text
Embiro Technologies
Software Engineering Intern
March 2026 — Present
```

Do not reduce Embiro to a list of URLs.

Communicate progression approximately as:

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
Git and pull-request workflow
↓
Code-level AI-assisted engineering
```

Present this progression through real evidence rather than exaggerated copy.

Do not imply seniority.

Do not describe Farhan as a senior engineer, architect, or expert unless later facts justify those titles.

---

# 15. Next Media Case Study

Create a dedicated static page:

```text
/work/next-media/
```

Explain:

## Context

Embiro Technologies was contracted to redesign the Next Media corporate website.

## Role

State that Farhan handled the majority of the engineering implementation while collaborating with another intern who contributed smaller changes and reviewed parts of the work.

Do not claim:

> I built the entire website alone.

## Technologies

Only list technologies genuinely used.

Existing research identifies:

- React.
- Vite.
- Tailwind CSS.
- React Router.
- Swiper.js.
- Framer Motion.
- shadcn/ui.
- Supabase.
- RSS.

Do not include a technology merely because it exists elsewhere in the portfolio.

## Work Worth Showing

Where evidence supports it, show:

- responsive interface development.
- navigation restructuring.
- leadership pages.
- brand presentation.
- profile components.
- carousels.
- animations.
- CMS integration.
- job/opening content.
- dynamic news content.
- NilePost RSS integration.
- client-feedback iterations.

## Evidence

Prefer:

- real website screenshots.
- live project.
- CMS screenshot where permitted.
- implementation challenges.
- before/after comparisons.

Do not use fake browser mockups.

---

# 16. Kin Kariisa

Treat Kin Kariisa as supporting client work associated with the same client relationship.

Do not give it equal weight to Next Media unless the available evidence justifies that hierarchy.

Highlight only verified contributions such as:

- responsive redesign.
- typography.
- navigation.
- content hierarchy.
- animation.
- Insights/blog migration.
- branding consistency.

---

# 17. #SheBuilds

Use #SheBuilds to demonstrate repeated implementation and delivery breadth.

Do not create a card for every site.

Prioritize the custom-domain deployments:

```text
ikorushoneystore.com
readusafrica.org
yourafricanneighbour.com
sapondo.com
```

Use stronger visual treatment for those sites.

Present the remaining sites using one restrained treatment such as:

- screenshot contact sheet.
- compact index.
- horizontal gallery only if it remains accessible and useful.

Do not imply that Farhan independently handled:

- client acquisition.
- requirements gathering.
- client management.
- content collection.

Where appropriate, state that the primary role was engineering implementation based on requirements collected by other team members.

---

# 18. Embiro Operations Platform

Treat EOP as a different class of work from marketing/client websites.

Present it as:

> QA, UAT, debugging, security thinking and full-stack engineering inside an existing application.

The strongest narrative is progression.

## Stage One

Show:

- QA.
- UAT.
- bug discovery.
- permission testing.
- workflow testing.
- responsive testing.
- feature proposals.

The bounty system may be mentioned as the internal mechanism used to document findings.

Do not make bounty earnings a major portfolio feature.

## Stage Two

Use repeated engineering evidence patterns:

```text
Problem
↓
What was observed
↓
Why it mattered
↓
Investigation
↓
What was implemented
↓
How it was verified
```

Use approximately four or five strong examples rather than listing every issue.

---

# 19. EOP Engineering Highlights

Prioritize the strongest examples.

## Session Idle Timeout

Communicate:

- inactive staff sessions remained authenticated.
- this mattered because the platform contained sensitive operational information.
- Farhan first identified/proposed the feature.
- Farhan was later assigned to implement it.
- implementation included configurable timeout behavior, enforcement, expiration, administrative controls, and audit logging where verified.

Evidence may include:

- issue/bounty report.
- PR.
- Loom.
- sanitized screenshot.

## Staff Two-Factor Authentication

Communicate:

- the security problem.
- proposal.
- implementation.
- verification.

Where verified, implementation may include:

- TOTP enrollment.
- authenticator verification.
- QR/manual setup.
- backup codes.
- backup-code reuse protection.
- disable/re-enable.
- session-level verification.
- administrator-assisted reset.

Never expose:

- usable QR secrets.
- authentication secrets.
- backup codes.
- tokens.
- private records.

## Invoice PDF Functionality

Use a concise debugging format:

```text
Observed
↓
Investigation
↓
Implementation
↓
Result
```

Emphasize reuse of existing application logic where that is accurate.

## Responsive Project / Pipeline Work

Do not write only:

> Made it responsive.

Explain actual failure causes where verified, such as:

- overflowing Kanban columns.
- hard-coded minimum widths.
- project-detail layout problems.
- mobile tab navigation.
- orientation selector problems.
- forecast-card overflow.

Emphasize diagnosis rather than random CSS adjustment.

## Reusing Existing Application Logic

Use the Client Profile edit bug as an example of engineering judgment:

```text
Problem:
Visible EDIT action did nothing.

Investigation:
A complete edit workflow already existed elsewhere.

Decision:
Do not create a duplicate implementation.

Solution:
Connect the existing control to the existing workflow.
```

Use this to show:

- unfamiliar-codebase understanding.
- reuse.
- state-flow understanding.
- avoidance of duplicated logic.

---

# 20. EOP Privacy Rules

Treat these as binding.

The portfolio may discuss:

- engineering problem.
- reasoning.
- implementation.
- technologies.
- workflow.
- sanitized screenshots.
- Loom demonstrations where permitted.
- pull-request evidence where permitted.

Do not expose:

- client records.
- invoice contents.
- payment information.
- private emails.
- authentication secrets.
- `.env` values.
- API keys.
- database URLs.
- backup codes.
- user tokens.
- confidential company communication.
- private source code without explicit approval.
- internal URLs that should remain private.
- production database values.

When uncertain, redact or omit.

Do not trade confidentiality for a stronger-looking portfolio.

---

# 21. AI-Assisted Development Story

Preserve the AI-assisted-development progression carefully.

Do not present AI as having done the engineering independently.

Present the progression as:

## Phase One: Lovable

Rapid product/site implementation and requirement translation.

## Phase Two: Direct Source-Code Work

Direct interaction with:

- React.
- Vite.
- Tailwind.
- routing.
- components.
- libraries.
- backend/data integrations.

## Phase Three: Claude Code / Code-Level Assistance

Work inside an existing repository requiring inspection of:

- source files.
- diffs.
- components.
- migrations.
- database code.
- authentication code.
- application architecture.

Preserve the principle:

> AI-generated code still had to be reviewed, understood and tested before acceptance.

Treat AI as a development tool under human technical review.

---

# 22. Git, PR and Loom Evidence

Do not list Git only inside a generic skills section.

Show practical workflow evidence where allowed:

- feature branches.
- bug-fix branches.
- commits.
- pull requests.
- peer review.
- responding to review.
- type checking.
- linting.
- manual verification.

When screenshots are used, prioritize useful information such as:

- PR title.
- branch name.
- problem summary.
- test plan.
- review state.

Do not show walls of code simply to make the portfolio look technical.

For Loom:

- present it as part of the engineering communication workflow.
- never autoplay embedded videos.
- prefer links or user-triggered viewing.

A useful workflow sequence is:

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

---

# 23. Traffic Sign Recognition

Keep this project visible as evidence of non-frontend technical work.

Show:

- real app screenshot.
- Python/Streamlit/TensorFlow/Keras context where verified.
- what the app does.
- the deployment/integration learning objective.
- current limitations.
- source link.
- live demo if it resolves correctly.
- collaborator attribution if required.

Do not invent:

- model accuracy.
- performance metrics.
- user counts.
- impact.

---

# 24. roadmap.sh and Learning Work

Keep learning visible.

Do not remove it because professional work is now stronger.

Use learning work to demonstrate progression.

Prefer a chronological trail.

Possible entries include:

- roadmap.sh Builds.
- JavaScript30.
- 30 Days of JavaScript.
- OOP Practice.
- SACCO Management System.

For each, communicate:

- what the collection was intended to teach.
- what changed or improved.
- completion/current status where verified.

Do not present every repository as a mature standalone product.

Do not use another repetitive card grid.

---

# 25. Skills / Technical Capabilities

Do not use percentage bars.

Never publish claims such as:

```text
React 90%
Python 85%
Git 95%
```

Use evidence-based capability groups.

Possible groups:

## Interfaces

- React.
- JavaScript.
- HTML.
- Tailwind CSS.
- responsive design.
- React Router.
- Framer Motion.
- Swiper.js.
- shadcn/ui.

Only retain items that are supported by actual work.

## Data and Application Integration

- Supabase.
- PostgreSQL / Neon.
- CMS integration.
- RSS.
- REST/web integrations.
- webhooks.

## Engineering Workflow

- Git.
- GitHub.
- branches.
- pull requests.
- code review.
- debugging.
- QA.
- UAT.
- responsive testing.
- Loom.

## Deployment

- Cloudflare.
- Vercel.
- GitHub Pages.
- custom domains.
- Cloudflare Workers.

## AI-Assisted Development

- Claude Code.
- Codex.
- Lovable.

Do not let this become a logo cloud.

Connect capabilities back to evidence wherever possible.

---

# 26. Working Approach

If a development-workflow section is included, keep it understated.

Use a numbered list or linear sequence, not eight cards.

Suggested sequence:

```text
01 Understand
Understand the requirement or reproduce the problem.

02 Investigate
Inspect the existing implementation before changing it.

03 Implement
Make the smallest appropriate change.

04 Test
Verify normal, edge-case and responsive behavior.

05 Review
Inspect the resulting code and generated changes.

06 Demonstrate
Record working behavior when useful.

07 Submit
Use the project's Git workflow.

08 Iterate
Respond to feedback and improve the implementation.
```

Do not turn this into generic process marketing.

---

# 27. Static Multi-Page Architecture

Use a simple Vite multi-page structure similar to:

```text
/
├── index.html
├── 404.html
│
├── work/
│   ├── c23/
│   │   └── index.html
│   └── next-media/
│       └── index.html
│
├── experience/
│   └── embiro/
│       └── index.html
│
├── public/
│   ├── favicon/
│   ├── social/
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── styles.css
│   ├── main.js
│   │
│   └── assets/
│       ├── fonts/
│       ├── c23/
│       ├── next-media/
│       ├── embiro/
│       ├── eop/
│       ├── shebuilds/
│       ├── traffic-signs/
│       └── learning/
│
├── package.json
└── vite.config.js
```

Treat this structure as directional, not mandatory.

Do not create empty directories merely to match a diagram.

Do not create the following unless a real need emerges:

```text
components/
hooks/
contexts/
pages/
lib/
utils/
services/
stores/
```

Do not imitate a framework architecture inside a static website.

Every public case-study path should map to a real HTML file.

Preferred public URLs:

```text
/
work/c23/
work/next-media/
experience/embiro/
```

Use normal browser navigation between pages.

Do not implement client-side routing.

---

# 28. JavaScript Requirements

JavaScript must be progressive enhancement.

The core portfolio must remain readable and navigable if JavaScript fails or is disabled.

## JavaScript that may be justified

### Mobile Navigation

Only add a JavaScript mobile menu if the final header genuinely requires one.

If implemented, support:

- pointer input.
- keyboard input.
- `aria-expanded`.
- Escape to close.
- predictable close behavior.
- sensible focus restoration.
- reduced-motion behavior.

Do not build a full-screen animated menu for visual effect.

### Screenshot Viewer

Only implement screenshot enlargement if it materially improves inspection.

Prefer native `<dialog>` plus small JavaScript.

Do not add a dialog library.

### Other Behavior

Add JavaScript only when there is an actual interaction requirement.

## JavaScript to avoid

Do not implement:

- React rendering.
- client-side routing.
- SPA navigation interception.
- runtime project-data loading.
- GitHub API fetching on page load.
- animated hero copy.
- hero carousel.
- scroll reveal.
- theme-toggle complexity.
- decorative motion.
- page transitions.
- filter systems with no real user need.
- animated counters.
- current-year JavaScript when static HTML is sufficient.

Aim for an extremely small JavaScript footprint.

If the site can function well with zero JavaScript beyond mobile navigation, treat that as a positive outcome.

---

# 29. Tailwind Design System

Use Tailwind as a deliberate styling system.

Do not use Tailwind as permission to scatter arbitrary values throughout HTML.

Define a small semantic design vocabulary.

## Color Roles

Use named roles for:

- paper.
- paper-subtle.
- ink.
- ink-muted.
- rule.
- signal.

Do not write raw hexadecimal values repeatedly in HTML.

## Typography Roles

Define a limited type scale for:

- display.
- section heading.
- body.
- metadata.
- caption.

Do not create one-off font sizes for individual sections.

Keep headings restrained.

Body text must remain comfortably readable.

## Layout Roles

Define consistent:

- maximum site width.
- readable text width.
- media width behavior.
- page gutters.
- section spacing.

## Shape Roles

Keep:

- default radius very small.
- media radius restrained.
- no default shadows.
- no pill styling unless content genuinely represents a compact state.

## Arbitrary Values

Avoid utilities such as:

```text
mt-[37px]
max-w-[1187px]
text-[17.3px]
```

unless there is a documented reason that belongs to the design system.

If a value is repeatedly required, promote it to a named token.

---

# 30. Tailwind Class Readability

Keep utility usage readable.

Use the following rules:

1. Prefer standard Tailwind utilities.
2. Use named theme values for brand/design tokens.
3. Avoid raw hex values in page markup.
4. Avoid excessive arbitrary values.
5. Keep responsive behavior visible in the markup.
6. Extract repeated class groups only when repetition is meaningful.
7. Do not create a large CSS component library that recreates Bootstrap.
8. Do not create utility abstractions that hide simple layout behavior.
9. Keep the number of custom component classes small.
10. If an element develops an unreadable wall of utilities, reconsider the composition before creating another abstraction.

The global CSS file may contain:

- Tailwind import/configuration.
- theme variables/tokens.
- font declarations.
- base document behavior.
- focus styles.
- accessibility helpers.
- reduced-motion behavior.
- browser-specific fixes.
- a very small number of stable repeated patterns.

Layout and presentation should remain primarily visible through Tailwind utilities.

---

# 31. Semantic HTML Requirements

Prefer native HTML semantics before generic `<div>` elements.

Use:

- `header`.
- `nav`.
- `main`.
- `section`.
- `article`.
- `aside` where appropriate.
- `footer`.
- `figure`.
- `figcaption`.
- `time`.
- lists where content is genuinely a list.
- buttons only for actions.
- anchors for navigation.

Use one descriptive `h1` per page.

Maintain logical heading hierarchy.

Add a visible-on-focus skip link.

Use descriptive link text.

Do not override standard link behavior without reason.

Do not create fake buttons from `<div>` elements.

Do not use custom JavaScript where native HTML already solves the interaction.

---

# 32. Screenshot and Evidence System

Before implementation, define a consistent evidence system.

For screenshots:

- capture real interfaces.
- use useful viewport dimensions.
- optimize files.
- set intrinsic dimensions.
- use modern image formats where beneficial.
- provide meaningful alt text.
- lazy-load below-the-fold images.
- keep evidence large enough to inspect.

Do not shrink screenshots inside decorative devices.

For major project media, define:

- aspect-ratio strategy.
- maximum width.
- caption style.
- evidence metadata.
- optional enlargement behavior.

For architecture diagrams:

- keep them factual.
- use accessible SVG or semantic HTML/CSS.
- label flows clearly.
- avoid decorative complexity.

For sanitized evidence:

- inspect every image for private information before publishing.

---

# 33. C23 Case Study

Create:

```text
/work/c23/
```

Use a structure approximately like:

1. project header.
2. project status.
3. campaign context.
4. intended community.
5. Farhan's role.
6. campaign flow.
7. deployment architecture.
8. frontend decisions.
9. application-flow decisions.
10. browser/deployment challenges.
11. current verified deployments.
12. evidence.
13. current limitations / next improvements.
14. source/live links.

Preserve C23 as the flagship personal/community project.

Current known Worker mapping from the existing plan:

```text
c23.farhansegujja.com
nimu-timber.farhansegujja.com
nutking.farhansegujja.com
modestmuse.farhansegujja.com
wrist-mode.farhansegujja.com
```

Treat:

- `c23` as the campaign hub.
- the other four as participant sites.

Before publication, verify every hostname.

Do not automatically describe all configured hostnames as successful launches without verification.

Verify:

- HTTPS.
- correct site/slug routing.
- assets.
- navigation.
- displayed identity.
- screenshot match.
- outbound links.
- claimed dates.
- claimed outcomes.

Do not show future participants as completed work.

Do not invent campaign impact.

---

# 34. About Section

Keep About short and factual.

Do not write a motivational biography.

Use the central story:

> Farhan is a Computer Science student whose development has progressed through repeatedly building real projects, learning unfamiliar technologies when projects required them, testing software, debugging issues and gradually taking responsibility for more complex engineering work.

Avoid phrases such as:

- passionate developer.
- technology enthusiast.
- innovative problem solver.
- crafting digital experiences.
- turning ideas into reality.
- building the future.

The portfolio should demonstrate those qualities through evidence instead of declaring them.

---

# 35. Contact

Keep Contact simple.

Support:

- freelance projects.
- collaboration.
- employment opportunities.

Primary actions:

```text
Email Farhan
GitHub
```

Only add other social links when active URLs have been explicitly supplied.

Do not add a contact form unless a real requirement emerges.

Do not add unnecessary third-party form scripts.

---

# 36. Accessibility

Target WCAG 2.2 Level AA.

Test, do not merely assume.

Requirements include:

- sufficient text contrast.
- sufficient non-text contrast.
- visible focus.
- keyboard navigation.
- logical focus order.
- skip link.
- focus not obscured by sticky UI.
- adequate target sizes.
- reflow without horizontal two-dimensional scrolling.
- 200% zoom.
- meaningful alt text.
- logical headings.
- semantic landmarks.
- clear control names.
- no meaning conveyed only through color.
- no interaction available only on hover.
- reduced-motion support.

If a mobile menu or dialog exists, test:

- keyboard entry.
- traversal.
- Escape.
- close behavior.
- focus restoration.
- screen-reader naming.

Accessibility must work in the final composition, not only in isolated elements.

---

# 37. Responsive Design

Design deliberately for:

- 320px narrow phone.
- 375–430px common phone widths.
- 768px tablet.
- 1024px small laptop/tablet landscape.
- 1366–1440px desktop.
- 1920px wide desktop.

Also test:

- long project titles.
- missing images.
- 200% zoom.
- visible focus.
- reduced motion.
- large system font settings where possible.
- portrait and landscape orientation.
- dense screenshots.
- long metadata.

Do not rely on a desktop layout that merely wraps.

The homepage must remain evidence-first on mobile.

---

# 38. Performance

Keep the site intentionally small.

Target good Core Web Vitals.

Priorities:

- optimize screenshots.
- define image dimensions.
- lazy-load below-the-fold media.
- preload only genuinely critical assets.
- minimize fonts.
- self-host fonts where appropriate and licensed.
- avoid third-party runtime dependencies.
- avoid third-party analytics in the first release unless explicitly requested.
- keep JavaScript minimal.
- avoid runtime API fetching.
- avoid animation libraries.
- avoid unnecessary icon packages.

The static architecture should be treated as an opportunity for excellent performance.

Do not squander that advantage with heavy assets.

---

# 39. SEO and Metadata

Every real HTML page must have appropriate page-specific metadata.

Include:

- unique `<title>`.
- meta description.
- canonical URL.
- Open Graph metadata.
- social preview image.
- favicon.
- structured data where facts support it.
- sitemap.
- robots file.

Use appropriate structured data only for verified facts.

Possible entities may include:

- `Person`.
- `WebSite`.
- relevant creative/project work.

Do not add keyword stuffing.

Do not write generic AI biography padding for SEO.

Because each route is a real HTML page, do not introduce JavaScript merely to manage metadata.

---

# 40. Cloudflare Pages

Use Cloudflare Pages as the production hosting target.

Vite should build the site into:

```text
dist/
```

Configure the project so that all intended HTML pages are emitted.

Verify production behavior for:

```text
/
work/c23/
work/next-media/
experience/embiro/
```

Also verify nonexistent routes and the 404 experience.

Do not implement SPA fallback routing.

Do not rely on GitHub Pages-specific React Router workarounds.

Preserve the custom domain:

```text
farhansegujja.com
```

Ensure:

- HTTPS works.
- asset paths work.
- nested HTML paths work.
- refresh on nested pages works.
- canonical URLs match production.
- sitemap URLs match production.
- 404 behavior is intentional.

---

# 41. Implementation-Time Design Review

If Claude Code and the Impeccable skill are available during implementation, Impeccable may still be used as a design-quality and anti-pattern review workflow.

Treat it as optional implementation tooling, not runtime architecture.

It must not:

- introduce browser dependencies.
- force React.
- force component systems.
- overwrite this plan.
- weaken accessibility.
- invent content.
- expose private information.
- override evidence hierarchy.

If used, reconcile its recommendations against:

1. this document.
2. verified project evidence.
3. privacy rules.
4. accessibility.
5. performance.
6. the anti-vibe-code charter.

The portfolio plan remains authoritative.

---

# 42. Implementation Phases

## Phase 0 — Ratify Architecture

Before editing implementation files:

- read the complete historical plan.
- read every amendment.
- read this document completely.
- treat this document as the current implementation authority where stack/architecture decisions conflict.

Final stack:

```text
Vite
+
Tailwind CSS
+
Semantic HTML
+
Minimal vanilla JavaScript
+
Cloudflare Pages
```

Explicitly mark React, React Router, shadcn/ui and SPA requirements as superseded.

Do not remove content/evidence amendments.

---

## Phase 1 — Evidence Inventory

Before visual implementation:

- verify current C23 deployments.
- verify Next Media.
- verify Kin Kariisa.
- identify strongest #SheBuilds sites.
- verify Traffic Sign Recognition source/live state.
- identify EOP evidence that may be shown safely.
- identify PR evidence that may be public.
- identify Loom evidence that may be public.
- inspect screenshots for private information.
- collect screenshots at intentional viewport sizes.
- verify all project claims.

Do not draft final public copy from stale assumptions when evidence can be checked.

---

## Phase 2 — Evidence-First Wireframe

Create the low-fidelity homepage using placeholder blocks representing actual planned screenshots and diagrams.

Do not begin with typography polish.

Validate:

- real work is visible immediately.
- hero is short.
- selected work appears early.
- C23 is unmistakably important.
- Embiro is clearly professional experience.
- Next Media feels like substantial client work.
- EOP looks like software-engineering evidence, not a marketing-site card.
- #SheBuilds communicates repeated shipping without card spam.
- Traffic Sign Recognition provides technical variety.
- learning work remains secondary.

Reject the wireframe if text dominates visual evidence.

---

## Phase 3 — Evidence Asset Preparation

Prepare:

- screenshots.
- diagrams.
- PR evidence.
- Loom links.
- contact sheets.
- responsive comparisons.

Define:

- image dimensions.
- compression.
- aspect ratios.
- captions.
- evidence labels.
- lazy-loading rules.

Sanitize Embiro/EOP evidence before implementation.

---

## Phase 4 — Tailwind Design System

Establish:

- colors.
- typography.
- widths.
- spacing.
- rules.
- radii.
- focus behavior.
- interaction states.
- motion constraints.

Use real C23, Next Media and EOP content when testing the system.

Do not use lorem ipsum as the main design input.

Compare the complete system against the anti-vibe-code charter before expanding it.

---

## Phase 5 — Homepage

Implement in this order:

1. header.
2. compact identity + lead screenshot.
3. selected work.
4. Embiro progression.
5. EOP engineering evidence.
6. #SheBuilds / related shipping breadth.
7. Traffic Sign Recognition.
8. Currently Building / C23 current status.
9. learning.
10. working approach / capabilities.
11. about / education.
12. contact.
13. footer.

Do not polish lower-priority sections before the evidence hierarchy works.

---

## Phase 6 — C23 Case Study

Build the C23 page from verified evidence.

Include:

- campaign context.
- role.
- architecture.
- frontend decisions.
- forms/accessibility where relevant.
- deployment challenges.
- current deployments.
- evidence.
- limitations.
- source/live links.

Do not invent outcomes.

---

## Phase 7 — Next Media Case Study

Build the Next Media page with strong visual evidence.

Prioritize:

- real screenshots.
- responsive work.
- brand/page implementation.
- CMS/data integrations.
- technical challenges.
- feedback iterations.
- accurate authorship.

Do not overstate individual ownership.

---

## Phase 8 — Embiro Professional Experience

Build:

```text
/experience/embiro/
```

Use the page to connect:

- professional progression.
- #SheBuilds.
- Next Media relationship.
- Kin Kariisa.
- QA/UAT.
- EOP.
- source-control workflow.
- AI-assisted engineering progression.

Do not expose confidential information.

---

## Phase 9 — Minimal Interaction

After the static experience works:

- add mobile navigation JavaScript only if needed.
- add screenshot enlargement only if useful.

Do not add interaction simply because the site feels too static.

Static is acceptable when the content is strong.

---

## Phase 10 — SEO and Metadata

Add and verify:

- titles.
- descriptions.
- canonical URLs.
- Open Graph.
- social images.
- structured data.
- sitemap.
- robots.
- favicon.

Ensure every major page has its own metadata.

---

## Phase 11 — Accessibility and Responsive Verification

Test:

- keyboard navigation.
- visible focus.
- heading structure.
- landmarks.
- image alt text.
- menu/dialog behavior if present.
- 200% zoom.
- reduced motion.
- narrow screens.
- wide screens.
- missing images.
- long content.

Fix material issues before release.

---

## Phase 12 — Performance Verification

Review:

- image weight.
- font weight.
- CSS output.
- JavaScript output.
- unused dependencies.
- layout shifts.
- loading priority.
- lazy loading.

Run representative performance tests.

Do not accept framework-level overhead because no framework should be present.

---

## Phase 13 — Cloudflare Pages Deployment

Build with Vite.

Deploy `dist/`.

Verify the production domain directly.

Test:

- homepage.
- every public nested route.
- deep links.
- refresh.
- assets.
- 404.
- HTTPS.
- metadata.
- canonical URLs.

Do not consider deployment complete based only on local preview.

---

## Phase 14 — Final Anti-Vibe Audit

Inspect the entire site as one experience.

Ask:

1. Does the portfolio look specifically connected to Farhan's real work?
2. Is the hierarchy obvious within five seconds?
3. Is real work visible immediately?
4. Does the hero dominate too much space?
5. Is any visual effect pretending to carry meaning?
6. Are unrelated projects forced into identical containers?
7. Could the copy belong to another generic developer portfolio?
8. Is every project claim verifiable?
9. Does mobile feel deliberately designed?
10. Does the site communicate clearly without animation?
11. Can every action be completed with a keyboard?
12. Are there placeholders, dead links, console errors, or unfinished states?
13. Could the main screenshots be replaced with generic imagery without changing the design?
14. If decorative styling disappeared, would the evidence still make the portfolio convincing?

If the answer to question 13 is yes, make the design more evidence-specific.

If the answer to question 14 is no, strengthen the work presentation before adding decoration.

---

# 43. Definition of Done

Do not consider the portfolio complete until:

- [ ] The old coming-soon experience is fully replaced.
- [ ] The project runs through Vite.
- [ ] Tailwind CSS is the primary styling system.
- [ ] The site is composed primarily of semantic static HTML.
- [ ] JavaScript is minimal and progressive.
- [ ] React is not used without a newly documented technical requirement.
- [ ] React Router is not used.
- [ ] shadcn/ui is not used.
- [ ] No SPA fallback exists.
- [ ] Cloudflare Pages serves the production build.
- [ ] The custom domain works.
- [ ] Nested HTML pages load directly and on refresh.
- [ ] C23 is clearly the flagship personal/community project.
- [ ] Embiro is clearly major professional experience.
- [ ] Next Media has substantial visual evidence and a dedicated case study.
- [ ] EOP demonstrates QA, UAT, debugging, security thinking and implementation progression.
- [ ] #SheBuilds communicates breadth without repetitive cards.
- [ ] Kin Kariisa is appropriately credited as supporting client work.
- [ ] Traffic Sign Recognition remains visible.
- [ ] roadmap.sh and learning work remain visible but lower hierarchy.
- [ ] Git/PR evidence is shown where appropriate.
- [ ] Loom is presented as part of the engineering workflow where permitted.
- [ ] AI-assisted development is described responsibly.
- [ ] Real screenshots are used prominently.
- [ ] The hero is compact.
- [ ] Strong work evidence appears at or very near the fold.
- [ ] Typography supports the work rather than dominating it.
- [ ] No fake dashboards exist.
- [ ] No fake browser/device mockups exist.
- [ ] No generic bento grid exists.
- [ ] No repetitive card wall exists.
- [ ] No gradients or glassmorphism exist.
- [ ] No meaningless decorative programming graphics exist.
- [ ] No private Embiro/EOP data is exposed.
- [ ] Every public claim is verifiable.
- [ ] No fabricated metrics, testimonials, outcomes, awards or impact figures exist.
- [ ] The site works from 320px through wide desktop.
- [ ] Keyboard navigation works throughout.
- [ ] Focus styles are clearly visible.
- [ ] Reduced-motion preferences are respected.
- [ ] Images have correct dimensions and useful alt text.
- [ ] Below-the-fold images are optimized and appropriately lazy-loaded.
- [ ] Every public page has correct metadata.
- [ ] Sitemap and robots files are correct.
- [ ] Every external project link is tested.
- [ ] Browser console errors are resolved.
- [ ] Production build completes without material errors.
- [ ] Performance is representative of a lightweight static site.
- [ ] The final anti-vibe audit passes.

---

# 44. Final Implementation Instruction

Do not attempt to prove technical ability through the architecture of the portfolio itself.

Do not add a framework merely because the portfolio belongs to a developer.

Do not allow typography, animation, layout gimmicks, or generic design-system components to become more memorable than the projects.

Build a site where a reviewer can quickly conclude, from evidence:

- Farhan has initiated and shipped personal projects.
- Farhan has delivered client-facing web work.
- Farhan has professional experience at Embiro Technologies.
- Farhan has progressed from website implementation into source-level engineering.
- Farhan has participated in QA and UAT.
- Farhan can investigate bugs and product issues.
- Farhan has implemented features inside an existing software system.
- Farhan has used Git, pull requests, review, testing and Loom in a professional workflow.
- Farhan is growing from frontend-focused development into broader full-stack engineering.
- Farhan continues to learn deliberately.

Make that conclusion evident through the work itself.

The final architectural rule is:

> **Vite builds the portfolio. Tailwind provides the styling system. Semantic HTML contains the portfolio. Minimal vanilla JavaScript enhances necessary interactions. Cloudflare Pages serves real static pages. The projects and engineering evidence provide the visual identity.**
