export class CalculatorCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="card" style="width: 100%; max-width: 500px; margin: 0 auto;">
                <div class="card-body">
                    <h5 class="card-title">📊 Расчет генераторов нагрузки</h5>
                    
                    <div class="mb-3">
                        <label class="form-label">Количество виртуальных пользователей (VU)</label>
                        <input type="number" id="vuCount" class="form-control" value="1000" min="1">
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Инструмент тестирования</label>
                        <select id="toolSelect" class="form-select">
                            <option value="jmeter">Apache JMeter (max: 800 VU/генератор)</option>
                            <option value="gatling">Gatling (max: 1500 VU/генератор)</option>
                            <option value="k6">k6 (max: 3000 VU/генератор)</option>
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Сценарий поведения</label>
                        <select id="scenarioSelect" class="form-select">
                            <option value="1.0">Постоянная нагрузка (коэф: 1.0)</option>
                            <option value="1.2">Нарастающая нагрузка (коэф: 1.2)</option>
                            <option value="1.5">Пиковая нагрузка (коэф: 1.5)</option>
                            <option value="1.8">Стресс-тест (коэф: 1.8)</option>
                        </select>
                    </div>
                    
                    <button id="calculateBtn" class="btn btn-primary w-100">Рассчитать</button>
                    
                    <div id="resultBlock" class="mt-4 p-3 bg-light rounded" style="display: none;">
                        <h6>Результат расчета:</h6>
                        <div id="resultText"></div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(listener) {
        document.getElementById("calculateBtn")?.addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}