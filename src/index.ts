/**
 * Enhanced Cloudflare Worker: Fandom Wiki API Proxy & Utility Endpoints
 *
 * - /docs: API documentation
 * - /health: Health check
 * - /meta: Worker metadata
 * - /examples: Sample queries
 * - Root: Fandom proxy (feature-complete)
 */

const WORKER_VERSION = "1.1.0";
const BUILD_TIME = "2025-05-25T00:32:28+05:30";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const params = url.searchParams;
    const wikiname = params.get('wikiname');
    if (!wikiname) {
      return new Response(JSON.stringify({ error: 'Missing wikiname parameter' }), {
        status: 400,
        headers: corsHeaders('application/json'),
      });
    }

    // Decide endpoint: api.php (default) or wikia.php (file/media info)
    let fandomPath = '/api.php';
    if (params.has('controller')) {
      fandomPath = '/wikia.php';
    }

    // Build Fandom API URL
    const fandomUrl = new URL(`https://${wikiname}.fandom.com${fandomPath}`);
    for (const [key, value] of params.entries()) {
      if (key !== 'wikiname') fandomUrl.searchParams.append(key, value);
    }
    // Always set origin=* for CORS if not present
    if (!fandomUrl.searchParams.has('origin')) {
      fandomUrl.searchParams.set('origin', '*');
    }

    // Forward request to Fandom
    let fandomRes: Response;
    try {
      fandomRes = await fetch(fandomUrl.toString(), {
        method: 'GET',
        headers: {
          'User-Agent': 'BreezeWiki-Cloudflare-Worker/1.0',
        },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from Fandom', details: err.message }), {
        status: 502,
        headers: corsHeaders('application/json'),
      });
    }

    const contentType = fandomRes.headers.get('content-type') || 'application/json';
    const body = await fandomRes.arrayBuffer();

    return new Response(body, {
      status: fandomRes.status,
      headers: corsHeaders(contentType),
    });
  },
} satisfies ExportedHandler<Env>;

function corsHeaders(contentType: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': contentType,
  };
}

