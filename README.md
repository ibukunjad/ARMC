# ARMC — Static website

A seven-page, responsive website for Academic Residences Management Company. Built from the supplied ARMC developer brief using plain HTML, CSS and JavaScript. No installation, build step, database or paid plugin is required.

## Publish on GitHub Pages

1. Extract this ZIP. Create a GitHub repository (a public repository works with GitHub Free).
2. Upload the **contents** of the extracted folder to the repository. `index.html` and `assets/` must be at the repository root, not inside another folder. Keep `.nojekyll` if your upload method supports hidden files.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
5. Wait for GitHub’s deployment to complete and open the URL shown in Pages settings. For a project repository, it is normally `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

All links and local assets use relative paths, so this works with both a project URL and a custom domain. Do not upload the ZIP itself as the website. You can also open `index.html` locally to inspect the site; use GitHub Pages for normal clipboard support.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Before public launch

- Add a verified ARMC email address and/or WhatsApp number in `assets/config.js`. The current values are intentionally blank. Email and WhatsApp links appear automatically when valid values are configured. Test an inquiry on the deployed site.
- Verify the business claims, approved rates, management terms and company registration details. The supplied brief refers to CAC registration and a FUTA relationship but includes no registration number or evidence of affiliation. No CAC verification badge, institution endorsement, managed-property count or customer testimonial has been invented.
- The term **tri-annual review** in the brief is ambiguous (three times a year vs. every three years). The website says plans are subject to review under agreed terms. Confirm the intended interval and edit `services.html` before committing to one.
- The 2–3 year early-adopter offer is conditional on written eligibility, duration and terms, rather than a guaranteed public offer.
- Obtain and publish the complete approved owner and tenant agreements when available. `agreements.html` contains summaries of the supplied brief, not a replacement legal contract. In particular, review the key-acceptance clause before using it operationally.
- Replace illustrative photographs with permission-cleared property images when real inventory is available. Keep the illustrative labels until then. There are no fabricated listings, prices, availability claims or bookings.
- Confirm the company’s actual privacy and retention practices and update `agreements.html` if you add analytics, hosted forms, payments or other services.

## Add contact details

Edit `assets/config.js`, keeping the quote marks:

```js
window.ARMC_CONFIG = {
  email: '',                 // insert your real business email
  whatsapp: '',              // international digits, e.g. country code then number
  phone: '',                 // optional display number
  address: '',               // optional business address
  registrationNumber: ''     // reserved; does not create an unverified trust badge
};
```

For a Nigerian WhatsApp number, use country code `234` and remove the initial local `0`; do not include `+`, spaces or punctuation. Use only a number controlled by ARMC. These are public settings: never put passwords or API keys here.

## What the inquiry forms do

Landlords, prospective tenants and residents each have a separate form mode. Links from pricing plans preselect the correct plan. Required fields are validated. A valid form prepares a reviewable message in the browser. It is **not submitted to a server**.

- When contacts are configured, the visitor can open a prefilled email or WhatsApp message and must send it in that app.
- Without contacts, the visitor can only copy the inquiry. The site explicitly states that no message was sent.
- The form does not collect payments, reserve rooms, send automatic confirmations or store entries in browser storage.
- If clipboard access is unavailable, the text is selected with instructions to copy manually.

This is Phase 1. A hosted submission endpoint would be needed for direct form delivery. Landlord dashboards, tenant registries, digital receipts and maintenance ticket storage belong to the later phases in the brief.

## Editing guide

| File | What to edit |
| --- | --- |
| `index.html` | Home page, main message and calls to action |
| `about.html` | Mission, operating model and standards |
| `services.html` | Fees, plan inclusions and pricing questions |
| `landlords.html` | Owner benefits and onboarding |
| `tenants.html` | Room inquiries and tenant guidance |
| `agreements.html` | Agreement summaries and website privacy |
| `contact.html` | Inquiry fields and contact-page copy |
| `assets/site.css` | Colours, typography, responsive layout |
| `assets/site.js` | Navigation and inquiry behaviour |
| `assets/config.js` | Verified business contact details |
| `assets/armc-logo.png` | Official company logo (original artwork) |
| `assets/home.webp` | Home hero photograph |
| `assets/student-room.webp` | Student room photograph |

The shared header and footer are present in each HTML file so page content remains available without JavaScript. If you change navigation, update it on all seven pages. The mobile navigation and inquiry preparation require JavaScript. Fonts load from Google Fonts with system-font fallbacks. Photographs are bundled locally.

## Design sources and image credits

The design is original, informed by Blueground’s spacious housing presentation and the audience journeys of Airbnb, Vrbo, Plum Guide and Houfy. No brand logos, listing databases or proprietary copy were reproduced.

- https://www.theblueground.com/
- https://www.airbnb.com/
- https://www.vrbo.com/
- https://www.plumguide.com/
- https://www.houfy.com/

Photographs are illustrative, not actual ARMC properties:

- `assets/home.webp`: Belinda Rubio, Pexels — https://www.pexels.com/photo/bright-modern-living-room-with-cozy-decor-34733618/
- `assets/student-room.webp`: Alexander F Ungerer, Pexels — https://www.pexels.com/photo/room-with-a-bed-and-a-desk-in-an-apartment-20725943/
- Reuse terms: https://www.pexels.com/license/

The official ARMC logo supplied by the company is included unchanged as `assets/armc-logo.png`. It appears in the header and footer on all seven pages and is also used as the favicon. CSS frames the logo to reduce the original image’s white margins without modifying its artwork. The footer uses a white backing to preserve the navy and black details.
