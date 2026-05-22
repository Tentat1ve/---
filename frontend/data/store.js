import { baseTools } from "./tools.js";

// Глобальное хранилище данных
let tools = [];

// Инициализация хранилища (загружаем данные из localStorage или используем базовые)
function loadFromStorage() {
    const saved = localStorage.getItem('loadTestingTools');
    if (saved) {
        tools = JSON.parse(saved);
    } else {
        tools = JSON.parse(JSON.stringify(baseTools)); // Глубокое копирование
    }
}

// Сохранение в localStorage
function saveToStorage() {
    localStorage.setItem('loadTestingTools', JSON.stringify(tools));
}

// Получить все инструменты
export function getAllTools() {
    loadFromStorage();
    return [...tools];
}

// Получить инструмент по ID
export function getToolById(id) {
    loadFromStorage();
    return tools.find(tool => tool.id === id);
}

// Добавить новый инструмент
export function addTool(tool) {
    loadFromStorage();
    tools.push(tool);
    saveToStorage();
}

// Обновить инструмент
export function updateTool(id, updates) {
    loadFromStorage();
    const index = tools.findIndex(tool => tool.id === id);
    if (index !== -1) {
        tools[index] = { ...tools[index], ...updates };
        saveToStorage();
    }
}

// Удалить инструмент
export function deleteTool(id) {
    loadFromStorage();
    tools = tools.filter(tool => tool.id !== id);
    saveToStorage();
}

// Получить следующий ID
export function getNextId() {
    loadFromStorage();
    const maxId = Math.max(...tools.map(t => t.id), 0);
    return maxId + 1;
}