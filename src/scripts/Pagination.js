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