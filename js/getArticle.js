// Función para obtener el slug desde la URL
function getSlugFromURL() {
	const params = new URLSearchParams(window.location.search);
	return params.get("slug") || "default";
}

// Función para mostrar el artículo en el DOM
function displayArticle(article) {
	if (article) {
		document.getElementById("article-title").textContent = article.title;
		document.getElementById("article-image").src = article.image;
		document.getElementById("article-image").alt = article.title;
		document.getElementById("article-body").innerHTML = article.body.replace(
			/\n/g,
			"<br>"
		);
		document.getElementById("article-date").textContent = new Date(
			article.created_at
		).toLocaleDateString("es-ES");
	} else {
		document.querySelector(".article").innerHTML =
			"<p>Artículo no encontrado.</p>";
	}
}

// Cargar el archivo JSON y buscar el artículo según el slug
fetch("../js/articles.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Error al cargar el archivo JSON");
		}
		return response.json();
	})
	.then((articles) => {
		const slug = getSlugFromURL();
		const article = articles.find((n) => n.slug === slug);
		displayArticle(article);
	})
	.catch((error) => {
		console.error("Error al cargar el JSON:", error);
		document.querySelector(".article").innerHTML =
			"<p>Error al cargar el artículo. Intenta de nuevo más tarde.</p>";
	});
