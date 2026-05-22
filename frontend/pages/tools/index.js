import { HeaderComponent } from "../../components/header/index.js";
import { ToolCardComponent } from "../../components/tool-card/index.js";
import { getAllTools, createTool, deleteTool, updateTool } from "../../data/api.js";
import { MainPage } from "../main/index.js";
import { ToolPage } from "../tool/index.js";
import { HomeworkPage } from "../homework/index.js";

export class ToolsPage {
    constructor(parent) {
        this.parent = parent;
        this.tools = [];
        this.filteredTools = [];
        this.currentFilter = '';
        this.init();
    }

    async init() {
        await this.updateToolsList();
        this.render();
    }

    async updateToolsList() {
        try {
            this.tools = await getAllTools();
            this.filterTools();
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.tools = [];
            this.filteredTools = [];
        }
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
                            <button type="button" id="addToolBtn" class="add-tool-btn">➕ Добавить инструмент</button>
                        </div>
                    </div>
                    <div id="tools-list" class="tools-grid"></div>
                </div>
            </div>
        `;
    }

    async addNewTool() {
        const newTool = {
            title: `Новый инструмент ${Date.now()}`,
            text: "Описание нового инструмента нагрузочного тестирования",
            type: "Инструмент",
            metric: 500,
            metricUnit: "VU",
            details: "Это новый инструмент для нагрузочного тестирования.",
            protocol: "HTTP, HTTPS",
            language: "JavaScript"
        };
        
        try {
            await createTool(newTool);
            await this.updateToolsList();
            this.refreshList();
        } catch (error) {
            console.error('Ошибка создания:', error);
            alert('Не удалось создать инструмент');
        }
    }

    async updateMetric(id, newValue) {
        try {
            await updateTool(id, { metric: newValue });
            await this.updateToolsList();
            this.refreshList();
        } catch (error) {
            console.error('Ошибка обновления:', error);
            alert('Не удалось обновить значение');
        }
    }

    async deleteTool(id) {
        if (!confirm('Удалить этот инструмент?')) return;
        
        try {
            await deleteTool(id);
            await this.updateToolsList();
            this.refreshList();
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Не удалось удалить инструмент');
        }
    }

    filterTools() {
        if (this.currentFilter) {
            this.filteredTools = this.tools.filter(tool =>
                tool.title && tool.title.toLowerCase().includes(this.currentFilter.toLowerCase())
            );
        } else {
            this.filteredTools = [...this.tools];
        }
    }

    refreshList() {
        const container = document.getElementById('tools-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.filteredTools.length === 0) {
            container.innerHTML = '<div class="text-center p-5">🔭 Инструменты не найдены</div>';
            return;
        }
        
        this.filteredTools.forEach(tool => {
            const card = new ToolCardComponent(container);
            card.render(
                tool,
                (id) => this.goToDetail(id),
                (id) => this.deleteTool(id),
                (id, val) => this.updateMetric(id, val)
            );
        });
    }

    goToDetail(id) {
        const detailPage = new ToolPage(this.parent, id);
        detailPage.render();
    }

    setupListeners() {
        const filterInput = document.getElementById('filterInput');
        if (filterInput) {
            filterInput.oninput = (e) => {
                this.currentFilter = e.target.value;
                this.filterTools();
                this.refreshList();
            };
        }
        
        const addBtn = document.getElementById('addToolBtn');
        if (addBtn) {
            addBtn.onclick = async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await this.addNewTool();
                return false;
            };
        }
    }

    goToMain() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToHomework() {
        const homeworkPage = new HomeworkPage(this.parent);
        homeworkPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(
            () => this.goToMain(),
            () => this.render(),
            () => this.goToHomework()
        );

        this.setupListeners();
        this.refreshList();
    }
}