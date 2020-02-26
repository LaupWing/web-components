import './web-components/modal.js'

const init = ()=>{
    const modal = document.querySelector('laup-modal')
    document.querySelector('button').addEventListener('click',()=> modal.open())
}

window.addEventListener('load', init)