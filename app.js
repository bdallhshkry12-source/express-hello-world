const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// قائمة تضم تصميمات ونتائج بستايل فني وراقي يلامس القلوب
const resultsData = [
    { 
        id: "1", 
        quote: "جاور جميل الروح تُصيبك عَدوى جماله", 
        desc: "ستتزوج قريباً من شخص هادئ وطيب القلب، يملأ حياتك بالسكينة والأمان ويجعل أبسط تفاصيل يومك جنة.",
        imageBg: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80"
    },
    { 
        id: "2", 
        quote: "رَافِق البشوش الرضي، السمح الهين", 
        desc: "شريك حياتك القادم سيكون طاقة إيجابية لا تنضب، يبتسم للدنيا فيبتسم لك الحظ وينير دربك.",
        imageBg: "https://images.unsplash.com/photo-1522748364024-f44e82a5fef9?w=1200&auto=format&fit=crop&q=80"
    },
    { 
        id: "3", 
        quote: "اللِّين الذي يجعلك تشعر بقيمة أبسط النعم", 
        desc: "سترزق بزواج مبارك يجمعكما على الحب والرفق، وتكتشفان معاً أن السعادة تكمن في تفاصيل الحياة الصغيرة.",
        imageBg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&auto=format&fit=crop&q=80"
    },
    { 
        id: "4", 
        quote: "تأتي السعادة على هيئة شخص يشاركك تفاصيل روحك", 
        desc: "قصة حبك القادمة ستكون هادئة ودافئة، تشبه الروايات الرومانسية الجميلة وتنتهي ببيت عامر بالمودة.",
        imageBg: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&auto=format&fit=crop&q=80"
    }
];

app.get('/', (req, res) => {
    const resultId = req.query.id;
    let currentResult = resultsData.find(r => r.id === resultId);

    if (!currentResult) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>اختبار الروح والقلوب - اكتشف رسالة اليوم</title>
                <meta property="og:title" content="اختبار الروح والقلوب - اكتشف رسالتك">
                <meta property="og:description" content="اختبر وتعرف على رسالة الروح وشريك حياتك القادم بستايل فني دافئ.">
                <meta property="og:image" content="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200">
                <meta property="og:url" content="https://express-hello-world-hfcr.onrender.com">
                <meta property="og:type" content="website">
                <style>
                    body { font-family: Tahoma, sans-serif; background: #fbf9f4; text-align: center; padding: 30px; margin: 0; }
                    .card { background: #fffdf9; max-width: 500px; margin: auto; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0eae1; }
                    button { background: #d4a373; color: white; border: none; padding: 14px 25px; font-size: 16px; border-radius: 12px; cursor: pointer; margin-top: 20px; width: 100%; font-weight: bold; transition: background 0.3s; }
                    button:hover { background: #bc6c25; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2 style="color: #6b4423; font-family: 'Amiri', serif;">🌿 اختبار جميل الروح</h2>
                    <p style="color: #8c7355; line-height: 1.6;">اكتشف رسالة روحك وشريك حياتك القادم بتصميم فني راقي...</p>
                    <form action="/result" method="POST">
                        <button type="submit">اكتشف النتيجة الآن</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    }

    const shareUrl = `https://express-hello-world-hfcr.onrender.com/?id=${currentResult.id}`;
    const shareText = encodeURIComponent(`رسالتي اليوم: "${currentResult.quote}" - جرب الاختبار أنت أيضاً!`);

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الروح</title>
            <meta property="og:title" content="${currentResult.quote}">
            <meta property="og:description" content="${currentResult.desc}">
            <meta property="og:image" content="${currentResult.imageBg}">
            <meta property="og:url" content="${shareUrl}">
            <meta property="og:type" content="website">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fbf9f4; text-align: center; padding: 20px; margin: 0; }
                .card { background: #fffdf9; max-width: 500px; margin: auto; padding: 25px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0eae1; }
                
                .art-box { background: #fefcf7; border: 2px dashed #e6dbc9; padding: 25px 15px; border-radius: 15px; margin-top: 15px; position: relative; }
                .quote-text { font-size: 20px; font-weight: bold; color: #5c4033; margin-bottom: 15px; line-height: 1.6; font-family: 'Amiri', Georgia, serif; }
                .desc-text { font-size: 15px; color: #7f6350; line-height: 1.7; }
                
                .retry-btn { display: block; width: 100%; background: #d4a373; color: white; text-decoration: none; padding: 14px; font-size: 16px; border-radius: 12px; margin-top: 20px; font-weight: bold; box-sizing: border-box; transition: background 0.3s; }
                .retry-btn:hover { background: #bc6c25; }

                .share-title { font-size: 14px; margin: 25px 0 10px 0; color: #8c7355; font-weight: bold; border-top: 1px solid #f0eae1; padding-top: 15px; }
                
                .social-icons { display: flex; justify-content: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
                .social-icon { display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; color: white; text-decoration: none; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }
                .social-icon:hover { transform: scale(1.1); }
                
                .whatsapp { background: #25D366; }
                .facebook { background: #1877F2; }
                .twitter { background: #000000; }
                .instagram { background: #E1306C; }
                .tiktok { background: #fe2c55; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3 style="margin-top:0; color: #6b4423; font-size: 18px;">✨ رسالة روحك اليوم</h3>
                
                <div class="art-box">
                    <div class="quote-text">"${currentResult.quote}"</div>
                    <div class="desc-text">${currentResult.desc}</div>
                    <div style="margin-top: 15px; font-size: 20px; color: #e07a5f;">🌿 🤍 🌿</div>
                </div>
                
                <a class="retry-btn" href="/">🔄 اختبار رسالة أخرى</a>
                
                <div class="share-title">شارك رسالتك الفنية مع أصدقائك:</div>
                
                <div class="social-icons">
                    <a class="social-icon whatsapp" href="https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}" target="_blank" title="واتساب"><i class="fab fa-whatsapp"></i></a>
                    <a class="social-icon facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" title="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                    <a class="social-icon twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}" target="_blank" title="إكس"><i class="fab fa-x-twitter"></i></a>
                    <a class="social-icon instagram" href="https://www.instagram.com/" target="_blank" title="إنستجرام"><i class="fab fa-instagram"></i></a>
                    <a class="social-icon tiktok" href="https://www.tiktok.com/" target="_blank" title="تيك توك"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/result', (req, res) => {
    const randomResult = resultsData[Math.floor(Math.random() * resultsData.length)];
    const specificUrl = `https://express-hello-world-hfcr.onrender.com/?id=${randomResult.id}`;
    const shareText = encodeURIComponent(`رسالتي اليوم: "${randomResult.quote}" - جرب الاختبار أنت أيضاً!`);

    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الروح</title>
            <meta property="og:title" content="${randomResult.quote}">
            <meta property="og:description" content="${randomResult.desc}">
            <meta property="og:image" content="${randomResult.imageBg}">
            <meta property="og:url" content="${specificUrl}">
            <meta property="og:type" content="website">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fbf9f4; text-align: center; padding: 20px; margin: 0; }
                .card { background: #fffdf9; max-width: 500px; margin: auto; padding: 25px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0eae1; }
                
                .art-box { background: #fefcf7; border: 2px dashed #e6dbc9; padding: 25px 15px; border-radius: 15px; margin-top: 15px; position: relative; }
                .quote-text { font-size: 20px; font-weight: bold; color: #5c4033; margin-bottom: 15px; line-height: 1.6; font-family: 'Amiri', Georgia, serif; }
                .desc-text { font-size: 15px; color: #7f6350; line-height: 1.7; }
                
                .retry-btn { display: block; width: 100%; background: #d4a373; color: white; text-decoration: none; padding: 14px; font-size: 16px; border-radius: 12px; margin-top: 20px; font-weight: bold; box-sizing: border-box; transition: background 0.3s; }
                .retry-btn:hover { background: #bc6c25; }

                .share-title { font-size: 14px; margin: 25px 0 10px 0; color: #8c7355; font-weight: bold; border-top: 1px solid #f0eae1; padding-top: 15px; }
                
                .social-icons { display: flex; justify-content: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
                .social-icon { display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; color: white; text-decoration: none; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }
                .social-icon:hover { transform: scale(1.1); }
                
                .whatsapp { background: #25D366; }
                .facebook { background: #1877F2; }
                .twitter { background: #000000; }
                .instagram { background: #E1306C; }
                .tiktok { background: #fe2c55; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3 style="margin-top:0; color: #6b4423; font-size: 18px;">✨ رسالة روحك اليوم</h3>
                
                <div class="art-box">
                    <div class="quote-text">"${randomResult.quote}"</div>
                    <div class="desc-text">${randomResult.desc}`,
                    <div style="margin-top: 15px; font-size: 20px; color: #e07a5f;">🌿 🤍 🌿</div>
                </div>
                
                <a class="retry-btn" href="/">🔄 اختبار رسالة أخرى</a>
                
                <div class="share-title">شارك رسالتك الفنية مع أصدقائك:</div>
                
                <div class="social-icons">
                    <a class="social-icon whatsapp" href="https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(specificUrl)}" target="_blank" title="واتساب"><i class="fab fa-whatsapp"></i></a>
                    <a class="social-icon facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(specificUrl)}" target="_blank" title="فيسبوك"><i class="fab fa-facebook-f"></i></a>
                    <a class="social-icon twitter" href="https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(specificUrl)}" target="_blank" title="إكس"><i class="fab fa-x-twitter"></i></a>
                    <a class="social-icon instagram" href="https://www.instagram.com/" target="_blank" title="إنستجرام"><i class="fab fa-instagram"></i></a>
                    <a class="social-icon tiktok" href="https://www.tiktok.com/" target="_blank" title="تيك توك"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
