export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const backBtn = document.getElementById("back-button");
        if (backBtn) {
            // Убираем старый обработчик, если был
            const newBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBtn, backBtn);
            newBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                listener();
            });
        }
    }

    getHTML() {
        return `
            <button id="back-button" class="back-btn" type="button">
                ← Назад к списку инструментов
            </button>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}