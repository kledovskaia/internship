let pageName = location.pathname.slice(1).split('.')[0];
if (pageName === 'index') pageName = 'dashboard';

const navLink =
  document.getElementById(pageName) || document.getElementById('dashboard');
navLink.classList.add('navigation__link--active');

pageName = pageName[0].toUpperCase() + pageName.slice(1);
document.title = pageName;
