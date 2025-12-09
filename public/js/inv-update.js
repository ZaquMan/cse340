const form = document.querySelector("form")
form.addEventListener("change", function () {
	const updateBtn = document.querySelector("button")
	updateBtn.removeAttribute("disabled")
});