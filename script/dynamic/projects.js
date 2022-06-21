function pageLoaded() {
	console.log("Loading")
	let projects = document.querySelectorAll("span.project")
	projects.forEach(
	  function(currentValue, currentIndex, listObj) {
		let url = getMainAddress() + "content/project/" + listObj[currentIndex].getAttribute("name")
		
		let xhr = new XMLHttpRequest()
		xhr.open("GET", url)

		xhr.onload = function() {
			if (this.readyState === this.DONE && this.status === 200) {
				listObj[currentIndex].innerHTML = xhr.responseText
			}
		}
		xhr.send()
	  }
	);
}