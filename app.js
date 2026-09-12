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
            <title>اختبار توقعات الزواج - اكتشف مستقبلك</title>
            
            <meta property="og:title" content="اختبار توقعات الزواج - اكتشف متى ستتزوج؟">
            <meta property="og:description" content="أجب عن الأسئلة واكتشف متى وكيف ستتزوج وما هي صفات شريك حياتك القادم! جربها الآن وتحدى أصدقاءك.">
            <meta property="og:image" content="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200">
            <meta property="og:url" content="https://express-hello-world-hfcr.onrender.com">
            <meta property="og:type" content="website">

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
    const shareText = `نتيجة اختبار الزواج الخاصة بي: "${randomResult.title}" - جرب الاختبار أنت أيضاً عبر الرابط: https://express-hello-world-hfcr.onrender.com`;
    const encodedShareText = encodeURIComponent(shareText);
    const shareUrl = encodeURIComponent("https://express-hello-world-hfcr.onrender.com");

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الزواج</title>
            
            <meta property="og:title" content="نتيجة اختبار الزواج: ${randomResult.title}">
            <meta property="og:description" content="لقد أجريت الاختبار وهذه هي نتيجتي! انقر هنا لتكتشف نتيجتك أنت أيضاً.">
            <meta property="og:image" content="${randomResult.image}">
            <meta property="og:url" content="https://express-hello-world-hfcr.onrender.com">
            <meta property="og:type" content="website">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 20px; margin: 0; }
                .card { background: white; max-width: 500px; margin: auto; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                img { max-width: 100%; border-radius: 10px; margin-top: 10px; }
                
                .retry-btn { display: block; width: 100%; background: #ff4757; color: white; text-decoration: none; padding: 12px; font-size: 16px; border-radius: 8px; margin-top: 15px; font-weight: bold; box-sizing: border-box; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .retry-btn:hover { background: #ff6b81; }

                .copy-btn { display: block; width: 100%; background: #2ed573; color: white; border: none; padding: 10px; font-size: 15px; border-radius: 8px; margin-top: 10px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .copy-btn:hover { background: #26af5f; }

                .share-title { font-size: 14px; margin: 15px 0 10px 0; color: #555; font-weight: bold; border-top: 1px solid #eee; padding-top: 15px; }
                
                .social-icons { display: flex; justify-content: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
                .social-icon { display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; color: white; text-decoration: none; font-size: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); transition: transform 0.2s; }
                .social-icon:hover { transform: scale(1.1); }
                
                .whatsapp { background: #25D366; }
                .facebook { background: #1877F2; }
                .twitter { background: #000000; }
                .instagram { background: #E1306C; }
                .tiktok { background: #fe2c55; }
                
                .toast { display: none; background: #333; color: #fff; padding: 8px 15px; border-radius: 5px; font-size: 13px; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3 style="margin-top:0; color: #333;">🎉 النتيجة الخاصة بك:</h3>
                <p style="font-size: 17px; font-weight: bold; color: #222;" id="result-text">${randomResult.title}</p>
                <img src="${randomResult.image}" alt="نتيجة الزواج">
                
                <button class="copy-btn" onclick="copyResult()"><i class="fa-solid fa-copy"></i> نسخ النتيجة لمشاركتها</button>
                <div id="toast" class="toast">تم نسخ النتيجة والرابط بنجاح! الصقها في فيسبوك</div>
                
                <a class="retry-btn" href="/">🔄 إعادة الاختبار من جديد</a>
                
                <div class="share-title">شارك نتيجتك مع أصدقائك عبر:</div>
                
                <div class="social-icons">
                    <a class="social-icon whatsapp" href="https://api.whatsapp.com/send?text=${encodedShareText}" target="_blank" title="واتساب"><i class="fab fa-whatsapp"></i></a>
                    <a class="social-icon facebook" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" title="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                    <a class="social-icon twitter" href="https://twitter.com/intent/tweet?text=${encodedShareText}" target="_blank" title="إكس"><i class="fab fa-x-twitter"></i></a>
                    <a class="social-icon instagram" href="https://www.instagram.com/" target="_blank" title="إنستجرام"><i class="fab fa-instagram"></i></a>
                    <a class="social-icon tiktok" href="https://www.tiktok.com/" target="_blank" title="تيك توك"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>

            <script>
                function copyResult() {
                    const textToCopy = "نتيجة اختبار الزواج: " + document.getElementById("result-text").innerText + " \\nجرب الاختبار أنت أيضاً: https://express-hello-world-hfcr.onrender.com";
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const toast = document.getElementById("toast");
                        toast.style.display = "block";
                        setTimeout(() => { toast.style.display = "none"; }, 3000);
                    });
                }
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
