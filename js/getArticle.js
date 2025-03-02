// Getting slug from URL
function getSlugFromURL() {
	const params = new URLSearchParams(window.location.search);
	return params.get("slug");
}

// Loading JSON file and showing the article
fetch("../js/articles.json")
	.then((response) => response.json())
	.then((articles) => {
		const slug = getSlugFromURL();
		const article = articles.find((n) => n.slug === slug);
		if (article) {
			document.getElementById("article-title").textContent = article.title;
			document.getElementById("article-image").src = article.image;
			document.getElementById("article-image").alt = article.title;
			document.getElementById("article-description").textContent =
				article.description;
			document.getElementById("article-body").innerHTML = article.body.replace(
				/\n/g,
				"<br>"
			);
			document.getElementById("article-date").textContent = new Date(
				article.created_at
			).toLocaleDateString("es-ES");
		} else {
			document.querySelector(".article").innerHTML =
				"<p>Articulo no encontrada.</p>";
		}
	})
	.catch((error) => console.error("Error al cargar el JSON:", error));
