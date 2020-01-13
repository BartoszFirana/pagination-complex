export default class Pagination {

    maxPage = 3;
    currentPage = null;

    constructor(basicNode) {
        this.basicNode = basicNode;
    }

    init() {

        this.setDomElements();

        this.render();

        this.bindEventHandlers();

    }

    render() {
        this.basicNode.innerHTML =
            `
            <button class="pagination__button"><span class="arrow__left"></span></button>
            ${[0, 1, 2].map((page, index) => (`<button class="pagination__button">${index}</button>`)).join("")}
            <button class="pagination__button"><span class="arrow__right"></span></button>
            `
    }

    setDomElements() {

        this.maxPageInput = document.querySelector('.maxpage__input');

    }

    setPageParam() {

        const url = new URL(window.location);
        const params = new URLSearchParams(url.search);

        if (params.has('p')) {
            const value = params.get('p');
            this.currentPage = value;
        }
        if (!params.has('p')) {
            this.currentPage = 1;
        }
    }

    bindEventHandlers() {
        this.maxPageInput.addEventListener('input', this.onInputHandler);
    }

    onClickHandler = (e) => {

    }

    onInputHandler = (e) => {
        const target = e.target.className;
        if (target === "maxpage__input") {
            this.currentPage = e.target.value;
        }
    }

}