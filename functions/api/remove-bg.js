export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return new Response(JSON.stringify({ error: '请上传图片文件' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const apiKey = env.REMOVEBG_API_KEY || 'dzkktUBoa8v3K1h56BJaj1rU';
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key 未配置' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const removeBgForm = new FormData();
    removeBgForm.append('image_file', image);
    removeBgForm.append('size', 'auto');
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey
      },
      body: removeBgForm
    });
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
