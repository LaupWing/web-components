export default class Modal extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
            <style>
                :host([open]) #backdrop,
                :host([open]) #modal{
                    pointer-events: all;
                    opacity:1;
                }
                #backdrop{
                    position: fixed;
                    top: 0;
                    left:0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                    opacity:0;
                    background-color: rgba(0,0,0,.5);
                }
                #modal{
                    padding: 10px 15px;
                    position: fixed;
                    top: 40vh;
                    left: 50vw;
                    transform: translateX(-50%);
                    margin:auto;
                    z-index: 100;
                    background: white;
                    border-radius: 15px;
                    pointer-events: none;
                    opacity:0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                #modal h2{
                    margin: 0;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <h2></h2>
                <button>Okay</button>
            </div>
        `
        this._title   = 'Warning'
        this._titleEl = this.shadowRoot.querySelector('#modal h2')
        this.opened   = false
    }
    connectedCallback(){
        if(this.hasAttribute('title')){
            this._title = this.getAttribute('title')
        }
        this._titleEl.textContent = this._title
    }
}

customElements.define('laup-modal', Modal)