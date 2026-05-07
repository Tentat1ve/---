export class ToolCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="tool-card" data-id="${data.id}">
                <div class="tool-card-img-wrapper">
                    <img class="tool-card-img" src="${data.src}" alt="${data.title}" onerror="this.src='https://placehold.co/400x200/1a2a3a/white?text=${encodeURIComponent(data.title)}'">
                </div>
                <div class="tool-card-body">
                    <span class="tool-card-badge">${data.type}</span>
                    <h3 class="tool-card-title">${data.title}</h3>
                    <p class="tool-card-text">${data.text}</p>
                    
                    <div class="tool-card-editable">
                        <label class="editable-label">📊 Макс. VU на генератор:</label>
                        <div class="editable-control">
                            <input type="number" id="metric-input-${data.id}" class="metric-input" value="${data.metric}" step="100" min="100">
                            <span class="metric-unit">${data.metricUnit}</span>
                            <button class="save-metric-btn" data-id="${data.id}">💾</button>
                        </div>
                    </div>
                    
                    <div class="tool-card-footer">
                        <button class="details-btn" data-id="${data.id}">Подробнее</button>
                        <button class="delete-btn" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, deleteListener, saveMetricListener) {
        // Кнопка "Подробнее"
        const detailsBtn = document.querySelector(`.details-btn[data-id="${data.id}"]`);
        if (detailsBtn) {
            detailsBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openListener(data.id);
            });
        }
        
        // Кнопка "Удалить"
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteListener(data.id);
            });
        }
        
        // Кнопка сохранения метрики
        const saveBtn = document.querySelector(`.save-metric-btn[data-id="${data.id}"]`);
        if (saveBtn) {
            saveBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const input = document.getElementById(`metric-input-${data.id}`);
                const newValue = parseInt(input.value);
                if (!isNaN(newValue) && newValue > 0) {
                    saveMetricListener(data.id, newValue);
                }
            });
        }
        
        // Клик по карточке
        const card = document.querySelector(`.tool-card[data-id="${data.id}"]`);
        if (card) {
            card.addEventListener("click", (e) => {
                if (!e.target.closest('.editable-control') && !e.target.classList.contains('delete-btn')) {
                    openListener(data.id);
                }
            });
        }
    }

    render(data, openListener, deleteListener, saveMetricListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, openListener, deleteListener, saveMetricListener);
    }
}