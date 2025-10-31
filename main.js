// Toggle Sidebar
let hamburger = document.querySelector('.hamburger')
let sidebar = document.querySelector('.sidebar')
hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active")
})
// Mesonry Script 
window.addEventListener("load", () => {
    const grid = document.querySelector('.row');
    new Masonry(grid, {
        itemSelector: '.img-home',
        percentPosition: true
    });
})
// Open Lightbox for images
let img = document.querySelectorAll('.photography .container img.normal')
let imgHome = document.querySelectorAll('.photography .container .img-home')
Array.from(img).forEach(img => {
    img.addEventListener("click", () => {
        if (window.innerWidth >= 768) {
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
        if (window.innerWidth >= 768) {
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

// Function To Stop All Videos
function stopAllvideos(clickedIframe) {
    let AllIframes = Array.from(document.querySelectorAll("iframe"))
    AllIframes.forEach(currentIframe => {
        if (currentIframe === clickedIframe) return
        let iframeSrc = currentIframe.src
        currentIframe.src = ""
        setTimeout(() => {
            currentIframe.src = iframeSrc
        }, 0)
    })
}
// Apply The stopAllVideos Function
let iframes = Array.from(document.querySelectorAll("iframe"))
iframes.forEach(iframe => {
    let wrraper = iframe.parentElement
    let cover = wrraper.lastElementChild
    cover.addEventListener("click", () => {
        iframe.focus()
        stopAllvideos(iframe)
        cover.style.display = "none"
    })
    iframe.addEventListener("blur", () => {
        cover.style.display = "block"
    })
})