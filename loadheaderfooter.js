async function loadHTML(containerId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No s'ha pogut carregar ${filePath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;

    if (containerId === "header-container") {
      customizeHeaderTitle();
    }
  } catch (error) {
    console.error(error);
  }
}

function customizeHeaderTitle() {
  const headerTitle = document.querySelector("#header-container .logo strong");
  if (!headerTitle) return;

  const currentPath = decodeURIComponent(window.location.pathname).toLowerCase();
  const isDigitalitzacio =
    currentPath.includes("digitalització.html") ||
    currentPath.includes("digitalitzacio.html");

  headerTitle.textContent = isDigitalitzacio ? "Digitalització" : "Montsià30";

  // Desactivar enlace a Digitalització si estás en esa página
  if (isDigitalitzacio) {
    const digitalitzacioLinks = document.querySelectorAll(
      '#header-container nav a[href*="Digitalització"], #header-container nav a[href*="digitalització"]'
    );
    digitalitzacioLinks.forEach((link) => {
      link.style.pointerEvents = "none";
      link.style.cursor = "default";
      link.style.opacity = "0.8";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "header.html");
  loadHTML("footer-container", "footer.html");
});