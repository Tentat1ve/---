import { HeaderComponent } from "../../components/header/index.js";
import { ToolCardComponent } from "../../components/tool-card/index.js";
import { getAllTools, addTool, deleteTool, updateTool, getNextId } from "../../data/store.js";
import { MainPage } from "../main/index.js";
import { ToolPage } from "../tool/index.js";
import { HomeworkPage } from "../homework/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class ToolsPage {
    constructor(parent) {
        this.parent = parent;
        this.tools = [];
        this.filteredTools = [];
        this.currentFilter = '';
        this.updateToolsList();
    }

    updateToolsList() {
        this.tools = getAllTools();
        this.filterTools();
    }

    get pageRoot() {
        return document.getElementById('tools-page');
    }

    get toolsListRoot() {
        return document.getElementById('tools-list');
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>
                <div id="tools-page" class="tools-container">
                    <div class="tools-header">
                        <h1 class="tools-title">🛠️ Инструменты нагрузочного тестирования</h1>
                        <p class="tools-subtitle">Выберите инструмент для планирования мощности тестовой инфраструктуры</p>
                        <div class="tools-controls">
                            <input type="text" id="filterInput" class="filter-input" placeholder="🔍 Поиск по названию...">
                            <button id="addToolBtn" class="add-tool-btn">➕ Добавить инструмент</button>
                        </div>
                    </div>
                    <div id="tools-list" class="tools-grid"></div>
                </div>
            </div>
        `;
    }

    getNewToolTemplate() {
        const newId = getNextId();
        return {
            id: newId,
            src: "https://placehold.co/400x200/3e72dd/white?text=New+Tool",
            title: `Новый инструмент ${newId}`,
            text: "Описание нового инструмента нагрузочного тестирования",
            type: "Инструмент",
            metric: 500,
            metricUnit: "VU",
            details: "Это новый инструмент для нагрузочного тестирования. Нажмите 'Подробнее', чтобы отредактировать полную информацию.",
            protocol: "HTTP, HTTPS",
            language: "JavaScript/Python/Java"
        };
    }

    addNewTool() {
        const newTool = this.getNewToolTemplate();
        addTool(newTool);
        this.updateToolsList();
        this.renderToolsList();
    }

    saveMetric(id, newMetricValue) {
        updateTool(id, { metric: newMetricValue });
        this.updateToolsList();
        this.renderToolsList();
    }

    filterTools() {
        if (this.currentFilter) {
            this.filteredTools = this.tools.filter(tool =>
                tool.title.toLowerCase().includes(this.currentFilter.toLowerCase())
            );
        } else {
            this.filteredTools = [...this.tools];
        }
    }

    renderToolsList() {
        if (!this.toolsListRoot) return;
        
        this.toolsListRoot.innerHTML = '';
        
        if (this.filteredTools.length === 0) {
            this.toolsListRoot.innerHTML = '<div class="text-center p-5">🔭 Инструменты не найдены</div>';
            return;
        }
        
        this.filteredTools.forEach(tool => {
            const card = new ToolCardComponent(this.toolsListRoot);
            card.render(
                tool,
                (id) => this.goToToolPage(id),
                (id) => this.deleteToolHandler(id),
                (id, newValue) => this.saveMetric(id, newValue)
            );
        });
    }

    deleteToolHandler(id) {
        deleteTool(id);
        this.updateToolsList();
        this.renderToolsList();
    }

    goToToolPage(id) {
        const toolPage = new ToolPage(this.parent, id);
        toolPage.render();
    }

    addEventListeners() {
        const filterInput = document.getElementById('filterInput');
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                this.currentFilter = e.target.value;
                this.filterTools();
                this.renderToolsList();
            });
        }
        
        const addBtn = document.getElementById('addToolBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addNewTool());
        }
    }

    goToMainPage() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToHomeworkPage() {
        const homeworkPage = new HomeworkPage(this.parent);
        homeworkPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        // Передаём ТРИ колбэка: главная, инструменты (обновить текущую), домашнее задание
        header.render(
            () => this.goToMainPage(),     // Главная
            () => this.render(),            // Инструменты (обновить текущую страницу)
            () => this.goToHomeworkPage()   // Домашнее задание
        );
        const footer = new FooterComponent(document.getElementById("footer-root"));
        footer.render();

        this.addEventListeners();
        this.renderToolsList();
    }
}