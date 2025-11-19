async function loadHTML(containerId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No s'ha pogut carregar ${filePath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;

    if (containerId === "header-container") {
      customizeHeaderTitle();
      hideActiveNavLink();
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

  headerTitle.textContent = isDigitalitzacio ? "Digitalització" : "Montsià30";
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

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "header.html");
  loadHTML("footer-container", "footer.html");
});