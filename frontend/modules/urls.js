// frontend/modules/urls.js
class ApiUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getTools() {
        return `${this.baseUrl}/api/tools`;
    }

    getToolById(id) {
        return `${this.baseUrl}/api/tools/${id}`;
    }

    createTool() {
        return `${this.baseUrl}/api/tools`;
    }

    updateTool(id) {
        return `${this.baseUrl}/api/tools/${id}`;
    }

    deleteTool(id) {
        return `${this.baseUrl}/api/tools/${id}`;
    }
}

export const apiUrls = new ApiUrls();