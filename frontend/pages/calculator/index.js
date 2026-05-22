import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { CalculatorCardComponent } from "../../components/calculator-card/index.js";
import { InfoAccordionComponent } from "../../components/info-accordion/index.js";
import { MainPage } from "../main/index.js";

export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('calculator-page');
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>
                <div id="calculator-page" class="calculator-container">
                    <div class="calculator-page-content">
                        <div id="back-button-root"></div>
                        <div id="calculator-card-root"></div>
                        <div id="accordion-root"></div>
                    </div>
                </div>
            </div>
        `;
    }

    calculate() {
        const vuCount = parseInt(document.getElementById('vuCount')?.value) || 0;
        const toolSelect = document.getElementById('toolSelect');
        const scenarioSelect = document.getElementById('scenarioSelect');
        
        const maxVU = {
            jmeter: 800,
            gatling: 1500,
            k6: 3000
        };
        
        const tool = toolSelect?.value || 'jmeter';
        const maxPerGen = maxVU[tool];
        const scenarioKoef = parseFloat(scenarioSelect?.value || 1.0);
        
        const effectiveMax = Math.floor(maxPerGen / scenarioKoef);
        const generatorsNeeded = Math.ceil(vuCount / effectiveMax);
        
        const resultBlock = document.getElementById('resultBlock');
        const resultText = document.getElementById('resultText');
        
        if (resultBlock && resultText) {
            resultBlock.style.display = 'block';
            resultText.innerHTML = `
                <p><strong>Виртуальных пользователей:</strong> ${vuCount.toLocaleString()}</p>
                <p><strong>Макс. VU на генератор (с учетом сценария):</strong> ${effectiveMax.toLocaleString()}</p>
                <p><strong>Необходимое количество генераторов:</strong> <span class="fw-bold text-primary fs-4">${generatorsNeeded}</span></p>
                <hr>
                <small class="text-muted">* Расчет произведен с учетом коэффициента сценария ${scenarioKoef}x</small>
            `;
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        const backButton = new BackButtonComponent(document.getElementById("back-button-root"));
        backButton.render(this.clickBack.bind(this));

        const calculatorCard = new CalculatorCardComponent(document.getElementById("calculator-card-root"));
        calculatorCard.render(this.calculate.bind(this));

        const accordion = new InfoAccordionComponent(document.getElementById("accordion-root"));
        accordion.render();

        // Автоматический расчет при изменении полей
        const vuCount = document.getElementById('vuCount');
        const toolSelect = document.getElementById('toolSelect');
        const scenarioSelect = document.getElementById('scenarioSelect');
        
        if (vuCount) vuCount.addEventListener('input', () => this.calculate());
        if (toolSelect) toolSelect.addEventListener('change', () => this.calculate());
        if (scenarioSelect) scenarioSelect.addEventListener('change', () => this.calculate());
        
        this.calculate();
    }
}