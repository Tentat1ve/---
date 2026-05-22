const express = require('express');
const cors = require('cors');
const path = require('path');
const toolsRouter = require('./routes/tools');
const toolsService = require('./services/toolsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/tools.json');
toolsService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/tools', toolsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'API для инструментов нагрузочного тестирования' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/tools`);
});