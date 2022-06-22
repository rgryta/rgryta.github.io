var test = null
var project = null
var pname = null

function setupProjectInfo(currentValue, currentIndex) {
		pname = currentValue.getAttribute("name")
		let url = getMainAddress() + "/project/" + pname
	
		
		let xhr = new XMLHttpRequest()
		xhr.open("GET", url)
		xhr.responseType = 'document'

		xhr.onload = function() {
			if (this.readyState === this.DONE && this.status === 200) {
				project = document.querySelector("div.project[name='"+pname+"']")
				let doc = this.responseXML
				test = this.responseXML
				
				let el = document.createElement("h2")
				el.innerText = currentIndex+1
				project.appendChild(el)
				
				el = document.createElement("h3")
				el.innerText = doc.querySelector("#ptitle").innerText
				project.appendChild(el)
				
				el = document.createElement("div")
				el.setAttribute("style","font-size:smaller;")
				el.innerText = doc.querySelector("#pshortdesc").innerText
				project.appendChild(el)
				
				el = document.createElement("div")
				el.classList.add("techstack")
				project.appendChild(el)
				
				
				let el_techstack = document.createElement("strong")
				el_techstack.innerText = "Tech:"
				el.appendChild(el_techstack)
				
				let techs = Array.from(doc.querySelectorAll("[tag='techstack']")).map(x => x.innerText)
				techs.forEach(
					function(currentValue, currentIndex, listObj) {
						let el_techstack = document.createElement("span")
						el_techstack.innerText = currentValue
						el.appendChild(el_techstack)
					}
				)
				
				el = document.createElement("a")
				el.setAttribute("href","/project/"+pname)
				el.innerText = "Learn more"
				project.appendChild(el)
				
				
			}
		}
		xhr.send()
	}


function pageLoaded() {
	console.log("Loading")
	
	let sections = document.querySelectorAll("div.section")
	
	sections.forEach(
		function(currentValue, currentIndex, listObj) {
			let section = currentValue
			let projects = section.querySelectorAll("div.project")
			projects.forEach(
				function(currentValue, currentIndex, listObj) {
					setupProjectInfo(currentValue, currentIndex)
				}
			)
		}
	)
	
}