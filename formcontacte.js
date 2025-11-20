// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    const formulariContacte = document.getElementById("formulari-contacte");
    const formulariSuggeriments = document.getElementById("formulari-suggeriments");

    if (formulariContacte) {
        formulariContacte.addEventListener("submit", function(e) {
            manejarEnviament(e, "contacte");
        });
    }

    if (formulariSuggeriments) {
        formulariSuggeriments.addEventListener("submit", function(e) {
            manejarEnviament(e, "suggeriments");
        });
    }
});

function manejarEnviament(e, tipus) {
    e.preventDefault();

    const formulari = e.target;
    const formData = new FormData(formulari);
    const data = Object.fromEntries(formData);

    // Validar formulario
    if (!formulari.checkValidity()) {
        formulari.reportValidity();
        return;
    }

    // Mostrar mensaje de éxito
    mostrarMissatgeExit(formulari, tipus);

    // Aquí puedes enviar los datos a un servidor
    console.log(`Dades del formulari de ${tipus}:`, data);
}

function mostrarMissatgeExit(formulari, tipus) {
    const formContainer = formulari.closest(".form-container");
    const formActions = formContainer.querySelector(".form-actions");
    const formSection = formContainer.querySelector(".form-section");

    // Ocultar el botón de envío y los campos
    if (formActions) {
        formActions.style.display = "none";
    }
    if (formSection) {
        formSection.style.display = "none";
    }

    const missatge = document.createElement("div");
    missatge.className = "missatge-exit";

    let titol, text;
    if (tipus === "contacte") {
        titol = "Missatge enviat correctament!";
        text = "Gràcies per contactar amb nosaltres. Revisarem el teu missatge i et respondrem el més aviat possible.";
    } else {
        titol = "Suggeriment enviat correctament!";
        text = "Gràcies per compartir el teu suggeriment. El revisarem i el tindrem en compte per millorar el nostre servei.";
    }

    missatge.innerHTML = `
        <div class="missatge-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>${titol}</h3>
            <p>${text}</p>
        </div>
    `;

    const formHeader = formContainer.querySelector(".form-header");
    if (formHeader) {
        formHeader.insertAdjacentElement("afterend", missatge);
    }

    // Animación de entrada
    missatge.style.opacity = "0";
    missatge.style.transform = "translateY(20px)";
    setTimeout(() => {
        missatge.style.transition = "all 0.4s ease";
        missatge.style.opacity = "1";
        missatge.style.transform = "translateY(0)";
    }, 10);
}
