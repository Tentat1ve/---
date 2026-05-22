export class ToolCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="tool-card" data-id="${data.id}">
                <div class="tool-card-img-wrapper">
                    <img class="tool-card-img" src="${data.src}" alt="${data.title}" onerror="this.src='https://placehold.co/400x200/3e72dd/white?text=${encodeURIComponent(data.title)}'">
                </div>
                <div class="tool-card-body">
                    <span class="tool-card-badge">${data.type || 'Инструмент'}</span>
                    <h3 class="tool-card-title">${data.title || 'Без названия'}</h3>
                    <p class="tool-card-text">${data.text || ''}</p>
                    
                    <div class="tool-card-editable">
                        <label class="editable-label">📊 Макс. VU на генератор:</label>
                        <div class="editable-control">
                            <input type="number" id="metric-input-${data.id}" class="metric-input" value="${data.metric || 500}" step="100" min="100">
                            <span class="metric-unit">${data.metricUnit || 'VU'}</span>
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

    render(data, onDetail, onDelete, onSaveMetric) {
        if (!data || !data.id) return;
        
        console.log('🎴 Рендер карточки:', data.title, data.id);
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        
        const card = this.parent.querySelector(`.tool-card[data-id="${data.id}"]`);
        if (!card) return;
        
        // Кнопка "Подробнее"
        const detailBtn = card.querySelector(`.details-btn[data-id="${data.id}"]`);
        if (detailBtn) {
            detailBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log('🟢 Нажата кнопка "Подробнее" для', data.id);
                onDetail(data.id);
                return false;
            };
        }
        
        // Кнопка "Удалить"
        const deleteBtn = card.querySelector(`.delete-btn[data-id="${data.id}"]`);
        if (deleteBtn) {
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log('🟢 Нажата кнопка "Удалить" для', data.id);
                onDelete(data.id);
                return false;
            };
        }
        
        // Кнопка сохранения
        const saveBtn = card.querySelector(`.save-metric-btn[data-id="${data.id}"]`);
        const metricInput = card.querySelector(`#metric-input-${data.id}`);
        if (saveBtn && metricInput) {
            saveBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                const newVal = parseInt(metricInput.value);
                console.log('🟢 Сохранение метрики для', data.id, 'новое значение:', newVal);
                if (!isNaN(newVal) && newVal > 0) {
                    onSaveMetric(data.id, newVal);
                }
                return false;
            };
        }
    }
}