# ЛР 2. Calculator. HTML/CSS

Невечер Арсений ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** данной лабораторной работы — знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML и CSS.

В ходе выполнения работы необходимо ознакомиться с реализацией простого калькулятора и выполнить задания по варианту.

## **Тема:** Планирование мощности тестовой инфраструктуры. Услуги - инструменты нагрузочного тестирования (JMeter, Gatling, k6) и типы тестов, заявка - расчет необходимого количества генераторов нагрузки для имитации заданного количества виртуальных пользователей с указанным сценарием поведения.

## **Сайт** для вдохновения: (https://mkskom.ru/)

## **Дополнительные задания**
1. Добавить историю для калькултора

```js
function renderHistory() {
    if (!historyList) return;
    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-empty">Нет записей</div>';
      return;
    }
    historyList.innerHTML = history.map(item => `
      <div class="history-item">
        <div class="history-expression">${item.expression}</div>
        <div class="history-result">= ${item.result}</div>
      </div>
    `).join('');
    historyList.scrollTop = historyList.scrollHeight;
  }

  function addToHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > 20) history.pop();
    renderHistory();
  }

  function clearHistory() {
    history = [];
    renderHistory();
  }
```


## План выполнения работы
1. HTML-разметка  
2. Базовая структура HTML-документа  
3. Создание проекта  
4. Верстка калькулятора  
5. CSS  
6. Применение CSS к HTML-документу  
7. Стилизация интерфейса калькулятора  
8. Выполнение задания  
