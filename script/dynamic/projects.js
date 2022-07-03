function setupProjectInfo(currentValue, currentIndex) {
    let pname = currentValue.getAttribute("name")
    let url = getMainAddress() + "/project/" + pname


    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = 'document'

    xhr.onload = function() {
        if (this.readyState === this.DONE && this.status === 200) {
            let project = document.querySelector("div.project[name='" + pname + "']")
            let doc = this.responseXML


            let el = document.createElement("h3")
            el.innerText = currentIndex + 1
            project.appendChild(el)

            el = document.createElement("h2")
            el.innerText = doc.querySelector("#ptitle").innerText
            el.style.marginTop = "0";
            el.setAttribute("href", "/project/" + pname)
            el.addEventListener("click", function() {
                let subaddress = this.getAttribute("href")
                let url = getMainAddress() + subaddress
                grabURL(url)

                let nav_element = document.querySelector("#nav div[page='projects']")
                addNavSub(nav_element, doc.querySelector("#ptitle").getAttribute("shortname"))
            })
            project.appendChild(el)

            el = document.createElement("div")
            el.classList.add("techstack")
            project.appendChild(el)


            let el_techstack = document.createElement("strong")
            el_techstack.innerText = "Tech:"
            el.appendChild(el_techstack)

            let techs = Array.from(doc.querySelectorAll("[tag='techstack']")).map(x => x.innerText)
            techs = [...new Set(techs)];

            techs.forEach(
                function(currentValue, currentIndex, listObj) {
                    let el_techstack = document.createElement("span")
                    el_techstack.innerText = currentValue
                    el.appendChild(el_techstack)
                }
            )


        }
    }
    xhr.send()
}


function pageLoaded() {
    console.log("Loading projects...")

    let sections = document.querySelectorAll("div.section")

    sections.forEach(
        function(currentValue, currentIndex) {
            let section = currentValue
            let projects = section.querySelectorAll("div.project")
            projects.forEach(
                function(currentValue, currentIndex) {
                    setupProjectInfo(currentValue, currentIndex)
                }
            )
        }
    )

}