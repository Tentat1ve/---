import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { InfoAccordionComponent } from "../../components/info-accordion/index.js";
import { getToolById, updateTool } from "../../data/store.js";
import { ToolsPage } from "../tools/index.js";

export class ToolPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.tool = getToolById(id);
    }

    get pageRoot() {
        return document.getElementById('tool-page');
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>
                <div id="tool-page" class="detail-container">
                    <div id="back-button-root"></div>
                    <div id="tool-content"></div>
                    <div id="accordion-root"></div>
                </div>
            </div>
        `;
    }

    // Сохранение изменений
    saveChanges() {
        const title = document.getElementById('edit-title')?.value;
        const text = document.getElementById('edit-text')?.value;
        const details = document.getElementById('edit-details')?.value;
        const metric = parseInt(document.getElementById('edit-metric')?.value);
        const protocol = document.getElementById('edit-protocol')?.value;
        const language = document.getElementById('edit-language')?.value;
        
        const updates = {};
        if (title) updates.title = title;
        if (text) updates.text = text;
        if (details) updates.details = details;
        if (!isNaN(metric) && metric > 0) updates.metric = metric;
        if (protocol) updates.protocol = protocol;
        if (language) updates.language = language;
        
        updateTool(this.id, updates);
        this.tool = getToolById(this.id);
        this.renderToolDetail(this.tool);
        
        // Показать уведомление
        const saveBtn = document.getElementById('save-changes-btn');
        if (saveBtn) {
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✅ Сохранено!';
            setTimeout(() => {
                saveBtn.textContent = originalText;
            }, 2000);
        }
    }

    // Рендер детальной информации с возможностью редактирования
    renderToolDetail(tool) {
        const toolContent = document.getElementById('tool-content');
        if (!toolContent) return;
        
        toolContent.innerHTML = `
            <div class="detail-card">
                <div class="detail-card-header">
                    <div class="detail-card-img-wrapper">
                        <img class="detail-card-img" src="${tool.src}" alt="${tool.title}" onerror="this.src='https://placehold.co/400x200/3e72dd/white?text=${encodeURIComponent(tool.title)}'">
                    </div>
                </div>
                <div class="detail-card-body">
                    <div class="edit-mode">
                        <div class="edit-field">
                            <label>Название:</label>
                            <input type="text" id="edit-title" class="edit-input" value="${tool.title.replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Краткое описание:</label>
                            <input type="text" id="edit-text" class="edit-input" value="${tool.text.replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Макс. VU на генератор:</label>
                            <input type="number" id="edit-metric" class="edit-input" value="${tool.metric}" step="100" min="100">
                            <span class="metric-unit">${tool.metricUnit}</span>
                        </div>
                        
                        <div class="edit-field">
                            <label>Поддерживаемые протоколы:</label>
                            <input type="text" id="edit-protocol" class="edit-input" value="${tool.protocol || 'HTTP, HTTPS'}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Язык сценариев:</label>
                            <input type="text" id="edit-language" class="edit-input" value="${tool.language || 'Java'}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Полное описание:</label>
                            <textarea id="edit-details" class="edit-textarea" rows="5">${tool.details.replace(/"/g, '&quot;')}</textarea>
                        </div>
                        
                        <button id="save-changes-btn" class="save-changes-btn">💾 Сохранить изменения</button>
                    </div>
                    
                    <div class="calculation-example">
                        <h4>📝 Пример расчета количества генераторов</h4>
                        <p>Если нужно протестировать <input type="number" id="calc-vu" class="calc-vu-input" value="5000" step="1000"> виртуальных пользователей:</p>
                        <code id="calc-result">количество генераторов = ceil(5000 / ${tool.metric}) = ${Math.ceil(5000 / tool.metric)} генераторов</code>
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем обработчики
        const saveBtn = document.getElementById('save-changes-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveChanges());
        }
        
        const calcInput = document.getElementById('calc-vu');
        if (calcInput) {
            calcInput.addEventListener('input', () => {
                const vu = parseInt(calcInput.value) || 0;
                const metric = parseInt(document.getElementById('edit-metric')?.value) || tool.metric;
                const result = Math.ceil(vu / metric);
                const calcResult = document.getElementById('calc-result');
                if (calcResult) {
                    calcResult.innerHTML = `количество генераторов = ceil(${vu} / ${metric}) = ${result} генераторов`;
                }
            });
        }
    }

    goBack() {
        const toolsPage = new ToolsPage(this.parent);
        toolsPage.render();
    }

    render() {
        this.tool = getToolById(this.id);
        if (!this.tool) {
            this.parent.innerHTML = '<div class="text-center p-5">❌ Инструмент не найден</div>';
            return;
        }
        
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(
            () => this.goBack(),
            () => this.goBack()
        );

        const backButton = new BackButtonComponent(document.getElementById("back-button-root"));
        backButton.render(() => this.goBack());

        this.renderToolDetail(this.tool);

        const accordionRoot = document.getElementById('accordion-root');
        if (accordionRoot) {
            const accordion = new InfoAccordionComponent(accordionRoot);
            accordion.render();
        }
    }
}