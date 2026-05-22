const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const tools = fileService.readData(dataFilePath);
    if (title) {
        return tools.filter(tool => 
            tool.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return tools;
};

const findOne = (id) => {
    const tools = fileService.readData(dataFilePath);
    return tools.find(tool => tool.id === id);
};

const create = (toolData) => {
    const tools = fileService.readData(dataFilePath);
    const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1;
    const newTool = { id: newId, ...toolData };
    tools.push(newTool);
    fileService.writeData(dataFilePath, tools);
    return newTool;
};

const update = (id, toolData) => {
    const tools = fileService.readData(dataFilePath);
    const index = tools.findIndex(t => t.id === id);
    if (index === -1) return null;
    tools[index] = { ...tools[index], ...toolData };
    fileService.writeData(dataFilePath, tools);
    return tools[index];
};

const remove = (id) => {
    const tools = fileService.readData(dataFilePath);
    const filteredTools = tools.filter(t => t.id !== id);
    if (filteredTools.length === tools.length) return false;
    fileService.writeData(dataFilePath, filteredTools);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };