async function openComponent(evt, component) {
    let components = document.getElementsByClassName("pcomponent active")
    for (i = 0; i < components.length; i++) {
        components[i].classList.remove("active")
    }

    let compbuttons = document.getElementsByClassName("pcompbutton active");
    for (i = 0; i < compbuttons.length; i++) {
        compbuttons[i].classList.remove("active")
    }

    let comp = document.getElementById(component)
    comp.classList.add("active")
    comp.style.right = "calc(100% + var(--content-margin-left))"
    evt.currentTarget.classList.add("active")
    await new Promise(r => setTimeout(() => r(), 200))
    comp.style.right = null
    document.querySelector(".pcompbutton.active").scrollIntoView({
        behavior: "smooth"
    })
}

function tiltIcon(e) {
    let el = document.getElementById("picon")
    let x = e.offsetX
    let y = e.offsetY
    let fullX = el.clientWidth
    let fullY = el.clientHeight

    let horizontal = x / fullX
    let vertical = y / fullY
    let rotateX = (50 / 2 - horizontal * 50).toFixed(2)
    let rotateY = (vertical * 50 - 50 / 2).toFixed(2)
    el.style.setProperty("--transform", "perspective(" + fullX + "px) rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg) scale3d(1, 1, 1)")

}

function parsePx(px) {
    return parseInt(px.replace(/px/, ""))
}

function setupGalleries() {
    let galleries = Array.from(document.getElementsByClassName("photogallery"))
    galleries.forEach(function(gallery) {
        gallery.addEventListener("click", function(e) {
            let style = window.getComputedStyle(e.target, "::before")

            let totalBtnWidth = parsePx(style.width) + parsePx(style.paddingLeft) + parsePx(style.paddingRight)

            style = window.getComputedStyle(e.target)
            let galleryWidth = parsePx(style.width)
            let offset = galleryWidth / 3

            let el = e.target.querySelector(".photogallery > .gallery")
            let initLeft = parsePx(window.getComputedStyle(el).left)
            let fullWidth = parsePx(window.getComputedStyle(el).width)

            if (e.offsetX <= totalBtnWidth) {
                if ((initLeft + offset) < totalBtnWidth) {
                    el.style.left = (initLeft + offset) + "px"
                } else {
                    el.style.left = totalBtnWidth + "px"
                }
            } else {
                if ((initLeft - offset) > (-fullWidth + galleryWidth - 2 * totalBtnWidth)) {
                    el.style.left = (initLeft - offset) + "px"
                } else {
                    el.style.left = (-fullWidth + galleryWidth - 2 * totalBtnWidth) + "px"
                }
            }
        })
        let photos = Array.from(gallery.querySelectorAll(".photogallery > .gallery > * > * "))
        photos.forEach(function(photo) {
            photo.addEventListener("click", function(e) {
                let view = document.createElement("div")
                view.classList.add("photoview")
                let el = document.createElement("div")
                el.classList.add("photoel")

                let photo = document.createElement("object")
                photo.setAttribute("data", e.target.getAttribute("data"))

                el.append(photo)
                view.append(el)
                gallery.append(view)

                view.addEventListener("click", function() {
                    this.remove()
                    event.stopPropagation()
                }, false)
                event.stopPropagation()
            }, false)
        })
    }, false)
}

function pageLoaded() {
    console.log("Adding picon listener...")
    let el = document.getElementById("picon")
    el.addEventListener("mousemove", function(e) {
        tiltIcon(e)
    }, false)

    console.log("Setting up galleries...")
    setupGalleries()
}