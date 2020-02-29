// This component needs event objecty as event parameter

export default class PointerPopup extends HTMLElement{
    constructor(){
        super()
        this.shadowRoot.innerHTML = `
            <div>
                <slot name="hovering"> </slot>
            <div>
        `
    }

}

customElements.define('laup-pointer-popup', PointerPopup)