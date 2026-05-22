const API_URL = 'http://localhost:3000/api/tools';

export async function getAllTools() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API getAllTools error:', error);
        return [];
    }
}

export async function getToolById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Инструмент не найден');
    return response.json();
}

export async function createTool(toolData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData)
    });
    if (!response.ok) throw new Error('Ошибка создания');
    return response.json();
}

export async function updateTool(id, toolData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData)
    });
    if (!response.ok) throw new Error('Ошибка обновления');
    return response.json();
}

export async function deleteTool(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Ошибка удаления');
    return true;
}