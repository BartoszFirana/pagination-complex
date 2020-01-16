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

        const btnLeft = `<button class="pagination__button"><span class="arrow__left"></span></button>`;
        const btnRight = `<button class="pagination__button"><span class="arrow__right"></span></button>`;

        this.basicNode.innerHTML =
            `
                ${btnLeft}
                ${renderByMap([...this.pageListState])}
                ${btnRight}
                `;

        function renderByMap(pageList) {

            return pageList.map((page, index) => (
                `<button class=${page.active === true ? "pagination__button pagination__button--active" : "pagination__button"} data-page-number="${page.number}">${page.number}</button>`
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

        this.setPageList(this.maxPageState);
    }

    setPageParam(newPageParam) {

        const url = new URL(window.location);
        const params = new URLSearchParams(url.search);

        if (newPageParam === undefined) {
            if (params.has('p')) {

                const value = params.get('p');
                this.currentPageState = value;

            } if (!params.has('p')) {
                params.append('p', 1);
                this.currentPageState = 1;
            }
        } if (newPageParam !== undefined) {

            params.set('p', newPageParam);
            window.location.href = `/?${params.toString()}`;

        }

    }

    setLocalStorage(maxPage) {

        localStorage.setItem('maxPageInput', maxPage);

    }

    setPageList(value) {

        this.pageListState = Array.from({ length: value }, (v, k) => ({ number: k, active: false }));

    }

    bindEventHandlers() {

        this.maxPageInputState.addEventListener('input', this.onInputHandler);
        this.paginationState.addEventListener('click', this.onClickHandler);

    }

    onClickHandler = (e) => {

        const target = e.target.dataset.pageNumber;

        if (target !== null) {

            this.currentPageState = target;

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