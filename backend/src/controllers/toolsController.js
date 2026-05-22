const toolsService = require('../services/toolsService');

const getAllTools = (req, res) => {
    const { title } = req.query;
    const tools = toolsService.findAll(title);
    res.json(tools);
};

const getToolById = (req, res) => {
    const id = parseInt(req.params.id);
    const tool = toolsService.findOne(id);
    if (!tool) {
        return res.status(404).json({ error: 'Инструмент не найден' });
    }
    res.json(tool);
};

const createTool = (req, res) => {
    const { src, title, text, type, metric, metricUnit, details, protocol, language } = req.body;
    
    if (!title || !text) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }
    
    const newTool = toolsService.create({
        src: src || 'https://placehold.co/400x200/3e72dd/white?text=New+Tool',
        title,
        text,
        type: type || 'Инструмент',
        metric: metric || 500,
        metricUnit: metricUnit || 'VU',
        details: details || '',
        protocol: protocol || 'HTTP, HTTPS',
        language: language || 'JavaScript'
    });
    
    res.status(201).json(newTool);
};

const updateTool = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTool = toolsService.update(id, req.body);
    if (!updatedTool) {
        return res.status(404).json({ error: 'Инструмент не найден' });
    }
    res.json(updatedTool);
};

const deleteTool = (req, res) => {
    const id = parseInt(req.params.id);
    const success = toolsService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Инструмент не найден' });
    }
    res.status(204).send();
};

module.exports = { getAllTools, getToolById, createTool, updateTool, deleteTool };