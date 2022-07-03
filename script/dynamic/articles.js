function setupArticleInfo(currentValue, currentIndex) {
    let aname = currentValue.getAttribute("name")
    let url = getMainAddress() + "/article/" + aname


    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = 'document'

    xhr.onload = function() {
        if (this.readyState === this.DONE && this.status === 200) {
            let article = document.querySelector("div.article[name='" + aname + "']")
            let doc = this.responseXML


            let el = document.createElement("h3")
            el.innerText = currentIndex + 1
            article.appendChild(el)

            el = document.createElement("h2")
            el.innerText = doc.querySelector("#article-title").innerText
            el.style.marginTop = "0";
            el.setAttribute("href", "/article/" + aname)
            el.addEventListener("click", function() {
                let subaddress = this.getAttribute("href")
                let url = getMainAddress() + subaddress
                grabURL(url)

                let nav_element = document.querySelector("#nav div[page='articles']")
                addNavSub(nav_element, doc.querySelector("#article-title").getAttribute("shortname"))
            })
            article.appendChild(el)

        }
    }
    xhr.send()
}


function pageLoaded() {
    let sections = document.querySelectorAll("div.section")

    sections.forEach(
        function(currentValue, currentIndex) {
            let section = currentValue
            let articles = section.querySelectorAll("div.article")
            articles.forEach(
                function(currentValue, currentIndex) {
                    setupArticleInfo(currentValue, currentIndex)
                }
            )
        }
    )
}