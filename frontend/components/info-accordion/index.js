export class InfoAccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="accordion-container">
                <h3 class="accordion-title">📖 Информация о нагрузочном тестировании</h3>
                <div class="accordion" id="loadTestAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                🛠️ Что такое нагрузочное тестирование?
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#loadTestAccordion">
                            <div class="accordion-body">
                                Нагрузочное тестирование — это процесс проверки работоспособности системы под ожидаемой нагрузкой. 
                                Оно позволяет определить, как система ведёт себя при заданном количестве одновременных пользователей (VU - Virtual Users)
                                и какую инфраструктуру необходимо подготовить для обеспечения стабильной работы.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                📊 Как рассчитать количество генераторов нагрузки?
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#loadTestAccordion">
                            <div class="accordion-body">
                                <strong>Формула расчета:</strong><br>
                                <code>Количество генераторов = ceil(Количество виртуальных пользователей / Максимальная нагрузка на один генератор)</code><br><br>
                                <strong>Пример для k6:</strong><br>
                                Если нужно протестировать 5000 виртуальных пользователей, а k6 выдерживает 3000 VU на генератор:<br>
                                <code>ceil(5000 / 3000) = 2 генератора</code><br><br>
                                <strong>Пример для JMeter:</strong><br>
                                Если нужно протестировать 2000 виртуальных пользователей, а JMeter выдерживает 800 VU на генератор:<br>
                                <code>ceil(2000 / 800) = 3 генератора</code>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                📋 Типы нагрузочного тестирования
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#loadTestAccordion">
                            <div class="accordion-body">
                                <ul>
                                    <li><strong>Нагрузочное тестирование (Load Testing)</strong> — имитация нормальной нагрузки для проверки производительности</li>
                                    <li><strong>Стресс-тестирование (Stress Testing)</strong> — превышение нормальной нагрузки для поиска предела системы</li>
                                    <li><strong>Пиковое тестирование (Spike Testing)</strong> — резкий скачок нагрузки для проверки реакции системы</li>
                                    <li><strong>Тестирование на выдержку (Soak Testing)</strong> — длительная нагрузка для выявления утечек памяти</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                🖥️ Рекомендации по генераторам нагрузки
                            </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#loadTestAccordion">
                            <div class="accordion-body">
                                <ul>
                                    <li><strong>JMeter:</strong> рекомендуется использовать 1 генератор на 500-800 VU</li>
                                    <li><strong>Gatling:</strong> рекомендуется использовать 1 генератор на 1000-1500 VU</li>
                                    <li><strong>k6:</strong> рекомендуется использовать 1 генератор на 2000-3000 VU</li>
                                    <li><strong>Locust:</strong> рекомендуется использовать 1 генератор на 800-1000 VU</li>
                                </ul>
                                <p class="mt-2 text-muted">※ Значения могут варьироваться в зависимости от сложности сценария и мощности оборудования</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}