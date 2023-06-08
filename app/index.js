import Home from         './src/pages/Home.js';
import ShowEvent from    './src/pages/ShowEvent.js';
import AddEvent from    './src/pages/AddEvent.js';
import Messages from     './src/pages/Messages.js';
import About from        './src/pages/About.js';
import Error404 from     './src/pages/Error404.js';
import Login from        './src/pages/Login.js';
import UserProfile from  './src/pages/UserProfile.js';

import Header from       './src/components/Header.js';
import Footer from       './src/components/Footer.js';
import ToTopButton from  './src/components/ToTopButton.js';
import WelcomeModal from './src/components/WelcomeModal.js';
import Preloader from    './src/components/Preloader.js';

import Utils from        './src/services/Utils.js'

const routes = {
  '/': Home,
  '/event/id': ShowEvent,
  '/addevent': AddEvent,
  '/messages': Messages,
  '/about': About,
  '/login': Login,
  '/user/id': UserProfile,
}

async function router() {

  const root = document.getElementById("root");

  // добавляем хедер единожды, чтобы не ререндерить каждый раз
  if (!document.getElementById("header")) {
    const header = document.createElement("div");
    header.id = "header";
    root.before(header);
    header.innerHTML = Header.render();
    Header.after_render();
  }

  // добавляем футер единожды, чтобы не ререндерить каждый раз
  if(!document.getElementById("footer")) {
    const footer = document.createElement("div");
    footer.id = "footer";
    root.after(footer);
    footer.innerHTML = Footer.render();
    Footer.after_render();
  }

  // добавляем кнопку скролла вверх единожды, чтобы не ререндерить каждый раз
  if (!document.querySelector(".sroll_up_button")) {
    const btn = document.createElement("div");
    btn.classList.add("sroll_up_button");
    root.after(btn);
    btn.innerHTML = ToTopButton.render();
    ToTopButton.after_render();
  }

  /* получаем хеш, разбивам на объект */
  const request = Utils.parseRequestURL();

  // получаем итоговый хеш, если есть, если нет то homepage
  let hashURL = (request.resource ? `/${request.resource}`: "/") + (request.id ? "/id": "");
  
  // рендерим страницу или error404 если такой не существует
  let page = routes[hashURL] ? routes[hashURL] : Error404;
  document.title = page.title;

  root.innerHTML = Preloader.render();
  await Utils.sleep(500);
  root.innerHTML = await page.render();
  await page.after_render();
}

// запускаем каждый раз когда хэш меняется
window.addEventListener("hashchange", router);

// запускаем при первой загрузке, рендерим страницу, показываем приветственную модалку
window.addEventListener("DOMContentLoaded", (e) => {
  router();

  setTimeout(() => {
    WelcomeModal.render();
    WelcomeModal.after_render();
  }, 10000);
}, {once: true});