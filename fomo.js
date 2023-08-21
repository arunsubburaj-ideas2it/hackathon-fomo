class FOMOBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['delay', 'position', 'enable', 'coupon','offer', 'expiry'];
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
        const offer = this.getAttribute("offer") || "5% Offer!!!";
        const coupon = this.getAttribute("coupon") || "EE234FR@@#34";
        const expiry = this.getAttribute("expiry") || "2023/08/25";
        const expiryDate = new Date(expiry).toLocaleDateString();
        this.shadowRoot.innerHTML = `
        <style>
            .root {
                display: ${enable ? 'block' : 'none'};
                position: fixed;
                ${this.getInitialPositionStyle(position)};
                transition: all 0.75s;
                padding: 10px;
                border: 1px solid #ccc;
                z-index: 9999;
                opacity: 0;
                border-radius: 30px;
                box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
                max-width: 280px;
            }
            .root.active {
                opacity: 1;
                ${this.getPositionStyle(position)};
            }
            .pop-parent {
                background: rgb(255, 255, 255); 
                border-radius: 25px; 
                text-align: center; 
                display: flex; 
                flex-direction: column; 
                align-items: center;
            }
            .blue-area {
                width: 100%;
                background: rgb(0, 110, 240);
                border-radius: 25px;
                color: rgb(255, 255, 255);
                padding: 10px 0px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                height: 80px;
            }
            .middle-sec{
                background: rgb(255, 255, 255); 
                width: 70%; 
                box-shadow: rgb(162, 159, 159) 0px 0px 4px; 
                padding: 10px 0px; 
                border-radius: 30px; 
                position: relative; 
                margin-top: -30px;
            }
            .bottom-sec {
                display: flex;
                flex-direction: column;
            }
            .copyBtn {
                font-weight: 700;
                background: rgb(0, 109, 239);
                border-radius: 20px;
                color: rgb(255, 255, 255);
                border: none;
                padding: 10px;
                text-transform: uppercase;
                cursor: pointer;
            }
        </style>
        <div class="root">
            <div class="pop-parent">
            <section class="blue-area">
                <div style="padding: 5px 0px;">Last-minute Deal!</div>
                <div style="padding: 5px 0px;">${offer}</div>
            </section>
            <section class="middle-sec">
                <div style="color: rgb(0, 0, 0);">Limited time offer</div>
                <div class="timer" style="color: rgb(0, 109, 239);">${expiryDate}</div>
            </section>
            <section class="bottom-sec">
                <p>Coupon code will be copied to clipboard for use...</p>
                <button class="copyBtn" onclick="copyToClipboard">get now</a>
            </section>
            </div>
        </div>
    `;
        setTimeout(() => {
            this.shadowRoot.querySelector(".root").classList.add("active")
        }, delay);
    }
    copyToClipboard() {
        const coupon = this.getAttribute("coupon");
        console.log("fomo button clicked...", coupon)
    }
}

customElements.define('node-fomo', FOMOBox);
