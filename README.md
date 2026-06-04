# ЛР №6. Знакомство с promise и fetch, борка клиентской части

Невечер Арсений ИУ5-44Б

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-данной-лабораторной-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
- [План](#план)
- [Задание](#задание)

## Цель данной лабораторной работы 
Лабораторная состоит из 2-х частей:

Первая часть данной лабораторной работы заключается в изменении механизма взаимодействия с внешним API: в прошлой лабораторной работе использовался XMLHttpRequest, в этой - современный метод fetch. В ходе выполнения работы предстоит познакомиться с кратким полезным теоретическим материалом, кодом реализации простого взаимодействия с внешним API, получением данных и выводом их в интерфейс пользователя, и выполнить задания по варианту.

Вторая часть лабораторной работы заключается в сборке клиентской части приложения: необходимо "сбилдить" клиентскую часть (ЛР №3) с помощью системы сборки, а также добавить в серверную часть (ЛР №4) возможность раздачи клиентской части в качестве статики во избежание проблем с CORS.

## **Тема:** Планирование мощности тестовой инфраструктуры. Услуги - инструменты нагрузочного тестирования (JMeter, Gatling, k6) и типы тестов, заявка - расчет необходимого количества генераторов нагрузки для имитации заданного количества виртуальных пользователей с указанным сценарием поведения.

## **Сайт** для вдохновения: (https://mkskom.ru/)

## Задание 
Замена коллбеков на промисы, запросы fetch. Собрать файлы фронтенда через bundler, развернуть их на сервере c API. Ветка по 6ой лабораторной остается только с файлами исходного кода, а собранный bundle необходимо добавить в ветку по 4ой лабораторной

## Дополнительные задания
1. Переделаны запросы через async, await, fetch.
```js
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (GET):', error);
            throw error;
        }
    }
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (POST):', error);
            throw error;
        }
    }
    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (DELETE):', error);
            throw error;
        }
    }
    async _handleResponse(response) {
        const data = await response.json().catch(() => null);
        return { data, status: response.status };
    }
}

export const ajax = new Ajax();
```
2. Переделано создание запросов
```js
async getData() {
        try {
            const { data } = await ajax.get(stockUrls.getStocks());
            this.cardsData2 = data;
            this.renderData();
        } catch (e) {
            console.error("Ошибка при получении данных:", e);
        }
    }
```
## План

1. Введение в Promise.  
2. Использование Promise.
3. Что такое async await в JS
4. Пояснение про fetch и пример использования.
5. Сборка клиентской части через Vite.
6. Раздача фронтенда в качестве статики
