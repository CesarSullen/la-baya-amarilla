// Nav Bar Toggle
let toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
	this.classList.toggle("toggled");

	let links = document.getElementById("sideBar");
	if (
		links.style.transform === "translateX(-200%)" ||
		links.style.transform === ""
	) {
		links.style.transform = "translateX(0px)";
	} else {
		links.style.transform = "translateX(-200%)";
	}
}
