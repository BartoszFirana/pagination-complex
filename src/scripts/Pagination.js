export default class Pagination {

    maxPage = null;
    pageList = [];
    currentPage = null;

    constructor(basicNode) {
        this.basicNode = basicNode;
    }

    init() {

        this.setDomElements();

        this.setMaxPageValue()

        this.render();

        this.bindEventHandlers();

    }

    render() {

        const btnLeft = [`<span class="arrow__left"></span>`];
        const btnRight = [`<span class="arrow__right"></span>`];

        const slimPagination = [btnLeft[0], ...this.pageList, btnRight[0]];
        const mediumPagination = [btnLeft[0], `...`, ...this.pageList, `...`, btnRight[0]];

        if (this.maxPage <= 5) {
            this.basicNode.innerHTML =
                `
                ${renderByMap(slimPagination)}
                `;
        }

        if (this.maxPage > 5) {
            this.basicNode.innerHTML =
                `
                ${renderByMap(mediumPagination)}
                `;
        }

        function renderByMap(sizePagination) {
            return sizePagination.map((page, index) => (
                `<button class="pagination__button">${page}</button>`
            )).join("")
        }

    }

    setDomElements() {

        this.maxPageInput = document.querySelector('.maxpage__input');

    }

    setMaxPageValue() {
        if (localStorage.getItem('maxPageInput') !== null) {
            this.maxPage = localStorage.getItem('maxPageInput');
        } if (localStorage.getItem('maxPageInput') === null) {
            this.maxPage = 3;
        }

        this.maxPageInput.value = this.maxPage;

        this.setPageList(this.maxPage);
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

    setLocalStorage(maxPage) {
        localStorage.setItem('maxPageInput', maxPage);
    }

    setPageList(value) {
        this.pageList = [...Array(Number(value)).keys()]
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

        this.setPageList(this.maxPage);

        this.setLocalStorage(this.maxPage);

        this.setMaxPageValue()

        this.render();
    }

}