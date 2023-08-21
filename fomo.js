class FOMOBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['delay', 'position', 'enable'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    getInitialPositionStyle(position) {
        const positionMap = {
            'top left': 'top: -100%; left: 20px;',
            'top right': 'top: -100%; right: 20px;',
            'bottom left': 'bottom: -100%; left:20px;',
            'bottom right': 'bottom: -100%; right: 20px;',
            'center': 'bottom: -100%; left: 50%; transform: translate(-50%, -50%);',
            'bottom center': 'bottom: -100%; left: 50%; transform: translateX(-50%);',
            'top center': 'top: -100%; left: 50%; transform: translateX(-50%);'
        };

        return positionMap[position] || 'top: 20px; left: 20px;';
    }

    getPositionStyle(position) {
        const positionMap = {
            'top left': 'top: 20px; left: 20px;',
            'top right': 'top: 20px; right: 20px;',
            'bottom left': 'bottom: 20px; left: 20px;',
            'bottom right': 'bottom: 20px; right: 20px;',
            'center': 'bottom: auto; top: 50%; left: 50%; transform: translate(-50%, -50%);',
            'bottom center': 'bottom: 20px; left: 50%; transform: translateX(-50%);',
            'top center': 'top: 20px; left: 50%; transform: translateX(-50%);'
        };

        return positionMap[position] || 'top: 20px; left: 20px;';
    }

    render() {
        const delay = parseInt(this.getAttribute('delay')) || 1000;
        const position = this.getAttribute('position') || 'top left';
        const enable = this.getAttribute('enable') === 'true';
        this.shadowRoot.innerHTML = `
        <style>
            .root {
                display: ${enable ? 'block' : 'none'};
                position: fixed;
                ${this.getInitialPositionStyle(position)};
                transition: all 0.75s;
                background-color: #f0f0f0;
                padding: 10px;
                border: 1px solid #ccc;
                z-index: 9999;
                opacity: 0;
                border-radius: 5px;
                box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
            }
            .root.active {
                opacity: 1;
                ${this.getPositionStyle(position)};
            }
        </style>
        <div class="root">
            <slot></slot>
        </div>
    `;
        setTimeout(() => {
            this.shadowRoot.querySelector(".root").classList.add("active")
        }, delay);
    }
}

customElements.define('node-fomo', FOMOBox);
