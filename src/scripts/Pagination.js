export default class Pagination {

    maxPageState = null;
    pageListState = [];
    currentPageState = null;
    paginationState = null;

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

        const lastPage = (this.pageListState.length - 1).toString();

        const btnLeft = `<button data-arrow-button="decrement" class="pagination__button" ${this.currentPageState === "0" ? "disabled" : ""}><span class="arrow__left"></span></button>`;
        const btnRight = `<button data-arrow-button="increment" class="pagination__button" ${this.currentPageState === lastPage ? "disabled" : ""}><span class="arrow__right"></span></button>`;

        const quickFirstPage = `
        <button class="pagination__button" data-page-number="${this.pageListState[0].number}">${this.pageListState[0].number}</button>
        <button class="pagination__button" disabled>...</button>
        `;
        const quickLastPage = `
        <button class="pagination__button" disabled>...</button>
        <button class="pagination__button" data-page-number="${this.pageListState[Number(lastPage)].number}">${this.pageListState[Number(lastPage)].number}</button>
        `;

        this.basicNode.innerHTML =
            `
                ${btnLeft}
                ${this.currentPageState > 3 ? quickFirstPage : ""}
                ${renderByMap(this.pageListState, this.currentPageState)}
                ${this.currentPageState < Number(lastPage) - 3 ? quickLastPage : ""}
                ${btnRight}
                `;

        function renderByMap(pageList, currentPage) {

            currentPage = Number(currentPage);

            const marginLeft = (currentPage < 4 ? 0 : currentPage - 3);
            const marginRight = (currentPage > (pageList.length - 4) ? pageList.length : currentPage + 4);

            const reduceList = pageList.slice(marginLeft, marginRight);

            return reduceList.map((page, index) => (
                `<button class="${page.active === true ? "pagination__button pagination__button--active" : "pagination__button"}" data-page-number="${page.number}">${page.number}</button>`
            )).join("")
        }
    }

    setDomElements() {

        this.maxPageInputState = document.querySelector('.maxpage__input');
        this.paginationState = document.querySelector('.pagination');

    }

    setMaxPageValue() {

        if (localStorage.getItem('maxPageInput') !== null) {
            this.maxPageState = localStorage.getItem('maxPageInput');
        } if (localStorage.getItem('maxPageInput') === null) {
            this.maxPageState = 3;
        }

        this.maxPageInputState.value = this.maxPageState;

        this.setPageList();
    }

    setPageActiveButton() {

        this.pageListState[this.currentPageState].active = true;

    }

    setPageParam(newPage) {

        const url = new URL(window.location);
        const params = new URLSearchParams(url.search);

        if (newPage === undefined) {
            if (params.has('p')) {

                const value = params.get('p');
                this.currentPageState = value;

            } if (!params.has('p')) {
                params.append('p', 1);
                this.currentPageState = 1;
            }
        } if (newPage !== undefined) {

            if (newPage <= this.maxPageState) {
                params.set('p', newPage);
                window.location.href = `/?${params.toString()}`;
            }

        }

    }

    setLocalStorage(maxPage) {

        localStorage.setItem('maxPageInput', maxPage);

    }

    setPageList() {

        this.pageListState = Array.from({ length: this.maxPageState }, (v, k) => ({ number: k, active: false }));

        this.setPageActiveButton()

    }

    bindEventHandlers() {

        this.maxPageInputState.addEventListener('input', this.onInputHandler);
        this.paginationState.addEventListener('click', this.onClickHandler);

    }

    onClickHandler = (e) => {

        const target = e.target.dataset.pageNumber;
        const arrowBtnTarget = e.target.dataset.arrowButton;

        if (target !== null) {

            this.currentPageState = target;

            this.setPageParam(this.currentPageState);

        }

        if (arrowBtnTarget) {
            if (arrowBtnTarget === "decrement") {
                this.currentPageState = Number(this.currentPageState) - 1;
            } if (arrowBtnTarget === "increment") {
                this.currentPageState = Number(this.currentPageState) + 1;
            }

            this.setPageParam(this.currentPageState);
        }

        this.render();

    }

    onInputHandler = (e) => {

        const target = e.target.className

        if (target === "maxpage__input" && e.target.value > 0) {
            this.maxPageState = Number(e.target.value);
        } if (e.target.value < 1) {
            this.maxPageState = 1;
            e.target.value = this.maxPageState;
        }

        this.setPageList(this.maxPageState);

        this.setLocalStorage(this.maxPageState);

        this.setMaxPageValue();

        this.render();
    }

}