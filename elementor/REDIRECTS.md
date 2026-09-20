# 301 Redirect Map — halo.bd (per Brief §28, §34)

Old URLs found on the live site during the Phase 1 audit (2026-09-20) and where they
should permanently redirect after the rebuild. Add to the host's redirect manager,
`.htaccess`, or the SEO plugin (Rank Math / Yoast both have redirect managers).

| Old URL | New URL |
|---|---|
| `/projects/` | `/work/` |
| `/print-shop/` | `/work/` |
| `/adam-barton/` | `/work/` |
| `/the-rainforest/` | `/work/` |
| `/montana/` | `/work/` |
| `/take-a-break/` | `/work/` |
| `/digly/` | `/work/` |
| `/its-all-about-being-functional-so-design-it-well/` | `/about/` |
| `/bringing-drawings-to-life-with-illustrations/` | `/about/` |
| `/design-and-create-with-no-limitations/` | `/about/` |
| `/category/uncategorized/` (and any other blog archives) | `/work/` |

**Kept as-is:** `/about/` (same slug, new content), `/` (new content).

## .htaccess reference copy

```apache
Redirect 301 /projects/ /work/
Redirect 301 /print-shop/ /work/
Redirect 301 /adam-barton/ /work/
Redirect 301 /the-rainforest/ /work/
Redirect 301 /montana/ /work/
Redirect 301 /take-a-break/ /work/
Redirect 301 /digly/ /work/
Redirect 301 /its-all-about-being-functional-so-design-it-well/ /about/
Redirect 301 /bringing-drawings-to-life-with-illustrations/ /about/
Redirect 301 /design-and-create-with-no-limitations/ /about/
```

QA: after go-live, `curl -I` every old URL → expect `301` + `Location`, then 200.
(Verify on the server — sandbox curl is network-restricted.)
