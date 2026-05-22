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
                            <div class="nav-item" id="homeworkNavLink">📚 Домашнее задание</div>
                        </nav>
                    </div>
                    <div class="header-right">
                        <button class="request-btn" id="requestBtn">GitHub</button>
                    </div>
                </div>
            </header>
        `;
    }

    addListeners(homeListener, toolsListener, homeworkListener) {
        const logoLink = document.getElementById('logoLink');
        if (logoLink) {
            logoLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                homeListener();
                return false;
            };
        }
        
        const homeLink = document.getElementById('homeNavLink');
        if (homeLink) {
            homeLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                homeListener();
                return false;
            };
        }
        
        const toolsLink = document.getElementById('toolsNavLink');
        if (toolsLink) {
            toolsLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toolsListener();
                return false;
            };
        }
        
        const homeworkLink = document.getElementById('homeworkNavLink');
        if (homeworkLink) {
            homeworkLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                homeworkListener();
                return false;
            };
        }
        
        const requestBtn = document.getElementById('requestBtn');
        if (requestBtn) {
            requestBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'https://github.com/Tentat1ve';
                return false;
            };
        }
    }

    render(homeListener, toolsListener, homeworkListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(homeListener, toolsListener, homeworkListener);
    }
}