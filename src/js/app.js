import RenderPage from './renderPage/renderPage';

document.addEventListener('DOMContentLoaded', () => {
  const parentElement = document.querySelector('.page');
  const parentPage = new RenderPage(parentElement);
  parentPage.buildpage();
});
