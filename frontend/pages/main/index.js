import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { ToolsPage } from "../tools/index.js";
import { HomeworkPage } from "../homework/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.footer = null;
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>
                <div class="home-container">
                    <div class="theme-card">
                        <h1 class="theme-title">Тема проекта</h1>
                        <div class="theme-badge">
                            «Планирование мощности тестовой инфраструктуры. Услуги - инструменты нагрузочного тестирования (JMeter, Gatling, k6) и типы тестов, заявка - расчет необходимого количества генераторов нагрузки для имитации заданного количества виртуальных пользователей с указанным сценарием поведения.»
                        </div>

                        <div class="student-section">
                            <h2 class="section-title">Выполнил ученик</h2>
                            <div class="student-badge">
                                <span class="student-name">Невечеря Арсений Дмитриевич</span>
                                <span class="student-group">Группа: ИУ5-44Б</span>
                            </div>            
                        </div>

                        <div class="original-site-section">
                            <h2 class="section-title">Ссылка на оригинальный сайт</h2>
                            <a href="https://mkskom.ru/" target="_blank" class="original-site-link" rel="noopener noreferrer">              
                                mkskom.ru
                            </a>
                            <p class="site-note">Официальный сайт компании «МКСКОМ»</p>
                        </div>          
                    </div>
                </div>
                <div id="footer-root"></div>
            </div>
        `;
    }

    showToolsPage() {
        if (this.footer) {
            this.footer.dispose();
        }
        const toolsPage = new ToolsPage(this.parent);
        toolsPage.render();
    }

    showHomeworkPage() {
        if (this.footer) {
            this.footer.dispose();
        }
        const homeworkPage = new HomeworkPage(this.parent);
        homeworkPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(
            () => this.render(),
            () => this.showToolsPage(),
            () => this.showHomeworkPage()
        );

        // Добавляем футер
        this.footer = new FooterComponent(document.getElementById("footer-root"));
        this.footer.render();
    }
}