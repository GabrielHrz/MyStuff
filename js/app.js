// Inicialización de datos con localStorage
let inventory = JSON.parse(localStorage.getItem('mystuff_db')) || [];

// UC03 e UC04: Registar e Modificar Artigo
function saveItem() {
    const name = document.getElementById('itemName').value;
    const location = document.getElementById('itemLocation').value;
    const editIndex = parseInt(document.getElementById('editIndex').value);

    // Validación básica
    if (!name || !location) {
        alert("Nome e Localização são obrigatórios!");
        return;
    }

    const itemData = {
        name: name,
        category: document.getElementById('itemCategory').value || 'Geral',
        value: document.getElementById('itemValue').value || '0',
        location: location,
        status: document.getElementById('itemStatus').value,
        desc: document.getElementById('itemDesc').value || ''
    };

    if (editIndex === -1) {
        // UC03: Registar
        inventory.push(itemData);
    } else {
        // UC04: Modificar
        inventory[editIndex] = itemData;
    }

    updateStorage();
    resetForm();
    renderItems();
}

// UC05: Apagar Artigo
function deleteItem(index) {
    if (confirm("Deseja apagar este artigo definitivamente?")) {
        inventory.splice(index, 1);
        updateStorage();
        renderItems();
    }
}

// Cargar datos en el formulario para editar
function editItem(index) {
    const item = inventory[index];
    
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemValue').value = item.value;
    document.getElementById('itemLocation').value = item.location;
    document.getElementById('itemStatus').value = item.status;
    document.getElementById('itemDesc').value = item.desc;
    
    document.getElementById('editIndex').value = index;
    
    // Cambios visuales para modo edición
    document.getElementById('btnSave').innerText = "Guardar Alterações";
    document.getElementById('btnCancel').classList.remove('hidden'); // Mostrar botón cancelar
}

// UC09: Exportar para OLX
function exportToOLX(index) {
    const item = inventory[index];
    const text = `ANÚNCIO OLX\n----------\nProduto: ${item.name}\nCategoria: ${item.category}\nPreço: ${item.value}€\nDescrição: ${item.desc}\nLocal: ${item.location}`;
    alert(text);
}

// Limpiar el formulario
function resetForm() {
    document.getElementById('editIndex').value = "-1";
    
    // Limpiar todos los inputs y textareas
    const inputs = document.querySelectorAll('#formArtigo input, #formArtigo textarea');
    inputs.forEach(input => input.value = "");
    
    document.getElementById('itemStatus').value = "Essencial";
    document.getElementById('btnSave').innerText = "Registar Artigo";
    document.getElementById('btnCancel').classList.add('hidden'); // Ocultar botón cancelar
}

function updateStorage() {
    localStorage.setItem('mystuff_db', JSON.stringify(inventory));
}

// UC11: Renderización y Búsqueda (onkeyup)
function renderItems() {
    const listElement = document.getElementById('inventoryList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    listElement.innerHTML = '';

    inventory.forEach((item, index) => {
        // Filtro de búsqueda
        if (item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm)) {
            
            // Botón OLX solo si el estado es Venda
            let olxBtn = item.status === 'Venda' ? 
                `<button class="btn-olx" onclick="exportToOLX(${index})">Exportar OLX</button>` : '';

            listElement.innerHTML += `
                <div class="item-card">
                    <div class="item-info">
                        <strong>${item.name} <span class="badge">${item.status}</span></strong><br>
                        <small>${item.category} | ${item.location} | ${item.value}€</small>
                        <p style="margin:5px 0 0 0; font-size:12px; color:#666;">${item.desc}</p>
                        ${olxBtn}
                    </div>
                    <div class="item-actions">
                        <button onclick="editItem(${index})" style="background:#f1c40f;">Editar</button>
                        <button onclick="deleteItem(${index})" style="background:#e74c3c;">Apagar</button>
                    </div>
                </div>
            `;
        }
    });

    if (listElement.innerHTML === '') {
        listElement.innerHTML = '<p style="text-align:center; color:#999;">Nenhum artigo encontrado.</p>';
    }
}

// Ejecutar al cargar la página
renderItems();