import Pagination from './Pagination';

import '../styles/styles.scss';
import './Font';

const sectionNode = document.querySelector('.pagination');

const pagination = new Pagination(sectionNode);

pagination.setPageParam();
pagination.init();