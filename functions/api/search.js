export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const q = searchParams.get('q');
  
  // Ambil API Key dari Environment Variable di Cloudflare
  const apiKey = context.env.VITE_SERPAPI_KEY; 

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key missing on server' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!q) {
    return new Response(JSON.stringify({ error: 'Query parameter missing' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Request ke SerpApi dari sisi Server (Aman dari CORS)
  const serpUrl = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(q)}&type=search&hl=id&api_key=${apiKey}`;

  try {
    const response = await fetch(serpUrl);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        // Ijinkan akses dari frontend kita sendiri
        'Access-Control-Allow-Origin': '*', 
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}