const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>اختبار توقعات الزواج</title>
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 30px; margin: 0; }
                .card { background: white; max-width: 500px; margin: auto; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                button { background: #ff4757; color: white; border: none; padding: 12px 25px; font-size: 16px; border-radius: 8px; cursor: pointer; margin-top: 20px; width: 100%; font-weight: bold; }
                button:hover { background: #ff6b81; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>💍 اختبار توقعات الزواج</h2>
                <p>أجب عن الأسئلة واكتشف متى وكيف ستتزوج!</p>
                <form action="/result" method="POST">
                    <button type="submit">ابدأ الاختبار الآن</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/result', (req, res) => {
    const results = [
        { title: "ستتزوج خلال عامين من شخص يحب السفر والمغامرات! ✈️", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200" },
        { title: "شريك حياتك القادم سيكون شخصاً هادئاً ويفهمك من نظرة! ☕", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200" },
        { title: "الزواج قادم في طريقك قريباً جداً وستقيم حفل زفاف أسطوري! 🌟", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200" }
    ];
    
    const randomResult = results[Math.floor(Math.random() * results.length)];
    const shareText = encodeURIComponent(`اختبار توقعات الزواج الخاص بي: "${randomResult.title}" - جرب الاختبار أنت أيضاً!`);
    const shareUrl = encodeURIComponent("https://express-hello-world-hfcr.onrender.com");

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الزواج</title>
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 20px; margin: 0; }
                .card { background: white; max-width: 500px; margin: auto; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                img { max-width: 100%; border-radius: 10px; margin-top: 10px; }
                .btn { display: block; text-decoration: none; padding: 12px; font-size: 15px; border-radius: 8px; margin-top: 10px; color: white; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .retry { background: #ff4757; font-size: 16px; margin-top: 15px; }
                .retry:hover { background: #ff6b81; }
                .whatsapp { background: #25D366; }
                .facebook { background: #1877F2; }
                .twitter { background: #000000; }
                .instagram { background: #E1306C; }
                .tiktok { background: #fe2c55; }
                .share-title { font-size: 14px; margin: 20px 0 10px 0; color: #555; font-weight: bold; border-top: 1px solid #eee; padding-top: 15px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3 style="margin-top:0; color: #333;">🎉 النتيجة الخاصة بك:</h3>
                <p style="font-size: 17px; font-weight: bold; color: #222;">${randomResult.title}</p>
                <img src="${randomResult.image}" alt="نتيجة الزواج">
                
                <!-- زر إعادة الاختبار في البداية وبارز -->
                <a class="btn retry" href="/">🔄 إعادة الاختبار من جديد</a>
                
                <div class="share-title">شارك نتيجتك مع أصدقائك وتحدى الجميع:</div>
                
                <a class="btn whatsapp" href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank">💬 مشاركة على واتساب</a>
                <a class="btn facebook" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank">📘 مشاركة على فيسبوك</a>
                <a class="btn twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank">🅧 مشاركة على إكس (تويتر)</a>
                <a class="btn instagram" href="https://www.instagram.com/" target="_blank">📸 مشاركة على إنستجرام</a>
                <a class="btn tiktok" href="https://www.tiktok.com/" target="_blank">🎵 مشاركة على تيك توك</a>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
