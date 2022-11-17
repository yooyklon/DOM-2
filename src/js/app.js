import Table from './components/Table/Table';

const tableElement = document.querySelector('.table');

const table = new Table(tableElement);

table.renderHtml();
