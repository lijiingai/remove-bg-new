const { removeBgFromFile, removeBgFromUrl } = require('./remove-bg-service');

// 测试：从本地文件移除背景
async function testFile() {
  try {
    await removeBgFromFile('test.jpg', 'result.png');
  } catch (error) {
    console.error(error.message);
  }
}

// 测试：从 URL 移除背景
async function testUrl() {
  try {
    const url = 'https://example.com/image.jpg';
    await removeBgFromUrl(url, 'result-url.png');
  } catch (error) {
    console.error(error.message);
  }
}

// testFile();
// testUrl();
