async function loadHTML(containerId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No s'ha pogut carregar ${filePath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;

    if (containerId === "header-container") {
      customizeHeaderTitle();
      hideActiveNavLink();
      addPageClass();
    }
  } catch (error) {
    console.error(error);
  }
}

function normalizePath(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function customizeHeaderTitle() {
  const headerTitle = document.querySelector("#header-container .logo strong");
  if (!headerTitle) return;

  const currentPath = decodeURIComponent(window.location.pathname);
  const normalizedPath = normalizePath(currentPath);
  const isDigitalitzacio =
    normalizedPath.includes("digitalitzacio.html") ||
    normalizedPath.endsWith("digitalitzacio");
  const isSostenibilitat =
    normalizedPath.includes("sostenibilitat.html") ||
    normalizedPath.endsWith("sostenibilitat");
  const isIntranet =
    normalizedPath.includes("intranet.html") ||
    normalizedPath.endsWith("intranet");
  const isFormulari =
    normalizedPath.includes("formulari.html") ||
    normalizedPath.endsWith("formulari");

  if (isDigitalitzacio) {
    headerTitle.textContent = "Digitalització";
  } else if (isSostenibilitat) {
    headerTitle.textContent = "Sostenibilitat";
  } else if (isIntranet || isFormulari) {
    headerTitle.textContent = "Intranet";
  } else {
    headerTitle.textContent = "Montsià30";
  }
}

function hideActiveNavLink() {
  const currentFile =
    decodeURIComponent(window.location.pathname).split("/").pop() ||
    "index.html";
  const normalizedCurrent = normalizePath(currentFile || "index.html");

  const navLinks = document.querySelectorAll(
    '#header-container nav a[data-page]'
  );

  navLinks.forEach((link) => {
    const target = normalizePath(link.dataset.page || "");
    if (target && target === normalizedCurrent) {
      const parentLi = link.closest("li");
      if (parentLi) {
        parentLi.style.display = "none";
      }
    }
  });
}

function addPageClass() {
  const currentFile =
    decodeURIComponent(window.location.pathname).split("/").pop() ||
    "index.html";
  const normalizedCurrent = normalizePath(currentFile || "index.html");
  const header = document.querySelector("#header-container header");

  if (header) {
    // Eliminar todas las clases de página
    header.classList.remove("page-inici", "page-digitalitzacio", "page-sostenibilitat");

    // Agregar clase según la página actual
    if (normalizedCurrent === "index.html" || normalizedCurrent === "index" || normalizedCurrent === "") {
      header.classList.add("page-inici");
    } else if (normalizedCurrent.includes("digitalitzacio")) {
      header.classList.add("page-digitalitzacio");
    } else if (normalizedCurrent.includes("sostenibilitat")) {
      header.classList.add("page-sostenibilitat");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "header.html");
  loadHTML("footer-container", "footer.html");
});
