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

// Función para crear una tarjeta de artículo
function createArticleCard(article) {
	return `
        <a href="./views/article.html?slug=${article.slug}" class="article-card">
            <img src="${article.image}" alt="${article.title}" class="article-card-img" />
            <h3 class="article-card-title">${article.title}</h3>
            <p class="article-card-text">${article.description}</p>
        </a>
    `;
}

// Cargar y mostrar artículos desde el JSON
fetch("/js/articles.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Error al cargar el archivo JSON");
		}
		return response.json();
	})
	.then((articles) => {
		// Últimas Noticias (ordenadas por fecha más reciente, límite de 3)
		const latestArticles = articles
			.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
			.slice(0, 3);
		const latestContainer = document.getElementById("latest-articles");
		latestArticles.forEach((article) => {
			latestContainer.innerHTML += createArticleCard(article);
		});

		// Economía (noticias con el tag "economía" o "inflación")
		const economyArticles = articles
			.filter(
				(article) =>
					article.tags.includes("economía") ||
					article.tags.includes("inflación")
			)
			.slice(0, 2); // Límite de 2 por sección
		const economyContainer = document.getElementById("economy-articles");
		economyArticles.forEach((article) => {
			economyContainer.innerHTML += createArticleCard(article);
		});

		// Social (noticias con el tag "social", "delincuencia" o "justicia popular")
		const socialArticles = articles
			.filter(
				(article) =>
					article.tags.includes("social") ||
					article.tags.includes("delincuencia") ||
					article.tags.includes("justicia popular")
			)
			.slice(0, 2);
		const socialContainer = document.getElementById("social-articles");
		socialArticles.forEach((article) => {
			socialContainer.innerHTML += createArticleCard(article);
		});

		// Opinión (noticias con el tag "opinión")
		const opinionArticles = articles
			.filter((article) => article.tags.includes("opinión"))
			.slice(0, 2);
		const opinionContainer = document.getElementById("opinion-articles");
		opinionArticles.forEach((article) => {
			opinionContainer.innerHTML += createArticleCard(article);
		});
	})
	.catch((error) => {
		console.error("Error al cargar el JSON:", error);
		document.querySelectorAll(".articles").forEach((container) => {
			container.innerHTML = "<p>Error al cargar las noticias.</p>";
		});
	});
