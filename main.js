// Toggle Sidebar
let hamburger = document.querySelector('.hamburger')
let sidebar = document.querySelector('.sidebar')
hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active")
})

// Open Lightbox for images
let img = document.querySelectorAll('.photography .container img.normal')
let imgHome = document.querySelectorAll('.photography .container .img-home')
    Array.from(img).forEach(img => {
        img.addEventListener("click", () => {
            if (window.innerWidth >= 769) {
                img.parentElement.classList.toggle("active")
                if (img.parentElement.classList.contains("active")) {
                    img.style.cssText = 'width: 70%; height: auto'
                }
                else {
                    img.style.cssText = 'width: 100%; height: auto'
                }
            }
        })
    })

let imgPortrait = document.querySelectorAll('.photography img.portrait')
    Array.from(imgPortrait).forEach(img => {
        img.addEventListener("click", () => {
            if (window.innerWidth >= 769) {
                img.parentElement.classList.toggle("active")
                if (img.parentElement.classList.contains("active")) {
                    img.style.cssText = 'width: 40%; height: 90%'
                }
                else {
                    img.style.cssText = 'width: 100%; height: auto'
                }
            }
        })
    })


// ====== 1. دالة إيقاف جميع الفيديوهات باستثناء واحد ======
function stopAllVideos(clickedIframe) {
    let allIframes = document.querySelectorAll('.videography iframe');

    allIframes.forEach(currentIframe => {
        // استثناء الإطار الذي تم النقر عليه
        if (currentIframe === clickedIframe) {
            return;
        }

        const src = currentIframe.src;

        if (src) {
            // إزالة المصدر لإيقاف التشغيل وتنظيف حالة الذاكرة
            currentIframe.src = '';

            // تأخير بسيط لإجبار المتصفح على معالجة الإيقاف قبل إعادة التعيين
            setTimeout(() => {
                // إعادة المصدر لإبقاء الإطار جاهزاً للتشغيل المستقبلي
                currentIframe.src = src; 
            }, 0); 
        }
    });
}

// ====== 2. كود تطبيق التغطية والإخفاء ======
window.addEventListener('load', () => {

    let iframes = document.querySelectorAll('.videography iframe');

    iframes.forEach(iframe => {
        
        const wrapper = iframe.parentNode; // ⬅️ نستخدم الأب المباشر كغلاف (Wrapper)
        
        // التحقق من وجود الأب والإطار قبل المتابعة
        if (!wrapper || !iframe) return; 

        // 1. تطبيق الخصائص الأساسية على الأب (Wrapper)
        // هذا يضمن أن 'position: relative' موجود للموضع المطلق للغطاء
        wrapper.className += ' iframe-wrapper-active'; // إضافة فئة (يمكنك استخدامها في CSS)
        wrapper.style.cssText = 'position: relative; display: inline-block;';

        // أبعاد الإطار
        const iframeWidth = iframe.offsetWidth;
        const iframeHeight = iframe.offsetHeight;

        // 2. إنشاء الغطاء الشفاف (Overlay)
        let cover = document.createElement('div');
        cover.className = 'cover-overlay';
        
        // التنسيقات لتمتد التغطية فوق الإطار بالكامل
        cover.style.cssText = `
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            z-index: 10; 
            background-color: transparent; 
            cursor: pointer;
        `;

        // 3. إلحاق الغطاء بداخل الأب (Wrapper)
        // يتم وضع الغطاء بجانب الـ iframe داخل نفس الحاوية
        wrapper.appendChild(cover);

        // 4. ضبط أبعاد الحاوية (مهم للتغطية الصحيحة)
        wrapper.style.width = iframeWidth + 'px';
        wrapper.style.height = iframeHeight + 'px';
        
        // 5. إضافة مستمع الحدث (المنطق الأساسي للتشغيل/الإيقاف)
        cover.addEventListener("click", () => {
            
            // أ. إيقاف جميع الفيديوهات الأخرى
            stopAllVideos(iframe); 
            
            // ب. إخفاء الغطاء للسماح للنقرة التالية بالوصول إلى الـ iframe
            cover.style.display = 'none';

            // ج. منح الإطار التركيز
            iframe.focus(); 

            // د. إضافة مستمع لحدث 'blur' (فقدان التركيز) لإعادة الغطاء
            // هذا يعيد الحماية بمجرد انتهاء المستخدم من التفاعل مع الفيديو
            iframe.addEventListener('blur', () => {
                cover.style.display = 'block';
            });
        });
    });
});