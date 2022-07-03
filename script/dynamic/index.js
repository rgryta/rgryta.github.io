function tiltElement(e) {
    let el = document.querySelector("div.card")
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


function pageLoaded() {
    console.log("Adding card tilt...")
    let el = document.querySelector("div.card")
    el.addEventListener("mousemove", function(e) {
        tiltElement(e)
    }, false)
}