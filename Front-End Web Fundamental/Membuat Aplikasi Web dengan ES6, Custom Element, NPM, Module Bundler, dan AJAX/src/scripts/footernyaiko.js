class ikoPunya extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <p id="iko">By Endricho Abednego</p>
        `;
    }
}
customElements.define('footer-iko', ikoPunya);