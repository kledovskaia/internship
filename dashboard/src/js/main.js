let pageName = location.pathname.slice(1).split('.')[0];
if (pageName === 'index') pageName = 'dashboard';
document.title = pageName[0].toUpperCase() + pageName.slice(1);

const 