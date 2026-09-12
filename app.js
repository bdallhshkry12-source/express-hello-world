const express = require('express');
const path = require('path');
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
            <meta property="og:title" content="اختبار توقعات الزواج - اكتشف مستقبلك العاطفي!">
            <meta property="og:description" content="أجب عن الأسئلة واكتشف متى وكيف ستتزوج!">
            <meta property="og:image" content="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 50px; }
                .card { background: white; max-width: 500px; margin: auto; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                button { background: #ff4757; color: white; border: none; padding: 12px 25px; font-size: 16px; border-radius: 8px; cursor: pointer; margin-top: 20px; }
                button:hover { background: #ff6b81; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>💍 اختبار توقعات الزواج</h1>
                <p>اضغط أدناه لاكتشاف متى ستتزوج وما هي صفات شريك حياتك المستقبلية!</p>
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

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الزواج</title>
            <meta property="og:title" content="نتيجة اختبار الزواج الخاصة بي: ${randomResult.title}">
            <meta property="og:description" content="اكتشف توقعات زواجك أنت أيضاً عبر هذا الاختبار الممتع!">
            <meta property="og:image" content="${randomResult.image}">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 50px; }
                .card { background: white; max-width: 500px; margin: auto; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                img { max-width: 100%; border-radius: 10px; margin-top: 15px; }
                a { display: inline-block; background: #2ed573; color: white; text-decoration: none; padding: 12px 25px; font-size: 16px; border-radius: 8px; margin-top: 20px; }
                a:hover { background: #26af5f; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>🎉 النتيجة الخاصة بك:</h2>
                <p style="font-size: 18px; font-weight: bold; color: #333;">${randomResult.title}</p>
                <img src="${randomResult.image}" alt="نتيجة الزواج">
                <br>
                <a href="/">إعادة الاختبار</a>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
