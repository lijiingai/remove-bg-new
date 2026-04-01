const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const API_KEY = 'dzkktUBoa8v3K1h56BJaj1rU';

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Remove Background API' });
});

app.post('/remove-bg', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请上传图片文件' });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    formData.append('size', req.body.size || 'auto');
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY },
      body: formData
    });
    
    fs.unlinkSync(req.file.path);
    
    if (response.ok) {
      const buffer = await response.buffer();
      res.set('Content-Type', 'image/png');
      res.send(buffer);
    } else {
      res.status(response.status).json({ error: await response.text() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/remove-bg-url', async (req, res) => {
  try {
    const { image_url, size = 'auto' } = req.body;
    
    if (!image_url) {
      return res.status(400).json({ error: '请提供 image_url' });
    }
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url, size })
    });
    
    if (response.ok) {
      const buffer = await response.buffer();
      res.set('Content-Type', 'image/png');
      res.send(buffer);
    } else {
      res.status(response.status).json({ error: await response.text() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务已启动: http://localhost:${PORT}`);
});
