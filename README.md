# TechBridge

The website for **TechBridge**, a learning initiative by **Baselink Services Limited**. TechBridge offers practical training in **Data Analytics** and **Web Development**, plus a **30-Day Practical Internship** that ends with a recommendation letter, based on participation and performance.

The site is a static build in plain HTML5 and CSS3. It has no JavaScript, no build step and no dependencies.

## Pages

| Page | File | Description |
| --- | --- | --- |
| Homepage (Task 1) | `index.html` | Introduces TechBridge, the programs, the internship and how to get in touch |
| Programs (Task 2) | `programs.html` | Explains the two programs, their skills and how they differ, with a clear next step |
| Internship Tasks (Task 3) | `internship-tasks.html` | Shows the 30-day internship as a roadmap of 8 tasks, with the day, description and difficulty of each |

All three pages share the same navbar, buttons, typography, colours and footer, so they read as one website.

---

## Task 1: Homepage

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Navbar | n/a | Logo, section links and "Apply Now" button |
| Hero | `#home` | Headline, intro and main call to action |
| About | `#about` | What TechBridge is and why it exists |
| Programs | `#programs` | Short overview of the Data Analytics and Web Development programs |
| Internship | `#internship` | 30-Day Practical Internship details and apply button |
| Why TechBridge | n/a | Four-column overview of the program's focus |
| Contact / CTA | `#contact` | Apply and community-join calls to action |
| Footer | n/a | Navigation links and social/contact icons |

### Highlights
- The internship illustration is blended into its section using CSS masking and `mix-blend-mode`, so it fades into the gradient instead of showing as a box.
- Scroll and entrance animations, with a `prefers-reduced-motion` fallback.

---

## Task 2: Programs Page

The Programs page answers one question for visitors: **"What can I learn at TechBridge?"** It is a separate page, `programs.html`, that builds on the Task 1 site instead of replacing it.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "Build Skills That Move You Forward." with the main apply button and a "Learn More" link |
| About our programs | n/a | "Learn by doing" with three steps: Learn, Practice, Build |
| Choose Your Path | `#paths` | Two program cards: Data Analytics (`#data-analytics`) and Web Development (`#web-development`) |
| The Difference | n/a | "Two Paths. One Mission." side-by-side comparison of the two programs |
| Call to action | n/a | Apply for the internship, plus a link back to the homepage |
| Footer | n/a | Same footer as the homepage, with a green and purple corner glow |

### The two programs

| Program | Focus | Key skills |
| --- | --- | --- |
| **Data Analytics** (green) | Working with data and extracting insights | Spreadsheet analysis, data cleaning, SQL, data visualization, business analysis |
| **Web Development** (purple) | Designing and building websites and web applications | HTML, CSS, JavaScript, Git/GitHub, web projects |

Each program has its own accent colour (green and purple), so visitors can tell them apart at a glance while the base stays on-brand.

### Highlights
- Program cards with a colour wash, artwork, skill pills and a hover lift effect.
- A comparison panel that spells out the difference between the two programs.
- Every apply button leads to the official application form.
- Fully responsive. The cards and comparison columns stack on tablet and mobile.
- Background artwork uses normal `<img>` tags, so the image paths work from the HTML file wherever the stylesheet lives.

---

## Task 3: Internship Tasks Page

The Internship Tasks page answers: **"What am I expected to complete during this internship?"** It is a separate page, `internship-tasks.html`, that presents the whole 30-day journey and links with the Homepage and Programs pages.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "Your Journey. Your Projects. Your Growth.", with "30 Days" and "8 Practical Tasks" badges and an "Explore the Tasks" link |
| Roadmap | `#roadmap` | "Internship Tasks Roadmap": all 8 tasks in a zig-zag timeline |
| Call to action | n/a | "Join the TechBridge Internship Today!" with the apply button and a link back to the homepage |
| Footer | n/a | Same footer as the other pages |

### The 8 tasks

| Task | Title | Day | Difficulty label |
| --- | --- | --- | --- |
| 01 | Build the TechBridge Homepage | 1 | Beginner |
| 02 | Build the TechBridge Programs Experience | 4 | Beginner |
| 03 | Build the Internship Tasks Experience | 8 | Beginner to Intermediate |
| 04 | Build an Interactive Task Tracker | 11 | Intermediate |
| 05 | Build the Intern Registration Experience | 15 | Intermediate |
| 06 | Build the Task Submission System | 19 | Intermediate |
| 07 | Build the Intern Dashboard | 22 | Intermediate to Advanced Beginner |
| 08 | Build the Complete TechBridge Platform | 26 | Capstone |

Each card shows the task number, title, day, a short description, a difficulty label and an icon. The difficulty labels are a guide to how the internship becomes more challenging, not official ratings. No task is marked as completed, available or locked.

### Highlights
- A connected timeline with a glowing centre line and numbered nodes. Green cards sit on the left and purple cards on the right, so the sequence reads clearly from Day 1 to Day 26.
- On tablet and mobile the roadmap becomes a single column along a line on the left.
- The roadmap is built from real HTML and CSS rather than an image, so the text is readable by screen readers and the cards stay responsive.
- The eight task icons and the rocket icon are lightweight inline SVGs, so no extra icon files are needed.
- No JavaScript. The page uses HTML5 and CSS3 only.

---

## Features (whole site)

- Responsive layout (desktop, tablet, mobile)
- Pure-CSS mobile menu (hidden checkbox and label, no JavaScript)
- Smooth-scroll anchor navigation
- Dark theme with green and purple accents, driven by CSS variables
- Inline SVG icon sprite that inherits text colour

## Project Structure

```
techbridge/
├── index.html              # Homepage (Task 1)
├── programs.html           # Programs page (Task 2)
├── internship-tasks.html   # Internship Tasks page (Task 3)
├── style.css               # All styles for all three pages
├── README.md
└── assets/
    ├── icons/              # SVG icons, program tiles, and the three step icons (step-*.png)
    └── images/             # Logo, hero/internship artwork, backgrounds, programs-*.jpg artwork
```

### Programs page assets

| File | Used for |
| --- | --- |
| `assets/images/programs-hero.jpg` | Hero artwork (the bridge with the two program labels) |
| `assets/images/programs-data-bg.jpg` | Data Analytics card background |
| `assets/images/programs-web-bg.jpg` | Web Development card background |
| `assets/images/programs-cta-bg.jpg` | Call-to-action banner background |
| `assets/icons/tile-data-analytics.svg` | Data Analytics icon tile |
| `assets/icons/tile-web-development.svg` | Web Development icon tile |
| `assets/icons/step-learn.png`, `step-practice.png`, `step-build.png` | "Learn by doing" step icons |

### Internship Tasks page assets

| File | Used for |
| --- | --- |
| `assets/images/internship-hero.jpg` | Hero illustration (a glowing road leading to a flag) |
| `assets/images/programs-cta-bg.jpg` | Call-to-action banner background (shared with the Programs page) |

The task icons are inline SVGs defined in `internship-tasks.html`.

## Getting Started

No installation is needed.

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. Use the navbar to move between the Home, Programs and Internship Tasks pages.

## Navigation

All three pages share the same navbar: **Home, Programs, Internship Tasks, About, Contact** and the Apply Now button.

- **Home** goes to `index.html`, **Programs** goes to `programs.html`, and **Internship Tasks** goes to `internship-tasks.html`.
- **About** and **Contact** link to the matching sections on `index.html`.
- Each page highlights its own link in the navbar (the `on` class).
- The footer Programs links point to `programs.html#data-analytics` and `programs.html#web-development`, and the footer Internship link goes to `internship-tasks.html`.

## Customisation

**Colours and sizing:** edit the CSS variables at the top of `style.css` (section 2, *Variables*):

```css
:root {
    --green: #39FF14;
    --purple: #4F20FF;
    --bg-primary: #030A19;
    --container: 1200px;
}
```

**Program accent colours:** the Programs page sets them in section 17 of `style.css`, under `.pg-data` (green) and `.pg-web` (purple).

**Application link:** the "Apply" buttons point to the Google Form at `https://forms.gle/8EbdSy5ttGfLZfjv5`. Search `index.html` and `programs.html` for that URL to change it.

**Program text and skills:** edit the card and comparison content directly in `programs.html`.

**Internship tasks:** edit the eight task cards in the roadmap of `internship-tasks.html`. Each card holds the task number, title, day, description and difficulty label. Cards alternate between `rm-odd` (green, left) and `rm-even` (purple, right).

**Fonts:** loaded from Google Fonts: *Plus Jakarta Sans* (body and headings) and *Caveat* (handwritten tagline).

## CSS Organisation

`style.css` is split into numbered sections:

1. Reset
2. Variables
3. Global
4. Buttons
5. Navbar
6. Hero
7. About
8. Programs
9. Internship
10. Why
11. CTA
12. Footer
13. Animations
14. Responsive
15. Reduced motion
16. Icons
17. Programs page (all styles for `programs.html`, using a `pg-` class prefix)
18. Internship Tasks page (all styles for `internship-tasks.html`, using `it-` and `rm-` class prefixes)

**Breakpoints:** 1023px (tablet grids), 900px (hamburger menu, single column) and 600px (mobile).

## Testing Checklist

- Navigation works between the homepage and the Programs page, including the mobile menu.
- Both programs are clearly explained, with their skills listed.
- Every apply button opens the official application form.
- The layout holds up on desktop, tablet and mobile widths.
- The Programs page looks like part of the same website as the homepage.
- All 8 internship tasks appear with the correct numbers, titles and days (1, 4, 8, 11, 15, 19, 22, 26).
- The Internship Tasks page works on desktop, tablet and mobile, with no horizontal scrolling.
- A new intern can tell what they have to complete and how the difficulty grows.

## Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari. The site uses `mask-image`, `mask-composite`, `mix-blend-mode` and `color-mix()`, which these browsers support. In an older browser, some glow and blend effects may not appear, but the content stays readable.

## Deployment

Because the site is fully static, it can be hosted anywhere that serves files, including GitHub Pages, Netlify, Vercel and Cloudflare Pages. Point the host at the project root with no build command.

## License

© Baselink Services Limited. All rights reserved.
