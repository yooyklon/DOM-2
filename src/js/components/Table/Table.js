import './Table.css';
import fetchData from '../../api/tableData';

export default class Table {
  constructor(element) {
    if (element) {
      this.element = element;
    }

    this.data = fetchData();
    this.filteredData = this.data;

    this.filterParam = {
      param: null,
      direction: false,
    };

    this.registerEvent();
  }

  registerEvent() {
    const tableHead = this.element.querySelector('.table__head');

    tableHead.addEventListener('click', (event) => {
      if (event.target.closest('.table__head-item')) {
        this.tableSorting(event.target.textContent);
      }
    });
  }

  settingArrow(sortParam) {
    const elements = this.element.querySelectorAll('.table__head-item');
    elements.forEach((el) => {
      el.classList.remove('arrow-asc');
      el.classList.remove('arrow-desc');
    });

    const currentElem = this.element.querySelector(`[data-type="${sortParam}"]`);

    if (this.filterParam.direction) {
      currentElem.classList.add('arrow-desc');
    } else {
      currentElem.classList.add('arrow-asc');
    }
  }

  tableSorting(sortParam) {
    if (this.filterParam.param === sortParam) {
      this.filterParam.direction = !this.filterParam.direction;
    } else {
      this.filterParam = {
        param: sortParam,
        direction: false,
      };
    }
    if (this.filterParam.direction) {
      this.filteredData = this.filteredData.reverse();
    } else {
      this.filteredData = this.filteredData.sort((a, b) => {
        switch (true) {
          case a[sortParam] > b[sortParam]: return 1;
          case a[sortParam] < b[sortParam]: return -1;
          default:
            return 0;
        }
      });
    }
    this.element.querySelectorAll('tbody tr').forEach((el) => el.remove());
    this.renderHtml();

    this.settingArrow(sortParam);
  }

  renderHtml() {
    this.element.insertAdjacentHTML('beforeend', `
      ${this.filteredData.map((el) => `
        <tr data-id="${el.id}" data-title="${el.title}" data-year="${el.year}" data-imdb="${el.imdb}">
          <td class="table__body-item">#${el.id}</td>
          <td class="table__body-item">${el.title}</td>
          <td class="table__body-item">(${el.year})</td>
          <td class="table__body-item">${el.imdb}</td>
        </tr>
        `).join('')}
    `);
  }
}
