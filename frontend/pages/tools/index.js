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

    init() {
        this.updateToolsList();
    }

    updateToolsList() {
        getAllTools((error, data) => {
            if (error) {
                console.error('Ошибка загрузки:', error);
                this.tools = [];
            } else {
                this.tools = data;
            }
            this.filterTools();
            this.render();
        });
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

    addNewTool() {
        const newTool = {
            title: `Новый инструмент ${Date.now()}`,
            text: "Описание нового инструмента",
            type: "Инструмент",
            metric: 500,
            metricUnit: "VU",
            details: "Описание",
            protocol: "HTTP, HTTPS",
            language: "JavaScript"
        };
        
        createTool(newTool, (error) => {
            if (error) {
                console.error('Ошибка создания:', error);
                alert('Не удалось создать инструмент');
            } else {
                this.updateToolsList();
            }
        });
    }

    updateMetric(id, newValue) {
        updateTool(id, { metric: newValue }, (error) => {
            if (error) {
                console.error('Ошибка обновления:', error);
                alert('Не удалось обновить значение');
            } else {
                this.updateToolsList();
            }
        });
    }

    deleteTool(id) {
        if (!confirm('Удалить этот инструмент?')) return;
        
        deleteTool(id, (error) => {
            if (error) {
                console.error('Ошибка удаления:', error);
                alert('Не удалось удалить инструмент');
            } else {
                this.updateToolsList();
            }
        });
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
            addBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.addNewTool();
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