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


// Function For Stopping All Videos Other Than The Clicked One
function stopAllVideos(clickedIframe) {
    let allIframes = document.querySelectorAll('.videography iframe');

    allIframes.forEach(currentIframe => {
        if (currentIframe === clickedIframe) { 
            return;
        }

        const src = currentIframe.src;

        if (src) {
            currentIframe.src = '';
            setTimeout(() => {
                currentIframe.src = src; 
            }, 0); 
        }
    });
}

// Covering Apply on Iframes
window.addEventListener('load', () => {

    let iframes = document.querySelectorAll('.videography iframe');

    iframes.forEach(iframe => {
        
        const wrapper = iframe.parentNode; 
        
        if (!wrapper || !iframe) return; 

        wrapper.className += ' iframe-wrapper-active'; 
        wrapper.style.cssText = 'position: relative; display: inline-block;';

        const iframeWidth = iframe.offsetWidth;
        const iframeHeight = iframe.offsetHeight;

        let cover = document.createElement('div');
        cover.className = 'cover-overlay';
        
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

        wrapper.appendChild(cover);

        wrapper.style.width = iframeWidth + 'px';
        wrapper.style.height = iframeHeight + 'px';
        
        cover.addEventListener("click", () => {
            stopAllVideos(iframe);
            cover.style.display = 'none';
            iframe.focus(); 
            iframe.addEventListener('blur', () => {
                cover.style.display = 'block';
            });
        });
    });
});