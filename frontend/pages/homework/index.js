import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { MainPage } from "../main/index.js";
import { ToolsPage } from "../tools/index.js";

export class HomeworkPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>
                <div id="homework-page" class="homework-container">
                    <h1 class="homework-title">📚 Домашнее задание</h1>
                    
                    <!-- Задание 2.9 -->
                    <div class="task-card">
                        <h2 class="task-title">Задание 2.9 (2 уровень)</h2>
                        <p class="task-description">
                            Написать функцию, которая проверит можно ли получить из одного массива другой каким-либо способом.
                            <br><strong>Пример:</strong> [1, 2, 3, 8, -2] и [2, 3, 8, 1, -2] → true
                        </p>
                        
                        <div class="task-inputs">
                            <div class="input-group">
                                <label>Первый массив:</label>
                                <input type="text" id="array1" class="task-input" value="[1, 2, 3, 8, -2]" placeholder="[1, 2, 3]">
                            </div>
                            <div class="input-group">
                                <label>Второй массив:</label>
                                <input type="text" id="array2" class="task-input" value="[2, 3, 8, 1, -2]" placeholder="[2, 3, 1]">
                            </div>
                            <button id="checkArraysBtn" class="task-btn">Проверить</button>
                        </div>
                        
                        <div id="task1Result" class="task-result"></div>
                    </div>
                    
                    <!-- Задание 3.4 -->
                    <div class="task-card">
                        <h2 class="task-title">Задание 3.4 (3 уровень)</h2>
                        <p class="task-description">
                            Напишите функцию sort, которая будет сортировать буквы в словах по алфавиту, 
                            а потом получившиеся слова в предложении — тоже. Первую букву каждого слова 
                            она сделает прописной, остальные — строчными.
                        </p>
                        
                        <div class="task-inputs">
                            <div class="input-group">
                                <label>Введите предложение:</label>
                                <input type="text" id="sentenceInput" class="task-input" value="кошка собака енот" placeholder="кошка собака енот">
                            </div>
                            <button id="sortSentenceBtn" class="task-btn">Сортировать</button>
                        </div>
                        
                        <div id="task2Result" class="task-result"></div>
                    </div>
                    
                    <div class="task-note">
                        <p>💡 <strong>Примечание:</strong> Массивы вводите в формате JSON, например: [1, 2, 3] или ["a", "b", "c"]</p>
                    </div>
                </div>
                <div id="footer-root"></div>
            </div>
        `;
    }

    // ========== Задание 2.9 ==========
    canGetArrayFromAnother(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        for (let i = 0; i < sorted1.length; i++) {
            if (sorted1[i] !== sorted2[i]) return false;
        }
        return true;
    }
    
    parseArrayInput(inputStr) {
        try {
            let cleaned = inputStr.trim();
            if (!cleaned) return [];
            return JSON.parse(cleaned);
        } catch (e) {
            try {
                let cleaned2 = cleaned.replace(/[\[\]]/g, '');
                let parts = cleaned2.split(',').map(p => p.trim());
                return parts.map(p => {
                    if (!isNaN(p) && p !== '') return Number(p);
                    return p;
                });
            } catch (e2) {
                return null;
            }
        }
    }

    handleTask1() {
        const input1 = document.getElementById('array1').value;
        const input2 = document.getElementById('array2').value;
        const resultDiv = document.getElementById('task1Result');
        
        const arr1 = this.parseArrayInput(input1);
        const arr2 = this.parseArrayInput(input2);
        
        if (arr1 === null || arr2 === null) {
            resultDiv.innerHTML = `
                <div class="result-error">
                    ❌ Ошибка: Неверный формат массива. Используйте формат: [1, 2, 3]
                </div>
            `;
            return;
        }
        
        const result = this.canGetArrayFromAnother(arr1, arr2);
        
        resultDiv.innerHTML = `
            <div class="result-${result ? 'success' : 'error'}">
                ${result ? '✅' : '❌'} Результат: ${result}
            </div>
        `;
    }

    // ========== Задание 3.4 ==========
    sortWord(word) {
        let sorted = word.toLowerCase().split('').sort().join('');
        return sorted.charAt(0).toUpperCase() + sorted.slice(1).toLowerCase();
    }
    
    sortSentence(sentence) {
        if (!sentence || sentence.trim() === '') return '';
        let words = sentence.trim().split(/\s+/);
        let sortedWords = words.map(word => this.sortWord(word));
        sortedWords.sort((a, b) => a.localeCompare(b));
        return sortedWords.join(' ');
    }

    handleTask2() {
        const input = document.getElementById('sentenceInput').value;
        const resultDiv = document.getElementById('task2Result');
        
        if (!input || input.trim() === '') {
            resultDiv.innerHTML = `
                <div class="result-error">
                    ❌ Ошибка: Введите предложение!
                </div>
            `;
            return;
        }
        
        const result = this.sortSentence(input);
        
        resultDiv.innerHTML = `
            <div class="result-success">
                ✅ Результат: "${result}"
            </div>
        `;
    }

    addEventListeners() {
        const task1Btn = document.getElementById('checkArraysBtn');
        if (task1Btn) {
            task1Btn.addEventListener('click', () => this.handleTask1());
        }
        
        const task2Btn = document.getElementById('sortSentenceBtn');
        if (task2Btn) {
            task2Btn.addEventListener('click', () => this.handleTask2());
        }
    }

    goToMainPage() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToToolsPage() {
        const toolsPage = new ToolsPage(this.parent);
        toolsPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(
            () => this.goToMainPage(),
            () => this.goToToolsPage(),
            () => this.render()
        );

        this.addEventListeners();
        
        // Добавляем футер
        const footer = new FooterComponent(document.getElementById("footer-root"));
        footer.render();
    }
}