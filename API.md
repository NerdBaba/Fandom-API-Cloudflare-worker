# Fandom Wiki Cloudflare Worker API Documentation

This API is a feature-complete proxy and utility service for the Fandom MediaWiki API, deployed as a Cloudflare Worker.

## Endpoints

### 1. `/` (Root) — Fandom API Proxy
Proxies requests to the Fandom API for any supported action. Pass query parameters as you would to the Fandom API.

**Required parameter:**
- `wikiname`: The subdomain for the wiki (e.g., `pokemon`, `zelda`, etc.)

**Other parameters:**
- Any valid Fandom API parameters, e.g. `action`, `page`, `format`, `controller`, etc.

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
```json
{"status": "ok"}
```

### 3. `/meta`
Returns metadata about the deployed worker (version, build time, environment keys).
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
Returns this documentation in Markdown format.

---

## CORS
All endpoints support CORS for browser use.

## Error Handling
All errors are returned as JSON objects with an `error` field and details if available.

## OPTIONS Support
CORS preflight requests are supported.

---

## Contact & Source
For issues, see the main BreezeWiki repository.
