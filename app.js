const express = require('express');
const app = express();

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send('Marriage Quiz Dynamic Image Server is Running!');
});

// مسار مشاركة فيسبوك (Open Graph Meta Tags)
app.get('/share', (req, res) => {
    const name = req.query.name || 'متابع';
    const result = req.query.result || 'نتيجة الاختبار';
    const bloggerUrl = req.query.redirect || 'https://your-blogger-site.blogspot.com';

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.get('host');
    const imageUrl = `${protocol}://${host}/generate-image?name=${encodeURIComponent(name)}&result=${encodeURIComponent(result)}`;

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta property="og:title" content="اختبار نسبة الزواج - نتيجة ${name}" />
            <meta property="og:description" content="نتيجة الاختبار: ${result}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:type" content="website" />
        </head>
        <body>
            <script>
                window.location.href = "${bloggerUrl}";
            </script>
        </body>
        </html>
    `);
});

// مسار إنتاج الصورة الديناميكية (SVG)
app.get('/generate-image', (req, res) => {
    const name = req.query.name || '';
    const result = req.query.result || '';

    const svgImage = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1e293b"/>
        <circle cx="600" cy="315" r="280" fill="#0f172a" opacity="0.5"/>
        <text x="50%" y="30%" dominant-baseline="middle" text-anchor="middle" fill="#f59e0b" font-size="50" font-family="sans-serif" font-weight="bold">اختبار نسبة الزواج 💍</text>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="60" font-family="sans-serif" font-weight="bold">${name}</text>
        <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" fill="#38bdf8" font-size="45" font-family="sans-serif">${result}</text>
    </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgImage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
