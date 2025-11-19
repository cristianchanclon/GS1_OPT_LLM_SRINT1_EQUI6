document.getElementById("tipus").addEventListener("change", seleccionadorpreguntes);

function seleccionadorpreguntes() {
    const tipus = document.getElementById("tipus").value;
    const contenidor = document.getElementById("preguntes");

    contenidor.innerHTML = "";

    let html = "";

    if (tipus === "digitalització") {
        html = `
            <div class="camp">
                <label>Número de treballadors:</label>
                <input type="number" required>
            </div>

            <div class="camp">
                <label>Nivell actual de digitalització (1-10):</label>
                <input type="number" min="1" max="10" required>
            </div>

            <div class="camp">
                <label>Utilitzeu eines al núvol?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>Parcialment</option>
                </select>
            </div>

            <div class="camp">
                <label>Quins sistemes utilitzeu actualment? (ERP, CRM, etc.)</label>
                <input type="text" required>
            </div>

            <div class="camp">
                <label>Disposeu d'una pàgina web?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                </select>
            </div>

            <div class="camp">
                <label>Realitzeu vendes online?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>Estem implementant-ho</option>
                </select>
            </div>

            <div class="camp">
                <label>Quins canals digitals utilitzeu? (Xarxes socials, email màrqueting...)</label>
                <textarea rows="3" required></textarea>
            </div>

            <div class="camp">
                <label>Necessitats digitals més urgents:</label>
                <textarea rows="3" required></textarea>
            </div>
        `;
    }

    if (tipus === "sostenibilitat") {
        html = `
            <div class="camp">
                <label>Número de treballadors:</label>
                <input type="number" required>
            </div>

            <div class="camp">
                <label>Teniu un pla de sostenibilitat?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>En desenvolupament</option>
                </select>
            </div>

            <div class="camp">
                <label>Consum d'energia renovable (en %):</label>
                <input type="number" min="0" max="100" required>
            </div>

            <div class="camp">
                <label>Realitzeu mesures d'estalvi energètic?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>Parcialment</option>
                </select>
            </div>

            <div class="camp">
                <label>Disposeu de certificacions ambientals? (ISO 14001, EMAS...)</label>
                <input type="text" required>
            </div>

            <div class="camp">
                <label>Gestioneu residus de manera selectiva?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>Parcialment</option>
                </select>
            </div>

            <div class="camp">
                <label>Reduïu l'ús de plàstics o materials d'un sol ús?</label>
                <select required>
                    <option value="">-- Selecciona --</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>Estem començant</option>
                </select>
            </div>

            <div class="camp">
                <label>Altres accions de sostenibilitat que du a terme l'empresa:</label>
                <textarea rows="3" required></textarea>
            </div>
        `;
    }

    contenidor.innerHTML = html;
}