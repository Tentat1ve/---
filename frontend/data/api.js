// frontend/data/api.js
const API_URL = 'http://localhost:3000/api/tools';

// GET запрос - получить все инструменты
export async function getAllTools() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('GET /api/tools error:', error);
        throw error;
    }
}

// GET запрос - получить инструмент по ID
export async function getToolById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`GET /api/tools/${id} error:`, error);
        throw error;
    }
}

// POST запрос - создать инструмент
export async function createTool(toolData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toolData)
        });
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('POST /api/tools error:', error);
        throw error;
    }
}

// PATCH запрос - обновить инструмент
export async function updateTool(id, toolData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toolData)
        });
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`PATCH /api/tools/${id} error:`, error);
        throw error;
    }
}

// DELETE запрос - удалить инструмент
export async function deleteTool(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        return true;
    } catch (error) {
        console.error(`DELETE /api/tools/${id} error:`, error);
        throw error;
    }
}