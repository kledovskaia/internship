import { routeNames } from '../data/routeNames';
const sidebar = document.getElementById('sidebar');
sidebar.innerHTML = `
  <ul class="navigation__list">
  ${routeNames
    .map(
      (name) =>
        `<li class="navigation__list-item">
        <a href="../${name}.html" class="navigation__link">
          <svg>
            <use href="../assets/icons/navigation.svg#${name}"></use>
          </svg>
          <span class="navigation__label">${
            name[0].toUpperCase() + name.slice(1)
          }</span>
        </a>
      </li>`
    )
    .join('')}
  </ul>
`;
