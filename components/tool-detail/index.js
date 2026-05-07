export class ToolDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="detail-card">
                <div class="detail-card-body">
                    <span class="detail-card-type">${data.type}</span>
                    <h1 class="detail-card-title">${data.title}</h1>
                    <div class="detail-metric">📊 Максимальная нагрузка: <strong>${data.metric}</strong> на генератор</div>
                    <p class="detail-card-text">${data.details}</p>
                    <div class="detail-info">
                        <div class="info-item">
                            <div class="info-label">Рекомендация</div>
                            <div class="info-value">Использовать при нагрузке до ${data.metric}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Формула расчета</div>
                            <div class="info-value">ceil(VU / ${data.metric.split(' ')[0]})</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}