export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <header class="main-header">
                <div class="header-container">
                    <div class="header-left">
                        <a href="#" class="logo" id="logoLink">
                            <img src="mkskom.png" alt="МКСКОМ">
                        </a>
                        <nav class="main-nav">
                            <div class="nav-item" id="homeNavLink">Главная</div>
                            <div class="nav-item" id="toolsNavLink">Инструменты</div>
                        </nav>
                    </div>
                    <div class="header-right">
                        <button class="request-btn" id="requestBtn">GitHub</button>
                    </div>
                </div>
            </header>
        `;
    }

    addListeners(homeListener, toolsListener) {
        document.getElementById('logoLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            homeListener();
        });
        document.getElementById('homeNavLink')?.addEventListener('click', () => {
            homeListener();
        });
        document.getElementById('toolsNavLink')?.addEventListener('click', () => {
            toolsListener();
        });
        document.getElementById('requestBtn')?.addEventListener('click', () => {
            window.location.href = 'https://github.com/Tentat1ve';
        });
    }

    render(homeListener, toolsListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(homeListener, toolsListener);
    }
}