# fandom-wiki-cloudflare-worker

A Cloudflare Worker that acts as a feature-complete proxy and utility service for the Fandom MediaWiki API. This project enables secure, fast, and CORS-friendly access to Fandom wikis, with additional endpoints for health checks, metadata, and documentation.

## Features

- **Fandom API Proxy:** Forwards requests to any Fandom wiki, supporting all standard MediaWiki API actions.
- **Utility Endpoints:** Includes health check, metadata, example queries, and self-documentation endpoints.
- **CORS Support:** All endpoints are CORS-enabled for browser use.
- **Error Handling:** Consistent JSON error responses.
- **Cloudflare Worker:** Fast, globally distributed, and serverless.

## Endpoints

### 1. `/` (Root) — Fandom API Proxy

Proxies requests to the Fandom API for any supported action. Pass query parameters as you would to the Fandom API.

**Required parameter:**
- `wikiname`: The subdomain for the wiki (e.g., `pokemon`, `zelda`, etc.)

**Other parameters:**
- Any valid Fandom API parameters, such as `action`, `page`, `format`, `controller`, etc.

**Examples:**
- Fetch a wiki page:
  ```
  GET /?wikiname=pokemon&action=parse&page=Pikachu&format=json
  ```
- Search the wiki:
  ```
  GET /?wikiname=pokemon&action=query&list=search&srsearch=Eevee&format=json
  ```
- Fetch category members:
  ```
  GET /?wikiname=pokemon&action=query&list=categorymembers&cmtitle=Category:Electric-type_Pokémon&format=json
  ```
- Get site info:
  ```
  GET /?wikiname=pokemon&action=query&meta=siteinfo&format=json
  ```
- Search suggestions:
  ```
  GET /?wikiname=pokemon&action=opensearch&search=Eevee&format=json
  ```
- File/media info:
  ```
  GET /?wikiname=pokemon&controller=Lightbox&method=getMediaDetail&fileTitle=Pikachu.png&format=json
  ```

### 2. `/health`

Returns a simple health check.

**Response:**
```json
{"status": "ok"}
```

### 3. `/meta`

Returns metadata about the deployed worker (version, build time, environment keys).

**Response:**
```json
{
  "version": "1.1.0",
  "build": "2025-05-25T00:32:28+05:30",
  "environment": ["...keys..."]
}
```

### 4. `/examples`

Returns a JSON array of example API queries for common Fandom actions.

### 5. `/docs`

Returns the API documentation in Markdown format.

---

## CORS

All endpoints support CORS for browser use.

## Error Handling

All errors are returned as JSON objects with an `error` field and details if available.

## OPTIONS Support

CORS preflight requests are supported.

---

## Development

### Requirements

- Node.js (18+ recommended)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Scripts

- `npm run dev` — Start local development server
- `npm run deploy` — Deploy to Cloudflare Workers
- `npm run test` — Run tests with Vitest

### Project Structure

- `src/index.ts` — Main Worker code
- `API.md` — API documentation (also served at `/docs`)
- `test/` — Vitest-based tests
- `wrangler.jsonc` — Cloudflare Worker configuration

### TypeScript

Strict type-checking is enabled. Type definitions for Cloudflare Workers are included.

---

## Contact & Source

For issues and contributions, see the main [BreezeWiki repository](https://github.com/breezewiki/breezewiki).

---

## License

See the repository for license details.
