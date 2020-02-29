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
                :host([open]) #modal.left{
                    top: 40vh;
                    left: 50vw;
                    transform: translateX(-50%);
                }
                :host([open]) #modal.top{
                    top: 40vh;
                    left: 50vw;
                    transform: translateX(-50%);
                }
                :host([open]) #modal.bottom{
                    bottom: 60vh;
                    left: 50vw;
                    transform: translateX(-50%);
                }
                :host([open]) #modal.right{
                    top: 40vh;
                    right: 50vw;
                    transform: translateX(50%);
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
                    transition: .5s all;
                }
                #modal{
                    padding: 10px 15px;
                    position: fixed;
                    margin:auto;
                    z-index: 100;
                    background: white;
                    border-radius: 15px;
                    pointer-events: none;
                    opacity:0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: .5s all;
                }
                #modal.top{
                    top: -30vw;
                    transform: translateX(-50%);
                    left: 50vw;
                }
                #modal.bottom{
                    bottom: -30vw;
                    transform: translateX(-50%);
                    left: 50vw;
                }
                #modal.left{
                    left: -30vw;
                    top: 40vh;
                }
                #modal.right{
                    right: -30vw;
                    top: 40vh;
                }
                #modal h2{
                    margin: 0;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <h2></h2>
                <p></p>
                <button>Okay</button>
            </div>
        `
        this._title       = 'Warning'
        this._animation   = 'bottom'
        this._description = null
        this._titleEl   = this.shadowRoot.querySelector('#modal h2')
        this._modalEl   = this.shadowRoot.querySelector('#modal')
        this.shadowRoot.querySelector('button').addEventListener('click', this._close.bind(this))
        this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._close.bind(this))
        this.opened    = false
    }
    connectedCallback(){
        console.log(this.shadowRoot.querySelector('style'))
        if(this.hasAttribute('title')){
            this._title = this.getAttribute('title')
        }
        if(this.hasAttribute('animation')){
            this._animation = this.getAttribute('animation')
        }
        if(this.hasAttribute('styles')){
            this.shadowRoot.querySelector('style').append(`@import url${this.getAttribute('styles')}`)
        }
        if(this.hasAttribute('description')){
            this._description = this.getAttribute('description')
            this._modalEl.querySelector('p').textContent = this._description
        }else{
            this._modalEl.removeChild(this._modalEl.querySelector('p'))
        }
        this._titleEl.textContent = this._title
        this._modalEl.classList.add(this._animation)
    }
    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case 'open':
                this.opened = !this.opened
                break
            case 'animation':
                this._animation = newValue
                this.changeModalClasses([this._animation])
                break
            default: null
        }
    }
    static get observedAttributes(){
        return ['open', 'animation']
    }
    changeModalClasses(classes){
        this._modalEl.className = ''
        classes.forEach(cls=>this._modalEl.classList.add(cls))
    }
    _close(){
        this.removeAttribute('open')
    }
    open(){
        this.setAttribute('open', '')
    }
}

customElements.define('laup-modal', Modal)