// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

/**
 * ─────────────────────────────────────────────────────────────
 *  GITHUB PAGES CONFIGURATION — EDIT THESE TWO VALUES
 * ─────────────────────────────────────────────────────────────
 *  This is configured for a PROJECT PAGE, i.e. the site lives at
 *      https://<GITHUB_USER>.github.io/<REPO_NAME>
 *
 *  1. GITHUB_USER  → your GitHub username (or org name)
 *  2. REPO_NAME    → the name of this repository
 *
 *  If you later move to a USER page (repo named <user>.github.io)
 *  or a custom domain, set `base: '/'` and update `site`.
 * ─────────────────────────────────────────────────────────────
 */
const GITHUB_USER = 'YOUR-GITHUB-USERNAME';
const REPO_NAME = 'youchoose-landing';

export default defineConfig({
  integrations: [
    // astro-icon inlines only the icons actually used, at build time —
    // no runtime JS, no icon-font request. Brand marks come from the
    // Simple Icons set (@iconify-json/simple-icons).
    icon({
      include: {
        'simple-icons': ['apple', 'googleplay', 'appstore'],
      },
    }),
  ],
  site: `https://${GITHUB_USER}.github.io`,
  base: `/${REPO_NAME}`,
  trailingSlash: 'ignore',
  build: {
    // Emit /index.html rather than /index/index.html — friendlier on Pages.
    format: 'file',
    assets: 'assets',
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
});
