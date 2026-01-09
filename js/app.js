    // Inicialización de datos con localStorage
    let inventory = JSON.parse(localStorage.getItem('mystuff_db')) || [];

    function saveItem() {
        const name = document.getElementById('itemName').value;
        const location = document.getElementById('itemLocation').value;
        const editIndex = parseInt(document.getElementById('editIndex').value);

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
        if (confirm("Tem certeza que deseja apagar este artigo definitivamente?")) {
            inventory.splice(index, 1);
            updateStorage();
            renderItems();
        }
    }

    function editItem(index) {
        const item = inventory[index];
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemValue').value = item.value;
        document.getElementById('itemLocation').value = item.location;
        document.getElementById('itemStatus').value = item.status;
        document.getElementById('itemDesc').value = item.desc;
        
        document.getElementById('editIndex').value = index;
        document.getElementById('formTitle').innerText = "Editar Artigo";
        document.getElementById('btnSave').innerText = "Guardar Alterações";
        document.getElementById('btnCancel').style.display = "block";
    }

    // UC09: Exportar para OLX
    function exportToOLX(index) {
        const item = inventory[index];
        const text = `ANÚNCIO OLX\n----------\nProduto: ${item.name}\nCategoria: ${item.category}\nPreço: ${item.value}€\nDescrição: ${item.desc}\nLocal: ${item.location}`;
        alert(text);
        console.log("Dados exportados:", text);
    }

    function resetForm() {
        document.getElementById('editIndex').value = "-1";
        document.getElementById('itemName').value = "";
        document.getElementById('itemCategory').value = "";
        document.getElementById('itemValue').value = "";
        document.getElementById('itemLocation').value = "";
        document.getElementById('itemStatus').value = "Essencial";
        document.getElementById('itemDesc').value = "";
        
        document.getElementById('formTitle').innerText = "Novo Artigo";
        document.getElementById('btnSave').innerText = "Registar Artigo";
        document.getElementById('btnCancel').style.display = "none";
    }

    function updateStorage() {
        localStorage.setItem('mystuff_db', JSON.stringify(inventory));
    }

    // UC11: Renderización y Búsqueda
    function renderItems() {
        const listElement = document.getElementById('inventoryList');
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        
        listElement.innerHTML = '';

        inventory.forEach((item, index) => {
            if (item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm)) {
                const statusClass = item.status.toLowerCase().replace('ç','c').replace('ã','a');
                
                let olxBtn = item.status === 'Venda' ? 
                    `<button class="btn-olx" onclick="exportToOLX(${index})">Exportar OLX</button>` : '';

                listElement.innerHTML += `
                    <div class="item-card">
                        <div class="item-info">
                            <strong>${item.name} <span class="badge badge-${statusClass}">${item.status}</span></strong>
                            <span>Categoría: ${item.category} | Local: ${item.location}</span>
                            <small>${item.desc}</small>
                            ${olxBtn}
                        </div>
                        <div class="item-actions">
                            <button onclick="editItem(${index})" style="background:#f1c40f; color:white;">Editar</button>
                            <button onclick="deleteItem(${index})" style="background:#e74c3c; color:white;">Apagar</button>
                        </div>
                    </div>
                `;
            }
        });

        if (listElement.innerHTML === '') {
            listElement.innerHTML = '<p style="text-align:center; color:#999;">Nenhum artigo encontrado.</p>';
        }
    }

    // Carga inicial
    renderItems();