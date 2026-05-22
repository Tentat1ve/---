import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { InfoAccordionComponent } from "../../components/info-accordion/index.js";
import { getToolById, updateTool } from "../../data/api.js";
import { ToolsPage } from "../tools/index.js";
import { MainPage } from "../main/index.js";
import { HomeworkPage } from "../homework/index.js";

export class ToolPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.tool = null;
    }

    loadTool(callback) {
        getToolById(this.id, (error, data) => {
            if (error) {
                console.error('Ошибка загрузки:', error);
                callback(false);
            } else {
                this.tool = data;
                callback(true);
            }
        });
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
        
        updateTool(this.id, updates, (error) => {
            if (error) {
                console.error('Ошибка сохранения:', error);
                alert('Не удалось сохранить изменения');
            } else {
                // Обновляем данные
                getToolById(this.id, (err, data) => {
                    if (!err && data) {
                        this.tool = data;
                        this.renderToolDetail();
                    }
                });
                
                const saveBtn = document.getElementById('save-changes-btn');
                if (saveBtn) {
                    const originalText = saveBtn.textContent;
                    saveBtn.textContent = '✅ Сохранено!';
                    setTimeout(() => {
                        saveBtn.textContent = originalText;
                    }, 2000);
                }
            }
        });
    }

    renderToolDetail() {
        const toolContent = document.getElementById('tool-content');
        if (!toolContent || !this.tool) return;
        
        toolContent.innerHTML = `
            <div class="detail-card">
                <div class="detail-card-body">
                    <div class="edit-mode">
                        <div class="edit-field">
                            <label>Название:</label>
                            <input type="text" id="edit-title" class="edit-input" value="${(this.tool.title || '').replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Краткое описание:</label>
                            <input type="text" id="edit-text" class="edit-input" value="${(this.tool.text || '').replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Макс. VU на генератор:</label>
                            <input type="number" id="edit-metric" class="edit-input" value="${this.tool.metric || 500}" step="100" min="100">
                        </div>
                        
                        <div class="edit-field">
                            <label>Поддерживаемые протоколы:</label>
                            <input type="text" id="edit-protocol" class="edit-input" value="${(this.tool.protocol || 'HTTP, HTTPS').replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Язык сценариев:</label>
                            <input type="text" id="edit-language" class="edit-input" value="${(this.tool.language || 'JavaScript').replace(/"/g, '&quot;')}">
                        </div>
                        
                        <div class="edit-field">
                            <label>Полное описание:</label>
                            <textarea id="edit-details" class="edit-textarea" rows="5">${(this.tool.details || '').replace(/"/g, '&quot;')}</textarea>
                        </div>
                        
                        <button id="save-changes-btn" class="save-changes-btn">💾 Сохранить изменения</button>
                    </div>
                </div>
            </div>
        `;
        
        const saveBtn = document.getElementById('save-changes-btn');
        if (saveBtn) {
            saveBtn.onclick = () => this.saveChanges();
        }
    }

    goToToolsPage() {
        const toolsPage = new ToolsPage(this.parent);
        toolsPage.render();
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
        this.loadTool((success) => {
            if (!success || !this.tool) {
                this.parent.innerHTML = '<div class="text-center p-5">❌ Инструмент не найден</div>';
                return;
            }
            
            this.parent.innerHTML = '';
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());

            const header = new HeaderComponent(document.getElementById("header-root"));
            header.render(
                () => this.goToMainPage(),
                () => this.goToToolsPage(),
                () => this.goToHomeworkPage()
            );

            const backButton = new BackButtonComponent(document.getElementById("back-button-root"));
            backButton.render(() => this.goToToolsPage());

            this.renderToolDetail();

            const accordionRoot = document.getElementById('accordion-root');
            if (accordionRoot) {
                const accordion = new InfoAccordionComponent(accordionRoot);
                accordion.render();
            }
        });
    }
}