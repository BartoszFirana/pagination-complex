export default class Pagination {

    maxPage = 3;
    pageList = [];
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
        console.log(this.pageList);
        this.basicNode.innerHTML =
            `
            <button class="pagination__button"><span class="arrow__left"></span></button>
            ${this.pageList.map((page, index) => (`<button class="pagination__button">${index}</button>`)).join("")}
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
        if (target === "maxpage__input" && e.target.value > 0) {
            this.maxPage = Number(e.target.value);
        } if (e.target.value < 1) {
            this.maxPage = 1;
            e.target.value = this.maxPage;
        }
        this.pageList = [...Array(this.maxPage).keys()]

        this.render();
    }

}