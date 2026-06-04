# Домашнее задание

Невечер Арсений ИУ5-44Б

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-данной-лабораторной-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
- [Порядок показа](#порядок-показа)

## Цель домашнего задания
Работа с коллекциями, функциями, классами.

## **Тема:** Планирование мощности тестовой инфраструктуры. Услуги - инструменты нагрузочного тестирования (JMeter, Gatling, k6) и типы тестов, заявка - расчет необходимого количества генераторов нагрузки для имитации заданного количества виртуальных пользователей с указанным сценарием поведения.

## **Сайт** для вдохновения: (https://mkskom.ru/)

## Дополнительные задания
1. Даны массив строк words и строка str. Обе строки состоят только из строчных английских букв.

Необходимо посчитать все слова, которые являются префиксами строки str и вывести их количество.

Префикс строки - это подстрока, которая встречается в начале строки. Подстрока - это непрерывная последовательность символов внутри строки.

Входные данные: words = ["a", "b", "c", "ab","bc", "abc"], s = "abc" Вывод: 3
```js
    countOrbitRequestPrefixes(orbitWordsCollection, orbitRequestString) {
        let orbitPrefixCount = 0;

        orbitWordsCollection.forEach((orbitWord) => {
            if (orbitRequestString.startsWith(orbitWord)) {
                orbitPrefixCount += 1;
            }
        });

        return orbitPrefixCount;
    }

    countOrbitPrefixes() {
        const orbitRequestInput = document.getElementById("orbit-prefix-input").value.toLowerCase();

        const orbitWordsCollection = [
            "g",
            "ge",
            "geo",
            "geos",
            "geost",
            "orbit",
            "station",
            "geostationary"
        ];

        const orbitPrefixCount = this.countOrbitRequestPrefixes(
            orbitWordsCollection,
            orbitRequestInput
        );

        document.getElementById("prefix-result").textContent =
            `Количество слов-префиксов: ${orbitPrefixCount}`;
    }
```
2. Напишите функцию sort, которая будет сортировать буквы в словах по алфавиту, а потом получившиеся слова в предложении — тоже. Первую букву каждого слова она сделает прописной, остальные — строчными
```js
    formatOrbitSentence(orbitSentenceString) {
        let normalizedOrbitSentence = orbitSentenceString.trim();

        do {
            normalizedOrbitSentence = normalizedOrbitSentence.replaceAll("  ", " ");
        } while (normalizedOrbitSentence.includes("  "));

        const orbitWordsArray = normalizedOrbitSentence.split(" ");

        const sortedOrbitWordsArray = orbitWordsArray.map((orbitWord) => {
            const lowerOrbitWord = orbitWord.toLowerCase();
            const sortedLetters = lowerOrbitWord.split("").sort().join("");
            return sortedLetters;
        });

        sortedOrbitWordsArray.sort();

        const formattedOrbitWordsArray = sortedOrbitWordsArray.map((orbitWord) => {
            return orbitWord.charAt(0).toUpperCase() + orbitWord.slice(1).toLowerCase();
        });

        return formattedOrbitWordsArray.join(" ");
    }

    sortOrbitWords() {
        const orbitNamesSentence = this.data
            .map((orbitObject) => orbitObject.type)
            .join(" ");

        const formattedOrbitSentence = this.formatOrbitSentence(orbitNamesSentence);

        document.getElementById("sort-result").textContent =
            `Результат сортировки: ${formattedOrbitSentence}`;
    }
```
3. Необходимо реализовать 3D модель системного компьютера в футере.
```js
export class FooterComponent {
    constructor(parent) {
        this.parent = parent;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationId = null;
    }

    getHTML() {
        return `
            <footer class="main-footer">
                <div class="footer-container">
                    <div class="footer-info">
                        <div class="footer-logo">
                            <img src="mkskom.png" alt="МКСКОМ" onerror="this.style.display='none'">
                        </div>
                        <div class="footer-text">
                            <p>© 2024 Планирование мощности тестовой инфраструктуры</p>
                            <p>Разработано: Невечеря Арсений Дмитриевич, ИУ5-44Б</p>
                        </div>
                    </div>
                    <div class="footer-3d">
                        <div id="footer-canvas-container" class="footer-canvas-container"></div>
                        <p class="footer-3d-label">🖥️ Серверная стойка | 3D Модель</p>
                    </div>
                </div>
            </footer>
        `;
    }

    async initThree() {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        
        const container = document.getElementById('footer-canvas-container');
        if (!container) {
            console.error('Container not found');
            return;
        }

        const width = container.clientWidth || 220;
        const height = container.clientHeight || 160;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f0f1a);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(2, 1.5, 3);
        this.camera.lookAt(0, 0.5, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x0f0f1a, 1);
        
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 3, 2);
        this.scene.add(mainLight);

        const fillLight = new THREE.PointLight(0x4466aa, 0.5);
        fillLight.position.set(-1, 1, -1);
        this.scene.add(fillLight);

        const backLight = new THREE.PointLight(0xffaa66, 0.3);
        backLight.position.set(0, 1, -2);
        this.scene.add(backLight);

        const gridHelper = new THREE.GridHelper(5, 10, 0x667eea, 0x334155);
        gridHelper.position.y = -0.8;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.scene.add(gridHelper);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 1.5;
        this.controls.zoomSpeed = 1.2;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.target.set(0, 0.5, 0);
        this.controls.update();

        console.log('Three.js инициализирован');

        this.loadModel(THREE, GLTFLoader);

        this.animate(THREE);
    }

    loadModel(THREE, GLTFLoader) {
        const loader = new GLTFLoader();
        const pathsToTry = [
            './models/server_rack.glb',
            'models/server_rack.glb',
            '/models/server_rack.glb'
        ];
        
        let currentTry = 0;
        
        const tryLoad = () => {
            if (currentTry >= pathsToTry.length) {
                console.error('Все пути не сработали, создаю запасную модель');
                this.createFallbackModel(THREE);
                return;
            }
            
            const path = pathsToTry[currentTry];
            console.log(`Попытка ${currentTry + 1}: загрузка ${path}`);
            
            loader.load(path, (gltf) => {
                console.log('✅ Модель загружена!');
                this.model = gltf.scene;
                
                // Центрируем модель
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 1.2 / maxDim;
                this.model.scale.set(scale, scale, scale);
                
                this.model.position.x = -center.x * scale;
                this.model.position.z = -center.z * scale;
                this.model.position.y = -box.min.y * scale;
                
                this.scene.add(this.model);
            }, (progress) => {
                if (progress.loaded && progress.total) {
                    console.log(`Загрузка: ${Math.round(progress.loaded / progress.total * 100)}%`);
                }
            }, (error) => {
                console.warn(`❌ Не удалось загрузить ${path}:`, error.message);
                currentTry++;
                tryLoad();
            });
        };
        
        tryLoad();
    }

    createFallbackModel(THREE) {
        console.log('📦 Создаю запасную модель серверной стойки');
        const group = new THREE.Group();
        
        // Корпус
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.6, roughness: 0.4 });
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.3, 0.7), bodyMat);
        body.castShadow = true;
        group.add(body);
        
        // Панель
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3 });
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.25, 0.05), panelMat);
        panel.position.z = 0.36;
        group.add(panel);
        
        // Индикаторы
        const ledMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1e3a8a });
        for (let i = -0.5; i <= 0.5; i += 0.25) {
            const led = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), ledMat);
            led.position.set(i, 0.4, 0.4);
            group.add(led);
        }
        
        this.model = group;
        this.scene.add(this.model);
    }

    animate(THREE) {
        const animateFn = () => {
            this.animationId = requestAnimationFrame(animateFn);
            
            if (this.controls) {
                this.controls.update();
            }
            
            if (this.model) {
                this.model.rotation.y += 0.003;
            }
            
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };
        
        animateFn();
    }

    handleResize() {
        const container = document.getElementById('footer-canvas-container');
        if (!container || !this.renderer || !this.camera) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
    }

    async render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        setTimeout(async () => {
            try {
                await this.initThree();
                window.addEventListener('resize', () => this.handleResize());
            } catch (error) {
                console.error('Ошибка инициализации 3D:', error);
                const container = document.getElementById('footer-canvas-container');
                if (container) {
                    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#667eea;flex-direction:column;"><span>🖥️</span><span style="font-size:10px;margin-top:5px;">Серверная стойка</span></div>';
                }
            }
        }, 100);
    }
}
```
