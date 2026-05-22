// Базовые данные для инструментов
export const baseTools = [
    {
        id: 1,
        src: "https://jmeter.apache.org/images/logo.svg",
        title: "Apache JMeter",
        text: "Классический инструмент нагрузочного тестирования",
        type: "Инструмент",
        metric: 800,
        metricUnit: "VU",
        details: "JMeter — это наиболее популярный инструмент для нагрузочного тестирования. Поддерживает множество протоколов: HTTP, HTTPS, FTP, JDBC, JMS и другие. Имеет удобный GUI для создания сценариев.",
        protocol: "HTTP, HTTPS, FTP, JDBC",
        language: "Java"
    },
    {
        id: 2,
        src: "https://gatling.io/images/logo.svg",
        title: "Gatling",
        text: "Высокопроизводительный инструмент на Scala",
        type: "Инструмент",
        metric: 1500,
        metricUnit: "VU",
        details: "Gatling — современный инструмент на Scala с отличной производительностью. Позволяет создавать сценарии на DSL. Имеет детальные отчеты и графики.",
        protocol: "HTTP, HTTPS, WebSocket",
        language: "Scala"
    },
    {
        id: 3,
        src: "https://k6.io/images/k6-logo.svg",
        title: "k6",
        text: "Инструмент нового поколения на Go",
        type: "Инструмент",
        metric: 3000,
        metricUnit: "VU",
        details: "k6 — современный инструмент от Grafana Labs. Написан на Go, сценарии на JavaScript. Отлично подходит для CI/CD. Имеет встроенную поддержку Kubernetes.",
        protocol: "HTTP/1.1, HTTP/2, gRPC",
        language: "JavaScript"
    },
    {
        id: 4,
        src: "https://locust.io/static/img/logo.png",
        title: "Locust",
        text: "Инструмент на Python для распределенного тестирования",
        type: "Инструмент",
        metric: 1000,
        metricUnit: "VU",
        details: "Locust — инструмент на Python, позволяющий создавать сценарии в виде кода. Поддерживает распределенный режим работы. Идеален для команд, использующих Python в стеке технологий.",
        protocol: "HTTP, HTTPS, WebSocket",
        language: "Python"
    }
];