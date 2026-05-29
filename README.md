# Anchorage Makerspace (AMS) Website

**Collaboration of William M. Lucid and Claude (Anthropic AI).**  
Redesign of Anchorage Makerspace's website — a static HTML/CSS/JS site for a community maker space.

---

## Repository Structure

```
AMS-Website/
├── AMS-Related Files/      # Reference documents and materials for the organization
├── HTML Simpleserver/      # Local development server for testing the site
├── Website --unzip files/  # Zipped archive(s) of all website files for hosting upload
├── assets/                 # Images, icons, and other static assets
├── index.html              # Home page
├── about.html              # About the makerspace
├── blog.html               # Blog / news
├── contact-member.html     # Member contact form
├── contact-sponsor.html    # Sponsor contact form
├── events.html             # Upcoming events
├── expertise.html          # Member skills and expertise
├── livestream.html         # Live stream page
├── membership.html         # Membership information
├── mission.html            # Mission statement
├── shop.html               # Shop / store
├── sponsors.html           # Sponsors listing
└── visit.html              # Visit / directions
```

---

## Deploying to a Web Hosting Service

The `Website --unzip files/` folder contains a ZIP archive with all the website files ready for upload. Follow the steps below to get the site live on any standard shared hosting provider (e.g., Bluehost, HostGator, SiteGround, GoDaddy, DreamHost, etc.).

### Step 1 — Download the ZIP

1. In this GitHub repository, navigate to the **`Website --unzip files/`** folder.
2. Click on the ZIP file, then click **Download** (or "Raw") to save it to your computer.

### Step 2 — Log In to Your Hosting Control Panel

1. Log in to your web hosting account.
2. Open **cPanel** (or your host's equivalent file manager dashboard).

### Step 3 — Upload and Extract the ZIP

1. In cPanel, open **File Manager**.
2. Navigate to your site's web root directory. This is usually called:
   - `public_html/` — for the primary domain
   - `public_html/yoursubfolder/` — if deploying to a subdirectory
3. Click **Upload** and select the ZIP file you downloaded in Step 1.
4. Once uploaded, select the ZIP file in File Manager, then click **Extract**.
5. Make sure the files extract **directly into** `public_html/` (not into a nested subfolder inside it), so that `index.html` is at the top level:
   ```
   public_html/
   ├── index.html
   ├── about.html
   ├── assets/
   └── ... (all other files)
   ```

> **Tip:** If the ZIP extracts into a subfolder (e.g., `public_html/Website --unzip files/`), move all the contents up one level so `index.html` is directly inside `public_html/`.

### Step 4 — Verify the Upload

1. Open a browser and navigate to your domain (e.g., `https://anchoragemakerspace.org`).
2. The home page (`index.html`) should load automatically.
3. Click through the navigation links to confirm all pages load correctly:
   - About, Blog, Events, Membership, Mission, Shop, Sponsors, Visit, Expertise, Livestream, and both Contact pages.

### Step 5 — Check the Assets Folder

Make sure the `assets/` folder was included in the extraction and is sitting at the same level as `index.html`. This folder contains images and other resources the pages depend on. If images appear broken, the `assets/` folder may be missing or in the wrong location.

---

## Local Testing (Before Uploading)

If you want to preview the site on your own computer before deploying, use the included **HTML Simple Server**:

1. Navigate to the `HTML Simpleserver/` folder in this repository.
2. Follow the instructions there to run a local web server.
3. Open your browser to `http://localhost:PORT` (the port will be shown when the server starts).
4. Browse the site locally to test all pages and links.

---

## Notes

- This is a **static website** — no database or server-side language (PHP, Python, etc.) is required. Any standard shared hosting plan will work.
- The site is built with **HTML, CSS, and JavaScript** only (89.7% HTML, 6.5% JS, 3.8% CSS per GitHub's analysis).
- All internal links between pages are relative, so the site will work whether hosted at the root domain or in a subdirectory — as long as all files remain in the same folder together.
- Contact forms (`contact-member.html`, `contact-sponsor.html`) use **Google Forms** linked to a Google account — no hosting-side mail configuration, PHP, or SMTP setup is required. See the section below for details.

---

## Contact Forms — Google Forms Setup

The **Membership inquiry** (`contact-member.html`) and **Sponsor inquiry** (`contact-sponsor.html`) pages use Google Forms connected to a Google account. This is an excellent choice for a static website — Google handles all form submission, storage, and email notification with no server-side configuration needed on the hosting side.

### How It Works

Each contact page embeds a Google Form using one of two methods:

- **Embedded iframe** — the form appears inline on the page; visitors fill it out without leaving the site.
- **Link/button** — a button redirects visitors to the form on Google's domain.

All responses are collected in Google Sheets and can trigger email notifications to the account owner.

### Required Google Form Settings

Before going live, verify these settings in each Google Form (open the form in Google Drive → click the **Settings** gear icon):

1. **Responses tab → "Limit to 1 response"** — make sure this is **OFF**. If it is on, visitors must be signed in to a Google account to submit, which will block most people.
2. **General tab → "Collect email addresses"** — set according to your preference. If turned on, respondents will be prompted for their email, which is useful for follow-up.
3. **Sharing** — the form's share link must be set to **"Anyone with the link can respond"** (not restricted to your organization or specific people).

### Enabling Email Notifications for New Responses

So submissions land in your inbox:

1. Open the Google Form.
2. Click the **Responses** tab at the top.
3. Click the three-dot menu (⋮) in the upper right of the Responses panel.
4. Select **"Get email notifications for new responses"**.

Repeat this for both the membership form and the sponsor form.

### If You Need to Update the Embedded Form

If the Google Form URL ever changes (e.g., you recreate the form):

1. Open the Google Form and click **Send** (the paper-plane icon).
2. Click the **`< >`** (embed) tab and copy the new `<iframe>` code.
3. Open `contact-member.html` or `contact-sponsor.html` in a text editor.
4. Find the existing `<iframe>` tag and replace it with the new embed code.
5. Re-upload the updated HTML file to `public_html/` on your hosting server.

---

## Credits

Built by **William M. Lucid** and **Claude (Anthropic AI)** as a redesign of the Anchorage Makerspace's web presence.
