class FOMOBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['delay', 'position', 'enable', 'coupon', 'offer', 'expiry'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
        this.wireEvents();
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
        const expiryDate = new Date(expiry).toDateString();
        this.shadowRoot.innerHTML = `
        <style>
            .fomo-button {
                display: ${enable ? 'block' : 'none'};
                position: fixed;
                ${this.getInitialPositionStyle(position)};
                transition: all 0.75s;
                z-index: 9999;
                opacity: 0;
                box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2);
                width: 70px;
                height: 70px;
                background-image: url("https://cdn.shopify.com/s/files/1/0795/3049/2211/files/nc_store_logo.png?v=1692007311");
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 50%;
                cursor: pointer;
            }
            .root-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 10000;
                display: none;
            }
            .root-overlay.active {
                display: block;
            }
            .root {
                display: block;
                position: fixed;
                bottom: -100%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: all 0.75s;
                z-index: 10000;
                opacity: 0;
                border-radius: 30px;
                box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.5);
                width: 280px;
                background-color: #fff;
                text-transform: uppercase;
            }
            .root.active{
                bottom: auto; 
                top: 50%; 
                opacity: 1;
            }
            .fomo-button.active {
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
                position: relative;
            }
            .pop-parent > section:not(:last-child) {
                margin-bottom: 10px;
            }
            .blue-area {
                width: 100%;
                background: #8777F1;
                border-radius: 25px;
                color: rgb(255, 255, 255);
                padding: 20px 0px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                font-weight: bold;
                height: 70px;
            }
            .middle-sec{
                background: #2DDFA0;
                width: 70%;
                box-shadow: rgb(162, 159, 159) 0px 0px 4px;
                padding: 15px 0px;
                border-radius: 30px;
                position: relative;
                margin-top: -30px;
            }
            .timer {
                color: #000;
                font-weight: bold;
                letter-spacing: 2px;
            }
            .bottom-sec {
                display: flex;
                flex-direction: column;
                width: 80%;
                padding-bottom: 10px;
            }
            .copyBtn {
                font-weight: 700;
                background: rgb(0, 109, 239);
                border-radius: 20px;
                color: rgb(255, 255, 255);
                border: none;
                padding: 10px;
                cursor: pointer;
                text-transform: uppercase;
            }
            .closeBtn {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #fff;
                padding: 7px;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                text-transform: lowercase;
                text-align: center;
                font-size: 20px;
                font-family: sans-serif;
                line-height: 10px;
                background: #fff;
                color: #000;
                border: 1px solid #ccc;
                box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.5);
                cursor: pointer;
            }
        </style>
        <div class="root-overlay"></div>
        <div class="root">
            <div class="pop-parent">
                <section class="blue-area">
                    <div>ONLY FEW MORE DAYS!</div>
                    <div style="padding: 5px 0px;">${expiryDate}</div>
                </section>
                <section class="middle-sec">
                    <div class="timer">${offer}</div>
                </section>
                <section class="bottom-sec">
                    <p>Coupon code will be copied for use...</p>
                    <button class="copyBtn" id="getNow">get now</a>
                </section>
                <div class="closeBtn">X</div>
            </div>
        </div>
        <div class='fomo-button'></div>
    `;
        setTimeout(() => {
            this.shadowRoot.querySelector(".fomo-button").classList.add("active");
        }, delay);
    }
    wireEvents() {
        this.shadowRoot.querySelector("#getNow").addEventListener("click", this.copyToClipboard.bind(this));
        this.shadowRoot.querySelector(".closeBtn").addEventListener("click", this.closePopup.bind(this));
        this.shadowRoot.querySelector(".fomo-button").addEventListener("click", this.openPopup.bind(this));
    }
    async copyToClipboard() {
        const coupon = this.getAttribute("coupon");
        console.log("fomo button clicked...", coupon);
        if (navigator.clipboard && window.isSecureContext) {
            try {
              await navigator.clipboard.writeText(coupon);
              console.log("Content copied to clipboard using navigator.clipboard");
              this.closePopup();
            } catch (error) {
              console.error("failed to copy using navigator.clipboard", error);
            }
        }
    }
    closePopup() {
        var popoverEle = this.shadowRoot.querySelector(".root");
        var popoverOverLayEle = this.shadowRoot.querySelector(".root-overlay");
        if (!popoverEle) return;
        popoverOverLayEle.classList.remove("active");
        popoverEle.classList.remove("active");
    }
    openPopup() {
        var popoverEle = this.shadowRoot.querySelector(".root");
        var popoverOverLayEle = this.shadowRoot.querySelector(".root-overlay");
        if (!popoverEle) return;
        popoverOverLayEle.classList.add("active");
        popoverEle.classList.add("active");
    }
}

customElements.define('node-fomo', FOMOBox);
