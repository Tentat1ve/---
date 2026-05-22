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
        this.isLoading = false;
        this.init();
    }

    async init() {
        await this.loadTools();
        this.render();
    }

    async loadTools() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        try {
            this.tools = await getAllTools();
            this.filteredTools = [...this.tools];
            console.log('✅ Загружено инструментов:', this.tools.length);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.tools = [];
            this.filteredTools = [];
        }
        
        this.isLoading = false;
    }

    getHTML() {
        return `
            <div id="tools-root">
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
        console.log('🔵 addNewTool вызван');
        
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
        
        try {
            const created = await createTool(newTool);
            console.log('✅ Создан инструмент:', created);
            await this.loadTools();
            this.refreshList();
        } catch (error) {
            console.error('❌ Ошибка создания:', error);
        }
    }

    async updateMetric(id, newValue) {
        console.log('🔵 updateMetric вызван', id, newValue);
        
        try {
            await updateTool(id, { metric: newValue });
            console.log('✅ Метрика обновлена');
            await this.loadTools();
            this.refreshList();
        } catch (error) {
            console.error('❌ Ошибка обновления:', error);
        }
    }

    async deleteTool(id) {
        console.log('🔵 deleteTool вызван', id);
        
        if (!confirm('Удалить этот инструмент?')) return;
        
        try {
            await deleteTool(id);
            console.log('✅ Инструмент удалён');
            await this.loadTools();
            this.refreshList();
        } catch (error) {
            console.error('❌ Ошибка удаления:', error);
        }
    }

    filterTools(value) {
        console.log('🔵 filterTools вызван', value);
        this.currentFilter = value;
        
        if (value) {
            this.filteredTools = this.tools.filter(tool =>
                tool.title && tool.title.toLowerCase().includes(value.toLowerCase())
            );
        } else {
            this.filteredTools = [...this.tools];
        }
        this.refreshList();
    }

    refreshList() {
        console.log('🔄 refreshList: отрисовка', this.filteredTools.length, 'карточек');
        
        const container = document.getElementById('tools-list');
        if (!container) {
            console.error('❌ Контейнер tools-list не найден');
            return;
        }
        
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
        console.log('🔵 goToDetail вызван', id);
        const detailPage = new ToolPage(this.parent, id);
        detailPage.render();
    }

    goToMain() {
        console.log('🔵 goToMain вызван');
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToHomework() {
        console.log('🔵 goToHomework вызван');
        const homeworkPage = new HomeworkPage(this.parent);
        homeworkPage.render();
    }

    setupListeners() {
        const filterInput = document.getElementById('filterInput');
        if (filterInput) {
            // Удаляем старый обработчик
            const newFilter = filterInput.cloneNode(true);
            filterInput.parentNode.replaceChild(newFilter, filterInput);
            
            newFilter.oninput = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.filterTools(e.target.value);
            };
        }
        
        const addBtn = document.getElementById('addToolBtn');
        if (addBtn) {
            const newBtn = addBtn.cloneNode(true);
            addBtn.parentNode.replaceChild(newBtn, addBtn);
            
            newBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log('🟢 Кнопка "Добавить" нажата');
                this.addNewTool();
                return false;
            };
        }
    }

    render() {
        console.log('🎨 Рендер ToolsPage');
        
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