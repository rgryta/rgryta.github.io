function getMainAddress() {
    let subaddress = window.location.pathname

    let main_url = window.location.href.split('?')[0].split('#')[0]
    let url_length = main_url.length
    let sub_lenght = subaddress.length

    return main_url.substr(0, url_length - sub_lenght)
}

function getSubAddress(index = false) {
    let subaddress = window.location.pathname

    if (index) {
        return subaddress == "/" ? "/index" : subaddress
    }
    return subaddress == "/index" ? "/" : subaddress
}

async function initializeContent(){
		document.getElementById("content").children[0].style.left = "-100%";
        await new Promise(r => setTimeout(() => r(), 300));
		document.getElementById("content").children[0].style.left = "0%";
}
	
document.addEventListener("DOMContentLoaded", function() {
	initializeContent()
    addCoreMeta()

    setNavBar()
    setFooter()
	
    setSiteMetaTags(getMainAddress() + getSubAddress())
});

function addCoreMeta() {

    let content = document.getElementsByTagName("head")[0]

    let url = getMainAddress() + "/core/favicon/favicon.html"
    setInner(url, content, false, true)

    url = getMainAddress() + "/core/meta.html"
    setInner(url, content, false, true)

}

function setContent() {
    let url = getMainAddress() + getSubAddress(true)

    let content = document.getElementById("content")
    setInner(url, content)
}

function grabURL(url) {
    if (url != window.location.href.split('?')[0].split('#')[0]) {
        history.pushState({}, null, url)

        setContent()
        setSiteMetaTags(url)
    }
}

async function addNavSub(nav, product){
								
				let el = document.createElement("div")
				el.style.right = "-6vw";
				el.innerText = product
				nav.appendChild(el)
				
                    await new Promise(r => setTimeout(() => r(), 200));
					el.style.right = null
}

function setNavBarClicks(xhr, content) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        let curr = content.querySelector("div[page='" + getSubAddress(true).substr(1) + "']")
        if (curr != null) {
            curr.classList.add("current")
        }
		else{
			let url_elements = getSubAddress(true).substr(1).split('/')
			let page = url_elements[0]
			let product = url_elements[1]
			
			let category = false
			switch (page) {
				case 'project':
					category = "projects";
					product = document.getElementById("ptitle").getAttribute("shortname")
					break
				default:
				    window.alert('Unsupported webpage')
			}
			if (category) {
				let category_nav = content.querySelector("div[page='" + category + "']")
				category_nav.classList.add("current")
				addNavSub(category_nav, product)
			}
		}
        for (i = 0; i < content.childElementCount; i++) {
            let btn = content.children[i]
            btn.addEventListener("click", async function() {
                let curr = content.querySelector("div.current")
				curr.style.marginBottom = null
				content.querySelectorAll("#nav div div").forEach( async function(el){
					el.style.right = "-6vw"
                    await new Promise(r => setTimeout(() => r(), 200));
					el.remove()
				})
				
                let subaddress = this.getAttribute("page")
                subaddress = subaddress == "index" ? "/" : "/" + subaddress
                let url = getMainAddress() + subaddress


                if (curr != null) {
                    curr.classList.remove("current")
                }
                this.classList.add("current")
                grabURL(url)
            });
        }
    }
}

function setNavBar() {
    let url = getMainAddress() + "/core/nav.html"

    let content = document.getElementById("nav")
    setInner(url, content, false, false, setNavBarClicks)
}

function setFooter() {
    let url = getMainAddress() + "/core/footer.html"

    let content = document.getElementById("footer")
    setInner(url, content, false)
}

function setInner(url, invoker, doc = true, append = false, finishFun = function() {}) {

    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)

    if (doc) {
        xhr.responseType = "document"
    }

    xhr.onload = async function() {
        if (this.readyState === this.DONE && this.status === 200) {
            if (append) {
                if (doc) {
                    console.log(this.responseXML)
                    invoker.appendChild(this.responseXML)
                } else {
                    invoker.innerHTML += this.responseText
                }
            } else {
                if (doc) {
                    let el = this.responseXML.getElementById("content").children[0]
                    el.style.top = "100%"
                    invoker.appendChild(el)
                    invoker.children[0].style.transform = "translateY(-100%)"
                    await new Promise(r => setTimeout(() => r(), 300));
                    invoker.children[0].remove()
                    el.style.top = null
					document.querySelector('#start').scrollIntoView()

                } else {
                    invoker.innerHTML = this.responseText
                }
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
            el.onload = function() {
                pageLoaded()
            };
            el.setAttribute("id", "dynamicscript")
            el.setAttribute("src", this.responseXML.querySelector("head script[id='dynamicscript']").getAttribute("src"))
            document.head.append(el)
        }
    }
    xhr.send()
}