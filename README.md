# Aniras Hub Website

A responsive, multi-page static website built with HTML, CSS, and vanilla JavaScript based on the five-page Aniras Hub design PDF.

## Pages

- `home.html` — Home
- `services.html` — Services
- `reviews.html` — Reviews and swipeable review cards
- `faqs.html` — FAQ accordion (only one answer can be open at a time)
- `about.html` — About the founder

Shared layout and behaviour live in `styles.css` and `script.js`. Image assets are in `assets/`.

## Publish on GitHub Pages

1. Download and unzip this project.
2. Create or open your GitHub repository.
3. Upload all files and folders in this project, keeping the same structure. `home.html` must be in the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The URL will usually be `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

## Where to change links

The primary links are easy to find near the top of `script.js`:

```js
const ENROLL_URL = 'https://forms.gle/1qeqk1FDT8qyGmPd8';
const REVIEW_URL = 'https://forms.gle/Ak16ZvCyWL39sR3o7';
const INSTAGRAM_URL = 'https://www.instagram.com/Aniras_Hub/';
const EMAIL = 'AnirasHub@gmail.com';
```

- Change `ENROLL_URL` to update the booking form across the shared navigation and footer. The same form URL is also directly used in page-specific buttons and FAQ links; search the project for `forms.gle/1qeqk1FDT8qyGmPd8` to change every occurrence.
- Change `REVIEW_URL` if the review form changes. The review button URLs are also in `reviews.html`; search for `forms.gle/Ak16ZvCyWL39sR3o7` to update all of them.
- Change `INSTAGRAM_URL` and `EMAIL` to update the shared footer links. Their page-specific links are in `faqs.html` and `about.html` too.
- Internal page navigation uses the relative paths `home.html`, `services.html`, `reviews.html`, `faqs.html`, and `about.html`. Keep the filenames as they are, or update every corresponding link if you rename them.

## Where to change images and logo

Current local assets:

- `assets/aniras-hub-logo.png` — logo used in the header, footer, and favicon
- `assets/students.jpg` — Home page hero image
- `assets/founder-sarina.png` — About Us founder portrait

To use your own image, upload it to `assets/` and update the matching `src` in the relevant HTML or in `script.js` for the shared logo. For example, in `script.js`, change:

```html
<img src="assets/aniras-hub-logo.png" alt="Aniras Hub logo">
```

You can use a hosted image URL instead, e.g. `https://example.com/my-photo.jpg`, but a local image in the repository is usually more reliable. If you use an external image, make sure you have permission to use it and that the host allows hotlinking.

## Design and functionality

- Responsive desktop/mobile navigation with active-page underline and hover/focus states
- Yellow enrolment buttons link to the Google Form
- Home page “How It Works” button scrolls to the relevant section
- Smooth teal fade over the Home page student photo
- Review cards respond to arrow clicks and touch swipes; cards loop rather than disappearing
- FAQ answers expand/collapse, with only one answer open at a time
- Email links use `mailto:` and Instagram links open the Aniras Hub profile
- Keyboard focus states and reduced-motion preference support

## Before launch

- Confirm the public form URLs and Instagram profile are correct.
- Check that you are comfortable publishing the founder portrait and academic achievements.
- The Reviews page includes one supplied testimonial from the design PDF and a clearly labelled invitation card—not a fabricated second testimonial. Replace it with a genuine review only after receiving permission.
- Check payment methods and policies in the FAQ before publishing, as these details should reflect your current practice.

## Run locally

You can open `home.html` directly in a browser. For a more realistic local server, use the VS Code Live Server extension or run Python from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
