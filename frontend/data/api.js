// frontend/data/api.js
import { ajax } from '../modules/ajax.js';
import { apiUrls } from '../modules/urls.js';

export function getAllTools(callback) {
    ajax.get(apiUrls.getTools(), (data, status) => {
        if (status === 200) {
            callback(null, data);
        } else {
            callback(`Ошибка ${status}`, null);
        }
    });
}

export function getToolById(id, callback) {
    ajax.get(apiUrls.getToolById(id), (data, status) => {
        if (status === 200) {
            callback(null, data);
        } else {
            callback(`Ошибка ${status}: инструмент не найден`, null);
        }
    });
}

export function createTool(toolData, callback) {
    ajax.post(apiUrls.createTool(), toolData, (data, status) => {
        if (status === 201) {
            callback(null, data);
        } else {
            callback(`Ошибка ${status}`, null);
        }
    });
}

export function updateTool(id, toolData, callback) {
    ajax.patch(apiUrls.updateTool(id), toolData, (data, status) => {
        if (status === 200) {
            callback(null, data);
        } else {
            callback(`Ошибка ${status}`, null);
        }
    });
}

export function deleteTool(id, callback) {
    ajax.delete(apiUrls.deleteTool(id), (data, status) => {
        if (status === 204) {
            callback(null, true);
        } else {
            callback(`Ошибка ${status}`, null);
        }
    });
}