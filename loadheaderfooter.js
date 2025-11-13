async function loadHTML(containerId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No s'ha pogut carregar ${filePath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "header.html");
  loadHTML("footer-container", "footer.html");
});