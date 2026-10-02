# TechBridge

The homepage for **TechBridge**, a learning initiative by **Baselink Services Limited**. TechBridge offers practical training in **Data Analytics** and **Web Development**, plus a **30-Day Practical Internship** that ends with a recommendation letter, based on participation and performance.

The site is a single-page, static build in plain HTML5 and CSS3. 

---

## Features

- Fully responsive layout (desktop, tablet, mobile)
- Pure-CSS mobile menu (hidden checkbox and label, no JavaScript)
- Smooth-scroll anchor navigation between sections
- Dark theme with green and purple accents, driven by CSS variables
- Inline SVG icon sprite that inherits text colour
- Scroll and entrance animations, with a `prefers-reduced-motion` fallback
- Internship illustration blended into the section background using CSS masking and `mix-blend-mode`

## Page Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Navbar | n/a | Logo, section links and "Apply for Internship" button |
| Hero | `#home` | Headline, intro and main call to action |
| About | `#about` | What TechBridge is and why it exists |
| Programs | `#programs` | Data Analytics and Web Development program cards |
| Internship | `#internship` | 30-Day Practical Internship details and apply button |
| Why TechBridge | n/a | Four-column overview of the program's focus |
| Contact / CTA | `#contact` | Apply and community-join calls to action |
| Footer | n/a | Navigation links and social/contact icons |

## Project Structure

```
techbridge/
├── index.html              # The whole page
├── README.md
├── style.css           # All styles, organised in numbered sections
└── assets/
    ├── icons/              # SVG icons (check, arrow, social, program tiles, etc.)
    └── images/             # Logo, hero/internship artwork, backgrounds, patterns
```

## Getting Started

No installation is needed.

1. Download or clone the repository.
2. Open `index.html` in any modern browser.


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

**Logo:** overwrite `assets/images/techbridge-logo.svg`, or change the `<img>` `src` in the header to your own file.

**About image:** replace `assets/images/workspace.jpg` and update the `<img>` in the About section.

**Internship image:** the artwork is `assets/images/bridge-internship.png`. The fade into the background is handled by the `.intern-visual` rules in the Internship section of the CSS. To change the fade, adjust the percentages in the `mask-image` gradients.

**Application link:** the "Apply" buttons point to the Google Form at `https://forms.gle/8EbdSy5ttGfLZfjv5`. Search `index.html` for that URL to change it.

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

**Breakpoints:** 1023px (tablet grids), 900px (hamburger menu, single column) and 600px (mobile).

## Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari. The internship image blend uses `mask-image`, `mask-composite` and `mix-blend-mode`, which these browsers support. In an older browser without them, the image still displays and shows its own dark background.

## Deployment

Because the site is fully static, it can be hosted anywhere that serves files, including GitHub Pages, Netlify, Vercel and Cloudflare Pages. Point the host at the project root with no build command.

## License

© Baselink Services Limited. All rights reserved.
