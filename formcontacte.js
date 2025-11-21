// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    const formulariContacte = document.getElementById("formulari-contacte");
    const formulariSuggeriments = document.getElementById("formulari-suggeriments");

    if (formulariContacte) {
        const handlerContacte = function(e) {
            manejarEnviament(e, "contacte", handlerContacte);
        };
        formulariContacte.addEventListener("submit", handlerContacte);
    }

    if (formulariSuggeriments) {
        const handlerSuggeriments = function(e) {
            manejarEnviament(e, "suggeriments", handlerSuggeriments);
        };
        formulariSuggeriments.addEventListener("submit", handlerSuggeriments);
    }
});

function manejarEnviament(e, tipus, handler) {
    e.preventDefault();

    const formulari = e.target;

    // Verificar si el formulario ya fue enviado
    if (formulari.dataset.enviado === "true") {
        return;
    }

    const formData = new FormData(formulari);
    const data = Object.fromEntries(formData);

    // Validar formulario HTML5
    if (!formulari.checkValidity()) {
        formulari.reportValidity();
        return;
    }

    // Validación específica para selectores requeridos
    if (tipus === "contacte") {
        const assumpteSelect = document.getElementById("assumpte");
        if (assumpteSelect && (!assumpteSelect.value || assumpteSelect.value === "")) {
            assumpteSelect.setCustomValidity("Si us plau, selecciona un assumpte");
            assumpteSelect.reportValidity();
            assumpteSelect.addEventListener("change", function() {
                assumpteSelect.setCustomValidity("");
            }, { once: true });
            return;
        }
    } else if (tipus === "suggeriments") {
        const tipusSuggerimentSelect = document.getElementById("tipus_suggeriment");
        if (tipusSuggerimentSelect && (!tipusSuggerimentSelect.value || tipusSuggerimentSelect.value === "")) {
            tipusSuggerimentSelect.setCustomValidity("Si us plau, selecciona un tipus de suggeriment");
            tipusSuggerimentSelect.reportValidity();
            tipusSuggerimentSelect.addEventListener("change", function() {
                tipusSuggerimentSelect.setCustomValidity("");
            }, { once: true });
            return;
        }
    }

    // Marcar el formulario como enviado
    formulari.dataset.enviado = "true";

    // Ocultar el botón inmediatamente antes de mostrar el mensaje
    const formContainer = formulari.closest(".form-container");
    const formActions = formContainer ? formContainer.querySelector(".form-actions") : null;
    if (formActions) {
        formActions.style.display = "none";
        formActions.style.visibility = "hidden";
        formActions.style.opacity = "0";
        formActions.style.height = "0";
        formActions.style.overflow = "hidden";
    }

    // Remover el event listener para evitar reenvíos
    if (handler) {
        formulari.removeEventListener("submit", handler);
    }

    // Mostrar mensaje de éxito
    mostrarMissatgeExit(formulari, tipus);

    // Aquí puedes enviar los datos a un servidor
    console.log(`Dades del formulari de ${tipus}:`, data);
}

function mostrarMissatgeExit(formulari, tipus) {
    const formContainer = formulari.closest(".form-container");
    const formSection = formContainer.querySelector(".form-section");

    // Deshabilitar completamente el formulario para evitar reenvíos
    formulari.style.pointerEvents = "none";

    // Deshabilitar todos los campos del formulario
    const formFields = formulari.querySelectorAll("input, select, textarea, button");
    formFields.forEach(field => {
        field.disabled = true;
    });

    // Ocultar los campos del formulario
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
