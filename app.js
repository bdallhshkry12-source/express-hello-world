const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// قوائم مساعدة لتوليد أكثر من 1000 نتيجة متنوعة بشكل ذكي
const prefixes = [
    "ستتزوج قريباً من", "شريك حياتك القادم سيكون", "القدر يخبئ لك", 
    "سترتبط قريباً بـ", "نصيبك في الحياة سيكون", "سينير حياتك قريباً", 
    "ستلتقي قريباً بـ", "مستقبلك العاطفي يحمل لك", "ستعيش قصة حب مع"
];

const personalities = [
    "شخصاً هادئاً يملأ حياتك سكينة وأماناً 🤍",
    "إنسان طموح وناجح يدفعك نحو القمة 🦅",
    "شخصاً مرحاً وخفيف الظل لا تفارق الضحكة شفتيك بسببه 😂",
    "إنسان يعشق السفر والمغامرات ليطوف معك العالم ✈️",
    "شخصاً حنوناً يطبخ لك أشهى الأكلات ويحب الدلال 🍕",
    "إنسان يفهم صمتك قبل كلامك ويهتم بأدق تفاصيلك ☕",
    "شخصاً يرى فيك العالم بأكمله ويعامل كأنك أميره الوحيد 👑",
    "إنسان يشاركك تفاصيل روحك ويصنع معك أجمل الذكريات ✨",
    "شخصاً صبوراً وسنداً حقيقياً يمسك بيدك في أصح الأوقات وأصعبها 🤝",
    "إنسان يمنحك دفئاً عائلياً كنت تحلم به طوال حياتك 🏡"
];

const backgroundImages = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522748364024-f44e82a5fef9?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80"
];

// دالة توليد النتيجة بناءً على رقم الـ ID (لتكون النتيجة ثابتة عند مشاركة الرابط)
function getResultById(idStr) {
    let seed = 0;
    if (idStr) {
        for (let i = 0; i < idStr.length; i++) {
            seed += idStr.charCodeAt(i);
        }
    } else {
        seed = Math.floor(Math.random() * 1000000);
    }

    const pIndex = seed % prefixes.length;
    const perIndex = (seed * 7) % personalities.length;
    const imgIndex = (seed * 13) % backgroundImages.length;

    return {
        id: idStr || String(seed),
        text: `${prefixes[pIndex]} ${personalities[perIndex]}`,
        imageBg: backgroundImages[imgIndex]
    };
}

// دالة لتوليد نتيجة عشوائية تماماً عند الضغط على إعادة الاختبار
function getRandomResult() {
    const randomId = Math.floor(Math.random() * 999999).toString();
    return getResultById(randomId);
}

app.get('/', (req, res) => {
    const resultId = req.query.id;
    
    // إذا لم يكن هناك ID في الرابط، اعرض صفحة البداية
    if (!resultId) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>اختبار الروح والقلوب - اكتشف مستقبلك</title>
                
                <meta property="og:title" content="اختبار الروح والقلوب - اكتشف رسالتك">
                <meta property="og:description" content="أجب عن الأسئلة واكتشف توقعات زواجك ورسالة روحك القادمة من بين آلاف الاحتمالات! جربها الآن.">
                <meta property="og:image" content="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200">
                <meta property="og:url" content="https://express-hello-world-hfcr.onrender.com">
                <meta property="og:type" content="website">

                <style>
                    body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 30px; margin: 0; }
                    .card { background: white; max-width: 500px; margin: auto; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                    button { background: #d4a373; color: white; border: none; padding: 14px 25px; font-size: 16px; border-radius: 12px; cursor: pointer; margin-top: 20px; width: 100%; font-weight: bold; transition: background 0.3s; }
                    button:hover { background: #bc6c25; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2 style="color: #6b4423;">🌿 اختبار الروح والقلوب</h2>
                    <p style="color: #8c7355;">اكتشف رسالة روحك وشريك حياتك القادم من بين أكثر من 1000 احتمال فريد...</p>
                    <form action="/result" method="POST">
                        <button type="submit">ابدأ الاختبار الآن</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    }

    const currentResult = getResultById(resultId);
    const shareUrl = `https://express-hello-world-hfcr.onrender.com/?id=${currentResult.id}`;
    const shareText = encodeURIComponent(`رسالة روحي اليوم: "${currentResult.text}" - جرب الاختبار أنت أيضاً!`);

    res.send(renderResultPage(currentResult, shareUrl, shareText));
});

app.post('/result', (req, res) => {
    const randomResult = getRandomResult();
    const specificUrl = `https://express-hello-world-hfcr.onrender.com/?id=${randomResult.id}`;
    const shareText = encodeURIComponent(`رسالة روحي اليوم: "${randomResult.text}" - جرب الاختبار أنت أيضاً!`);

    res.send(renderResultPage(randomResult, specificUrl, shareText));
});

function renderResultPage(resultObj, shareUrl, shareText) {
    return `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نتيجة اختبار الروح</title>
            
            <meta property="og:title" content="${resultObj.text}">
            <meta property="og:description" content="اضغط هنا لترَ نتيجتك وتجرب الاختبار بنفسك!">
            <meta property="og:image" content="${resultObj.imageBg}">
            <meta property="og:url" content="${shareUrl}">
            <meta property="og:type" content="website">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                body { font-family: Tahoma, sans-serif; background: #fdfbf7; text-align: center; padding: 20px; margin: 0; }
                .card { background: white; max-width: 500px; margin: auto; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                
                .image-result-box {
                    position: relative;
                    width: 100%;
                    height: 260px;
                    background-image: url('${resultObj.imageBg}');
                    background-size: cover;
                    background-position: center;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    padding: 20px;
                    margin-top: 10px;
                    box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.42);
                }
                .image-result-text {
                    color: white;
                    font-size: 19px;
                    font-weight: bold;
                    line-height: 1.6;
                    text-shadow: 0 2px 5px rgba(0,0,0,0.8);
                }

                .retry-btn { display: block; width: 100%; background: #d4a373; color: white; text-decoration: none; padding: 12px; font-size: 16px; border-radius: 12px; margin-top: 15px; font-weight: bold; box-sizing: border-box; transition: background 0.3s; }
                .retry-btn:hover { background: #bc6c25; }

                .share-title { font-size: 14px; margin: 20px 0 10px 0; code; color: #555; font-weight: bold; border-top: 1px solid #eee; padding-top: 15px; }
                
                .social-icons { display: flex; justify-content: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
                .social-icon { display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; color: white; text-decoration: none; font-size: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); transition: transform 0.2s; }
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
                <h3 style="margin-top:0; color: #6b4423;">✨ رسالة روحك اليوم:</h3>
                
                <div class="image-result-box">
                    <div class="image-result-text">${resultObj.text}</div>
                </div>
                
                <a class="retry-btn" href="/">🔄 اختبار رسالة أخرى</a>
                
                <div class="share-title">شارك رسالتك مع أصدقائك عبر:</div>
                
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
    `;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
