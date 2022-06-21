function getMainAddress() {
    let subaddress = window.location.pathname.split('/')
    subaddress = subaddress[subaddress.length - 1]

    let url_length = window.location.href.length
    let sub_lenght = subaddress.length

    return window.location.href.substr(0, url_length - sub_lenght)
}

function getSubAddress(index = false) {
    let subaddress = window.location.pathname.split('/')
    subaddress = subaddress[subaddress.length - 1]

	if (index) {
		return subaddress == "" ? "index" : subaddress
	}
    return subaddress == "index" ? "" : subaddress
}

document.addEventListener("DOMContentLoaded", function() {
    setMeta()

    setNavBar()
    setFooter()
	
    setContent()
    setSiteMetaTags( getMainAddress() + getSubAddress() )
	
});

function setMeta() {

    let content = document.getElementsByTagName("head")[0]
	
    let url = getMainAddress() + "core/favicon/favicon.html"
    setInner(url, content, true)
	
    url = getMainAddress() + "core/meta.html"
    setInner(url, content, true)

}

function setContent() {
    let url = getMainAddress() + "content/" + getSubAddress(true)

    let content = document.getElementsByClassName("content")[0]
    setInner(url, content)
}

function setNavBarClicks(xhr, content) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        for (i = 0; i < content.childElementCount; i++) {
            let btn = content.children[i].children[0]
            btn.addEventListener("click", function() {
                let subaddress = this.getAttribute("page")
                subaddress = subaddress == "index" ? "" : subaddress
                let url = getMainAddress() + subaddress
                history.pushState({}, null, url)

                setContent()
                setSiteMetaTags(url)
            });
        }
    }
}

function setNavBar() {
    let url = getMainAddress() + "core/nav.html"

    let content = document.getElementsByClassName("nav")[0]
    setInner(url, content, false, setNavBarClicks)
}

function setFooter() {
    let url = getMainAddress() + "core/footer.html"

    let content = document.getElementsByClassName("footer")[0]
    setInner(url, content)
}

function setInner(url, invoker, append = false, finishFun = function() {}) {

    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)

    xhr.onload = function() {
        if (this.readyState === this.DONE && this.status === 200) {
            if (append) {
                invoker.innerHTML += xhr.responseText
            } else {
                invoker.innerHTML = xhr.responseText
            }
        }
        finishFun(xhr, invoker)
    }
    xhr.send()

}

function setSiteMetaTags(url) {
    let xhr = new XMLHttpRequest
    xhr.open('GET', url)

    xhr.responseType = 'document'

    xhr.onload = function() {
        if (this.readyState === this.DONE && this.status === 200) {
            document.title = this.responseXML.title
            document.querySelector("head meta[name='keywords']").content = this.responseXML.querySelector("head meta[name='keywords']").content
            document.querySelector("head meta[name='description']").content = this.responseXML.querySelector("head meta[name='description']").content
            
			document.getElementById("dynamicscript").remove()
			let el = document.createElement("script")
			el.onload = function () {
				pageLoaded()
			};
			el.setAttribute("id", "dynamicscript")
			el.setAttribute("src", this.responseXML.querySelector("head script[id='dynamicscript']").getAttribute("src"))
			document.head.append(el)
        }
    }
    xhr.send()
}