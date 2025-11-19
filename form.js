// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    const tipusSelect = document.getElementById("tipus");
    const formulari = document.getElementById("formulari");

    if (tipusSelect) {
        tipusSelect.addEventListener("change", seleccionadorpreguntes);
    }

    if (formulari) {
        formulari.addEventListener("submit", manejarEnviament);
    }
});

function seleccionadorpreguntes() {
    const tipus = document.getElementById("tipus").value;
    const contenidor = document.getElementById("preguntes");
    const formActions = document.querySelector(".form-actions");

    contenidor.innerHTML = "";

    // Ocultar botón de envío hasta que se seleccione un tipo
    if (formActions) {
        formActions.style.display = tipus ? "block" : "none";
    }

    if (!tipus) {
        return;
    }

    let html = "";

    if (tipus === "digitalització") {
        html = `
            <div class="form-section">
                <h2 class="section-title">Informació sobre Digitalització</h2>

                <div class="camp">
                    <label for="treballadors">Número de treballadors:</label>
                    <input type="number" id="treballadors" name="treballadors" min="1" placeholder="Ex: 50" required>
                </div>

                <div class="camp">
                    <label for="nivell_digitalitzacio">Nivell actual de digitalització (1-10):</label>
                    <input type="number" id="nivell_digitalitzacio" name="nivell_digitalitzacio" min="1" max="10" placeholder="Del 1 al 10" required>
                </div>

                <div class="camp">
                    <label for="eines_nuvol">Utilitzeu eines al núvol?</label>
                    <select id="eines_nuvol" name="eines_nuvol" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="parcialment">Parcialment</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="sistemes">Quins sistemes utilitzeu actualment? (ERP, CRM, etc.)</label>
                    <input type="text" id="sistemes" name="sistemes" placeholder="Ex: SAP, Salesforce, Microsoft Dynamics..." required>
                </div>

                <div class="camp">
                    <label for="pagina_web">Disposeu d'una pàgina web?</label>
                    <select id="pagina_web" name="pagina_web" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="vendes_online">Realitzeu vendes online?</label>
                    <select id="vendes_online" name="vendes_online" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="implementant">Estem implementant-ho</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="canals_digitals">Quins canals digitals utilitzeu? (Xarxes socials, email màrqueting...)</label>
                    <textarea id="canals_digitals" name="canals_digitals" rows="4" placeholder="Descriu els canals digitals que utilitzeu..." required></textarea>
                </div>

                <div class="camp">
                    <label for="necessitats_digitals">Necessitats digitals més urgents:</label>
                    <textarea id="necessitats_digitals" name="necessitats_digitals" rows="4" placeholder="Descriu les teves necessitats digitals..." required></textarea>
                </div>
            </div>
        `;
    }

    if (tipus === "sostenibilitat") {
        html = `
            <div class="form-section">
                <h2 class="section-title">Informació sobre Sostenibilitat</h2>

                <div class="camp">
                    <label for="treballadors_sost">Número de treballadors:</label>
                    <input type="number" id="treballadors_sost" name="treballadors_sost" min="1" placeholder="Ex: 50" required>
                </div>

                <div class="camp">
                    <label for="pla_sostenibilitat">Teniu un pla de sostenibilitat?</label>
                    <select id="pla_sostenibilitat" name="pla_sostenibilitat" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="desenvolupament">En desenvolupament</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="energia_renovable">Consum d'energia renovable (en %):</label>
                    <input type="number" id="energia_renovable" name="energia_renovable" min="0" max="100" placeholder="Ex: 75" required>
                </div>

                <div class="camp">
                    <label for="estalvi_energetic">Realitzeu mesures d'estalvi energètic?</label>
                    <select id="estalvi_energetic" name="estalvi_energetic" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="parcialment">Parcialment</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="certificacions">Disposeu de certificacions ambientals? (ISO 14001, EMAS...)</label>
                    <input type="text" id="certificacions" name="certificacions" placeholder="Ex: ISO 14001, EMAS..." required>
                </div>

                <div class="camp">
                    <label for="residus_selectius">Gestioneu residus de manera selectiva?</label>
                    <select id="residus_selectius" name="residus_selectius" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="parcialment">Parcialment</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="reduccio_plastics">Reduïu l'ús de plàstics o materials d'un sol ús?</label>
                    <select id="reduccio_plastics" name="reduccio_plastics" required>
                        <option value="">-- Selecciona --</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                        <option value="començant">Estem començant</option>
                    </select>
                </div>

                <div class="camp">
                    <label for="altres_accions">Altres accions de sostenibilitat que du a terme l'empresa:</label>
                    <textarea id="altres_accions" name="altres_accions" rows="4" placeholder="Descriu altres accions de sostenibilitat..." required></textarea>
                </div>
            </div>
        `;
    }

    contenidor.innerHTML = html;

    // Añadir animación de entrada
    contenidor.style.opacity = "0";
    contenidor.style.transform = "translateY(20px)";
    setTimeout(() => {
        contenidor.style.transition = "all 0.4s ease";
        contenidor.style.opacity = "1";
        contenidor.style.transform = "translateY(0)";
    }, 10);
}

function manejarEnviament(e) {
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
    mostrarMissatgeExit();

    // Aquí puedes enviar los datos a un servidor
    console.log("Dades del formulari:", data);
}

function mostrarMissatgeExit() {
    const contenidor = document.getElementById("preguntes");
    const formActions = document.querySelector(".form-actions");

    // Ocultar el botón de envío
    if (formActions) {
        formActions.style.display = "none";
    }

    const missatge = document.createElement("div");
    missatge.className = "missatge-exit";
    missatge.innerHTML = `
        <div class="missatge-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Formulari enviat correctament!</h3>
            <p>Gràcies per completar el formulari. Revisarem la teva informació i et contactarem aviat.</p>
        </div>
    `;

    contenidor.innerHTML = "";
    contenidor.appendChild(missatge);
}
